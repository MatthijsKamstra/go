package tweenTests;

import openfl.display.Sprite;


class TweenTest
{  
	/** Name of the engine **/  
	public var name : String;  
	/** Give the user a warning when the instance count exceeds this value **/  
	public var warnAtCount : UInt;

	public function new(name : String, warnAtCount : UInt = 2500)
	{
		this.name = name;
		this.warnAtCount = warnAtCount;
	}  
	/**
	 * Gets called when the TweenTest is started (when the user clicks the "START" button).
	 *  
	 * @param targets an Array of target objects that will be tweened (Stars)
	 */
	public function onStart(targets : Array<Dynamic>) : Void
	{
	
	}  
	/**
	 * Creates a tween of the target object to the specified values (x, y, scaleX, scaleY, and rotation).
	 * 
	 * @param target Target object for the tween (the Star that is getting tweened)
	 * @param duration Duration of the tween (in seconds)
	 * @param x destination x value
	 * @param y destination y value
	 * @param scaleX destination scaleX value
	 * @param scaleY destination scaleY value
	 * @param rotation destination rotation value
	 * @param delay delay (in seconds) that should elapse before the tween begins
	 * @param ease standard easing function that should be used (typically Cubic.easeIn)
	 * @param onComplete function that should be called when the tween has completed
	 * @param onCompleteParams an Array of parameters that should be passed to the onComplete function when the tween completes
	 */  
	public function tween(target : Sprite, duration : Float, x : Float, y : Float, scaleX : Float, scaleY : Float, rotation : Float, delay : Float, ease : Dynamic, onComplete : Dynamic, onCompleteParams : Array<Dynamic>) : Void
	{
	}  
	/**
	 * Kills all tweens being performed by this test.
	 * 
	 * @param targets an Array of target objects associated with the tweens that should now be killed. (this method doesn't do anything to the targets themselves, it should just kill the associated tweens)
	 */  
	public function kill(targets : Array<Dynamic>) : Void
	{
	}
}