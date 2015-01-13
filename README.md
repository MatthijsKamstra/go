# go
Lightweight tween library for Haxe.

[![Everybody in the place, lets go](http://img.youtube.com/vi/WY87o9IZXWg/0.jpg)](https://www.youtube.com/watch?v=WY87o9IZXWg)
 
Inspired by tween engines written in Haxe and ActionScript. I just wanted to see if I could build a tweening engine myself.

####WIP and not ready for production


## Installation

Because this is an experiment, there is no haxelib install.

But if you want to try it out via *haxelib*, you can install it with git 

```
git clone https://github.com/MatthijsKamstra/go/
haxelib dev go go
```

To include Go in an OpenFL project, add `<haxelib name="go" />` to your project.xml.

To add Go to a standard Haxe project, use `-lib go` in your HXML





## Usage

Animate a sprite in 1.5 second to x postion 100

```
Go.to(sprite, 1.5).x(100);
```

Animate a sprite in 1.5 second to x and y postion

```
Go.to(sprite, 1.5).x(100).y(200);
```

Animate a sprite in 1.5 second to x and y postion and call function when animation is done

```
Go.to(sprite, 1.5).x(100).y(200).onComplete(onCompleteHandler, ['hello']);
```

Rotate an object in degrees

```
Go.to(sprite, 1.5).rotate(360);
```

Change the alpha of an object (value from 0 to 1)

```
Go.to(sprite, 1.5).alpha(.5);
```


## Concept

It should be easy to use, so I decided to use chainging methode.

You can animate 

**to** 

`Go.to(target, 1.5).x(100);`

and 

**from** 

`Go.from(target, 1.5).x(100);`


You can animate the default **properties** of a DisplayObject:

* x
* y
* rotation 
* alpha
* scale

`Go.from(target, 1.5).x(100).y(100).rotation(10).alpha(.5).scale(2);`

and value via **prop**

`Go.from(obj, 1.5).prop('counter',100)`


Call an **onComplete** when the animation id done

Use simple easing 

* 	linear
* 	quad
* 	cubic
* 	quart
* 	quint
* 	sine
* 	circ
* 	expo
* 	back
* 	bounce
* 	elastic
* 	reverse
* 	reflect

## Tween engines I used for inspiration

Haxe

* [https://github.com/openfl/actuate](https://github.com/openfl/actuate)
* https://github.com/alijaya/teew/tree/master/teew
* https://github.com/sreenaths/twee-haxe

AS3

* https://code.google.com/p/eaze-tween/
* https://code.google.com/p/fatlib/source/browse/trunk/src/org/fatlib/utils/Tween.as

