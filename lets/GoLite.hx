
package lets;

import lets.Easing;

import haxe.Timer;
import flash.Lib;

import flash.display.Sprite;

class GoLite
{
	private static var _trigger:Timer;
	private static var _tweens:Array<GoLite> = new Array<GoLite>();

	private var _target:Dynamic;
	private var _duration:Int;
	private var _easing:Float->Float = Easing.linear;
	private var _options:Dynamic = cast{};

	private var _props = new Map<String,Range>();

	private var _isFrom:Bool = false;
	private var _isYoyo:Bool = false;

	private var _initTime:Int = 0;
	private var _delay:Int = 0;

	/**
	 * Animate an object to another state (like position, scale, rotation, alpha)
	 * 
	 * @example		lets.GoLite.to(foobarMc, 1.5);
	 * 
	 * @param  target   	object to animate
	 * @param  duration 	in seconds	
	 * @return          GoLite
	 */
	public function new(target:Dynamic, duration:Float)
	{
		this._target = target;
		this._duration = Std.int (duration * 1000);
		// this._easing = Easing.linear;
		// this._options = cast{};
		this._initTime = Lib.getTimer();
		_tweens.push(this);
		// trace('New GoLite - _target: ' + _target + ' / _duration: ' + _duration+  ' / _initTime: ' + _initTime+ ' / _tweens.length: ' + _tweens.length);
		// [mck] extreme little delay to make sure all the values are set
		haxe.Timer.delay(init, 1); // 1 milisecond delay
	}

	/**
	 * Animate an object TO another state (like position, scale, rotation, alpha)
	 * 
	 * @example		lets.GoLite.to(foobarMc, 1.5);
	 * 
	 * @param  target   	object to animate
	 * @param  duration 	in seconds	
	 * @return          GoLite
	 */
	static inline public function to(target:Dynamic, duration:Float):GoLite
	{
		var GoLite = new GoLite(target, duration);
		GoLite._isFrom = false;
		return GoLite;
	}

	/**
	 * Animate an object FROM another state (like position, scale, rotation, alpha)
	 * 
	 * @example		lets.GoLite.from(foobarMc, 1.5);
	 * 
	 * @param  target   	object to animate
	 * @param  duration 	in seconds	
	 * @return          GoLite
	 */	
	static inline public function from(target:Dynamic, duration:Float):GoLite
	{
		var GoLite = new GoLite(target, duration);
		GoLite._isFrom = true;
		return GoLite;
	}

	/**
	 * Use GoLite to do a delayed call to a function
	 * 
	 * @example		lets.GoLite.timer(1.5).onComplete(onCompleteHandler);
	 * 
	 * @param  duration 	in seconds	
	 * @return          GoLite
	 */	
	static inline public function timer(duration:Float):GoLite
	{	
		var GoLite = new GoLite(new Sprite(), duration);
		return GoLite;
	}


	// ____________________________________ properties ____________________________________

	/**
	 * change the x value of an object
	 * 
	 * @param  value 	x-position
	 * @return       GoLite
	 */
	inline public function x(value:Float):GoLite
	{
		prop ('x', value);
		return this;
	}
	/**
	 * change the y value of an object
	 * 
	 * @param  value 	y-position
	 * @return       GoLite
	 */
	inline public function y(value:Float):GoLite
	{
		prop ('y', value);
		return this;
	}
	/**
	 * change the rotation value of an object
	 * 
	 * @param  value 	rotation in degrees (360)
	 * @return       GoLite
	 */
	inline public function rotation(value:Float):GoLite
	{
		prop ('rotation', value);
		return this;
	}
	/**
	 * change the alpha value of an object
	 * 
	 * @param  value 	transparanty value (maximum value 1)
	 * @return       GoLite
	 */
	inline public function alpha(value:Float):GoLite
	{
		prop ('alpha', value);
		return this;
	}
	/**
	 * change the scale of an object
	 * 
	 * @param  value 	scale (1 is 100% (original scale), 0.5 is 50%, 2 is 200%)
	 * @return       GoLite
	 */
	inline public function scale(value:Float):GoLite
	{
		prop ('scaleX', value);
		prop ('scaleY', value);
		return this;
	}
	/**
	 * yoyo to the original values of an object
	 * 
	 * @return       GoLite
	 */
	inline public function yoyo():GoLite
	{
		_isYoyo = true;
		return this;
	}
	/**
	 * delay the animation in seconds
	 * 
	 * @return       GoLite
	 */
	inline public function delay(value:Float):GoLite
	{
		_delay = Std.int (value * 1000);
		return this;
	}
	/**
	 * change the property of an object
	 * 
	 * @param  key   	description of the property as string
	 * @param  value 	change to this value 
	 * @return       GoLite
	 */
	inline public function prop(key:String, value:Float):GoLite 
	{
		var objValue = Reflect.getProperty(_target, key);
		var _range = {key:key, from:(_isFrom) ? value:objValue , to:(!_isFrom) ? value:objValue };
		_props.set (key, _range );
		return this;
	}
	/**
	 * on completion of the animation call a function with param(s)
	 * 
	 * @param  func         	function to call when animition is complete
	 * @param  arr<Dynamic> 	params send to function
	 * @return              GoLite
	 */
	inline public function onComplete(func:Dynamic, ?arr:Array<Dynamic>):GoLite
	{
		_options.onComplete = func;
		_options.onCompleteParams = arr;
		// _options.onCompleteParams = (arr == null ) ? [] : arr;
		return this;
	}
	/**
	 * on update of the animation call a function with param(s)
	 * 
	 * @param  func         	function to call when animition is updated
	 * @param  arr<Dynamic> 	params send to function
	 * @return              GoLite
	 */
	inline public function onUpdate(func:Dynamic, ?arr:Array<Dynamic>):GoLite
	{
		_options.onUpdate = func;
		_options.onUpdateParams = arr;
		return this;
	}
	/**
	 * change the default (Easing.linear) easing 
	 *
	 * @example		lets.GoLite.from(foobarMc, 1.5).x(500).easing(lets.Easing.quad);
	 * 
	 * @param  easing->Float 		check Easing class
	 * @return		GoLite
	 */
	inline public function ease(easing:Float->Float):GoLite
	{
		this._easing = easing;
		return this;
	}

	// ____________________________________ public ____________________________________

	/**
	 * stop a GoLite tween while its animating
	 *
	 * @example 	var tween : GoLite = lets.GoLite.to(foobarMc, 20).x(100);
	 *           	// oh dumb dumb, I want to stop that long animation because x-reason
	 *           	tween.stop();
	 */
	public function stop():Void
	{
		destroy();
	}
	
	// ____________________________________ private ____________________________________

	private function init():Void
	{
		var framerate:Int = 30;
		_trigger = (_trigger == null) ? new Timer(Std.int(1000 / framerate)) : _trigger;
		_trigger.run = onEnterFrameHandler;
	}

	private function onEnterFrameHandler( ):Void
	{
		if(_initTime == 0) return;
		if (_tweens.length <= 0)
		{
			// [mck] stop timer, we are done!
			_trigger.stop();
			_trigger.run = null;
		} 
		else for( i in 0..._tweens.length ) 
		{
			// [mck] FIXME :: don't know exactly why I need to check if _tweens[i] != null, but I do. 
			if(_tweens[i] != null) _tweens[i].update();
		}
	}
	
	private function update():Void
	{
		// [mck] check for delay
		if (_delay > 0) {
			var waitTime = (Lib.getTimer() - _initTime);
			if(waitTime >= _delay) {
				_delay = 0;
				_initTime = Lib.getTimer();
			} else  {
				return null;
			}
		}

		var progressed = Lib.getTimer() - _initTime;
		if( progressed >= _duration){
			// [mck] setProperties in the final state
			updateProperties(_duration);
			complete();
		} else {
			updateProperties(progressed);
		}
	}

	private function updateProperties(time:Int):Void 
	{
		if( Reflect.isFunction(_options.onUpdate) ) {
			var func = _options.onUpdate;
			var arr = (_options.onUpdateParams != null) ? _options.onUpdateParams : [];
			Reflect.callMethod( func, func, arr );
		}
		for(n in _props.keys())
		{
			var range = _props.get(n);
			Reflect.setProperty(_target, n , _easing(time/_duration) * (range.to-range.from) + range.from);
		}
		// else throw( "Property "+propertyName+" not found in target!" );
	}


	private function complete():Void 
	{
		//trace('complete :: _duration: ' + _duration + ' / _initTime: ' + _initTime + ' / _tweens.length: ' + _tweens.length);
	
		if(_isYoyo) 
		{
			// [mck] reverse the props back to the original state			
			for(n in _props.keys())
			{
				var range = _props.get(n);
				var _rangeReverse = {key:n, from:range.to, to:range.from };
				_props.set (n, _rangeReverse );
			}
			// [mck] reset the time and ignore this function for now... :)
			this._initTime = Lib.getTimer();
			_isYoyo = false;
			return null;
		}

		var func = _options.onComplete;
		var arr = (_options.onCompleteParams != null) ? _options.onCompleteParams : [];

		destroy();

		if( Reflect.isFunction(func) ) Reflect.callMethod( func, func, arr );
	}

	private function destroy():Void
	{
		if(Lambda.has(_tweens, this)) _tweens.remove(this);
		// [mck] cleaning up
		if( _options )
		{
			_easing = Easing.linear;
			_options = cast{};
			_target = null;
			_props = null;
			_duration = 0;
			_initTime = 0;
			_delay = 0;
		}
	}

}

typedef Range = {key:String, from:Null<Float>, to:Null<Float>}