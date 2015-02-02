package;

import openfl.display.Sprite;

class Star extends Sprite
{
	public function new()
	{
		super();
		// var size = 5 + Math.random () * 35 + 20;
		var size = 10;
		var circle = new Sprite ();
		
		circle.graphics.beginFill (0x000000);
		// circle.graphics.beginFill (Std.int (Math.random () * 0xFFFFFF));
		circle.graphics.drawCircle (0, 0, size);
		// circle.alpha = 0.2 + Math.random () * 0.6;
		// circle.x = Math.random () * stage.stageWidth;
		// circle.y = Math.random () * stage.stageHeight;
		circle.x = circle.width/2;
		circle.y = circle.height/2;
		
		addChildAt (circle, 0);
	}
}