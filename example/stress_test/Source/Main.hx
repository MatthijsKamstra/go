package;

import lets.easing.Cubic;

import openfl.display.Sprite;
import openfl.events.MouseEvent;
import openfl.events.Event;

import openfl.Lib;

import openfl.display.StageAlign;
import openfl.display.StageScaleMode;

import com.bit101.components.*;

import tweenTests.*;

class Main extends Sprite {

	private var aniContainer:Sprite;
	private var menuContainer:Sprite;
	
	private var nsInstance:NumericStepper;
	private var nsDuration:NumericStepper;
	private var comboBox0:ComboBox;
	private var btn:PushButton;

	private var _active : Bool;
	private var _curTest : TweenTest;
	private var _radius : UInt = 320;
	private var _targets : Array<Dynamic> = [];

	private var START  = 'START';
	private var STOP  = 'STOP';
	
	public function new () 
	{	
		super ();
		initialize ();
		buildMenu();
	}

	private function initialize():Void 
	{
		Lib.current.stage.align = StageAlign.TOP_LEFT;
		Lib.current.stage.scaleMode = StageScaleMode.NO_SCALE;
		Lib.current.stage.frameRate = 60;

		aniContainer = new Sprite();
		this.addChild(aniContainer);
		
		menuContainer = new Sprite();
		menuContainer.scaleX = menuContainer.scaleY = 1.0;
		this.addChild(menuContainer);

		_curTest = new GoTest();
		
	}

	function buildMenu():Void
	{

		var _tests : Array<Dynamic> = [
			new GoTest(),
			new ActuateTest() 
		];



			
		Style.setStyle(Style.LIGHT);
		

		// var window:Window = new Window(this);
		// window.hasMinimizeButton = true;
		// window.hasCloseButton = true;


		var panel = new Panel(menuContainer);
		panel.setSize (500,50);


		var hbox = new HBox(menuContainer);

		var vbox = new VBox(hbox);

		
		var label0:Label = new Label(vbox, 0, 0, "Tweening engine");

		comboBox0 = new ComboBox(vbox, 0, 0, "choose");
		
		for (i in 0... _tests.length) {
			var test : TweenTest = _tests[i];
			comboBox0.addItem(
				{
					label : test.name,
					data : test
				}
			);
		}
		comboBox0.selectedIndex = 0;
		comboBox0.addEventListener(Event.SELECT, onSelect);
		
		var vbox1 = new VBox(hbox);

		var label1:Label = new Label(vbox1, 0, 0, "Instances");

		nsInstance = new NumericStepper(vbox1, 0, 0);
		nsInstance.minimum = 10;
		nsInstance.maximum = 10000;
		nsInstance.value = 1000;
		nsInstance.step = 10;

		nsInstance.addEventListener(Event.CHANGE, onChange);

		var vbox2 = new VBox(hbox);

		var label2:Label = new Label(vbox2, 0, 0,  "Duration");

		nsDuration = new NumericStepper(vbox2, 0, 0);
		nsDuration.minimum = 0;
		nsDuration.maximum = 10;
		nsDuration.value = 0.5;
		nsDuration.step = 0.1;

		nsDuration.addEventListener(Event.CHANGE, onChange);

		btn = new PushButton(hbox, 0, 20, START, toggleActive);
		var fps:FPSMeter = new FPSMeter(hbox, 0, 20);
	}
	
	public function onClick(e:MouseEvent):Void 
	{
		trace("click");
	}
	public function onSelect(e:Event):Void 
	{
		stopTweens();
		_curTest = this.comboBox0.selectedItem.data;
		// _curTest = new GoTest();
	}
	public function onChange(e:Event):Void 
	{
		// trace("onChange");
		stopTweens();
	}
	

	private function toggleActive(e:MouseEvent) 
	{
		//btn = e.currentTarget;
		if (_active) {
			btn.label = START;
			stopTweens();
		} else {
			btn.label = STOP;
			startTweens();
		}
	}

	private function startTweens() : Void
	{
		_active = true;
		_targets = [];
		var s : Star;
		var i : Int;
		var n : Int = Std.int (this.nsInstance.value);

		for (i in 0...n) {
			s = new Star();
			this.aniContainer.addChild(s);
			_targets[_targets.length] = s;
		}

		_curTest.onStart(_targets);
		for (i in 0...n) {
			tween(_targets[i], Math.random());
		}
	}

	private function tween(star : Star, progress : Float) : Void
	{
		star.x = 250;  //center  
		star.y = 250;  //center  
		var scale : Float = Math.random() * 2.5 + 0.5;
		star.scaleX = star.scaleY = 0.05;
		var random : Float = Math.random();
		var angle : Float = random * Math.PI * 2;
		var delay : Float = Math.random() * this.nsDuration.value;
		if (progress != 0) {
			star.x += Math.cos(angle) * _radius * progress;
			star.y += Math.sin(angle) * _radius * progress;
			star.scaleX = star.scaleY = scale * progress;
			delay = 0;
		}

		_curTest.tween(
			star, 
			this.nsDuration.value * (1 - progress),
			250 + Math.cos(angle) * _radius,  
			250 + Math.sin(angle) * _radius,    
			scale,  
			scale,    
			random * rotation,  
			delay,  
			Cubic.easeIn,    
			tween,    
			[star, 0]
		);

	}

	private function stopTweens() : Void
	{
		btn.label = START;

		_curTest.kill(_targets);
		
		// remove all childern
		while (this.aniContainer.numChildren > 0) {
			this.aniContainer.removeChildAt(0);
		}

		_targets = [];
		_active = false;
	}
	
}