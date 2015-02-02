package tweenTests;

import openfl.display.Sprite;

import lets.Go;
import lets.easing.*;

class GoTest extends TweenTest
{
	// private var _tweenLookup:Array<Dynamic> = [];
	private var _tweenLookup = new Map<Sprite,Go>();
	
	public function new()
	{
		super("Go " + Go.version, 4000);
	}

	override public function onStart(targets : Array<Dynamic>) : Void
	{
	}

	override public function tween(target : Sprite, duration : Float, x : Float, y : Float, scaleX : Float, scaleY : Float, rotation : Float, delay : Float, ease : Dynamic, onComplete : Dynamic, onCompleteParams : Array<Dynamic>) : Void
	{
		_tweenLookup[target] = Go.to(target, duration).x(x).y(y).prop('scaleX',scaleX).prop('scaleY',scaleY).rotation(rotation).delay(delay).ease(ease).onComplete (onComplete,onCompleteParams);
	}

	override public function kill(targets : Array<Dynamic>) : Void
	{
		Go.killAll();
		// for(n in _tweenLookup.keys())
		// {
		// 	var go = _tweenLookup.get(n);
		// 	go.stop();
		// }
	}
	
}