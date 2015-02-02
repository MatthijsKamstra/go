package tweenTests;

import openfl.display.Sprite;

import motion.Actuate;
import motion.easing.IEasing;
import motion.easing.Cubic;

class ActuateTest extends TweenTest
{
	public function new()
	{
		super("Actuate", 4000);
	}

	override public function onStart(targets : Array<Dynamic>) : Void
	{
	}

	override public function tween(target : Sprite, duration : Float, x : Float, y : Float, scaleX : Float, scaleY : Float, rotation : Float, delay : Float, ease : Dynamic, onComplete : Dynamic, onCompleteParams : Array<Dynamic>) : Void
	{
		Actuate.tween(target, duration, {x : x, y:y, scaleX:scaleX, scaleY:scaleY, rotation:rotation}).onComplete (onComplete,onCompleteParams).ease(Cubic.easeIn).delay(delay);
		// Actuate.tween(target, duration, {x : x, y:y, scaleX:scaleX, scaleY:scaleY, rotation:rotation, delay:delay}).onComplete (onComplete,onCompleteParams).ease(ease);
	}

	override public function kill(targets : Array<Dynamic>) : Void
	{
		Actuate.reset();
		// for (i in 0...targets.length) 
		// {
		// 	Actuate.stop(targets[i]);
		// }
	}
	
}