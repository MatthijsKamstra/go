(function ($hx_exports) { "use strict";
$hx_exports.openfl = $hx_exports.openfl || {};
$hx_exports.lime = $hx_exports.lime || {};
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.config = null;
ApplicationMain.preloader = null;
ApplicationMain.create = function() {
	var app = new openfl.display.Application();
	app.create(ApplicationMain.config);
	var display = new NMEPreloader();
	ApplicationMain.preloader = new openfl.display.Preloader(display);
	ApplicationMain.preloader.onComplete = ApplicationMain.init;
	ApplicationMain.preloader.create(ApplicationMain.config);
	var urls = [];
	var types = [];
	if(ApplicationMain.config.assetsPrefix != null) {
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(types[i] != "FONT") urls[i] = ApplicationMain.config.assetsPrefix + urls[i];
		}
	}
	ApplicationMain.preloader.load(urls,types);
	var result = app.exec();
};
ApplicationMain.init = function() {
	var loaded = 0;
	var total = 0;
	var library_onLoad = function(__) {
		loaded++;
		if(loaded == total) ApplicationMain.start();
	};
	ApplicationMain.preloader = null;
	if(loaded == total) ApplicationMain.start();
};
ApplicationMain.main = function() {
	ApplicationMain.config = { antialiasing : 0, background : 16777215, borderless : false, depthBuffer : false, fps : 0, fullscreen : false, height : 0, orientation : "", resizable : true, stencilBuffer : false, title : "Go Example", vsync : false, width : 0};
};
ApplicationMain.start = function() {
	var hasMain = false;
	var entryPoint = Type.resolveClass("Main");
	var _g = 0;
	var _g1 = Type.getClassFields(entryPoint);
	while(_g < _g1.length) {
		var methodName = _g1[_g];
		++_g;
		if(methodName == "main") {
			hasMain = true;
			break;
		}
	}
	if(hasMain) Reflect.callMethod(entryPoint,Reflect.field(entryPoint,"main"),[]); else {
		var instance = Type.createInstance(DocumentClass,[]);
	}
	openfl.Lib.current.stage.dispatchEvent(new openfl.events.Event(openfl.events.Event.RESIZE,false,false));
};
var openfl = {};
openfl.events = {};
openfl.events.IEventDispatcher = function() { };
$hxClasses["openfl.events.IEventDispatcher"] = openfl.events.IEventDispatcher;
openfl.events.IEventDispatcher.__name__ = ["openfl","events","IEventDispatcher"];
openfl.events.IEventDispatcher.prototype = {
	__class__: openfl.events.IEventDispatcher
};
openfl.events.EventDispatcher = function(target) {
	if(target != null) this.__targetDispatcher = target;
};
$hxClasses["openfl.events.EventDispatcher"] = openfl.events.EventDispatcher;
openfl.events.EventDispatcher.__name__ = ["openfl","events","EventDispatcher"];
openfl.events.EventDispatcher.__interfaces__ = [openfl.events.IEventDispatcher];
openfl.events.EventDispatcher.__sortByPriority = function(l1,l2) {
	if(l1.priority == l2.priority) return 0; else if(l1.priority > l2.priority) return -1; else return 1;
};
openfl.events.EventDispatcher.prototype = {
	addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		if(this.__eventMap == null) this.__eventMap = new haxe.ds.StringMap();
		if(!this.__eventMap.exists(type)) {
			var list = new Array();
			list.push(new openfl.events._EventDispatcher.Listener(listener,useCapture,priority));
			this.__eventMap.set(type,list);
		} else {
			var list1 = this.__eventMap.get(type);
			var _g1 = 0;
			var _g = list1.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(Reflect.compareMethods(list1[i].callback,listener)) return;
			}
			list1.push(new openfl.events._EventDispatcher.Listener(listener,useCapture,priority));
			list1.sort(openfl.events.EventDispatcher.__sortByPriority);
		}
	}
	,dispatchEvent: function(event) {
		if(this.__eventMap == null || event == null) return false;
		var list = this.__eventMap.get(event.type);
		if(list == null) return false;
		if(event.target == null) {
			if(this.__targetDispatcher != null) event.target = this.__targetDispatcher; else event.target = this;
		}
		event.currentTarget = this;
		var capture = event.eventPhase == openfl.events.EventPhase.CAPTURING_PHASE;
		var index = 0;
		var listener;
		while(index < list.length) {
			listener = list[index];
			if(listener.useCapture == capture) {
				listener.callback(event);
				if(event.__isCancelledNow) return true;
			}
			if(listener == list[index]) index++;
		}
		return true;
	}
	,hasEventListener: function(type) {
		if(this.__eventMap == null) return false;
		return this.__eventMap.exists(type);
	}
	,removeEventListener: function(type,listener,capture) {
		if(capture == null) capture = false;
		if(this.__eventMap == null) return;
		var list = this.__eventMap.get(type);
		if(list == null) return;
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].match(listener,capture)) {
				list.splice(i,1);
				break;
			}
		}
		if(list.length == 0) this.__eventMap.remove(type);
		if(!this.__eventMap.iterator().hasNext()) this.__eventMap = null;
	}
	,toString: function() {
		var full = Type.getClassName(Type.getClass(this));
		var $short = full.split(".").pop();
		return "[object " + $short + "]";
	}
	,willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,__class__: openfl.events.EventDispatcher
};
openfl.display = {};
openfl.display.IBitmapDrawable = function() { };
$hxClasses["openfl.display.IBitmapDrawable"] = openfl.display.IBitmapDrawable;
openfl.display.IBitmapDrawable.__name__ = ["openfl","display","IBitmapDrawable"];
openfl.display.IBitmapDrawable.prototype = {
	__class__: openfl.display.IBitmapDrawable
};
openfl.display.DisplayObject = function() {
	openfl.events.EventDispatcher.call(this);
	this.__alpha = 1;
	this.__rotation = 0;
	this.__scaleX = 1;
	this.__scaleY = 1;
	this.__visible = true;
	this.__x = 0;
	this.__y = 0;
	this.__worldAlpha = 1;
	this.__worldTransform = new openfl.geom.Matrix();
	this.__rotationCache = 0;
	this.__rotationSine = 0;
	this.__rotationCosine = 1;
	this.set_name("instance" + ++openfl.display.DisplayObject.__instanceCount);
};
$hxClasses["openfl.display.DisplayObject"] = openfl.display.DisplayObject;
openfl.display.DisplayObject.__name__ = ["openfl","display","DisplayObject"];
openfl.display.DisplayObject.__interfaces__ = [openfl.display.IBitmapDrawable];
openfl.display.DisplayObject.__super__ = openfl.events.EventDispatcher;
openfl.display.DisplayObject.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	dispatchEvent: function(event) {
		var result = openfl.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
		if(event.__isCancelled) return true;
		if(event.bubbles && this.parent != null && this.parent != this) {
			event.eventPhase = openfl.events.EventPhase.BUBBLING_PHASE;
			this.parent.dispatchEvent(event);
		}
		return result;
	}
	,getBounds: function(targetCoordinateSpace) {
		var matrix = this.__getTransform();
		if(targetCoordinateSpace != null) {
			matrix = new openfl.geom.Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			matrix.concat(targetCoordinateSpace.__worldTransform.clone().invert());
		}
		var bounds = new openfl.geom.Rectangle();
		this.__getBounds(bounds,matrix);
		return bounds;
	}
	,getRect: function(targetCoordinateSpace) {
		return this.getBounds(targetCoordinateSpace);
	}
	,globalToLocal: function(pos) {
		return this.__getTransform().clone().invert().transformPoint(pos);
	}
	,hitTestObject: function(obj) {
		if(obj != null && obj.parent != null && this.parent != null) {
			var currentBounds = this.getBounds(this);
			var targetBounds = obj.getBounds(this);
			return currentBounds.intersects(targetBounds);
		}
		return false;
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		if(this.parent != null) {
			var currentBounds = this.getBounds(this);
			return currentBounds.containsPoint(new openfl.geom.Point(x,y));
		}
		return false;
	}
	,localToGlobal: function(point) {
		return this.__getTransform().transformPoint(point);
	}
	,__broadcast: function(event,notifyChilden) {
		if(this.__eventMap != null && this.hasEventListener(event.type)) {
			var result = openfl.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
			if(event.__isCancelled) return true;
			return result;
		}
		return false;
	}
	,__getBounds: function(rect,matrix) {
	}
	,__getInteractive: function(stack) {
	}
	,__getLocalBounds: function(rect) {
		this.__getTransform();
		this.__getBounds(rect,new openfl.geom.Matrix());
	}
	,__getTransform: function() {
		if(this.__transformDirty || openfl.display.DisplayObject.__worldTransformDirty > 0) {
			var list = [];
			var current = this;
			var transformDirty = this.__transformDirty;
			if(this.parent == null) {
				if(transformDirty) this.__update(true,false);
			} else while(current.parent != null) {
				list.push(current);
				current = current.parent;
				if(current.__transformDirty) transformDirty = true;
			}
			if(transformDirty) {
				var i = list.length;
				while(--i >= 0) list[i].__update(true,false);
			}
		}
		return this.__worldTransform;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		return false;
	}
	,__renderCanvas: function(renderSession) {
	}
	,__renderDOM: function(renderSession) {
	}
	,__renderGL: function(renderSession) {
	}
	,__renderMask: function(renderSession) {
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED_TO_STAGE,false,false));
		}
	}
	,__setRenderDirty: function() {
		if(!this.__renderDirty) {
			this.__renderDirty = true;
			openfl.display.DisplayObject.__worldRenderDirty++;
		}
	}
	,__setTransformDirty: function() {
		if(!this.__transformDirty) {
			this.__transformDirty = true;
			openfl.display.DisplayObject.__worldTransformDirty++;
		}
	}
	,__update: function(transformOnly,updateChildren) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(this.get_rotation() != this.__rotationCache) {
			this.__rotationCache = this.get_rotation();
			var radians = this.get_rotation() * (Math.PI / 180);
			this.__rotationSine = Math.sin(radians);
			this.__rotationCosine = Math.cos(radians);
		}
		if(this.parent != null) {
			var parentTransform = this.parent.__worldTransform;
			var a00 = this.__rotationCosine * this.get_scaleX();
			var a01 = this.__rotationSine * this.get_scaleX();
			var a10 = -this.__rotationSine * this.get_scaleY();
			var a11 = this.__rotationCosine * this.get_scaleY();
			var b00 = parentTransform.a;
			var b01 = parentTransform.b;
			var b10 = parentTransform.c;
			var b11 = parentTransform.d;
			if(this.__worldTransform == null) this.__worldTransform = new openfl.geom.Matrix();
			this.__worldTransform.a = a00 * b00 + a01 * b10;
			this.__worldTransform.b = a00 * b01 + a01 * b11;
			this.__worldTransform.c = a10 * b00 + a11 * b10;
			this.__worldTransform.d = a10 * b01 + a11 * b11;
			if(this.get_scrollRect() == null) {
				this.__worldTransform.tx = this.get_x() * b00 + this.get_y() * b10 + parentTransform.tx;
				this.__worldTransform.ty = this.get_x() * b01 + this.get_y() * b11 + parentTransform.ty;
			} else {
				this.__worldTransform.tx = (this.get_x() - this.get_scrollRect().x) * b00 + (this.get_y() - this.get_scrollRect().y) * b10 + parentTransform.tx;
				this.__worldTransform.ty = (this.get_x() - this.get_scrollRect().x) * b01 + (this.get_y() - this.get_scrollRect().y) * b11 + parentTransform.ty;
			}
		} else {
			this.__worldTransform.a = this.__rotationCosine * this.get_scaleX();
			this.__worldTransform.c = -this.__rotationSine * this.get_scaleY();
			this.__worldTransform.b = this.__rotationSine * this.get_scaleX();
			this.__worldTransform.d = this.__rotationCosine * this.get_scaleY();
			if(this.get_scrollRect() == null) {
				this.__worldTransform.tx = this.get_x();
				this.__worldTransform.ty = this.get_y();
			} else {
				this.__worldTransform.tx = this.get_y() - this.get_scrollRect().x;
				this.__worldTransform.ty = this.get_y() - this.get_scrollRect().y;
			}
		}
		if(updateChildren && this.__transformDirty) {
			this.__transformDirty = false;
			openfl.display.DisplayObject.__worldTransformDirty--;
		}
		if(!transformOnly) {
			if(this.parent != null) this.__worldAlpha = this.get_alpha() * this.parent.__worldAlpha; else this.__worldAlpha = this.get_alpha();
			if(updateChildren && this.__renderDirty) this.__renderDirty = false;
		}
	}
	,__updateChildren: function(transformOnly) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(!this.__renderable && !this.__isMask) return;
		this.__worldAlpha = this.get_alpha();
		if(this.__transformDirty) {
			this.__transformDirty = false;
			openfl.display.DisplayObject.__worldTransformDirty--;
		}
	}
	,get_alpha: function() {
		return this.__alpha;
	}
	,set_alpha: function(value) {
		if(value != this.__alpha) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__alpha = value;
	}
	,get_filters: function() {
		if(this.__filters == null) return new Array(); else return this.__filters.slice();
	}
	,set_filters: function(value) {
		return value;
	}
	,get_height: function() {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		return bounds.height * this.get_scaleY();
	}
	,set_height: function(value) {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		if(value != bounds.height) this.set_scaleY(value / bounds.height); else this.set_scaleY(1);
		return value;
	}
	,get_mask: function() {
		return this.__mask;
	}
	,set_mask: function(value) {
		if(value != this.__mask) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
		}
		if(this.__mask != null) this.__mask.__isMask = false;
		if(value != null) value.__isMask = true;
		return this.__mask = value;
	}
	,get_mouseX: function() {
		if(this.stage != null) return this.globalToLocal(new openfl.geom.Point(this.stage.__mouseX,0)).x;
		return 0;
	}
	,get_mouseY: function() {
		if(this.stage != null) return this.globalToLocal(new openfl.geom.Point(0,this.stage.__mouseY)).y;
		return 0;
	}
	,get_name: function() {
		return this.__name;
	}
	,set_name: function(value) {
		return this.__name = value;
	}
	,get_root: function() {
		if(this.stage != null) return openfl.Lib.current;
		return null;
	}
	,get_rotation: function() {
		return this.__rotation;
	}
	,set_rotation: function(value) {
		if(value != this.__rotation) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__rotation = value;
	}
	,get_scaleX: function() {
		return this.__scaleX;
	}
	,set_scaleX: function(value) {
		if(value != this.__scaleX) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scaleX = value;
	}
	,get_scaleY: function() {
		return this.__scaleY;
	}
	,set_scaleY: function(value) {
		if(this.__scaleY != value) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scaleY = value;
	}
	,get_scrollRect: function() {
		return this.__scrollRect;
	}
	,set_scrollRect: function(value) {
		if(value != this.__scrollRect) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scrollRect = value;
	}
	,get_transform: function() {
		if(this.__transform == null) this.__transform = new openfl.geom.Transform(this);
		return this.__transform;
	}
	,set_transform: function(value) {
		if(value == null) throw new openfl.errors.TypeError("Parameter transform must be non-null.");
		if(this.__transform == null) this.__transform = new openfl.geom.Transform(this);
		if(!this.__transformDirty) {
			this.__transformDirty = true;
			openfl.display.DisplayObject.__worldTransformDirty++;
		}
		this.__transform.set_matrix(value.get_matrix().clone());
		this.__transform.set_colorTransform(new openfl.geom.ColorTransform(value.get_colorTransform().redMultiplier,value.get_colorTransform().greenMultiplier,value.get_colorTransform().blueMultiplier,value.get_colorTransform().alphaMultiplier,value.get_colorTransform().redOffset,value.get_colorTransform().greenOffset,value.get_colorTransform().blueOffset,value.get_colorTransform().alphaOffset));
		return this.__transform;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,set_visible: function(value) {
		if(value != this.__visible) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__visible = value;
	}
	,get_width: function() {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		return bounds.width * this.get_scaleX();
	}
	,set_width: function(value) {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		if(value != bounds.width) this.set_scaleX(value / bounds.width); else this.set_scaleX(1);
		return value;
	}
	,get_x: function() {
		return this.__x;
	}
	,set_x: function(value) {
		if(value != this.__x) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__x = value;
	}
	,get_y: function() {
		return this.__y;
	}
	,set_y: function(value) {
		if(value != this.__y) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__y = value;
	}
	,__class__: openfl.display.DisplayObject
	,__properties__: {set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_width:"set_width",get_width:"get_width",set_visible:"set_visible",get_visible:"get_visible",set_transform:"set_transform",get_transform:"get_transform",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_rotation:"set_rotation",get_rotation:"get_rotation",get_root:"get_root",set_name:"set_name",get_name:"get_name",get_mouseY:"get_mouseY",get_mouseX:"get_mouseX",set_mask:"set_mask",get_mask:"get_mask",set_height:"set_height",get_height:"get_height",set_filters:"set_filters",get_filters:"get_filters",set_alpha:"set_alpha",get_alpha:"get_alpha"}
});
openfl.display.InteractiveObject = function() {
	openfl.display.DisplayObject.call(this);
	this.doubleClickEnabled = false;
	this.mouseEnabled = true;
	this.needsSoftKeyboard = false;
	this.tabEnabled = true;
	this.tabIndex = -1;
};
$hxClasses["openfl.display.InteractiveObject"] = openfl.display.InteractiveObject;
openfl.display.InteractiveObject.__name__ = ["openfl","display","InteractiveObject"];
openfl.display.InteractiveObject.__super__ = openfl.display.DisplayObject;
openfl.display.InteractiveObject.prototype = $extend(openfl.display.DisplayObject.prototype,{
	requestSoftKeyboard: function() {
		openfl.Lib.notImplemented("InteractiveObject.requestSoftKeyboard");
		return false;
	}
	,__getInteractive: function(stack) {
		stack.push(this);
		if(this.parent != null) this.parent.__getInteractive(stack);
	}
	,__class__: openfl.display.InteractiveObject
});
openfl.display.DisplayObjectContainer = function() {
	openfl.display.InteractiveObject.call(this);
	this.mouseChildren = true;
	this.__children = new Array();
	this.__removedChildren = new Array();
};
$hxClasses["openfl.display.DisplayObjectContainer"] = openfl.display.DisplayObjectContainer;
openfl.display.DisplayObjectContainer.__name__ = ["openfl","display","DisplayObjectContainer"];
openfl.display.DisplayObjectContainer.__super__ = openfl.display.InteractiveObject;
openfl.display.DisplayObjectContainer.prototype = $extend(openfl.display.InteractiveObject.prototype,{
	addChild: function(child) {
		if(child != null) {
			if(child.parent != null) child.parent.removeChild(child);
			this.__children.push(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
			var event = new openfl.events.Event(openfl.events.Event.ADDED,true);
			event.target = child;
			child.dispatchEvent(event);
		}
		return child;
	}
	,addChildAt: function(child,index) {
		if(index > this.__children.length || index < 0) throw "Invalid index position " + index;
		if(child.parent == this) HxOverrides.remove(this.__children,child); else {
			if(child.parent != null) child.parent.removeChild(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
			var event = new openfl.events.Event(openfl.events.Event.ADDED,true);
			event.target = child;
			child.dispatchEvent(event);
		}
		this.__children.splice(index,0,child);
		return child;
	}
	,areInaccessibleObjectsUnderPoint: function(point) {
		return false;
	}
	,contains: function(child) {
		return HxOverrides.indexOf(this.__children,child,0) > -1;
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) return this.__children[index];
		return null;
	}
	,getChildByName: function(name) {
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_name() == name) return child;
		}
		return null;
	}
	,getChildIndex: function(child) {
		var _g1 = 0;
		var _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.__children[i] == child) return i;
		}
		return -1;
	}
	,getObjectsUnderPoint: function(point) {
		point = this.localToGlobal(point);
		var stack = new Array();
		this.__hitTest(point.x,point.y,false,stack,false);
		stack.reverse();
		return stack;
	}
	,removeChild: function(child) {
		if(child != null && child.parent == this) {
			if(this.stage != null) child.__setStageReference(null);
			child.parent = null;
			HxOverrides.remove(this.__children,child);
			this.__removedChildren.push(child);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
			child.dispatchEvent(new openfl.events.Event(openfl.events.Event.REMOVED,true));
		}
		return child;
	}
	,removeChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) return this.removeChild(this.__children[index]);
		return null;
	}
	,removeChildren: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 2147483647;
		if(beginIndex == null) beginIndex = 0;
		if(endIndex == 2147483647) {
			endIndex = this.__children.length - 1;
			if(endIndex < 0) return;
		}
		if(beginIndex > this.__children.length - 1) return; else if(endIndex < beginIndex || beginIndex < 0 || endIndex > this.__children.length) throw new openfl.errors.RangeError("The supplied index is out of bounds.");
		var numRemovals = endIndex - beginIndex;
		while(numRemovals >= 0) {
			this.removeChildAt(beginIndex);
			numRemovals--;
		}
	}
	,setChildIndex: function(child,index) {
		if(index >= 0 && index <= this.__children.length && child.parent == this) {
			HxOverrides.remove(this.__children,child);
			this.__children.splice(index,0,child);
		}
	}
	,swapChildren: function(child1,child2) {
		if(child1.parent == this && child2.parent == this) {
			var index1 = HxOverrides.indexOf(this.__children,child1,0);
			var index2 = HxOverrides.indexOf(this.__children,child2,0);
			this.__children[index1] = child2;
			this.__children[index2] = child1;
		}
	}
	,swapChildrenAt: function(child1,child2) {
		var swap = this.__children[child1];
		this.__children[child1] = this.__children[child2];
		this.__children[child2] = swap;
		swap = null;
	}
	,__broadcast: function(event,notifyChilden) {
		if(event.target == null) event.target = this;
		if(notifyChilden) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__broadcast(event,true);
				if(event.__isCancelled) return true;
			}
		}
		return openfl.display.InteractiveObject.prototype.__broadcast.call(this,event,notifyChilden);
	}
	,__getBounds: function(rect,matrix) {
		if(this.__children.length == 0) return;
		var matrixCache = null;
		if(matrix != null) {
			matrixCache = this.__worldTransform;
			this.__worldTransform = matrix;
			this.__updateChildren(true);
		}
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(!child.__renderable) continue;
			child.__getBounds(rect,null);
		}
		if(matrix != null) {
			this.__worldTransform = matrixCache;
			this.__updateChildren(true);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var i = this.__children.length;
		if(interactiveOnly) {
			if(stack == null || !this.mouseChildren) {
				while(--i >= 0) if(this.__children[i].__hitTest(x,y,shapeFlag,null,true)) {
					if(stack != null) stack.push(this);
					return true;
				}
			} else if(stack != null) {
				var length = stack.length;
				while(--i >= 0) if(this.__children[i].__hitTest(x,y,shapeFlag,stack,interactiveOnly)) {
					stack.splice(length,0,this);
					return true;
				}
			}
		} else while(--i >= 0) this.__children[i].__hitTest(x,y,shapeFlag,stack,false);
		return false;
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.get_scrollRect() != null) {
		}
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCanvas(renderSession);
		}
		this.__removedChildren = [];
		if(this.__mask != null) renderSession.maskManager.popMask();
		if(this.get_scrollRect() != null) {
		}
	}
	,__renderDOM: function(renderSession) {
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderDOM(renderSession);
		}
		var _g2 = 0;
		var _g11 = this.__removedChildren;
		while(_g2 < _g11.length) {
			var orphan = _g11[_g2];
			++_g2;
			if(orphan.stage == null) orphan.__renderDOM(renderSession);
		}
		this.__removedChildren = [];
		if(this.__mask != null) renderSession.maskManager.popMask();
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderGL(renderSession);
		}
		this.__removedChildren = [];
	}
	,__renderMask: function(renderSession) {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		renderSession.context.rect(0,0,bounds.width,bounds.height);
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED_TO_STAGE,false,false));
			if(this.__children != null) {
				var _g = 0;
				var _g1 = this.__children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					child.__setStageReference(stage);
				}
			}
		}
	}
	,__update: function(transformOnly,updateChildren) {
		openfl.display.InteractiveObject.prototype.__update.call(this,transformOnly,updateChildren);
		if(!this.__renderable) return;
		if(updateChildren) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__update(transformOnly,true);
			}
		}
	}
	,__updateChildren: function(transformOnly) {
		openfl.display.InteractiveObject.prototype.__updateChildren.call(this,transformOnly);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__update(transformOnly,true);
		}
	}
	,get_numChildren: function() {
		return this.__children.length;
	}
	,__class__: openfl.display.DisplayObjectContainer
	,__properties__: $extend(openfl.display.InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
openfl.display.Sprite = function() {
	openfl.display.DisplayObjectContainer.call(this);
	this.buttonMode = false;
	this.useHandCursor = true;
	this.loaderInfo = openfl.display.LoaderInfo.create(null);
};
$hxClasses["openfl.display.Sprite"] = openfl.display.Sprite;
openfl.display.Sprite.__name__ = ["openfl","display","Sprite"];
openfl.display.Sprite.__super__ = openfl.display.DisplayObjectContainer;
openfl.display.Sprite.prototype = $extend(openfl.display.DisplayObjectContainer.prototype,{
	startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		if(this.stage != null) this.stage.__startDrag(this,lockCenter,bounds);
	}
	,stopDrag: function() {
		if(this.stage != null) this.stage.__stopDrag(this);
	}
	,__getBounds: function(rect,matrix) {
		openfl.display.DisplayObjectContainer.prototype.__getBounds.call(this,rect,matrix);
		if(this.__graphics != null) this.__graphics.__getBounds(rect,matrix != null?matrix:this.__worldTransform);
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var length = 0;
		if(stack != null) length = stack.length;
		if(openfl.display.DisplayObjectContainer.prototype.__hitTest.call(this,x,y,shapeFlag,stack,interactiveOnly)) return interactiveOnly; else if(this.__graphics != null && this.__graphics.__hitTest(x,y,shapeFlag,this.__getTransform())) {
			if(stack != null) stack.push(this);
			return true;
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		openfl._internal.renderer.canvas.CanvasShape.render(this,renderSession);
		openfl.display.DisplayObjectContainer.prototype.__renderCanvas.call(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		openfl._internal.renderer.dom.DOMShape.render(this,renderSession);
		openfl.display.DisplayObjectContainer.prototype.__renderDOM.call(this,renderSession);
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__graphics != null) openfl._internal.renderer.opengl.utils.GraphicsRenderer.render(this,renderSession);
		openfl.display.DisplayObjectContainer.prototype.__renderGL.call(this,renderSession);
	}
	,__renderMask: function(renderSession) {
		if(this.__graphics != null) openfl._internal.renderer.canvas.CanvasGraphics.renderMask(this.__graphics,renderSession); else openfl.display.DisplayObjectContainer.prototype.__renderMask.call(this,renderSession);
	}
	,get_graphics: function() {
		if(this.__graphics == null) this.__graphics = new openfl.display.Graphics();
		return this.__graphics;
	}
	,__class__: openfl.display.Sprite
	,__properties__: $extend(openfl.display.DisplayObjectContainer.prototype.__properties__,{get_graphics:"get_graphics"})
});
var Main = function() {
	openfl.display.Sprite.call(this);
	this.initialize();
	this.construct();
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.__super__ = openfl.display.Sprite;
Main.prototype = $extend(openfl.display.Sprite.prototype,{
	animateCircle: function(circle) {
		var duration = 1.5 + Math.random() * 4.5;
		var targetX = Math.random() * this.stage.stageWidth;
		var targetY = Math.random() * this.stage.stageHeight;
		lets.Go.to(circle,duration).x(targetX).y(targetY).ease(lets.easing.Quad.get_easeOut()).onComplete($bind(this,this.animateCircle),[circle]);
	}
	,construct: function() {
		var _g = 0;
		while(_g < 80) {
			var i = _g++;
			var creationDelay = Math.random() * 10;
			haxe.Timer.delay($bind(this,this.createCircle),creationDelay * 1000 | 0);
		}
	}
	,createCircle: function() {
		var size = 5 + Math.random() * 35 + 20;
		var circle = new openfl.display.Sprite();
		circle.get_graphics().beginFill(Std["int"](Math.random() * 16777215));
		circle.get_graphics().drawCircle(0,0,size);
		circle.set_alpha(0.2 + Math.random() * 0.6);
		circle.set_x(Math.random() * this.stage.stageWidth);
		circle.set_y(Math.random() * this.stage.stageHeight);
		this.addChildAt(circle,0);
		this.animateCircle(circle);
	}
	,initialize: function() {
		this.stage.addEventListener(openfl.events.Event.ACTIVATE,$bind(this,this.stage_onActivate));
		this.stage.addEventListener(openfl.events.Event.DEACTIVATE,$bind(this,this.stage_onDeactivate));
	}
	,stage_onActivate: function(event) {
		haxe.Log.trace("stage_onActivate () event : " + Std.string(event),{ fileName : "Main.hx", lineNumber : 67, className : "Main", methodName : "stage_onActivate"});
	}
	,stage_onDeactivate: function(event) {
		haxe.Log.trace("stage_onDeactivate () event : " + Std.string(event),{ fileName : "Main.hx", lineNumber : 74, className : "Main", methodName : "stage_onDeactivate"});
	}
	,__class__: Main
});
var DocumentClass = function() {
	openfl.Lib.current.addChild(this);
	Main.call(this);
	this.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED_TO_STAGE,false,false));
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	__class__: DocumentClass
});
var lime = {};
lime.AssetLibrary = function() {
};
$hxClasses["lime.AssetLibrary"] = lime.AssetLibrary;
lime.AssetLibrary.__name__ = ["lime","AssetLibrary"];
lime.AssetLibrary.prototype = {
	exists: function(id,type) {
		return false;
	}
	,getAudioBuffer: function(id) {
		return null;
	}
	,getBytes: function(id) {
		return null;
	}
	,getFont: function(id) {
		return null;
	}
	,getImage: function(id) {
		return null;
	}
	,getPath: function(id) {
		return null;
	}
	,getText: function(id) {
		var bytes = this.getBytes(id);
		if(bytes == null) return null; else return bytes.readUTFBytes(bytes.length);
	}
	,isLocal: function(id,type) {
		return true;
	}
	,list: function(type) {
		return null;
	}
	,load: function(handler) {
		handler(this);
	}
	,loadAudioBuffer: function(id,handler) {
		handler(this.getAudioBuffer(id));
	}
	,loadBytes: function(id,handler) {
		handler(this.getBytes(id));
	}
	,loadFont: function(id,handler) {
		handler(this.getFont(id));
	}
	,loadImage: function(id,handler) {
		handler(this.getImage(id));
	}
	,loadText: function(id,handler) {
		var callback = function(bytes) {
			if(bytes == null) handler(null); else handler(bytes.readUTFBytes(bytes.length));
		};
		this.loadBytes(id,callback);
	}
	,__class__: lime.AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe.ds.StringMap();
	this.path = new haxe.ds.StringMap();
	this.className = new haxe.ds.StringMap();
	lime.AssetLibrary.call(this);
	var id;
	var assetsPrefix = ApplicationMain.config.assetsPrefix;
	if(assetsPrefix != null) {
		var $it0 = this.path.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var value = assetsPrefix + this.path.get(k);
			this.path.set(k,value);
		}
	}
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = ["DefaultAssetLibrary"];
DefaultAssetLibrary.__super__ = lime.AssetLibrary;
DefaultAssetLibrary.prototype = $extend(lime.AssetLibrary.prototype,{
	exists: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js.Boot.__cast(type , String); else requestedType = null;
		var assetType = this.type.get(id);
		if(assetType != null) {
			if(assetType == requestedType || (requestedType == "SOUND" || requestedType == "MUSIC") && (assetType == "MUSIC" || assetType == "SOUND")) return true;
			if(requestedType == "BINARY" || requestedType == null || assetType == "BINARY" && requestedType == "TEXT") return true;
		}
		return false;
	}
	,getAudioBuffer: function(id) {
		return null;
	}
	,getBytes: function(id) {
		var bytes = null;
		var data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime.app.Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") {
			bytes = new lime.utils.ByteArray();
			bytes.writeUTFBytes(data);
		} else if(js.Boot.__instanceof(data,lime.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes;
		} else return null;
	}
	,getFont: function(id) {
		return js.Boot.__cast(Type.createInstance(this.className.get(id),[]) , openfl.text.Font);
		return null;
	}
	,getImage: function(id) {
		return lime.graphics.Image.fromImageElement((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime.app.Preloader.images.get(key);
			return $r;
		}(this)));
	}
	,getPath: function(id) {
		return this.path.get(id);
	}
	,getText: function(id) {
		var bytes = null;
		var data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime.app.Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") return data; else if(js.Boot.__instanceof(data,lime.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes.readUTFBytes(bytes.length);
		} else return null;
	}
	,isLocal: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js.Boot.__cast(type , String); else requestedType = null;
		return true;
	}
	,list: function(type) {
		var requestedType;
		if(type != null) requestedType = js.Boot.__cast(type , String); else requestedType = null;
		var items = [];
		var $it0 = this.type.keys();
		while( $it0.hasNext() ) {
			var id = $it0.next();
			if(requestedType == null || this.exists(id,type)) items.push(id);
		}
		return items;
	}
	,loadAudioBuffer: function(id,handler) {
		handler(this.getAudioBuffer(id));
	}
	,loadBytes: function(id,handler) {
		handler(this.getBytes(id));
	}
	,loadImage: function(id,handler) {
		handler(this.getImage(id));
	}
	,loadText: function(id,handler) {
		var callback = function(bytes) {
			if(bytes == null) handler(null); else handler(bytes.readUTFBytes(bytes.length));
		};
		this.loadBytes(id,callback);
	}
	,__class__: DefaultAssetLibrary
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var NMEPreloader = function() {
	openfl.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 7;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 2;
	this.outline = new openfl.display.Sprite();
	this.outline.get_graphics().beginFill(color,0.07);
	this.outline.get_graphics().drawRect(0,0,width,height);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new openfl.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = openfl.display.Sprite;
NMEPreloader.prototype = $extend(openfl.display.Sprite.prototype,{
	getBackgroundColor: function() {
		return 16777215;
	}
	,getHeight: function() {
		var height = 0;
		if(height > 0) return height; else return openfl.Lib.current.stage.stageHeight;
	}
	,getWidth: function() {
		var width = 0;
		if(width > 0) return width; else return openfl.Lib.current.stage.stageWidth;
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded = 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return js.Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		return false;
	}
	return true;
};
var haxe = {};
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
};
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.crypto = {};
haxe.crypto.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe.crypto.BaseCode;
haxe.crypto.BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe.crypto.BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe.io.Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.get(pin++);
			}
			curbits -= nbits;
			out.set(pout++,base.b[buf >> curbits & mask]);
		}
		if(curbits > 0) out.set(pout++,base.b[buf << nbits - curbits & mask]);
		return out;
	}
	,__class__: haxe.crypto.BaseCode
};
haxe.ds = {};
haxe.ds.BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe.ds.BalancedTree;
haxe.ds.BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe.ds.BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe.ds.TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe.ds.TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(l.left,l.key,l.value,new haxe.ds.TreeNode(l.right,k,v,r)); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe.ds.TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe.ds.TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe.ds.TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe.ds.BalancedTree
};
haxe.ds.TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe.ds.TreeNode;
haxe.ds.TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe.ds.TreeNode.prototype = {
	__class__: haxe.ds.TreeNode
};
haxe.ds.EnumValueMap = function() {
	haxe.ds.BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe.ds.EnumValueMap;
haxe.ds.EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe.ds.EnumValueMap.__interfaces__ = [IMap];
haxe.ds.EnumValueMap.__super__ = haxe.ds.BalancedTree;
haxe.ds.EnumValueMap.prototype = $extend(haxe.ds.BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe.ds.EnumValueMap
});
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	__class__: haxe.ds.IntMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe.ds.StringMap
};
haxe.ds._Vector = {};
haxe.ds._Vector.Vector_Impl_ = function() { };
$hxClasses["haxe.ds._Vector.Vector_Impl_"] = haxe.ds._Vector.Vector_Impl_;
haxe.ds._Vector.Vector_Impl_.__name__ = ["haxe","ds","_Vector","Vector_Impl_"];
haxe.ds._Vector.Vector_Impl_.blit = function(src,srcPos,dest,destPos,len) {
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		dest[destPos + i] = src[srcPos + i];
	}
};
haxe.ds._Vector.Vector_Impl_.toArray = function(this1) {
	var a = new Array();
	var len = this1.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		a[i] = this1[i];
	}
	return a;
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
};
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe.io.Bytes
};
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; };
haxe.io.Path = function(path) {
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe.io.Path;
haxe.io.Path.__name__ = ["haxe","io","Path"];
haxe.io.Path.withoutExtension = function(path) {
	var s = new haxe.io.Path(path);
	s.ext = null;
	return s.toString();
};
haxe.io.Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe.io.Path
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
};
js.Boot.isClass = function(o) {
	return o.__name__;
};
js.Boot.isEnum = function(e) {
	return e.__ename__;
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js.Boot.__nativeClassName(o);
		if(name != null) return js.Boot.__resolveNativeClass(name);
		return null;
	}
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js.Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Boot.__nativeClassName = function(o) {
	var name = js.Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js.Boot.__isNativeObj = function(o) {
	return js.Boot.__nativeClassName(o) != null;
};
js.Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var lets = {};
lets.Go = function(target,duration) {
	if(duration == null) duration = .5;
	this._delay = 0;
	this._initTime = -1;
	this._isYoyo = false;
	this._isFrom = false;
	this._props = new haxe.ds.StringMap();
	this._options = { };
	this._easing = lets.easing.Quad.get_easeOut();
	this._target = target;
	this._duration = duration * 1000 | 0;
	this._initTime = openfl.Lib.getTimer();
	lets.Go.id++;
	this._id = "Go-" + lets.Go.version + "-" + Std.string(lets.Go.id);
	lets.Go._tweens.push(this);
	haxe.Timer.delay($bind(this,this.init),1);
};
$hxClasses["lets.Go"] = lets.Go;
lets.Go.__name__ = ["lets","Go"];
lets.Go._trigger = null;
lets.Go.to = function(target,duration) {
	if(duration == null) duration = .5;
	var go = new lets.Go(target,duration);
	go._isFrom = false;
	return go;
};
lets.Go.from = function(target,duration) {
	if(duration == null) duration = .5;
	var go = new lets.Go(target,duration);
	target.set_visible(false);
	go._isFrom = true;
	return go;
};
lets.Go.timer = function(duration) {
	var go = new lets.Go(null,duration);
	return go;
};
lets.Go.killAll = function() {
	if(lets.Go.DEBUG) {
		haxe.Log.trace("function killAll()",{ fileName : "Go.hx", lineNumber : 152, className : "lets.Go", methodName : "killAll"});
		haxe.Log.trace("_trigger: " + Std.string(lets.Go._trigger),{ fileName : "Go.hx", lineNumber : 153, className : "lets.Go", methodName : "killAll"});
		haxe.Log.trace("_tweens.length: " + lets.Go._tweens.length,{ fileName : "Go.hx", lineNumber : 154, className : "lets.Go", methodName : "killAll"});
	}
	lets.Go._trigger.stop();
	lets.Go._trigger.run = null;
	lets.Go._trigger = null;
	while(lets.Go._tweens.length > 0) {
		lets.Go._tweens[0].destroy();
		lets.Go._tweens.pop();
	}
	if(lets.Go.DEBUG) {
		haxe.Log.trace("_trigger: " + Std.string(lets.Go._trigger),{ fileName : "Go.hx", lineNumber : 170, className : "lets.Go", methodName : "killAll"});
		haxe.Log.trace("_tweens.length: " + lets.Go._tweens.length,{ fileName : "Go.hx", lineNumber : 171, className : "lets.Go", methodName : "killAll"});
		haxe.Log.trace("_trigger: " + Std.string(lets.Go._trigger),{ fileName : "Go.hx", lineNumber : 173, className : "lets.Go", methodName : "killAll"});
		haxe.Log.trace("_tweens" + Std.string(lets.Go._tweens),{ fileName : "Go.hx", lineNumber : 174, className : "lets.Go", methodName : "killAll"});
	}
};
lets.Go.prototype = {
	duration: function(value) {
		this._duration = value * 1000 | 0;
		return this;
	}
	,x: function(value) {
		this.prop("x",value);
		return this;
	}
	,y: function(value) {
		this.prop("y",value);
		return this;
	}
	,rotation: function(value) {
		this.prop("rotation",value);
		return this;
	}
	,alpha: function(value) {
		this.prop("alpha",value);
		return this;
	}
	,scale: function(value) {
		this.prop("scaleX",value);
		this.prop("scaleY",value);
		return this;
	}
	,yoyo: function() {
		this._isYoyo = true;
		return this;
	}
	,delay: function(timeInSeconds) {
		this._delay = timeInSeconds * 1000 | 0;
		return this;
	}
	,prop: function(key,value) {
		var objValue = Reflect.getProperty(this._target,key);
		var _range = { key : key, from : this._isFrom?value:objValue, to : !this._isFrom?value:objValue};
		this._props.set(key,_range);
		return this;
	}
	,onComplete: function(func,arr) {
		this._options.onComplete = func;
		if(arr != null) this._options.onCompleteParams = arr; else this._options.onCompleteParams = [];
		return this;
	}
	,onUpdate: function(func,arr) {
		this._options.onUpdate = func;
		if(arr != null) this._options.onUpdateParams = arr; else this._options.onUpdateParams = [];
		return this;
	}
	,ease: function(easing) {
		this._easing = easing;
		return this;
	}
	,stop: function() {
		this.destroy();
	}
	,init: function() {
		var framerate;
		if(openfl.Lib.current.stage.frameRate > 30) framerate = openfl.Lib.current.stage.frameRate | 0; else framerate = 30;
		if(lets.Go._trigger == null) lets.Go._trigger = new haxe.Timer(1000 / framerate | 0); else lets.Go._trigger = lets.Go._trigger;
		lets.Go._trigger.run = $bind(this,this.onEnterFrameHandler);
	}
	,onEnterFrameHandler: function() {
		var _total = lets.Go._tweens.length;
		if(this._initTime == -1) return;
		if(_total <= 0) this.killTimer(); else {
			var _g = 0;
			while(_g < _total) {
				var i = _g++;
				if(lets.Go._tweens[i] != null) lets.Go._tweens[i].update();
			}
		}
	}
	,update: function() {
		if(this._isFrom) {
			this.updateProperties(1);
			this._target.visible = true;
			this._isFrom = false;
		}
		if(this._delay > 0) {
			var waitTime = openfl.Lib.getTimer() - this._initTime;
			if(waitTime >= this._delay) {
				this._delay = 0;
				this._initTime = openfl.Lib.getTimer();
			} else return null;
		}
		var progressed = openfl.Lib.getTimer() - this._initTime;
		if(progressed >= this._duration) {
			this.updateProperties(this._duration);
			this.complete();
		} else this.updateProperties(progressed);
	}
	,updateProperties: function(time) {
		if(Reflect.isFunction(this._options.onUpdate)) {
			var func = this._options.onUpdate;
			var arr = this._options.onUpdateParams;
			func.apply(func,arr);
		}
		var $it0 = this._props.keys();
		while( $it0.hasNext() ) {
			var n = $it0.next();
			var range = this._props.get(n);
			Reflect.setProperty(this._target,n,this._easing.ease(time,range.from,range.to - range.from,this._duration));
		}
	}
	,complete: function() {
		if(this._isYoyo) {
			var $it0 = this._props.keys();
			while( $it0.hasNext() ) {
				var n = $it0.next();
				var range = this._props.get(n);
				var _rangeReverse = { key : n, from : range.to, to : range.from};
				this._props.set(n,_rangeReverse);
			}
			this._initTime = openfl.Lib.getTimer();
			this._isYoyo = false;
			return null;
		}
		var func = this._options.onComplete;
		var arr = this._options.onCompleteParams;
		this.destroy();
		if(Reflect.isFunction(func)) func.apply(func,arr);
	}
	,killTimer: function() {
		if(lets.Go.DEBUG) haxe.Log.trace("kill timer //  all done // reset",{ fileName : "Go.hx", lineNumber : 472, className : "lets.Go", methodName : "killTimer"});
		lets.Go._trigger.stop();
		lets.Go._trigger.run = null;
	}
	,destroy: function() {
		if(Lambda.has(lets.Go._tweens,this)) HxOverrides.remove(lets.Go._tweens,this);
		if(this._options) {
			this._easing = lets.easing.Quad.get_easeOut();
			this._options = { };
			this._target = null;
			this._props = null;
			this._duration = 0;
			this._delay = 0;
		}
	}
	,__class__: lets.Go
};
lets.easing = {};
lets.easing.IEasing = function() { };
$hxClasses["lets.easing.IEasing"] = lets.easing.IEasing;
lets.easing.IEasing.__name__ = ["lets","easing","IEasing"];
lets.easing.IEasing.prototype = {
	__class__: lets.easing.IEasing
};
lets.easing.Quad = function() { };
$hxClasses["lets.easing.Quad"] = lets.easing.Quad;
lets.easing.Quad.__name__ = ["lets","easing","Quad"];
lets.easing.Quad.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
lets.easing.Quad.get_easeIn = function() {
	return new lets.easing.QuadEaseIn();
};
lets.easing.Quad.get_easeInOut = function() {
	return new lets.easing.QuadEaseInOut();
};
lets.easing.Quad.get_easeOut = function() {
	return new lets.easing.QuadEaseOut();
};
lets.easing.QuadEaseIn = function() {
};
$hxClasses["lets.easing.QuadEaseIn"] = lets.easing.QuadEaseIn;
lets.easing.QuadEaseIn.__name__ = ["lets","easing","QuadEaseIn"];
lets.easing.QuadEaseIn.__interfaces__ = [lets.easing.IEasing];
lets.easing.QuadEaseIn.prototype = {
	calculate: function(k) {
		return k * k;
	}
	,ease: function(t,b,c,d) {
		return c * (t /= d) * t + b;
	}
	,__class__: lets.easing.QuadEaseIn
};
lets.easing.QuadEaseInOut = function() {
};
$hxClasses["lets.easing.QuadEaseInOut"] = lets.easing.QuadEaseInOut;
lets.easing.QuadEaseInOut.__name__ = ["lets","easing","QuadEaseInOut"];
lets.easing.QuadEaseInOut.__interfaces__ = [lets.easing.IEasing];
lets.easing.QuadEaseInOut.prototype = {
	calculate: function(k) {
		if((k *= 2) < 1) return 0.5 * k * k;
		return -0.5 * ((k - 1) * (k - 3) - 1);
	}
	,ease: function(t,b,c,d) {
		if((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((t - 1) * (t - 3) - 1) + b;
	}
	,__class__: lets.easing.QuadEaseInOut
};
lets.easing.QuadEaseOut = function() {
};
$hxClasses["lets.easing.QuadEaseOut"] = lets.easing.QuadEaseOut;
lets.easing.QuadEaseOut.__name__ = ["lets","easing","QuadEaseOut"];
lets.easing.QuadEaseOut.__interfaces__ = [lets.easing.IEasing];
lets.easing.QuadEaseOut.prototype = {
	calculate: function(k) {
		return -k * (k - 2);
	}
	,ease: function(t,b,c,d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	,__class__: lets.easing.QuadEaseOut
};
lime.AssetCache = function() {
	this.enabled = true;
	this.audio = new haxe.ds.StringMap();
	this.font = new haxe.ds.StringMap();
	this.image = new haxe.ds.StringMap();
};
$hxClasses["lime.AssetCache"] = lime.AssetCache;
lime.AssetCache.__name__ = ["lime","AssetCache"];
lime.AssetCache.prototype = {
	clear: function(prefix) {
		if(prefix == null) {
			this.audio = new haxe.ds.StringMap();
			this.font = new haxe.ds.StringMap();
			this.image = new haxe.ds.StringMap();
		} else {
			var keys = this.audio.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				if(StringTools.startsWith(key,prefix)) this.audio.remove(key);
			}
			var keys1 = this.font.keys();
			while( keys1.hasNext() ) {
				var key1 = keys1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var keys2 = this.image.keys();
			while( keys2.hasNext() ) {
				var key2 = keys2.next();
				if(StringTools.startsWith(key2,prefix)) this.image.remove(key2);
			}
		}
	}
	,__class__: lime.AssetCache
};
lime.Assets = function() { };
$hxClasses["lime.Assets"] = lime.Assets;
lime.Assets.__name__ = ["lime","Assets"];
lime.Assets.exists = function(id,type) {
	lime.Assets.initialize();
	if(type == null) type = "BINARY";
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) return library.exists(symbolName,type);
	return false;
};
lime.Assets.getAudioBuffer = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.audio.exists(id)) {
		var audio = lime.Assets.cache.audio.get(id);
		if(lime.Assets.isValidAudio(audio)) return audio;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"SOUND")) {
			if(library.isLocal(symbolName,"SOUND")) {
				var audio1 = library.getAudioBuffer(symbolName);
				if(useCache && lime.Assets.cache.enabled) lime.Assets.cache.audio.set(id,audio1);
				return audio1;
			} else haxe.Log.trace("[Assets] Audio asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 115, className : "lime.Assets", methodName : "getAudioBuffer"});
		} else haxe.Log.trace("[Assets] There is no audio asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 121, className : "lime.Assets", methodName : "getAudioBuffer"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 127, className : "lime.Assets", methodName : "getAudioBuffer"});
	return null;
};
lime.Assets.getBytes = function(id) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"BINARY")) {
			if(library.isLocal(symbolName,"BINARY")) return library.getBytes(symbolName); else haxe.Log.trace("[Assets] String or ByteArray asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 164, className : "lime.Assets", methodName : "getBytes"});
		} else haxe.Log.trace("[Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 170, className : "lime.Assets", methodName : "getBytes"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 176, className : "lime.Assets", methodName : "getBytes"});
	return null;
};
lime.Assets.getFont = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.font.exists(id)) return lime.Assets.cache.font.get(id);
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"FONT")) {
			if(library.isLocal(symbolName,"FONT")) {
				var font = library.getFont(symbolName);
				if(useCache && lime.Assets.cache.enabled) lime.Assets.cache.font.set(id,font);
				return font;
			} else haxe.Log.trace("[Assets] Font asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 227, className : "lime.Assets", methodName : "getFont"});
		} else haxe.Log.trace("[Assets] There is no Font asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 233, className : "lime.Assets", methodName : "getFont"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 239, className : "lime.Assets", methodName : "getFont"});
	return null;
};
lime.Assets.getImage = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.image.exists(id)) {
		var image = lime.Assets.cache.image.get(id);
		if(lime.Assets.isValidImage(image)) return image;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			if(library.isLocal(symbolName,"IMAGE")) {
				var image1 = library.getImage(symbolName);
				if(useCache && lime.Assets.cache.enabled) lime.Assets.cache.image.set(id,image1);
				return image1;
			} else haxe.Log.trace("[Assets] Image asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 297, className : "lime.Assets", methodName : "getImage"});
		} else haxe.Log.trace("[Assets] There is no Image asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 303, className : "lime.Assets", methodName : "getImage"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 309, className : "lime.Assets", methodName : "getImage"});
	return null;
};
lime.Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return lime.Assets.libraries.get(name);
};
lime.Assets.getPath = function(id) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,null)) return library.getPath(symbolName); else haxe.Log.trace("[Assets] There is no asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 426, className : "lime.Assets", methodName : "getPath"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 432, className : "lime.Assets", methodName : "getPath"});
	return null;
};
lime.Assets.getText = function(id) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			if(library.isLocal(symbolName,"TEXT")) return library.getText(symbolName); else haxe.Log.trace("[Assets] String asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 469, className : "lime.Assets", methodName : "getText"});
		} else haxe.Log.trace("[Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 475, className : "lime.Assets", methodName : "getText"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 481, className : "lime.Assets", methodName : "getText"});
	return null;
};
lime.Assets.initialize = function() {
	if(!lime.Assets.initialized) {
		lime.Assets.registerLibrary("default",new DefaultAssetLibrary());
		lime.Assets.initialized = true;
	}
};
lime.Assets.isLocal = function(id,type,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled) {
		if(type == "IMAGE" || type == null) {
			if(lime.Assets.cache.image.exists(id)) return true;
		}
		if(type == "FONT" || type == null) {
			if(lime.Assets.cache.font.exists(id)) return true;
		}
		if(type == "SOUND" || type == "MUSIC" || type == null) {
			if(lime.Assets.cache.audio.exists(id)) return true;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) return library.isLocal(symbolName,type);
	return false;
};
lime.Assets.isValidAudio = function(buffer) {
	return buffer != null;
	return true;
};
lime.Assets.isValidImage = function(buffer) {
	return true;
};
lime.Assets.list = function(type) {
	lime.Assets.initialize();
	var items = [];
	var $it0 = lime.Assets.libraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var libraryItems = library.list(type);
		if(libraryItems != null) items = items.concat(libraryItems);
	}
	return items;
};
lime.Assets.loadAudioBuffer = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.audio.exists(id)) {
		var audio = lime.Assets.cache.audio.get(id);
		if(lime.Assets.isValidAudio(audio)) {
			handler(audio);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"SOUND")) {
			if(useCache && lime.Assets.cache.enabled) library.loadAudioBuffer(symbolName,function(audio1) {
				var value = audio1;
				lime.Assets.cache.audio.set(id,value);
				handler(audio1);
			}); else library.loadAudioBuffer(symbolName,handler);
			return;
		} else haxe.Log.trace("[Assets] There is no audio asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 666, className : "lime.Assets", methodName : "loadAudioBuffer"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 672, className : "lime.Assets", methodName : "loadAudioBuffer"});
	handler(null);
};
lime.Assets.loadBytes = function(id,handler) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"BINARY")) {
			library.loadBytes(symbolName,handler);
			return;
		} else haxe.Log.trace("[Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 702, className : "lime.Assets", methodName : "loadBytes"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 708, className : "lime.Assets", methodName : "loadBytes"});
	handler(null);
};
lime.Assets.loadImage = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.image.exists(id)) {
		var image = lime.Assets.cache.image.get(id);
		if(lime.Assets.isValidImage(image)) {
			handler(image);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			if(useCache && lime.Assets.cache.enabled) library.loadImage(symbolName,function(image1) {
				lime.Assets.cache.image.set(id,image1);
				handler(image1);
			}); else library.loadImage(symbolName,handler);
			return;
		} else haxe.Log.trace("[Assets] There is no Image asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 765, className : "lime.Assets", methodName : "loadImage"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 771, className : "lime.Assets", methodName : "loadImage"});
	handler(null);
};
lime.Assets.loadLibrary = function(name,handler) {
	lime.Assets.initialize();
	var data = lime.Assets.getText("libraries/" + name + ".json");
	if(data != null && data != "") {
		var info = JSON.parse(data);
		var library = Type.createInstance(Type.resolveClass(info.type),info.args);
		lime.Assets.libraries.set(name,library);
		library.eventCallback = lime.Assets.library_onEvent;
		library.load(handler);
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + name + "\"",{ fileName : "Assets.hx", lineNumber : 800, className : "lime.Assets", methodName : "loadLibrary"});
};
lime.Assets.loadText = function(id,handler) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			library.loadText(symbolName,handler);
			return;
		} else haxe.Log.trace("[Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 891, className : "lime.Assets", methodName : "loadText"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 897, className : "lime.Assets", methodName : "loadText"});
	handler(null);
};
lime.Assets.registerLibrary = function(name,library) {
	if(lime.Assets.libraries.exists(name)) lime.Assets.unloadLibrary(name);
	if(library != null) library.eventCallback = lime.Assets.library_onEvent;
	lime.Assets.libraries.set(name,library);
};
lime.Assets.unloadLibrary = function(name) {
	lime.Assets.initialize();
	var library = lime.Assets.libraries.get(name);
	if(library != null) {
		lime.Assets.cache.clear(name + ":");
		library.eventCallback = null;
	}
	lime.Assets.libraries.remove(name);
};
lime.Assets.library_onEvent = function(library,type) {
	if(type == "change") lime.Assets.cache.clear();
};
lime._Assets = {};
lime._Assets.AssetType_Impl_ = function() { };
$hxClasses["lime._Assets.AssetType_Impl_"] = lime._Assets.AssetType_Impl_;
lime._Assets.AssetType_Impl_.__name__ = ["lime","_Assets","AssetType_Impl_"];
lime._backend = {};
lime._backend.html5 = {};
lime._backend.html5.HTML5Application = function(parent) {
	this.parent = parent;
	lime.audio.AudioManager.init();
};
$hxClasses["lime._backend.html5.HTML5Application"] = lime._backend.html5.HTML5Application;
lime._backend.html5.HTML5Application.__name__ = ["lime","_backend","html5","HTML5Application"];
lime._backend.html5.HTML5Application.prototype = {
	convertKeyCode: function(keyCode) {
		if(keyCode >= 65 && keyCode <= 90) return keyCode + 32;
		switch(keyCode) {
		case 16:
			return 1073742049;
		case 17:
			return 1073742048;
		case 18:
			return 1073742050;
		case 20:
			return 1073741881;
		case 144:
			return 1073741907;
		case 37:
			return 1073741904;
		case 38:
			return 1073741906;
		case 39:
			return 1073741903;
		case 40:
			return 1073741905;
		case 45:
			return 1073741897;
		case 46:
			return 127;
		case 36:
			return 1073741898;
		case 35:
			return 1073741901;
		case 33:
			return 1073741899;
		case 34:
			return 1073741902;
		case 112:
			return 1073741882;
		case 113:
			return 1073741883;
		case 114:
			return 1073741884;
		case 115:
			return 1073741885;
		case 116:
			return 1073741886;
		case 117:
			return 1073741887;
		case 118:
			return 1073741888;
		case 119:
			return 1073741889;
		case 120:
			return 1073741890;
		case 121:
			return 1073741891;
		case 122:
			return 1073741892;
		case 123:
			return 1073741893;
		}
		return keyCode;
	}
	,create: function(config) {
		this.parent.config = config;
		if(config != null) {
			var $window = new lime.ui.Window(config);
			var renderer = new lime.graphics.Renderer($window);
			this.parent.addWindow($window);
			this.parent.addRenderer(renderer);
		}
	}
	,exec: function() {
		window.addEventListener("keydown",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("keyup",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("focus",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("blur",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("resize",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("beforeunload",$bind(this,this.handleWindowEvent),false);
		
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
										   || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
			window.requestAnimFrame = window.requestAnimationFrame;
		;
		this.cacheTime = new Date().getTime();
		this.handleUpdateEvent();
		return 0;
	}
	,handleKeyEvent: function(event) {
		if(this.parent.windows[0] != null) {
			var _g = event.keyCode;
			switch(_g) {
			case 32:case 37:case 38:case 39:case 40:
				event.preventDefault();
				break;
			}
			var keyCode = this.convertKeyCode(event.keyCode != null?event.keyCode:event.which);
			var modifier;
			modifier = (event.shiftKey?3:0) | (event.ctrlKey?192:0) | (event.altKey?768:0) | (event.metaKey?3072:0);
			if(event.type == "keydown") {
				var listeners = this.parent.windows[0].onKeyDown.listeners;
				var repeat = this.parent.windows[0].onKeyDown.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i](keyCode,modifier);
					if(!repeat[i]) {
						this.parent.windows[0].onKeyDown.remove(listeners[i]);
						length--;
					} else i++;
				}
			} else {
				var listeners1 = this.parent.windows[0].onKeyUp.listeners;
				var repeat1 = this.parent.windows[0].onKeyUp.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1](keyCode,modifier);
					if(!repeat1[i1]) {
						this.parent.windows[0].onKeyUp.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
			}
		}
	}
	,handleUpdateEvent: function(__) {
		var currentTime = new Date().getTime();
		var deltaTime = currentTime - this.cacheTime;
		this.cacheTime = currentTime;
		var listeners = this.parent.onUpdate.listeners;
		var repeat = this.parent.onUpdate.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](deltaTime | 0);
			if(!repeat[i]) {
				this.parent.onUpdate.remove(listeners[i]);
				length--;
			} else i++;
		}
		if(this.parent.renderers[0] != null) {
			if(!this.initialized) {
				this.initialized = true;
				this.parent.init(this.parent.renderers[0].context);
			}
			var listeners1 = this.parent.renderers[0].onRender.listeners;
			var repeat1 = this.parent.renderers[0].onRender.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1](this.parent.renderers[0].context);
				if(!repeat1[i1]) {
					this.parent.renderers[0].onRender.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			this.parent.renderers[0].flip();
		}
		window.requestAnimationFrame($bind(this,this.handleUpdateEvent));
	}
	,handleWindowEvent: function(event) {
		if(this.parent.windows[0] != null) {
			var _g = event.type;
			switch(_g) {
			case "focus":
				var listeners = this.parent.windows[0].onWindowFocusIn.listeners;
				var repeat = this.parent.windows[0].onWindowFocusIn.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i]();
					if(!repeat[i]) {
						this.parent.windows[0].onWindowFocusIn.remove(listeners[i]);
						length--;
					} else i++;
				}
				var listeners1 = this.parent.windows[0].onWindowActivate.listeners;
				var repeat1 = this.parent.windows[0].onWindowActivate.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1]();
					if(!repeat1[i1]) {
						this.parent.windows[0].onWindowActivate.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
				break;
			case "blur":
				var listeners2 = this.parent.windows[0].onWindowFocusOut.listeners;
				var repeat2 = this.parent.windows[0].onWindowFocusOut.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2]();
					if(!repeat2[i2]) {
						this.parent.windows[0].onWindowFocusOut.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
				var listeners3 = this.parent.windows[0].onWindowDeactivate.listeners;
				var repeat3 = this.parent.windows[0].onWindowDeactivate.repeat;
				var length3 = listeners3.length;
				var i3 = 0;
				while(i3 < length3) {
					listeners3[i3]();
					if(!repeat3[i3]) {
						this.parent.windows[0].onWindowDeactivate.remove(listeners3[i3]);
						length3--;
					} else i3++;
				}
				break;
			case "resize":
				var cacheWidth = this.parent.windows[0].width;
				var cacheHeight = this.parent.windows[0].height;
				this.parent.windows[0].backend.handleResize();
				if(this.parent.windows[0].width != cacheWidth || this.parent.windows[0].height != cacheHeight) {
					var listeners4 = this.parent.windows[0].onWindowResize.listeners;
					var repeat4 = this.parent.windows[0].onWindowResize.repeat;
					var length4 = listeners4.length;
					var i4 = 0;
					while(i4 < length4) {
						listeners4[i4](this.parent.windows[0].width,this.parent.windows[0].height);
						if(!repeat4[i4]) {
							this.parent.windows[0].onWindowResize.remove(listeners4[i4]);
							length4--;
						} else i4++;
					}
				}
				break;
			case "beforeunload":
				var listeners5 = this.parent.windows[0].onWindowClose.listeners;
				var repeat5 = this.parent.windows[0].onWindowClose.repeat;
				var length5 = listeners5.length;
				var i5 = 0;
				while(i5 < length5) {
					listeners5[i5]();
					if(!repeat5[i5]) {
						this.parent.windows[0].onWindowClose.remove(listeners5[i5]);
						length5--;
					} else i5++;
				}
				break;
			}
		}
	}
	,__class__: lime._backend.html5.HTML5Application
};
lime._backend.html5.HTML5Mouse = function() { };
$hxClasses["lime._backend.html5.HTML5Mouse"] = lime._backend.html5.HTML5Mouse;
lime._backend.html5.HTML5Mouse.__name__ = ["lime","_backend","html5","HTML5Mouse"];
lime._backend.html5.HTML5Mouse.__cursor = null;
lime._backend.html5.HTML5Mouse.__hidden = null;
lime._backend.html5.HTML5Mouse.hide = function() {
	if(!lime._backend.html5.HTML5Mouse.__hidden) {
		lime._backend.html5.HTML5Mouse.__hidden = true;
		var _g = 0;
		var _g1 = lime.app.Application.current.windows;
		while(_g < _g1.length) {
			var $window = _g1[_g];
			++_g;
			$window.backend.element.style.cursor = "none";
		}
	}
};
lime._backend.html5.HTML5Mouse.show = function() {
	if(lime._backend.html5.HTML5Mouse.__hidden) {
		lime._backend.html5.HTML5Mouse.__hidden = false;
		var cacheValue = lime._backend.html5.HTML5Mouse.__cursor;
		lime._backend.html5.HTML5Mouse.__cursor = null;
		lime._backend.html5.HTML5Mouse.set_cursor(cacheValue);
	}
};
lime._backend.html5.HTML5Mouse.get_cursor = function() {
	if(lime._backend.html5.HTML5Mouse.__cursor == null) return lime.ui.MouseCursor.DEFAULT;
	return lime._backend.html5.HTML5Mouse.__cursor;
};
lime._backend.html5.HTML5Mouse.set_cursor = function(value) {
	if(lime._backend.html5.HTML5Mouse.__cursor != value) {
		if(!lime._backend.html5.HTML5Mouse.__hidden) {
			var _g = 0;
			var _g1 = lime.app.Application.current.windows;
			while(_g < _g1.length) {
				var $window = _g1[_g];
				++_g;
				switch(value[1]) {
				case 0:
					$window.backend.element.style.cursor = "default";
					break;
				case 1:
					$window.backend.element.style.cursor = "crosshair";
					break;
				case 3:
					$window.backend.element.style.cursor = "move";
					break;
				case 4:
					$window.backend.element.style.cursor = "pointer";
					break;
				case 5:
					$window.backend.element.style.cursor = "nesw-resize";
					break;
				case 6:
					$window.backend.element.style.cursor = "ns-resize";
					break;
				case 7:
					$window.backend.element.style.cursor = "nwse-resize";
					break;
				case 8:
					$window.backend.element.style.cursor = "ew-resize";
					break;
				case 9:
					$window.backend.element.style.cursor = "text";
					break;
				case 10:
					$window.backend.element.style.cursor = "wait";
					break;
				case 11:
					$window.backend.element.style.cursor = "wait";
					break;
				default:
					$window.backend.element.style.cursor = "auto";
				}
			}
		}
		lime._backend.html5.HTML5Mouse.__cursor = value;
	}
	return lime._backend.html5.HTML5Mouse.__cursor;
};
lime._backend.html5.HTML5Renderer = function(parent) {
	this.parent = parent;
};
$hxClasses["lime._backend.html5.HTML5Renderer"] = lime._backend.html5.HTML5Renderer;
lime._backend.html5.HTML5Renderer.__name__ = ["lime","_backend","html5","HTML5Renderer"];
lime._backend.html5.HTML5Renderer.prototype = {
	create: function() {
		this.createContext();
		{
			var _g = this.parent.context;
			switch(_g[1]) {
			case 0:
				this.parent.window.backend.canvas.addEventListener("webglcontextlost",$bind(this,this.handleEvent),false);
				this.parent.window.backend.canvas.addEventListener("webglcontextrestored",$bind(this,this.handleEvent),false);
				break;
			default:
			}
		}
	}
	,createContext: function() {
		if(this.parent.window.backend.div != null) this.parent.context = lime.graphics.RenderContext.DOM(this.parent.window.backend.div); else if(this.parent.window.backend.canvas != null) {
			var webgl = null;
			if(webgl == null) this.parent.context = lime.graphics.RenderContext.CANVAS(this.parent.window.backend.canvas.getContext("2d")); else {
				lime.graphics.opengl.GL.context = webgl;
				this.parent.context = lime.graphics.RenderContext.OPENGL(lime.graphics.opengl.GL.context);
			}
		}
	}
	,flip: function() {
	}
	,handleEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "webglcontextlost":
			event.preventDefault();
			this.parent.context = null;
			var listeners = this.parent.onRenderContextLost.listeners;
			var repeat = this.parent.onRenderContextLost.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i]();
				if(!repeat[i]) {
					this.parent.onRenderContextLost.remove(listeners[i]);
					length--;
				} else i++;
			}
			break;
		case "webglcontextrestored":
			this.createContext();
			var listeners1 = this.parent.onRenderContextRestored.listeners;
			var repeat1 = this.parent.onRenderContextRestored.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1](this.parent.context);
				if(!repeat1[i1]) {
					this.parent.onRenderContextRestored.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		default:
		}
	}
	,render: function() {
	}
	,__class__: lime._backend.html5.HTML5Renderer
};
lime._backend.html5.HTML5Window = function(parent) {
	this.parent = parent;
	if(parent.config != null && Object.prototype.hasOwnProperty.call(parent.config,"element")) this.element = parent.config.element;
};
$hxClasses["lime._backend.html5.HTML5Window"] = lime._backend.html5.HTML5Window;
lime._backend.html5.HTML5Window.__name__ = ["lime","_backend","html5","HTML5Window"];
lime._backend.html5.HTML5Window.prototype = {
	close: function() {
	}
	,create: function(application) {
		this.setWidth = this.parent.width;
		this.setHeight = this.parent.height;
		if(js.Boot.__instanceof(this.element,HTMLCanvasElement)) this.canvas = this.element; else this.canvas = window.document.createElement("canvas");
		if(this.canvas != null) {
			var style = this.canvas.style;
			style.setProperty("-webkit-transform","translateZ(0)",null);
			style.setProperty("transform","translateZ(0)",null);
		} else if(this.div != null) {
			var style1 = this.div.style;
			style1.setProperty("-webkit-transform","translate3D(0,0,0)",null);
			style1.setProperty("transform","translate3D(0,0,0)",null);
			style1.position = "relative";
			style1.overflow = "hidden";
			style1.setProperty("-webkit-user-select","none",null);
			style1.setProperty("-moz-user-select","none",null);
			style1.setProperty("-ms-user-select","none",null);
			style1.setProperty("-o-user-select","none",null);
		}
		if(this.parent.width == 0 && this.parent.height == 0) {
			if(this.element != null) {
				this.parent.width = this.element.clientWidth;
				this.parent.height = this.element.clientHeight;
			} else {
				this.parent.width = window.innerWidth;
				this.parent.height = window.innerHeight;
			}
			this.parent.fullscreen = true;
		}
		if(this.canvas != null) {
			this.canvas.width = this.parent.width;
			this.canvas.height = this.parent.height;
		} else {
			this.div.style.width = this.parent.width + "px";
			this.div.style.height = this.parent.height + "px";
		}
		this.handleResize();
		if(this.element != null) {
			if(this.canvas != null) {
				if(this.element != this.canvas) this.element.appendChild(this.canvas);
			} else this.element.appendChild(this.div);
			var events = ["mousedown","mousemove","mouseup","wheel"];
			var _g = 0;
			while(_g < events.length) {
				var event = events[_g];
				++_g;
				this.element.addEventListener(event,$bind(this,this.handleMouseEvent),true);
			}
			window.document.addEventListener("dragstart",function(e) {
				if(e.target.nodeName.toLowerCase() == "img") {
					e.preventDefault();
					return false;
				}
				return true;
			},false);
			this.element.addEventListener("touchstart",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchmove",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchend",$bind(this,this.handleTouchEvent),true);
		}
	}
	,handleMouseEvent: function(event) {
		var x = 0.0;
		var y = 0.0;
		if(event.type != "wheel") {
			if(this.element != null) {
				if(this.canvas != null) {
					var rect = this.canvas.getBoundingClientRect();
					x = (event.clientX - rect.left) * (this.parent.width / rect.width);
					y = (event.clientY - rect.top) * (this.parent.height / rect.height);
				} else if(this.div != null) {
					var rect1 = this.div.getBoundingClientRect();
					x = event.clientX - rect1.left;
					y = event.clientY - rect1.top;
				} else {
					var rect2 = this.element.getBoundingClientRect();
					x = (event.clientX - rect2.left) * (this.parent.width / rect2.width);
					y = (event.clientY - rect2.top) * (this.parent.height / rect2.height);
				}
			} else {
				x = event.clientX;
				y = event.clientY;
			}
			var _g = event.type;
			switch(_g) {
			case "mousedown":
				var listeners = this.parent.onMouseDown.listeners;
				var repeat = this.parent.onMouseDown.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i](x,y,event.button);
					if(!repeat[i]) {
						this.parent.onMouseDown.remove(listeners[i]);
						length--;
					} else i++;
				}
				break;
			case "mouseup":
				var listeners1 = this.parent.onMouseUp.listeners;
				var repeat1 = this.parent.onMouseUp.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1](x,y,event.button);
					if(!repeat1[i1]) {
						this.parent.onMouseUp.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
				break;
			case "mousemove":
				var listeners2 = this.parent.onMouseMove.listeners;
				var repeat2 = this.parent.onMouseMove.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2](x,y,event.button);
					if(!repeat2[i2]) {
						this.parent.onMouseMove.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
				break;
			default:
			}
		} else {
			var listeners3 = this.parent.onMouseWheel.listeners;
			var repeat3 = this.parent.onMouseWheel.repeat;
			var length3 = listeners3.length;
			var i3 = 0;
			while(i3 < length3) {
				listeners3[i3](event.deltaX,event.deltaY);
				if(!repeat3[i3]) {
					this.parent.onMouseWheel.remove(listeners3[i3]);
					length3--;
				} else i3++;
			}
		}
	}
	,handleResize: function() {
		var stretch = this.parent.fullscreen || this.setWidth == 0 && this.setHeight == 0;
		if(this.element != null && (this.div == null || this.div != null && stretch)) {
			if(stretch) {
				if(this.parent.width != this.element.clientWidth || this.parent.height != this.element.clientHeight) {
					this.parent.width = this.element.clientWidth;
					this.parent.height = this.element.clientHeight;
					if(this.canvas != null) {
						if(this.element != this.canvas) {
							this.canvas.width = this.element.clientWidth;
							this.canvas.height = this.element.clientHeight;
						}
					} else {
						this.div.style.width = this.element.clientWidth + "px";
						this.div.style.height = this.element.clientHeight + "px";
					}
				}
			} else {
				var scaleX = this.element.clientWidth / this.setWidth;
				var scaleY = this.element.clientHeight / this.setHeight;
				var currentRatio = scaleX / scaleY;
				var targetRatio = Math.min(scaleX,scaleY);
				if(this.canvas != null) {
					if(this.element != this.canvas) {
						this.canvas.style.width = this.setWidth * targetRatio + "px";
						this.canvas.style.height = this.setHeight * targetRatio + "px";
						this.canvas.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
						this.canvas.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
					}
				} else {
					this.div.style.width = this.setWidth * targetRatio + "px";
					this.div.style.height = this.setHeight * targetRatio + "px";
					this.div.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
					this.div.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
				}
			}
		}
	}
	,handleTouchEvent: function(event) {
		event.preventDefault();
		var touch = event.changedTouches[0];
		var id = touch.identifier;
		var x = 0.0;
		var y = 0.0;
		if(this.element != null) {
			if(this.canvas != null) {
				var rect = this.canvas.getBoundingClientRect();
				x = (touch.clientX - rect.left) * (this.parent.width / rect.width);
				y = (touch.clientY - rect.top) * (this.parent.height / rect.height);
			} else if(this.div != null) {
				var rect1 = this.div.getBoundingClientRect();
				x = touch.clientX - rect1.left;
				y = touch.clientY - rect1.top;
			} else {
				var rect2 = this.element.getBoundingClientRect();
				x = (touch.clientX - rect2.left) * (this.parent.width / rect2.width);
				y = (touch.clientY - rect2.top) * (this.parent.height / rect2.height);
			}
		} else {
			x = touch.clientX;
			y = touch.clientY;
		}
		var _g = event.type;
		switch(_g) {
		case "touchstart":
			var listeners = this.parent.onTouchStart.listeners;
			var repeat = this.parent.onTouchStart.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](x,y,id);
				if(!repeat[i]) {
					this.parent.onTouchStart.remove(listeners[i]);
					length--;
				} else i++;
			}
			break;
		case "touchmove":
			var listeners1 = this.parent.onTouchMove.listeners;
			var repeat1 = this.parent.onTouchMove.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1](x,y,id);
				if(!repeat1[i1]) {
					this.parent.onTouchMove.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		case "touchend":
			var listeners2 = this.parent.onTouchEnd.listeners;
			var repeat2 = this.parent.onTouchEnd.repeat;
			var length2 = listeners2.length;
			var i2 = 0;
			while(i2 < length2) {
				listeners2[i2](x,y,id);
				if(!repeat2[i2]) {
					this.parent.onTouchEnd.remove(listeners2[i2]);
					length2--;
				} else i2++;
			}
			break;
		default:
		}
	}
	,move: function(x,y) {
	}
	,resize: function(width,height) {
	}
	,setIcon: function(image) {
	}
	,__class__: lime._backend.html5.HTML5Window
};
lime.app = {};
lime.app.Module = function() {
};
$hxClasses["lime.app.Module"] = lime.app.Module;
lime.app.Module.__name__ = ["lime","app","Module"];
lime.app.Module.prototype = {
	__class__: lime.app.Module
};
lime.app.Application = function() {
	this.onUpdate = new lime.app.Event();
	lime.app.Module.call(this);
	if(lime.app.Application.current == null) lime.app.Application.current = this;
	this.renderers = new Array();
	this.windows = new Array();
	this.backend = new lime._backend.html5.HTML5Application(this);
	this.onUpdate.add($bind(this,this.update));
};
$hxClasses["lime.app.Application"] = lime.app.Application;
lime.app.Application.__name__ = ["lime","app","Application"];
lime.app.Application.current = null;
lime.app.Application.__super__ = lime.app.Module;
lime.app.Application.prototype = $extend(lime.app.Module.prototype,{
	addRenderer: function(renderer) {
		renderer.onRender.add($bind(this,this.render));
		renderer.onRenderContextLost.add($bind(this,this.onRenderContextLost));
		renderer.onRenderContextRestored.add($bind(this,this.onRenderContextRestored));
		this.renderers.push(renderer);
	}
	,addWindow: function(window) {
		this.windows.push(window);
		window.onKeyDown.add($bind(this,this.onKeyDown));
		window.onKeyUp.add($bind(this,this.onKeyUp));
		window.onMouseDown.add($bind(this,this.onMouseDown));
		window.onMouseMove.add($bind(this,this.onMouseMove));
		window.onMouseUp.add($bind(this,this.onMouseUp));
		window.onMouseWheel.add($bind(this,this.onMouseWheel));
		window.onTouchStart.add($bind(this,this.onTouchStart));
		window.onTouchMove.add($bind(this,this.onTouchMove));
		window.onTouchEnd.add($bind(this,this.onTouchEnd));
		window.onWindowActivate.add($bind(this,this.onWindowActivate));
		window.onWindowClose.add($bind(this,this.onWindowClose));
		window.onWindowDeactivate.add($bind(this,this.onWindowDeactivate));
		window.onWindowFocusIn.add($bind(this,this.onWindowFocusIn));
		window.onWindowFocusOut.add($bind(this,this.onWindowFocusOut));
		window.onWindowMove.add($bind(this,this.onWindowMove));
		window.onWindowResize.add($bind(this,this.onWindowResize));
		window.create(this);
	}
	,create: function(config) {
		this.backend.create(config);
	}
	,exec: function() {
		lime.app.Application.current = this;
		return this.backend.exec();
	}
	,init: function(context) {
	}
	,onKeyDown: function(keyCode,modifier) {
	}
	,onKeyUp: function(keyCode,modifier) {
	}
	,onMouseDown: function(x,y,button) {
	}
	,onMouseMove: function(x,y,button) {
	}
	,onMouseUp: function(x,y,button) {
	}
	,onMouseWheel: function(deltaX,deltaY) {
	}
	,onRenderContextLost: function() {
	}
	,onRenderContextRestored: function(context) {
	}
	,onTouchEnd: function(x,y,id) {
	}
	,onTouchMove: function(x,y,id) {
	}
	,onTouchStart: function(x,y,id) {
	}
	,onWindowActivate: function() {
	}
	,onWindowClose: function() {
	}
	,onWindowDeactivate: function() {
	}
	,onWindowFocusIn: function() {
	}
	,onWindowFocusOut: function() {
	}
	,onWindowMove: function(x,y) {
	}
	,onWindowResize: function(width,height) {
	}
	,removeRenderer: function(renderer) {
		if(renderer != null && HxOverrides.indexOf(this.renderers,renderer,0) > -1) HxOverrides.remove(this.renderers,renderer);
	}
	,removeWindow: function(window) {
		if(window != null && HxOverrides.indexOf(this.windows,window,0) > -1) {
			window.close();
			HxOverrides.remove(this.windows,window);
		}
	}
	,render: function(context) {
	}
	,update: function(deltaTime) {
	}
	,get_renderer: function() {
		return this.renderers[0];
	}
	,get_window: function() {
		return this.windows[0];
	}
	,__class__: lime.app.Application
	,__properties__: {get_window:"get_window",get_renderer:"get_renderer"}
});
lime.app.Event = function() {
	this.listeners = new Array();
	this.priorities = new Array();
	this.repeat = new Array();
};
$hxClasses["lime.app.Event"] = lime.app.Event;
lime.app.Event.__name__ = ["lime","app","Event"];
lime.app.Event.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.priorities[i]) {
				this.listeners.splice(i,0,listener);
				this.priorities.splice(i,0,priority);
				this.repeat.splice(i,0,!once);
				return;
			}
		}
		this.listeners.push(listener);
		this.priorities.push(priority);
		this.repeat.push(!once);
	}
	,remove: function(listener) {
		var index = HxOverrides.indexOf(this.listeners,listener,0);
		if(index > -1) {
			this.listeners.splice(index,1);
			this.priorities.splice(index,1);
			this.repeat.splice(index,1);
		}
	}
	,__class__: lime.app.Event
};
lime.app.Preloader = function() {
	this.total = 0;
	this.loaded = 0;
};
$hxClasses["lime.app.Preloader"] = lime.app.Preloader;
lime.app.Preloader.__name__ = ["lime","app","Preloader"];
lime.app.Preloader.prototype = {
	create: function(config) {
	}
	,load: function(urls,types) {
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "IMAGE":
				var image = new Image();
				lime.app.Preloader.images.set(url,image);
				image.onload = $bind(this,this.image_onLoad);
				image.src = url;
				this.total++;
				break;
			case "BINARY":
				var loader = new lime.net.URLLoader();
				loader.set_dataFormat(lime.net.URLLoaderDataFormat.BINARY);
				lime.app.Preloader.loaders.set(url,loader);
				this.total++;
				break;
			case "TEXT":
				var loader1 = new lime.net.URLLoader();
				lime.app.Preloader.loaders.set(url,loader1);
				this.total++;
				break;
			case "FONT":
				this.total++;
				this.loadFont(url);
				break;
			default:
			}
		}
		var $it0 = lime.app.Preloader.loaders.keys();
		while( $it0.hasNext() ) {
			var url1 = $it0.next();
			var loader2 = lime.app.Preloader.loaders.get(url1);
			loader2.onComplete.add($bind(this,this.loader_onComplete));
			loader2.load(new lime.net.URLRequest(url1));
		}
		if(this.total == 0) this.start();
	}
	,loadFont: function(font) {
		var _g = this;
		if(window.document.fonts && window.document.fonts.load) window.document.fonts.load("1em '" + font + "'").then(function() {
			_g.loaded++;
			_g.update(_g.loaded,_g.total);
			if(_g.loaded == _g.total) _g.start();
		}); else {
			var node = window.document.createElement("span");
			node.innerHTML = "giItT1WQy@!-/#";
			var style = node.style;
			style.position = "absolute";
			style.left = "-10000px";
			style.top = "-10000px";
			style.fontSize = "300px";
			style.fontFamily = "sans-serif";
			style.fontVariant = "normal";
			style.fontStyle = "normal";
			style.fontWeight = "normal";
			style.letterSpacing = "0";
			window.document.body.appendChild(node);
			var width = node.offsetWidth;
			style.fontFamily = "'" + font + "', sans-serif";
			var interval = null;
			var found = false;
			var checkFont = function() {
				if(node.offsetWidth != width) {
					if(!found) {
						found = true;
						return false;
					}
					_g.loaded++;
					if(interval != null) window.clearInterval(interval);
					node.parentNode.removeChild(node);
					node = null;
					_g.update(_g.loaded,_g.total);
					if(_g.loaded == _g.total) _g.start();
					return true;
				}
				return false;
			};
			if(!checkFont()) interval = window.setInterval(checkFont,50);
		}
	}
	,start: function() {
		if(this.onComplete != null) this.onComplete();
	}
	,update: function(loaded,total) {
	}
	,image_onLoad: function(_) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,loader_onComplete: function(loader) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: lime.app.Preloader
};
lime.audio = {};
lime.audio.ALAudioContext = function() {
	this.EXPONENT_DISTANCE_CLAMPED = 53254;
	this.EXPONENT_DISTANCE = 53253;
	this.LINEAR_DISTANCE_CLAMPED = 53252;
	this.LINEAR_DISTANCE = 53251;
	this.INVERSE_DISTANCE_CLAMPED = 53250;
	this.INVERSE_DISTANCE = 53249;
	this.DISTANCE_MODEL = 53248;
	this.DOPPLER_VELOCITY = 49153;
	this.SPEED_OF_SOUND = 49155;
	this.DOPPLER_FACTOR = 49152;
	this.EXTENSIONS = 45060;
	this.RENDERER = 45059;
	this.VERSION = 45058;
	this.VENDOR = 45057;
	this.OUT_OF_MEMORY = 40965;
	this.INVALID_OPERATION = 40964;
	this.INVALID_VALUE = 40963;
	this.INVALID_ENUM = 40962;
	this.INVALID_NAME = 40961;
	this.NO_ERROR = 0;
	this.SIZE = 8196;
	this.CHANNELS = 8195;
	this.BITS = 8194;
	this.FREQUENCY = 8193;
	this.FORMAT_STEREO16 = 4355;
	this.FORMAT_STEREO8 = 4354;
	this.FORMAT_MONO16 = 4353;
	this.FORMAT_MONO8 = 4352;
	this.UNDETERMINED = 4144;
	this.STREAMING = 4137;
	this.STATIC = 4136;
	this.SOURCE_TYPE = 4135;
	this.BYTE_OFFSET = 4134;
	this.SAMPLE_OFFSET = 4133;
	this.SEC_OFFSET = 4132;
	this.MAX_DISTANCE = 4131;
	this.CONE_OUTER_GAIN = 4130;
	this.ROLLOFF_FACTOR = 4129;
	this.REFERENCE_DISTANCE = 4128;
	this.BUFFERS_PROCESSED = 4118;
	this.BUFFERS_QUEUED = 4117;
	this.STOPPED = 4116;
	this.PAUSED = 4115;
	this.PLAYING = 4114;
	this.INITIAL = 4113;
	this.SOURCE_STATE = 4112;
	this.ORIENTATION = 4111;
	this.MAX_GAIN = 4110;
	this.MIN_GAIN = 4109;
	this.GAIN = 4106;
	this.BUFFER = 4105;
	this.LOOPING = 4103;
	this.VELOCITY = 4102;
	this.DIRECTION = 4101;
	this.POSITION = 4100;
	this.PITCH = 4099;
	this.CONE_OUTER_ANGLE = 4098;
	this.CONE_INNER_ANGLE = 4097;
	this.SOURCE_RELATIVE = 514;
	this.TRUE = 1;
	this.FALSE = 0;
	this.NONE = 0;
};
$hxClasses["lime.audio.ALAudioContext"] = lime.audio.ALAudioContext;
lime.audio.ALAudioContext.__name__ = ["lime","audio","ALAudioContext"];
lime.audio.ALAudioContext.prototype = {
	bufferData: function(buffer,format,data,size,freq) {
		lime.audio.openal.AL.bufferData(buffer,format,data,size,freq);
	}
	,buffer3f: function(buffer,param,value1,value2,value3) {
		lime.audio.openal.AL.buffer3f(buffer,param,value1,value2,value3);
	}
	,buffer3i: function(buffer,param,value1,value2,value3) {
		lime.audio.openal.AL.buffer3i(buffer,param,value1,value2,value3);
	}
	,bufferf: function(buffer,param,value) {
		lime.audio.openal.AL.bufferf(buffer,param,value);
	}
	,bufferfv: function(buffer,param,values) {
		lime.audio.openal.AL.bufferfv(buffer,param,values);
	}
	,bufferi: function(buffer,param,value) {
		lime.audio.openal.AL.bufferi(buffer,param,value);
	}
	,bufferiv: function(buffer,param,values) {
		lime.audio.openal.AL.bufferiv(buffer,param,values);
	}
	,deleteBuffer: function(buffer) {
		lime.audio.openal.AL.deleteBuffer(buffer);
	}
	,deleteBuffers: function(buffers) {
		lime.audio.openal.AL.deleteBuffers(buffers);
	}
	,deleteSource: function(source) {
		lime.audio.openal.AL.deleteSource(source);
	}
	,deleteSources: function(sources) {
		lime.audio.openal.AL.deleteSources(sources);
	}
	,disable: function(capability) {
		lime.audio.openal.AL.disable(capability);
	}
	,distanceModel: function(distanceModel) {
		lime.audio.openal.AL.distanceModel(distanceModel);
	}
	,dopplerFactor: function(value) {
		lime.audio.openal.AL.dopplerFactor(value);
	}
	,dopplerVelocity: function(value) {
		lime.audio.openal.AL.dopplerVelocity(value);
	}
	,enable: function(capability) {
		lime.audio.openal.AL.enable(capability);
	}
	,genSource: function() {
		return lime.audio.openal.AL.genSource();
	}
	,genSources: function(n) {
		return lime.audio.openal.AL.genSources(n);
	}
	,genBuffer: function() {
		return lime.audio.openal.AL.genBuffer();
	}
	,genBuffers: function(n) {
		return lime.audio.openal.AL.genBuffers(n);
	}
	,getBoolean: function(param) {
		return lime.audio.openal.AL.getBoolean(param);
	}
	,getBooleanv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getBooleanv(param,count);
	}
	,getBuffer3f: function(buffer,param) {
		return lime.audio.openal.AL.getBuffer3f(buffer,param);
	}
	,getBuffer3i: function(buffer,param) {
		return lime.audio.openal.AL.getBuffer3i(buffer,param);
	}
	,getBufferf: function(buffer,param) {
		return lime.audio.openal.AL.getBufferf(buffer,param);
	}
	,getBufferfv: function(buffer,param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getBufferfv(buffer,param,count);
	}
	,getBufferi: function(buffer,param) {
		return lime.audio.openal.AL.getBufferi(buffer,param);
	}
	,getBufferiv: function(buffer,param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getBufferiv(buffer,param,count);
	}
	,getDouble: function(param) {
		return lime.audio.openal.AL.getDouble(param);
	}
	,getDoublev: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getDoublev(param,count);
	}
	,getEnumValue: function(ename) {
		return lime.audio.openal.AL.getEnumValue(ename);
	}
	,getError: function() {
		return lime.audio.openal.AL.getError();
	}
	,getErrorString: function() {
		return lime.audio.openal.AL.getErrorString();
	}
	,getFloat: function(param) {
		return lime.audio.openal.AL.getFloat(param);
	}
	,getFloatv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getFloatv(param,count);
	}
	,getInteger: function(param) {
		return lime.audio.openal.AL.getInteger(param);
	}
	,getIntegerv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getIntegerv(param,count);
	}
	,getListener3f: function(param) {
		return lime.audio.openal.AL.getListener3f(param);
	}
	,getListener3i: function(param) {
		return lime.audio.openal.AL.getListener3i(param);
	}
	,getListenerf: function(param) {
		return lime.audio.openal.AL.getListenerf(param);
	}
	,getListenerfv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getListenerfv(param,count);
	}
	,getListeneri: function(param) {
		return lime.audio.openal.AL.getListeneri(param);
	}
	,getListeneriv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getListeneriv(param,count);
	}
	,getProcAddress: function(fname) {
		return lime.audio.openal.AL.getProcAddress(fname);
	}
	,getSource3f: function(source,param) {
		return lime.audio.openal.AL.getSource3f(source,param);
	}
	,getSourcef: function(source,param) {
		return lime.audio.openal.AL.getSourcef(source,param);
	}
	,getSource3i: function(source,param) {
		return lime.audio.openal.AL.getSource3i(source,param);
	}
	,getSourcefv: function(source,param) {
		return lime.audio.openal.AL.getSourcefv(source,param);
	}
	,getSourcei: function(source,param) {
		return lime.audio.openal.AL.getSourcei(source,param);
	}
	,getSourceiv: function(source,param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getSourceiv(source,param,count);
	}
	,getString: function(param) {
		return lime.audio.openal.AL.getString(param);
	}
	,isBuffer: function(buffer) {
		return lime.audio.openal.AL.isBuffer(buffer);
	}
	,isEnabled: function(capability) {
		return lime.audio.openal.AL.isEnabled(capability);
	}
	,isExtensionPresent: function(extname) {
		return lime.audio.openal.AL.isExtensionPresent(extname);
	}
	,isSource: function(source) {
		return lime.audio.openal.AL.isSource(source);
	}
	,listener3f: function(param,value1,value2,value3) {
		lime.audio.openal.AL.listener3f(param,value1,value2,value3);
	}
	,listener3i: function(param,value1,value2,value3) {
		lime.audio.openal.AL.listener3i(param,value1,value2,value3);
	}
	,listenerf: function(param,value) {
		lime.audio.openal.AL.listenerf(param,value);
	}
	,listenerfv: function(param,values) {
		lime.audio.openal.AL.listenerfv(param,values);
	}
	,listeneri: function(param,value) {
		lime.audio.openal.AL.listeneri(param,value);
	}
	,listeneriv: function(param,values) {
		lime.audio.openal.AL.listeneriv(param,values);
	}
	,source3f: function(source,param,value1,value2,value3) {
		lime.audio.openal.AL.source3f(source,param,value1,value2,value3);
	}
	,source3i: function(source,param,value1,value2,value3) {
		lime.audio.openal.AL.source3i(source,param,value1,value2,value3);
	}
	,sourcef: function(source,param,value) {
		lime.audio.openal.AL.sourcef(source,param,value);
	}
	,sourcefv: function(source,param,values) {
		lime.audio.openal.AL.sourcefv(source,param,values);
	}
	,sourcei: function(source,param,value) {
		lime.audio.openal.AL.sourcei(source,param,value);
	}
	,sourceiv: function(source,param,values) {
		lime.audio.openal.AL.sourceiv(source,param,values);
	}
	,sourcePlay: function(source) {
		lime.audio.openal.AL.sourcePlay(source);
	}
	,sourcePlayv: function(sources) {
		lime.audio.openal.AL.sourcePlayv(sources);
	}
	,sourceStop: function(source) {
		lime.audio.openal.AL.sourceStop(source);
	}
	,sourceStopv: function(sources) {
		lime.audio.openal.AL.sourceStopv(sources);
	}
	,sourceRewind: function(source) {
		lime.audio.openal.AL.sourceRewind(source);
	}
	,sourceRewindv: function(sources) {
		lime.audio.openal.AL.sourceRewindv(sources);
	}
	,sourcePause: function(source) {
		lime.audio.openal.AL.sourcePause(source);
	}
	,sourcePausev: function(sources) {
		lime.audio.openal.AL.sourcePausev(sources);
	}
	,sourceQueueBuffer: function(source,buffer) {
		lime.audio.openal.AL.sourceQueueBuffer(source,buffer);
	}
	,sourceQueueBuffers: function(source,nb,buffers) {
		lime.audio.openal.AL.sourceQueueBuffers(source,nb,buffers);
	}
	,sourceUnqueueBuffer: function(source) {
		return lime.audio.openal.AL.sourceUnqueueBuffer(source);
	}
	,sourceUnqueueBuffers: function(source,nb) {
		return lime.audio.openal.AL.sourceUnqueueBuffers(source,nb);
	}
	,speedOfSound: function(value) {
		lime.audio.openal.AL.speedOfSound(value);
	}
	,__class__: lime.audio.ALAudioContext
};
lime.audio.ALCAudioContext = function() {
	this.ALL_DEVICES_SPECIFIER = 4115;
	this.DEFAULT_ALL_DEVICES_SPECIFIER = 4114;
	this.ENUMERATE_ALL_EXT = 1;
	this.EXTENSIONS = 4102;
	this.DEVICE_SPECIFIER = 4101;
	this.DEFAULT_DEVICE_SPECIFIER = 4100;
	this.ALL_ATTRIBUTES = 4099;
	this.ATTRIBUTES_SIZE = 4098;
	this.OUT_OF_MEMORY = 40965;
	this.INVALID_VALUE = 40964;
	this.INVALID_ENUM = 40963;
	this.INVALID_CONTEXT = 40962;
	this.INVALID_DEVICE = 40961;
	this.NO_ERROR = 0;
	this.STEREO_SOURCES = 4113;
	this.MONO_SOURCES = 4112;
	this.SYNC = 4105;
	this.REFRESH = 4104;
	this.FREQUENCY = 4103;
	this.TRUE = 1;
	this.FALSE = 0;
};
$hxClasses["lime.audio.ALCAudioContext"] = lime.audio.ALCAudioContext;
lime.audio.ALCAudioContext.__name__ = ["lime","audio","ALCAudioContext"];
lime.audio.ALCAudioContext.prototype = {
	closeDevice: function(device) {
		return lime.audio.openal.ALC.closeDevice(device);
	}
	,createContext: function(device,attrlist) {
		return lime.audio.openal.ALC.createContext(device,attrlist);
	}
	,destroyContext: function(context) {
		lime.audio.openal.ALC.destroyContext(context);
	}
	,getContextsDevice: function(context) {
		return lime.audio.openal.ALC.getContextsDevice(context);
	}
	,getCurrentContext: function() {
		return lime.audio.openal.ALC.getCurrentContext();
	}
	,getError: function(device) {
		return lime.audio.openal.ALC.getError(device);
	}
	,getErrorString: function(device) {
		return lime.audio.openal.ALC.getErrorString(device);
	}
	,getIntegerv: function(device,param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.ALC.getIntegerv(device,param,count);
	}
	,getString: function(device,param) {
		return lime.audio.openal.ALC.getString(device,param);
	}
	,makeContextCurrent: function(context) {
		return lime.audio.openal.ALC.makeContextCurrent(context);
	}
	,openDevice: function(deviceName) {
		return lime.audio.openal.ALC.openDevice(deviceName);
	}
	,processContext: function(context) {
		lime.audio.openal.ALC.processContext(context);
	}
	,suspendContext: function(context) {
		lime.audio.openal.ALC.suspendContext(context);
	}
	,__class__: lime.audio.ALCAudioContext
};
lime.audio.AudioBuffer = function() {
	this.id = 0;
};
$hxClasses["lime.audio.AudioBuffer"] = lime.audio.AudioBuffer;
lime.audio.AudioBuffer.__name__ = ["lime","audio","AudioBuffer"];
lime.audio.AudioBuffer.fromBytes = function(bytes) {
	return null;
};
lime.audio.AudioBuffer.fromFile = function(path) {
	return null;
};
lime.audio.AudioBuffer.fromURL = function(url,handler) {
};
lime.audio.AudioBuffer.prototype = {
	dispose: function() {
	}
	,__class__: lime.audio.AudioBuffer
};
lime.audio.AudioContext = $hxClasses["lime.audio.AudioContext"] = { __ename__ : true, __constructs__ : ["OPENAL","HTML5","WEB","FLASH","CUSTOM"] };
lime.audio.AudioContext.OPENAL = function(alc,al) { var $x = ["OPENAL",0,alc,al]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioContext.HTML5 = function(context) { var $x = ["HTML5",1,context]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioContext.WEB = function(context) { var $x = ["WEB",2,context]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioContext.FLASH = function(context) { var $x = ["FLASH",3,context]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioManager = function() { };
$hxClasses["lime.audio.AudioManager"] = lime.audio.AudioManager;
lime.audio.AudioManager.__name__ = ["lime","audio","AudioManager"];
lime.audio.AudioManager.context = null;
lime.audio.AudioManager.init = function(context) {
	if(lime.audio.AudioManager.context == null) {
		if(context == null) try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;;
			lime.audio.AudioManager.context = lime.audio.AudioContext.WEB(new AudioContext ());
		} catch( e ) {
			lime.audio.AudioManager.context = lime.audio.AudioContext.HTML5(new lime.audio.HTML5AudioContext());
		} else lime.audio.AudioManager.context = context;
	}
};
lime.audio.AudioManager.resume = function() {
	if(lime.audio.AudioManager.context != null) {
		var _g = lime.audio.AudioManager.context;
		switch(_g[1]) {
		case 0:
			var al = _g[3];
			var alc = _g[2];
			alc.processContext(alc.getCurrentContext());
			break;
		default:
		}
	}
};
lime.audio.AudioManager.shutdown = function() {
	if(lime.audio.AudioManager.context != null) {
		var _g = lime.audio.AudioManager.context;
		switch(_g[1]) {
		case 0:
			var al = _g[3];
			var alc = _g[2];
			var currentContext = alc.getCurrentContext();
			if(currentContext != null) {
				var device = alc.getContextsDevice(currentContext);
				alc.makeContextCurrent(null);
				alc.destroyContext(currentContext);
				alc.closeDevice(device);
			}
			break;
		default:
		}
	}
};
lime.audio.AudioManager.suspend = function() {
	if(lime.audio.AudioManager.context != null) {
		var _g = lime.audio.AudioManager.context;
		switch(_g[1]) {
		case 0:
			var al = _g[3];
			var alc = _g[2];
			alc.suspendContext(alc.getCurrentContext());
			break;
		default:
		}
	}
};
lime.audio.AudioSource = function(buffer) {
	this.onComplete = new lime.app.Event();
	this.buffer = buffer;
	this.id = 0;
	this.pauseTime = 0;
	if(buffer != null) this.init();
};
$hxClasses["lime.audio.AudioSource"] = lime.audio.AudioSource;
lime.audio.AudioSource.__name__ = ["lime","audio","AudioSource"];
lime.audio.AudioSource.prototype = {
	init: function() {
		{
			var _g = lime.audio.AudioManager.context;
			switch(_g[1]) {
			case 0:
				var al = _g[3];
				var alc = _g[2];
				if((function($this) {
					var $r;
					var $int = $this.buffer.id;
					$r = $int < 0?4294967296.0 + $int:$int + 0.0;
					return $r;
				}(this)) == 0) {
					this.buffer.id = al.genBuffer();
					var format = 0;
					if(this.buffer.channels == 1) {
						if(this.buffer.bitsPerSample == 8) format = al.FORMAT_MONO8; else if(this.buffer.bitsPerSample == 16) format = al.FORMAT_MONO16;
					} else if(this.buffer.channels == 2) {
						if(this.buffer.bitsPerSample == 8) format = al.FORMAT_STEREO8; else if(this.buffer.bitsPerSample == 16) format = al.FORMAT_STEREO16;
					}
					al.bufferData(this.buffer.id,format,this.buffer.data,this.buffer.data.length,this.buffer.sampleRate);
				}
				this.id = al.genSource();
				al.sourcei(this.id,al.BUFFER,this.buffer.id);
				break;
			default:
			}
		}
	}
	,play: function() {
	}
	,pause: function() {
	}
	,stop: function() {
	}
	,get_gain: function() {
		return 1;
	}
	,set_gain: function(value) {
		return 1;
	}
	,get_timeOffset: function() {
		return 0;
	}
	,set_timeOffset: function(value) {
		return 0;
	}
	,__class__: lime.audio.AudioSource
	,__properties__: {set_timeOffset:"set_timeOffset",get_timeOffset:"get_timeOffset",set_gain:"set_gain",get_gain:"get_gain"}
};
lime.audio.FlashAudioContext = function() {
};
$hxClasses["lime.audio.FlashAudioContext"] = lime.audio.FlashAudioContext;
lime.audio.FlashAudioContext.__name__ = ["lime","audio","FlashAudioContext"];
lime.audio.FlashAudioContext.prototype = {
	createBuffer: function(stream,context) {
		return null;
	}
	,getBytesLoaded: function(buffer) {
		return 0;
	}
	,getBytesTotal: function(buffer) {
		return 0;
	}
	,getID3: function(buffer) {
		return null;
	}
	,getIsBuffering: function(buffer) {
		return false;
	}
	,getIsURLInaccessible: function(buffer) {
		return false;
	}
	,getLength: function(buffer) {
		return 0;
	}
	,getURL: function(buffer) {
		return null;
	}
	,close: function(buffer) {
	}
	,extract: function(buffer,target,length,startPosition) {
		if(startPosition == null) startPosition = -1;
		return 0;
	}
	,load: function(buffer,stream,context) {
	}
	,loadCompressedDataFromByteArray: function(buffer,bytes,bytesLength) {
	}
	,loadPCMFromByteArray: function(buffer,bytes,samples,format,stereo,sampleRate) {
		if(sampleRate == null) sampleRate = 44100;
		if(stereo == null) stereo = true;
	}
	,play: function(buffer,startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0;
		return null;
	}
	,__class__: lime.audio.FlashAudioContext
};
lime.audio.HTML5AudioContext = function() {
	this.NETWORK_NO_SOURCE = 3;
	this.NETWORK_LOADING = 2;
	this.NETWORK_IDLE = 1;
	this.NETWORK_EMPTY = 0;
	this.HAVE_NOTHING = 0;
	this.HAVE_METADATA = 1;
	this.HAVE_FUTURE_DATA = 3;
	this.HAVE_ENOUGH_DATA = 4;
	this.HAVE_CURRENT_DATA = 2;
};
$hxClasses["lime.audio.HTML5AudioContext"] = lime.audio.HTML5AudioContext;
lime.audio.HTML5AudioContext.__name__ = ["lime","audio","HTML5AudioContext"];
lime.audio.HTML5AudioContext.prototype = {
	canPlayType: function(buffer,type) {
		if(buffer.src != null) return buffer.src.canPlayType(type);
		return null;
	}
	,createBuffer: function(urlString) {
		var buffer = new lime.audio.AudioBuffer();
		buffer.src = new Audio();
		buffer.src.src = urlString;
		return buffer;
	}
	,getAudioDecodedByteCount: function(buffer) {
		if(buffer.src != null) return buffer.src.audioDecodedByteCount;
		return 0;
	}
	,getAutoplay: function(buffer) {
		if(buffer.src != null) return buffer.src.autoplay;
		return false;
	}
	,getBuffered: function(buffer) {
		if(buffer.src != null) return buffer.src.buffered;
		return null;
	}
	,getController: function(buffer) {
		if(buffer.src != null) return buffer.src.controller;
		return null;
	}
	,getCurrentSrc: function(buffer) {
		if(buffer.src != null) return buffer.src.currentSrc;
		return null;
	}
	,getCurrentTime: function(buffer) {
		if(buffer.src != null) return buffer.src.currentTime;
		return 0;
	}
	,getDefaultPlaybackRate: function(buffer) {
		if(buffer.src != null) return buffer.src.defaultPlaybackRate;
		return 1;
	}
	,getDuration: function(buffer) {
		if(buffer.src != null) return buffer.src.duration;
		return 0;
	}
	,getEnded: function(buffer) {
		if(buffer.src != null) return buffer.src.ended;
		return false;
	}
	,getError: function(buffer) {
		if(buffer.src != null) return buffer.src.error;
		return null;
	}
	,getInitialTime: function(buffer) {
		if(buffer.src != null) return buffer.src.initialTime;
		return 0;
	}
	,getLoop: function(buffer) {
		if(buffer.src != null) return buffer.src.loop;
		return false;
	}
	,getMediaGroup: function(buffer) {
		if(buffer.src != null) return buffer.src.mediaGroup;
		return null;
	}
	,getMuted: function(buffer) {
		if(buffer.src != null) return buffer.src.muted;
		return false;
	}
	,getNetworkState: function(buffer) {
		if(buffer.src != null) return buffer.src.networkState;
		return 0;
	}
	,getPaused: function(buffer) {
		if(buffer.src != null) return buffer.src.paused;
		return false;
	}
	,getPlaybackRate: function(buffer) {
		if(buffer.src != null) return buffer.src.playbackRate;
		return 1;
	}
	,getPlayed: function(buffer) {
		if(buffer.src != null) return buffer.src.played;
		return null;
	}
	,getPreload: function(buffer) {
		if(buffer.src != null) return buffer.src.preload;
		return null;
	}
	,getReadyState: function(buffer) {
		if(buffer.src != null) return buffer.src.readyState;
		return 0;
	}
	,getSeekable: function(buffer) {
		if(buffer.src != null) return buffer.src.seekable;
		return null;
	}
	,getSeeking: function(buffer) {
		if(buffer.src != null) return buffer.src.seeking;
		return false;
	}
	,getSrc: function(buffer) {
		if(buffer.src != null) return buffer.src.src;
		return null;
	}
	,getStartTime: function(buffer) {
		if(buffer.src != null) return buffer.src.playbackRate;
		return 0;
	}
	,getVolume: function(buffer) {
		if(buffer.src != null) return buffer.src.volume;
		return 1;
	}
	,load: function(buffer) {
		if(buffer.src != null) return buffer.src.load();
	}
	,pause: function(buffer) {
		if(buffer.src != null) return buffer.src.pause();
	}
	,play: function(buffer) {
		if(buffer.src != null) return buffer.src.play();
	}
	,setAutoplay: function(buffer,value) {
		if(buffer.src != null) buffer.src.autoplay = value;
	}
	,setController: function(buffer,value) {
		if(buffer.src != null) buffer.src.controller = value;
	}
	,setCurrentTime: function(buffer,value) {
		if(buffer.src != null) buffer.src.currentTime = value;
	}
	,setDefaultPlaybackRate: function(buffer,value) {
		if(buffer.src != null) buffer.src.defaultPlaybackRate = value;
	}
	,setLoop: function(buffer,value) {
		if(buffer.src != null) buffer.src.loop = value;
	}
	,setMediaGroup: function(buffer,value) {
		if(buffer.src != null) buffer.src.mediaGroup = value;
	}
	,setMuted: function(buffer,value) {
		if(buffer.src != null) buffer.src.muted = value;
	}
	,setPlaybackRate: function(buffer,value) {
		if(buffer.src != null) buffer.src.playbackRate = value;
	}
	,setPreload: function(buffer,value) {
		if(buffer.src != null) buffer.src.preload = value;
	}
	,setSrc: function(buffer,value) {
		if(buffer.src != null) buffer.src.src = value;
	}
	,setVolume: function(buffer,value) {
		if(buffer.src != null) buffer.src.volume = value;
	}
	,__class__: lime.audio.HTML5AudioContext
};
lime.audio.openal = {};
lime.audio.openal.AL = function() { };
$hxClasses["lime.audio.openal.AL"] = lime.audio.openal.AL;
lime.audio.openal.AL.__name__ = ["lime","audio","openal","AL"];
lime.audio.openal.AL.bufferData = function(buffer,format,data,size,freq) {
};
lime.audio.openal.AL.buffer3f = function(buffer,param,value1,value2,value3) {
};
lime.audio.openal.AL.buffer3i = function(buffer,param,value1,value2,value3) {
};
lime.audio.openal.AL.bufferf = function(buffer,param,value) {
};
lime.audio.openal.AL.bufferfv = function(buffer,param,values) {
};
lime.audio.openal.AL.bufferi = function(buffer,param,value) {
};
lime.audio.openal.AL.bufferiv = function(buffer,param,values) {
};
lime.audio.openal.AL.deleteBuffer = function(buffer) {
};
lime.audio.openal.AL.deleteBuffers = function(buffers) {
};
lime.audio.openal.AL.deleteSource = function(source) {
};
lime.audio.openal.AL.deleteSources = function(sources) {
};
lime.audio.openal.AL.disable = function(capability) {
};
lime.audio.openal.AL.distanceModel = function(distanceModel) {
};
lime.audio.openal.AL.dopplerFactor = function(value) {
};
lime.audio.openal.AL.dopplerVelocity = function(value) {
};
lime.audio.openal.AL.enable = function(capability) {
};
lime.audio.openal.AL.genSource = function() {
	return 0;
};
lime.audio.openal.AL.genSources = function(n) {
	return null;
};
lime.audio.openal.AL.genBuffer = function() {
	return 0;
};
lime.audio.openal.AL.genBuffers = function(n) {
	return null;
};
lime.audio.openal.AL.getBoolean = function(param) {
	return false;
};
lime.audio.openal.AL.getBooleanv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getBuffer3f = function(buffer,param) {
	return null;
};
lime.audio.openal.AL.getBuffer3i = function(buffer,param) {
	return null;
};
lime.audio.openal.AL.getBufferf = function(buffer,param) {
	return 0;
};
lime.audio.openal.AL.getBufferfv = function(buffer,param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getBufferi = function(buffer,param) {
	return 0;
};
lime.audio.openal.AL.getBufferiv = function(buffer,param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getDouble = function(param) {
	return 0;
};
lime.audio.openal.AL.getDoublev = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getEnumValue = function(ename) {
	return 0;
};
lime.audio.openal.AL.getError = function() {
	return 0;
};
lime.audio.openal.AL.getErrorString = function() {
	var _g = lime.audio.openal.AL.getError();
	switch(_g) {
	case 40961:
		return "INVALID_NAME: Invalid parameter name";
	case 40962:
		return "INVALID_ENUM: Invalid enum value";
	case 40963:
		return "INVALID_VALUE: Invalid parameter value";
	case 40964:
		return "INVALID_OPERATION: Illegal operation or call";
	case 40965:
		return "OUT_OF_MEMORY: OpenAL has run out of memory";
	default:
		return "";
	}
};
lime.audio.openal.AL.getFloat = function(param) {
	return 0;
};
lime.audio.openal.AL.getFloatv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getInteger = function(param) {
	return 0;
};
lime.audio.openal.AL.getIntegerv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getListener3f = function(param) {
	return null;
};
lime.audio.openal.AL.getListener3i = function(param) {
	return null;
};
lime.audio.openal.AL.getListenerf = function(param) {
	return 0;
};
lime.audio.openal.AL.getListenerfv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getListeneri = function(param) {
	return 0;
};
lime.audio.openal.AL.getListeneriv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getProcAddress = function(fname) {
	return null;
};
lime.audio.openal.AL.getSource3f = function(source,param) {
	return null;
};
lime.audio.openal.AL.getSourcef = function(source,param) {
	return 0;
};
lime.audio.openal.AL.getSource3i = function(source,param) {
	return null;
};
lime.audio.openal.AL.getSourcefv = function(source,param) {
	return null;
};
lime.audio.openal.AL.getSourcei = function(source,param) {
	return 0;
};
lime.audio.openal.AL.getSourceiv = function(source,param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getString = function(param) {
	return null;
};
lime.audio.openal.AL.isBuffer = function(buffer) {
	return false;
};
lime.audio.openal.AL.isEnabled = function(capability) {
	return false;
};
lime.audio.openal.AL.isExtensionPresent = function(extname) {
	return false;
};
lime.audio.openal.AL.isSource = function(source) {
	return false;
};
lime.audio.openal.AL.listener3f = function(param,value1,value2,value3) {
};
lime.audio.openal.AL.listener3i = function(param,value1,value2,value3) {
};
lime.audio.openal.AL.listenerf = function(param,value) {
};
lime.audio.openal.AL.listenerfv = function(param,values) {
};
lime.audio.openal.AL.listeneri = function(param,value) {
};
lime.audio.openal.AL.listeneriv = function(param,values) {
};
lime.audio.openal.AL.source3f = function(source,param,value1,value2,value3) {
};
lime.audio.openal.AL.source3i = function(source,param,value1,value2,value3) {
};
lime.audio.openal.AL.sourcef = function(source,param,value) {
};
lime.audio.openal.AL.sourcefv = function(source,param,values) {
};
lime.audio.openal.AL.sourcei = function(source,param,value) {
};
lime.audio.openal.AL.sourceiv = function(source,param,values) {
};
lime.audio.openal.AL.sourcePlay = function(source) {
};
lime.audio.openal.AL.sourcePlayv = function(sources) {
};
lime.audio.openal.AL.sourceStop = function(source) {
};
lime.audio.openal.AL.sourceStopv = function(sources) {
};
lime.audio.openal.AL.sourceRewind = function(source) {
};
lime.audio.openal.AL.sourceRewindv = function(sources) {
};
lime.audio.openal.AL.sourcePause = function(source) {
};
lime.audio.openal.AL.sourcePausev = function(sources) {
};
lime.audio.openal.AL.sourceQueueBuffer = function(source,buffer) {
};
lime.audio.openal.AL.sourceQueueBuffers = function(source,nb,buffers) {
};
lime.audio.openal.AL.sourceUnqueueBuffer = function(source) {
	return 0;
};
lime.audio.openal.AL.sourceUnqueueBuffers = function(source,nb) {
	return null;
};
lime.audio.openal.AL.speedOfSound = function(value) {
};
lime.audio.openal.ALC = function() { };
$hxClasses["lime.audio.openal.ALC"] = lime.audio.openal.ALC;
lime.audio.openal.ALC.__name__ = ["lime","audio","openal","ALC"];
lime.audio.openal.ALC.closeDevice = function(device) {
	return false;
};
lime.audio.openal.ALC.createContext = function(device,attrlist) {
	return null;
};
lime.audio.openal.ALC.destroyContext = function(context) {
};
lime.audio.openal.ALC.getContextsDevice = function(context) {
	return null;
};
lime.audio.openal.ALC.getCurrentContext = function() {
	return null;
};
lime.audio.openal.ALC.getError = function(device) {
	return 0;
};
lime.audio.openal.ALC.getErrorString = function(device) {
	var _g = lime.audio.openal.ALC.getError(device);
	switch(_g) {
	case 40961:
		return "INVALID_DEVICE: Invalid device (or no device?)";
	case 40962:
		return "INVALID_CONTEXT: Invalid context (or no context?)";
	case 40963:
		return "INVALID_ENUM: Invalid enum value";
	case 40964:
		return "INVALID_VALUE: Invalid param value";
	case 40965:
		return "OUT_OF_MEMORY: OpenAL has run out of memory";
	default:
		return "";
	}
};
lime.audio.openal.ALC.getIntegerv = function(device,param,size) {
	return null;
};
lime.audio.openal.ALC.getString = function(device,param) {
	return null;
};
lime.audio.openal.ALC.makeContextCurrent = function(context) {
	return false;
};
lime.audio.openal.ALC.openDevice = function(deviceName) {
	return null;
};
lime.audio.openal.ALC.processContext = function(context) {
};
lime.audio.openal.ALC.suspendContext = function(context) {
};
lime.audio.openal._ALContext = {};
lime.audio.openal._ALContext.ALContext_Impl_ = function() { };
$hxClasses["lime.audio.openal._ALContext.ALContext_Impl_"] = lime.audio.openal._ALContext.ALContext_Impl_;
lime.audio.openal._ALContext.ALContext_Impl_.__name__ = ["lime","audio","openal","_ALContext","ALContext_Impl_"];
lime.audio.openal._ALContext.ALContext_Impl_._new = function(handle) {
	return handle;
};
lime.audio.openal._ALDevice = {};
lime.audio.openal._ALDevice.ALDevice_Impl_ = function() { };
$hxClasses["lime.audio.openal._ALDevice.ALDevice_Impl_"] = lime.audio.openal._ALDevice.ALDevice_Impl_;
lime.audio.openal._ALDevice.ALDevice_Impl_.__name__ = ["lime","audio","openal","_ALDevice","ALDevice_Impl_"];
lime.audio.openal._ALDevice.ALDevice_Impl_._new = function(handle) {
	return handle;
};
lime.graphics = {};
lime.graphics.ConsoleRenderContext = function() {
};
$hxClasses["lime.graphics.ConsoleRenderContext"] = lime.graphics.ConsoleRenderContext;
lime.graphics.ConsoleRenderContext.__name__ = ["lime","graphics","ConsoleRenderContext"];
lime.graphics.ConsoleRenderContext.prototype = {
	clear: function() {
	}
	,clearColor: function(r,g,b,a) {
	}
	,clearDepth: function(depth) {
	}
	,clearStencil: function(stencil) {
	}
	,__class__: lime.graphics.ConsoleRenderContext
};
lime.graphics.FlashRenderContext = function() {
};
$hxClasses["lime.graphics.FlashRenderContext"] = lime.graphics.FlashRenderContext;
lime.graphics.FlashRenderContext.__name__ = ["lime","graphics","FlashRenderContext"];
lime.graphics.FlashRenderContext.prototype = {
	addChild: function(child) {
		return null;
	}
	,addChildAt: function(child,index) {
		return null;
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
	}
	,areInaccessibleObjectsUnderPoint: function(point) {
		return false;
	}
	,contains: function(child) {
		return false;
	}
	,dispatchEvent: function(event) {
		return false;
	}
	,getBounds: function(targetCoordinateSpace) {
		return null;
	}
	,getChildAt: function(index) {
		return null;
	}
	,getChildByName: function(name) {
		return null;
	}
	,getChildIndex: function(child) {
		return 0;
	}
	,getObjectsUnderPoint: function(point) {
		return null;
	}
	,getRect: function(targetCoordinateSpace) {
		return null;
	}
	,globalToLocal: function(point) {
		return null;
	}
	,globalToLocal3D: function(point) {
		return null;
	}
	,hasEventListener: function(type) {
		return false;
	}
	,hitTestObject: function(obj) {
		return false;
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		return false;
	}
	,local3DToGlobal: function(point3d) {
		return null;
	}
	,localToGlobal: function(point) {
		return null;
	}
	,removeChild: function(child) {
		return null;
	}
	,removeChildAt: function(index) {
		return null;
	}
	,removeChildren: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 2147483647;
		if(beginIndex == null) beginIndex = 0;
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
	}
	,requestSoftKeyboard: function() {
		return false;
	}
	,setChildIndex: function(child,index) {
	}
	,startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
	}
	,startTouchDrag: function(touchPointID,lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
	}
	,stopAllMovieClips: function() {
	}
	,stopDrag: function() {
	}
	,stopTouchDrag: function(touchPointID) {
	}
	,swapChildren: function(child1,child2) {
	}
	,swapChildrenAt: function(index1,index2) {
	}
	,toString: function() {
		return null;
	}
	,willTrigger: function(type) {
		return false;
	}
	,__class__: lime.graphics.FlashRenderContext
};
lime.graphics.Font = function(fontName) {
	this.fontName = fontName;
	this.glyphs = new haxe.ds.IntMap();
};
$hxClasses["lime.graphics.Font"] = lime.graphics.Font;
lime.graphics.Font.__name__ = ["lime","graphics","Font"];
lime.graphics.Font.fromBytes = function(bytes) {
	var font = new lime.graphics.Font();
	return font;
};
lime.graphics.Font.fromFile = function(path) {
	var font = new lime.graphics.Font();
	font.__fromFile(path);
	return font;
};
lime.graphics.Font.prototype = {
	createImage: function() {
		this.glyphs = new haxe.ds.IntMap();
		return null;
	}
	,decompose: function() {
		return null;
	}
	,loadRange: function(size,start,end) {
	}
	,loadGlyphs: function(size,glyphs) {
		if(glyphs == null) glyphs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^`'\"/\\&*()[]{}<>|:;_-+=?,. ";
	}
	,__fromFile: function(path) {
		this.__fontPath = path;
	}
	,__class__: lime.graphics.Font
};
lime.graphics.GlyphRect = function(x,y,width,height,xOffset,yOffset) {
	if(yOffset == null) yOffset = 0;
	if(xOffset == null) xOffset = 0;
	this.x = x;
	this.y = y;
	this.xOffset = xOffset;
	this.yOffset = yOffset;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.graphics.GlyphRect"] = lime.graphics.GlyphRect;
lime.graphics.GlyphRect.__name__ = ["lime","graphics","GlyphRect"];
lime.graphics.GlyphRect.prototype = {
	__class__: lime.graphics.GlyphRect
};
lime.graphics.Image = function(buffer,offsetX,offsetY,width,height,color,type) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.width = width;
	this.height = height;
	if(type == null) {
		if(lime.app.Application.current != null && lime.app.Application.current.renderers[0] != null) {
			var _g = lime.app.Application.current.renderers[0].context;
			switch(_g[1]) {
			case 2:case 1:
				this.type = lime.graphics.ImageType.CANVAS;
				break;
			case 3:
				this.type = lime.graphics.ImageType.FLASH;
				break;
			default:
				this.type = lime.graphics.ImageType.DATA;
			}
		} else this.type = lime.graphics.ImageType.DATA;
	} else this.type = type;
	if(buffer == null) {
		if(width > 0 && height > 0) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 0:
				this.buffer = new lime.graphics.ImageBuffer(null,width,height);
				lime.graphics.utils.ImageCanvasUtil.createCanvas(this,width,height);
				if(color != null) this.fillRect(new lime.math.Rectangle(0,0,width,height),color);
				break;
			case 1:
				this.buffer = new lime.graphics.ImageBuffer(new Uint8Array(width * height * 4),width,height);
				if(color != null) this.fillRect(new lime.math.Rectangle(0,0,width,height),color);
				break;
			case 2:
				break;
			default:
			}
		}
	} else this.__fromImageBuffer(buffer);
};
$hxClasses["lime.graphics.Image"] = lime.graphics.Image;
lime.graphics.Image.__name__ = ["lime","graphics","Image"];
lime.graphics.Image.__base64Encoder = null;
lime.graphics.Image.fromBase64 = function(base64,type,onload) {
	var image = new lime.graphics.Image();
	image.__fromBase64(base64,type,onload);
	return image;
};
lime.graphics.Image.fromBitmapData = function(bitmapData) {
	var buffer = new lime.graphics.ImageBuffer(null,bitmapData.width,bitmapData.height);
	buffer.__srcBitmapData = bitmapData;
	return new lime.graphics.Image(buffer);
};
lime.graphics.Image.fromBytes = function(bytes,onload) {
	var image = new lime.graphics.Image();
	image.__fromBytes(bytes,onload);
	return image;
};
lime.graphics.Image.fromCanvas = function(canvas) {
	var buffer = new lime.graphics.ImageBuffer(null,canvas.width,canvas.height);
	buffer.set_src(canvas);
	return new lime.graphics.Image(buffer);
};
lime.graphics.Image.fromFile = function(path,onload,onerror) {
	var image = new lime.graphics.Image();
	image.__fromFile(path,onload,onerror);
	return image;
};
lime.graphics.Image.fromImageElement = function(image) {
	var buffer = new lime.graphics.ImageBuffer(null,image.width,image.height);
	buffer.set_src(image);
	return new lime.graphics.Image(buffer);
};
lime.graphics.Image.__base64Encode = function(bytes) {
	var extension;
	var _g = bytes.length % 3;
	switch(_g) {
	case 1:
		extension = "==";
		break;
	case 2:
		extension = "=";
		break;
	default:
		extension = "";
	}
	if(lime.graphics.Image.__base64Encoder == null) lime.graphics.Image.__base64Encoder = new haxe.crypto.BaseCode(haxe.io.Bytes.ofString(lime.graphics.Image.__base64Chars));
	return lime.graphics.Image.__base64Encoder.encodeBytes(haxe.io.Bytes.ofData(bytes.byteView)).toString() + extension;
};
lime.graphics.Image.__isJPG = function(bytes) {
	bytes.position = 0;
	return bytes.readUnsignedByte() == 255 && bytes.readUnsignedByte() == 216;
};
lime.graphics.Image.__isPNG = function(bytes) {
	bytes.position = 0;
	return bytes.readUnsignedByte() == 137 && bytes.readUnsignedByte() == 80 && bytes.readUnsignedByte() == 78 && bytes.readUnsignedByte() == 71 && bytes.readUnsignedByte() == 13 && bytes.readUnsignedByte() == 10 && bytes.readUnsignedByte() == 26 && bytes.readUnsignedByte() == 10;
};
lime.graphics.Image.__isGIF = function(bytes) {
	bytes.position = 0;
	if(bytes.readUnsignedByte() == 71 && bytes.readUnsignedByte() == 73 && bytes.readUnsignedByte() == 70 && bytes.readUnsignedByte() == 56) {
		var b = bytes.readUnsignedByte();
		return (b == 55 || b == 57) && bytes.readUnsignedByte() == 97;
	}
	return false;
};
lime.graphics.Image.prototype = {
	clone: function() {
		lime.graphics.utils.ImageCanvasUtil.sync(this);
		var image = new lime.graphics.Image(this.buffer.clone(),this.offsetX,this.offsetY,this.width,this.height,null,this.type);
		return image;
	}
	,colorTransform: function(rect,colorMatrix) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.colorTransform(this,rect,colorMatrix);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.colorTransform(this,rect,colorMatrix);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.colorTransform(rect.__toFlashRectangle(),lime.math._ColorMatrix.ColorMatrix_Impl_.__toFlashColorTransform(colorMatrix));
			break;
		default:
		}
	}
	,copyChannel: function(sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
		sourceRect = this.__clipRect(sourceRect);
		if(this.buffer == null || sourceRect == null) return;
		if(destChannel == lime.graphics.ImageChannel.ALPHA && !this.get_transparent()) return;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceImage.width) sourceRect.width = sourceImage.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceImage.height) sourceRect.height = sourceImage.height - sourceRect.y;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
			break;
		case 2:
			var srcChannel;
			switch(sourceChannel[1]) {
			case 0:
				srcChannel = 1;
				break;
			case 1:
				srcChannel = 2;
				break;
			case 2:
				srcChannel = 4;
				break;
			case 3:
				srcChannel = 8;
				break;
			}
			var dstChannel;
			switch(destChannel[1]) {
			case 0:
				dstChannel = 1;
				break;
			case 1:
				dstChannel = 2;
				break;
			case 2:
				dstChannel = 4;
				break;
			case 3:
				dstChannel = 8;
				break;
			}
			sourceRect.offset(sourceImage.offsetX,sourceImage.offsetY);
			destPoint.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.copyChannel(sourceImage.buffer.get_src(),sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),srcChannel,dstChannel);
			break;
		default:
		}
	}
	,copyPixels: function(sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(this.buffer == null || sourceImage == null) return;
		if(sourceRect.x + sourceRect.width > sourceImage.width) sourceRect.width = sourceImage.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceImage.height) sourceRect.height = sourceImage.height - sourceRect.y;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.convertToCanvas(this);
			lime.graphics.utils.ImageCanvasUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageCanvasUtil.convertToData(sourceImage);
			lime.graphics.utils.ImageDataUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
			break;
		case 2:
			sourceRect.offset(sourceImage.offsetX,sourceImage.offsetY);
			destPoint.offset(this.offsetX,this.offsetY);
			if(alphaImage != null && alphaPoint != null) alphaPoint.offset(alphaImage.offsetX,alphaImage.offsetY);
			this.buffer.__srcBitmapData.copyPixels(sourceImage.buffer.__srcBitmapData,sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),alphaImage != null?alphaImage.buffer.get_src():null,alphaPoint != null?alphaPoint.__toFlashPoint():null,mergeAlpha);
			break;
		default:
		}
	}
	,encode: function(format,quality) {
		if(quality == null) quality = 90;
		if(format == null) format = "png";
		return null;
	}
	,fillRect: function(rect,color) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.fillRect(this,rect,color);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.fillRect(this,rect,color);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.fillRect(rect.__toFlashRectangle(),color);
			break;
		default:
		}
	}
	,floodFill: function(x,y,color) {
		if(this.buffer == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.floodFill(this,x,y,color);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.floodFill(this,x,y,color);
			break;
		case 2:
			this.buffer.__srcBitmapData.floodFill(x + this.offsetX,y + this.offsetY,color);
			break;
		default:
		}
	}
	,getPixel: function(x,y) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return lime.graphics.utils.ImageCanvasUtil.getPixel(this,x,y);
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			return lime.graphics.utils.ImageDataUtil.getPixel(this,x,y);
		case 2:
			return this.buffer.__srcBitmapData.getPixel(x + this.offsetX,y + this.offsetY);
		default:
			return 0;
		}
	}
	,getPixel32: function(x,y) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return lime.graphics.utils.ImageCanvasUtil.getPixel32(this,x,y);
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			return lime.graphics.utils.ImageDataUtil.getPixel32(this,x,y);
		case 2:
			return this.buffer.__srcBitmapData.getPixel32(x + this.offsetX,y + this.offsetY);
		default:
			return 0;
		}
	}
	,getPixels: function(rect) {
		if(this.buffer == null) return null;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return lime.graphics.utils.ImageCanvasUtil.getPixels(this,rect);
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			return lime.graphics.utils.ImageDataUtil.getPixels(this,rect);
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			return this.buffer.__srcBitmapData.getPixels(rect.__toFlashRectangle());
		default:
			return null;
		}
	}
	,merge: function(sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
		if(this.buffer == null || sourceImage == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.convertToCanvas(this);
			lime.graphics.utils.ImageCanvasUtil.merge(this,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageCanvasUtil.convertToData(sourceImage);
			lime.graphics.utils.ImageDataUtil.merge(this,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
			break;
		case 2:
			sourceRect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.merge(sourceImage.buffer.__srcBitmapData,sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
			break;
		default:
			return null;
		}
	}
	,resize: function(newWidth,newHeight) {
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.resize(this,newWidth,newHeight);
			break;
		case 1:
			lime.graphics.utils.ImageDataUtil.resize(this,newWidth,newHeight);
			break;
		case 2:
			break;
		default:
		}
		this.buffer.width = newWidth;
		this.buffer.height = newHeight;
		this.offsetX = 0;
		this.offsetY = 0;
		this.width = newWidth;
		this.height = newHeight;
	}
	,setPixel: function(x,y,color) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.setPixel(this,x,y,color);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.setPixel(this,x,y,color);
			break;
		case 2:
			this.buffer.__srcBitmapData.setPixel(x + this.offsetX,y + this.offsetX,color);
			break;
		default:
		}
	}
	,setPixel32: function(x,y,color) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.setPixel32(this,x,y,color);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.setPixel32(this,x,y,color);
			break;
		case 2:
			this.buffer.__srcBitmapData.setPixel32(x + this.offsetX,y + this.offsetY,color);
			break;
		default:
		}
	}
	,setPixels: function(rect,byteArray) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.setPixels(this,rect,byteArray);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.setPixels(this,rect,byteArray);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.setPixels(rect.__toFlashRectangle(),byteArray);
			break;
		default:
		}
	}
	,__clipRect: function(r) {
		if(r == null) return null;
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= this.width) {
			r.width -= r.x + r.width - this.width;
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= this.height) {
			r.height -= r.y + r.height - this.height;
			if(r.height <= 0) return null;
		}
		return r;
	}
	,__fromBase64: function(base64,type,onload) {
		var _g = this;
		var image = new Image();
		var image_onLoaded = function(event) {
			_g.buffer = new lime.graphics.ImageBuffer(null,image.width,image.height);
			_g.buffer.__srcImage = image;
			_g.offsetX = 0;
			_g.offsetY = 0;
			_g.width = _g.buffer.width;
			_g.height = _g.buffer.height;
			if(onload != null) onload(_g);
		};
		image.addEventListener("load",image_onLoaded,false);
		image.src = "data:" + type + ";base64," + base64;
	}
	,__fromBytes: function(bytes,onload) {
		var type = "";
		if(lime.graphics.Image.__isPNG(bytes)) type = "image/png"; else if(lime.graphics.Image.__isJPG(bytes)) type = "image/jpeg"; else if(lime.graphics.Image.__isGIF(bytes)) type = "image/gif"; else throw "Image tried to read a PNG/JPG ByteArray, but found an invalid header.";
		this.__fromBase64(lime.graphics.Image.__base64Encode(bytes),type,onload);
	}
	,__fromFile: function(path,onload,onerror) {
		var _g = this;
		var image = new Image();
		image.onload = function(_) {
			_g.buffer = new lime.graphics.ImageBuffer(null,image.width,image.height);
			_g.buffer.__srcImage = image;
			_g.width = image.width;
			_g.height = image.height;
			if(onload != null) onload(_g);
		};
		image.onerror = function(_1) {
			if(onerror != null) onerror();
		};
		image.src = path;
		if(image.complete) {
		}
	}
	,__fromImageBuffer: function(buffer) {
		this.buffer = buffer;
		if(buffer != null) {
			if(this.width == 0) this.width = buffer.width;
			if(this.height == 0) this.height = buffer.height;
		}
	}
	,get_data: function() {
		if(this.buffer.data == null && this.buffer.width > 0 && this.buffer.height > 0) {
			lime.graphics.utils.ImageCanvasUtil.convertToCanvas(this);
			lime.graphics.utils.ImageCanvasUtil.createImageData(this);
		}
		return this.buffer.data;
	}
	,set_data: function(value) {
		return this.buffer.data = value;
	}
	,get_powerOfTwo: function() {
		return this.buffer.width != 0 && (this.buffer.width & ~this.buffer.width + 1) == this.buffer.width && (this.buffer.height != 0 && (this.buffer.height & ~this.buffer.height + 1) == this.buffer.height);
	}
	,set_powerOfTwo: function(value) {
		if(value != this.get_powerOfTwo()) {
			var newWidth = 1;
			var newHeight = 1;
			while(newWidth < this.buffer.width) newWidth <<= 1;
			while(newHeight < this.buffer.height) newHeight <<= 1;
			var _g = this.type;
			switch(_g[1]) {
			case 0:
				break;
			case 1:
				lime.graphics.utils.ImageDataUtil.resizeBuffer(this,newWidth,newHeight);
				break;
			case 2:
				break;
			default:
			}
		}
		return value;
	}
	,get_premultiplied: function() {
		return this.buffer.premultiplied;
	}
	,set_premultiplied: function(value) {
		if(value && !this.buffer.premultiplied) {
			var _g = this.type;
			switch(_g[1]) {
			case 1:
				lime.graphics.utils.ImageCanvasUtil.convertToData(this);
				lime.graphics.utils.ImageDataUtil.multiplyAlpha(this);
				break;
			default:
			}
		} else if(!value && this.buffer.premultiplied) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 1:
				lime.graphics.utils.ImageCanvasUtil.convertToData(this);
				lime.graphics.utils.ImageDataUtil.unmultiplyAlpha(this);
				break;
			default:
			}
		}
		return value;
	}
	,get_rect: function() {
		return new lime.math.Rectangle(0,0,this.width,this.height);
	}
	,get_src: function() {
		return this.buffer.get_src();
	}
	,set_src: function(value) {
		return this.buffer.set_src(value);
	}
	,get_transparent: function() {
		return this.buffer.transparent;
	}
	,set_transparent: function(value) {
		return this.buffer.transparent = value;
	}
	,__class__: lime.graphics.Image
	,__properties__: {set_transparent:"set_transparent",get_transparent:"get_transparent",set_src:"set_src",get_src:"get_src",get_rect:"get_rect",set_premultiplied:"set_premultiplied",get_premultiplied:"get_premultiplied",set_powerOfTwo:"set_powerOfTwo",get_powerOfTwo:"get_powerOfTwo",set_data:"set_data",get_data:"get_data"}
};
lime.graphics.ImageChannel = $hxClasses["lime.graphics.ImageChannel"] = { __ename__ : true, __constructs__ : ["RED","GREEN","BLUE","ALPHA"] };
lime.graphics.ImageChannel.RED = ["RED",0];
lime.graphics.ImageChannel.RED.toString = $estr;
lime.graphics.ImageChannel.RED.__enum__ = lime.graphics.ImageChannel;
lime.graphics.ImageChannel.GREEN = ["GREEN",1];
lime.graphics.ImageChannel.GREEN.toString = $estr;
lime.graphics.ImageChannel.GREEN.__enum__ = lime.graphics.ImageChannel;
lime.graphics.ImageChannel.BLUE = ["BLUE",2];
lime.graphics.ImageChannel.BLUE.toString = $estr;
lime.graphics.ImageChannel.BLUE.__enum__ = lime.graphics.ImageChannel;
lime.graphics.ImageChannel.ALPHA = ["ALPHA",3];
lime.graphics.ImageChannel.ALPHA.toString = $estr;
lime.graphics.ImageChannel.ALPHA.__enum__ = lime.graphics.ImageChannel;
lime.graphics.ImageBuffer = function(data,width,height,bitsPerPixel) {
	if(bitsPerPixel == null) bitsPerPixel = 4;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.data = data;
	this.width = width;
	this.height = height;
	this.bitsPerPixel = bitsPerPixel;
	this.transparent = true;
};
$hxClasses["lime.graphics.ImageBuffer"] = lime.graphics.ImageBuffer;
lime.graphics.ImageBuffer.__name__ = ["lime","graphics","ImageBuffer"];
lime.graphics.ImageBuffer.prototype = {
	clone: function() {
		var buffer = new lime.graphics.ImageBuffer(this.data,this.width,this.height,this.bitsPerPixel);
		buffer.set_src(this.get_src());
		buffer.premultiplied = this.premultiplied;
		buffer.transparent = this.transparent;
		return buffer;
	}
	,get_src: function() {
		if(this.__srcImage != null) return this.__srcImage;
		return this.__srcCanvas;
	}
	,set_src: function(value) {
		if(js.Boot.__instanceof(value,Image)) this.__srcImage = value; else if(js.Boot.__instanceof(value,HTMLCanvasElement)) {
			this.__srcCanvas = value;
			this.__srcContext = this.__srcCanvas.getContext("2d");
		}
		return value;
	}
	,__class__: lime.graphics.ImageBuffer
	,__properties__: {set_src:"set_src",get_src:"get_src"}
};
lime.graphics.ImageType = $hxClasses["lime.graphics.ImageType"] = { __ename__ : true, __constructs__ : ["CANVAS","DATA","FLASH","CUSTOM"] };
lime.graphics.ImageType.CANVAS = ["CANVAS",0];
lime.graphics.ImageType.CANVAS.toString = $estr;
lime.graphics.ImageType.CANVAS.__enum__ = lime.graphics.ImageType;
lime.graphics.ImageType.DATA = ["DATA",1];
lime.graphics.ImageType.DATA.toString = $estr;
lime.graphics.ImageType.DATA.__enum__ = lime.graphics.ImageType;
lime.graphics.ImageType.FLASH = ["FLASH",2];
lime.graphics.ImageType.FLASH.toString = $estr;
lime.graphics.ImageType.FLASH.__enum__ = lime.graphics.ImageType;
lime.graphics.ImageType.CUSTOM = ["CUSTOM",3];
lime.graphics.ImageType.CUSTOM.toString = $estr;
lime.graphics.ImageType.CUSTOM.__enum__ = lime.graphics.ImageType;
lime.graphics.RenderContext = $hxClasses["lime.graphics.RenderContext"] = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CONSOLE","CUSTOM"] };
lime.graphics.RenderContext.OPENGL = function(gl) { var $x = ["OPENGL",0,gl]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.CANVAS = function(context) { var $x = ["CANVAS",1,context]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.DOM = function(element) { var $x = ["DOM",2,element]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.FLASH = function(stage) { var $x = ["FLASH",3,stage]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.CONSOLE = function(context) { var $x = ["CONSOLE",4,context]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.CUSTOM = function(data) { var $x = ["CUSTOM",5,data]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.Renderer = function(window) {
	this.onRender = new lime.app.Event();
	this.onRenderContextRestored = new lime.app.Event();
	this.onRenderContextLost = new lime.app.Event();
	this.window = window;
	this.backend = new lime._backend.html5.HTML5Renderer(this);
	this.window.currentRenderer = this;
};
$hxClasses["lime.graphics.Renderer"] = lime.graphics.Renderer;
lime.graphics.Renderer.__name__ = ["lime","graphics","Renderer"];
lime.graphics.Renderer.prototype = {
	create: function() {
		this.backend.create();
	}
	,flip: function() {
		this.backend.flip();
	}
	,render: function() {
		this.backend.render();
	}
	,__class__: lime.graphics.Renderer
};
lime.graphics.format = {};
lime.graphics.format.BMP = function() { };
$hxClasses["lime.graphics.format.BMP"] = lime.graphics.format.BMP;
lime.graphics.format.BMP.__name__ = ["lime","graphics","format","BMP"];
lime.graphics.format.BMP.encode = function(image,type) {
	if(type == null) type = lime.graphics.format.BMPType.RGB;
	var fileHeaderLength = 14;
	var infoHeaderLength = 40;
	var pixelValuesLength = image.width * image.height * 4;
	switch(type[1]) {
	case 1:
		infoHeaderLength = 108;
		break;
	case 2:
		fileHeaderLength = 0;
		pixelValuesLength += image.width * image.height;
		break;
	default:
	}
	var data = new lime.utils.ByteArray(fileHeaderLength + infoHeaderLength + pixelValuesLength);
	if(fileHeaderLength > 0) {
		data.writeByte(66);
		data.writeByte(77);
		data.writeInt(data.length);
		data.writeInt(0);
		data.writeInt(fileHeaderLength + infoHeaderLength);
	}
	data.writeInt(infoHeaderLength);
	data.writeInt(image.width);
	if(type == lime.graphics.format.BMPType.ICO) data.writeInt(image.height * 2); else data.writeInt(image.height);
	data.writeShort(1);
	data.writeShort(32);
	switch(type[1]) {
	case 1:
		data.writeInt(3);
		break;
	default:
		data.writeInt(0);
	}
	data.writeInt(pixelValuesLength);
	data.writeInt(11824);
	data.writeInt(11824);
	data.writeInt(0);
	data.writeInt(0);
	if(type == lime.graphics.format.BMPType.BITFIELD) {
		data.writeInt(16711680);
		data.writeInt(65280);
		data.writeInt(255);
		data.writeInt(-16777216);
		data.writeByte(32);
		data.writeByte(110);
		data.writeByte(105);
		data.writeByte(87);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
		data.writeInt(0);
	}
	var pixels = image.getPixels(new lime.math.Rectangle(0,0,image.width,image.height));
	var a;
	var r;
	var g;
	var b;
	if(type != lime.graphics.format.BMPType.ICO) {
		var _g1 = 0;
		var _g = image.height;
		while(_g1 < _g) {
			var y = _g1++;
			pixels.position = (image.height - 1 - y) * 4 * image.width;
			var _g3 = 0;
			var _g2 = image.width;
			while(_g3 < _g2) {
				var x = _g3++;
				a = pixels.readByte();
				r = pixels.readByte();
				g = pixels.readByte();
				b = pixels.readByte();
				data.writeByte(b);
				data.writeByte(g);
				data.writeByte(r);
				data.writeByte(a);
			}
		}
	} else {
		var andMask = new lime.utils.ByteArray(image.width * image.height);
		var _g11 = 0;
		var _g4 = image.height;
		while(_g11 < _g4) {
			var y1 = _g11++;
			pixels.position = (image.height - 1 - y1) * 4 * image.width;
			var _g31 = 0;
			var _g21 = image.width;
			while(_g31 < _g21) {
				var x1 = _g31++;
				a = pixels.readByte();
				r = pixels.readByte();
				g = pixels.readByte();
				b = pixels.readByte();
				data.writeByte(b);
				data.writeByte(g);
				data.writeByte(r);
				data.writeByte(a);
				andMask.writeByte(0);
			}
		}
		data.writeBytes(andMask);
	}
	return data;
};
lime.graphics.format.BMPType = $hxClasses["lime.graphics.format.BMPType"] = { __ename__ : true, __constructs__ : ["RGB","BITFIELD","ICO"] };
lime.graphics.format.BMPType.RGB = ["RGB",0];
lime.graphics.format.BMPType.RGB.toString = $estr;
lime.graphics.format.BMPType.RGB.__enum__ = lime.graphics.format.BMPType;
lime.graphics.format.BMPType.BITFIELD = ["BITFIELD",1];
lime.graphics.format.BMPType.BITFIELD.toString = $estr;
lime.graphics.format.BMPType.BITFIELD.__enum__ = lime.graphics.format.BMPType;
lime.graphics.format.BMPType.ICO = ["ICO",2];
lime.graphics.format.BMPType.ICO.toString = $estr;
lime.graphics.format.BMPType.ICO.__enum__ = lime.graphics.format.BMPType;
lime.graphics.format.JPEG = function() { };
$hxClasses["lime.graphics.format.JPEG"] = lime.graphics.format.JPEG;
lime.graphics.format.JPEG.__name__ = ["lime","graphics","format","JPEG"];
lime.graphics.format.JPEG.encode = function(image,quality) {
	return null;
};
lime.graphics.format.PNG = function() { };
$hxClasses["lime.graphics.format.PNG"] = lime.graphics.format.PNG;
lime.graphics.format.PNG.__name__ = ["lime","graphics","format","PNG"];
lime.graphics.format.PNG.encode = function(image) {
	return null;
};
lime.graphics.opengl = {};
lime.graphics.opengl.GL = function() { };
$hxClasses["lime.graphics.opengl.GL"] = lime.graphics.opengl.GL;
lime.graphics.opengl.GL.__name__ = ["lime","graphics","opengl","GL"];
lime.graphics.opengl.GL.__properties__ = {get_version:"get_version"}
lime.graphics.opengl.GL.version = null;
lime.graphics.opengl.GL.context = null;
lime.graphics.opengl.GL.activeTexture = function(texture) {
	lime.graphics.opengl.GL.context.activeTexture(texture);
};
lime.graphics.opengl.GL.attachShader = function(program,shader) {
	lime.graphics.opengl.GL.context.attachShader(program,shader);
};
lime.graphics.opengl.GL.bindAttribLocation = function(program,index,name) {
	lime.graphics.opengl.GL.context.bindAttribLocation(program,index,name);
};
lime.graphics.opengl.GL.bindBuffer = function(target,buffer) {
	lime.graphics.opengl.GL.context.bindBuffer(target,buffer);
};
lime.graphics.opengl.GL.bindFramebuffer = function(target,framebuffer) {
	lime.graphics.opengl.GL.context.bindFramebuffer(target,framebuffer);
};
lime.graphics.opengl.GL.bindRenderbuffer = function(target,renderbuffer) {
	lime.graphics.opengl.GL.context.bindRenderbuffer(target,renderbuffer);
};
lime.graphics.opengl.GL.bindTexture = function(target,texture) {
	lime.graphics.opengl.GL.context.bindTexture(target,texture);
};
lime.graphics.opengl.GL.blendColor = function(red,green,blue,alpha) {
	lime.graphics.opengl.GL.context.blendColor(red,green,blue,alpha);
};
lime.graphics.opengl.GL.blendEquation = function(mode) {
	lime.graphics.opengl.GL.context.blendEquation(mode);
};
lime.graphics.opengl.GL.blendEquationSeparate = function(modeRGB,modeAlpha) {
	lime.graphics.opengl.GL.context.blendEquationSeparate(modeRGB,modeAlpha);
};
lime.graphics.opengl.GL.blendFunc = function(sfactor,dfactor) {
	lime.graphics.opengl.GL.context.blendFunc(sfactor,dfactor);
};
lime.graphics.opengl.GL.blendFuncSeparate = function(srcRGB,dstRGB,srcAlpha,dstAlpha) {
	lime.graphics.opengl.GL.context.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
};
lime.graphics.opengl.GL.bufferData = function(target,data,usage) {
	lime.graphics.opengl.GL.context.bufferData(target,data,usage);
};
lime.graphics.opengl.GL.bufferSubData = function(target,offset,data) {
	lime.graphics.opengl.GL.context.bufferSubData(target,offset,data);
};
lime.graphics.opengl.GL.checkFramebufferStatus = function(target) {
	return lime.graphics.opengl.GL.context.checkFramebufferStatus(target);
};
lime.graphics.opengl.GL.clear = function(mask) {
	lime.graphics.opengl.GL.context.clear(mask);
};
lime.graphics.opengl.GL.clearColor = function(red,green,blue,alpha) {
	lime.graphics.opengl.GL.context.clearColor(red,green,blue,alpha);
};
lime.graphics.opengl.GL.clearDepth = function(depth) {
	lime.graphics.opengl.GL.context.clearDepth(depth);
};
lime.graphics.opengl.GL.clearStencil = function(s) {
	lime.graphics.opengl.GL.context.clearStencil(s);
};
lime.graphics.opengl.GL.colorMask = function(red,green,blue,alpha) {
	lime.graphics.opengl.GL.context.colorMask(red,green,blue,alpha);
};
lime.graphics.opengl.GL.compileShader = function(shader) {
	lime.graphics.opengl.GL.context.compileShader(shader);
};
lime.graphics.opengl.GL.compressedTexImage2D = function(target,level,internalformat,width,height,border,data) {
	lime.graphics.opengl.GL.context.compressedTexImage2D(target,level,internalformat,width,height,border,data);
};
lime.graphics.opengl.GL.compressedTexSubImage2D = function(target,level,xoffset,yoffset,width,height,format,data) {
	lime.graphics.opengl.GL.context.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
};
lime.graphics.opengl.GL.copyTexImage2D = function(target,level,internalformat,x,y,width,height,border) {
	lime.graphics.opengl.GL.context.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
};
lime.graphics.opengl.GL.copyTexSubImage2D = function(target,level,xoffset,yoffset,x,y,width,height) {
	lime.graphics.opengl.GL.context.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
};
lime.graphics.opengl.GL.createBuffer = function() {
	return lime.graphics.opengl.GL.context.createBuffer();
};
lime.graphics.opengl.GL.createFramebuffer = function() {
	return lime.graphics.opengl.GL.context.createFramebuffer();
};
lime.graphics.opengl.GL.createProgram = function() {
	return lime.graphics.opengl.GL.context.createProgram();
};
lime.graphics.opengl.GL.createRenderbuffer = function() {
	return lime.graphics.opengl.GL.context.createRenderbuffer();
};
lime.graphics.opengl.GL.createShader = function(type) {
	return lime.graphics.opengl.GL.context.createShader(type);
};
lime.graphics.opengl.GL.createTexture = function() {
	return lime.graphics.opengl.GL.context.createTexture();
};
lime.graphics.opengl.GL.cullFace = function(mode) {
	lime.graphics.opengl.GL.context.cullFace(mode);
};
lime.graphics.opengl.GL.deleteBuffer = function(buffer) {
	lime.graphics.opengl.GL.context.deleteBuffer(buffer);
};
lime.graphics.opengl.GL.deleteFramebuffer = function(framebuffer) {
	lime.graphics.opengl.GL.context.deleteFramebuffer(framebuffer);
};
lime.graphics.opengl.GL.deleteProgram = function(program) {
	lime.graphics.opengl.GL.context.deleteProgram(program);
};
lime.graphics.opengl.GL.deleteRenderbuffer = function(renderbuffer) {
	lime.graphics.opengl.GL.context.deleteRenderbuffer(renderbuffer);
};
lime.graphics.opengl.GL.deleteShader = function(shader) {
	lime.graphics.opengl.GL.context.deleteShader(shader);
};
lime.graphics.opengl.GL.deleteTexture = function(texture) {
	lime.graphics.opengl.GL.context.deleteTexture(texture);
};
lime.graphics.opengl.GL.depthFunc = function(func) {
	lime.graphics.opengl.GL.context.depthFunc(func);
};
lime.graphics.opengl.GL.depthMask = function(flag) {
	lime.graphics.opengl.GL.context.depthMask(flag);
};
lime.graphics.opengl.GL.depthRange = function(zNear,zFar) {
	lime.graphics.opengl.GL.context.depthRange(zNear,zFar);
};
lime.graphics.opengl.GL.detachShader = function(program,shader) {
	lime.graphics.opengl.GL.context.detachShader(program,shader);
};
lime.graphics.opengl.GL.disable = function(cap) {
	lime.graphics.opengl.GL.context.disable(cap);
};
lime.graphics.opengl.GL.disableVertexAttribArray = function(index) {
	lime.graphics.opengl.GL.context.disableVertexAttribArray(index);
};
lime.graphics.opengl.GL.drawArrays = function(mode,first,count) {
	lime.graphics.opengl.GL.context.drawArrays(mode,first,count);
};
lime.graphics.opengl.GL.drawElements = function(mode,count,type,offset) {
	lime.graphics.opengl.GL.context.drawElements(mode,count,type,offset);
};
lime.graphics.opengl.GL.enable = function(cap) {
	lime.graphics.opengl.GL.context.enable(cap);
};
lime.graphics.opengl.GL.enableVertexAttribArray = function(index) {
	lime.graphics.opengl.GL.context.enableVertexAttribArray(index);
};
lime.graphics.opengl.GL.finish = function() {
	lime.graphics.opengl.GL.context.finish();
};
lime.graphics.opengl.GL.flush = function() {
	lime.graphics.opengl.GL.context.flush();
};
lime.graphics.opengl.GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	lime.graphics.opengl.GL.context.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
};
lime.graphics.opengl.GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	lime.graphics.opengl.GL.context.framebufferTexture2D(target,attachment,textarget,texture,level);
};
lime.graphics.opengl.GL.frontFace = function(mode) {
	lime.graphics.opengl.GL.context.frontFace(mode);
};
lime.graphics.opengl.GL.generateMipmap = function(target) {
	lime.graphics.opengl.GL.context.generateMipmap(target);
};
lime.graphics.opengl.GL.getActiveAttrib = function(program,index) {
	return lime.graphics.opengl.GL.context.getActiveAttrib(program,index);
};
lime.graphics.opengl.GL.getActiveUniform = function(program,index) {
	return lime.graphics.opengl.GL.context.getActiveUniform(program,index);
};
lime.graphics.opengl.GL.getAttachedShaders = function(program) {
	return lime.graphics.opengl.GL.context.getAttachedShaders(program);
};
lime.graphics.opengl.GL.getAttribLocation = function(program,name) {
	return lime.graphics.opengl.GL.context.getAttribLocation(program,name);
};
lime.graphics.opengl.GL.getBufferParameter = function(target,pname) {
	return lime.graphics.opengl.GL.context.getBufferParameter(target,pname);
};
lime.graphics.opengl.GL.getContextAttributes = function() {
	return lime.graphics.opengl.GL.context.getContextAttributes();
};
lime.graphics.opengl.GL.getError = function() {
	return lime.graphics.opengl.GL.context.getError();
};
lime.graphics.opengl.GL.getExtension = function(name) {
	return lime.graphics.opengl.GL.context.getExtension(name);
};
lime.graphics.opengl.GL.getFramebufferAttachmentParameter = function(target,attachment,pname) {
	return lime.graphics.opengl.GL.context.getFramebufferAttachmentParameter(target,attachment,pname);
};
lime.graphics.opengl.GL.getParameter = function(pname) {
	return lime.graphics.opengl.GL.context.getParameter(pname);
};
lime.graphics.opengl.GL.getProgramInfoLog = function(program) {
	return lime.graphics.opengl.GL.context.getProgramInfoLog(program);
};
lime.graphics.opengl.GL.getProgramParameter = function(program,pname) {
	return lime.graphics.opengl.GL.context.getProgramParameter(program,pname);
};
lime.graphics.opengl.GL.getRenderbufferParameter = function(target,pname) {
	return lime.graphics.opengl.GL.context.getRenderbufferParameter(target,pname);
};
lime.graphics.opengl.GL.getShaderInfoLog = function(shader) {
	return lime.graphics.opengl.GL.context.getShaderInfoLog(shader);
};
lime.graphics.opengl.GL.getShaderParameter = function(shader,pname) {
	return lime.graphics.opengl.GL.context.getShaderParameter(shader,pname);
};
lime.graphics.opengl.GL.getShaderPrecisionFormat = function(shadertype,precisiontype) {
	return lime.graphics.opengl.GL.context.getShaderPrecisionFormat(shadertype,precisiontype);
};
lime.graphics.opengl.GL.getShaderSource = function(shader) {
	return lime.graphics.opengl.GL.context.getShaderSource(shader);
};
lime.graphics.opengl.GL.getSupportedExtensions = function() {
	return lime.graphics.opengl.GL.context.getSupportedExtensions();
};
lime.graphics.opengl.GL.getTexParameter = function(target,pname) {
	return lime.graphics.opengl.GL.context.getTexParameter(target,pname);
};
lime.graphics.opengl.GL.getUniform = function(program,location) {
	return lime.graphics.opengl.GL.context.getUniform(program,location);
};
lime.graphics.opengl.GL.getUniformLocation = function(program,name) {
	return lime.graphics.opengl.GL.context.getUniformLocation(program,name);
};
lime.graphics.opengl.GL.getVertexAttrib = function(index,pname) {
	return lime.graphics.opengl.GL.context.getVertexAttrib(index,pname);
};
lime.graphics.opengl.GL.getVertexAttribOffset = function(index,pname) {
	return lime.graphics.opengl.GL.context.getVertexAttribOffset(index,pname);
};
lime.graphics.opengl.GL.hint = function(target,mode) {
	lime.graphics.opengl.GL.context.hint(target,mode);
};
lime.graphics.opengl.GL.isBuffer = function(buffer) {
	return lime.graphics.opengl.GL.context.isBuffer(buffer);
};
lime.graphics.opengl.GL.isContextLost = function() {
	return lime.graphics.opengl.GL.context.isContextLost();
};
lime.graphics.opengl.GL.isEnabled = function(cap) {
	return lime.graphics.opengl.GL.context.isEnabled(cap);
};
lime.graphics.opengl.GL.isFramebuffer = function(framebuffer) {
	return lime.graphics.opengl.GL.context.isFramebuffer(framebuffer);
};
lime.graphics.opengl.GL.isProgram = function(program) {
	return lime.graphics.opengl.GL.context.isProgram(program);
};
lime.graphics.opengl.GL.isRenderbuffer = function(renderbuffer) {
	return lime.graphics.opengl.GL.context.isRenderbuffer(renderbuffer);
};
lime.graphics.opengl.GL.isShader = function(shader) {
	return lime.graphics.opengl.GL.context.isShader(shader);
};
lime.graphics.opengl.GL.isTexture = function(texture) {
	return lime.graphics.opengl.GL.context.isTexture(texture);
};
lime.graphics.opengl.GL.lineWidth = function(width) {
	lime.graphics.opengl.GL.context.lineWidth(width);
};
lime.graphics.opengl.GL.linkProgram = function(program) {
	lime.graphics.opengl.GL.context.linkProgram(program);
};
lime.graphics.opengl.GL.pixelStorei = function(pname,param) {
	lime.graphics.opengl.GL.context.pixelStorei(pname,param);
};
lime.graphics.opengl.GL.polygonOffset = function(factor,units) {
	lime.graphics.opengl.GL.context.polygonOffset(factor,units);
};
lime.graphics.opengl.GL.readPixels = function(x,y,width,height,format,type,pixels) {
	lime.graphics.opengl.GL.context.readPixels(x,y,width,height,format,type,pixels);
};
lime.graphics.opengl.GL.renderbufferStorage = function(target,internalformat,width,height) {
	lime.graphics.opengl.GL.context.renderbufferStorage(target,internalformat,width,height);
};
lime.graphics.opengl.GL.sampleCoverage = function(value,invert) {
	lime.graphics.opengl.GL.context.sampleCoverage(value,invert);
};
lime.graphics.opengl.GL.scissor = function(x,y,width,height) {
	lime.graphics.opengl.GL.context.scissor(x,y,width,height);
};
lime.graphics.opengl.GL.shaderSource = function(shader,source) {
	lime.graphics.opengl.GL.context.shaderSource(shader,source);
};
lime.graphics.opengl.GL.stencilFunc = function(func,ref,mask) {
	lime.graphics.opengl.GL.context.stencilFunc(func,ref,mask);
};
lime.graphics.opengl.GL.stencilFuncSeparate = function(face,func,ref,mask) {
	lime.graphics.opengl.GL.context.stencilFuncSeparate(face,func,ref,mask);
};
lime.graphics.opengl.GL.stencilMask = function(mask) {
	lime.graphics.opengl.GL.context.stencilMask(mask);
};
lime.graphics.opengl.GL.stencilMaskSeparate = function(face,mask) {
	lime.graphics.opengl.GL.context.stencilMaskSeparate(face,mask);
};
lime.graphics.opengl.GL.stencilOp = function(fail,zfail,zpass) {
	lime.graphics.opengl.GL.context.stencilOp(fail,zfail,zpass);
};
lime.graphics.opengl.GL.stencilOpSeparate = function(face,fail,zfail,zpass) {
	lime.graphics.opengl.GL.context.stencilOpSeparate(face,fail,zfail,zpass);
};
lime.graphics.opengl.GL.texImage2D = function(target,level,internalformat,width,height,border,format,type,pixels) {
	lime.graphics.opengl.GL.context.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
};
lime.graphics.opengl.GL.texParameterf = function(target,pname,param) {
	lime.graphics.opengl.GL.context.texParameterf(target,pname,param);
};
lime.graphics.opengl.GL.texParameteri = function(target,pname,param) {
	lime.graphics.opengl.GL.context.texParameteri(target,pname,param);
};
lime.graphics.opengl.GL.texSubImage2D = function(target,level,xoffset,yoffset,width,height,format,type,pixels) {
	lime.graphics.opengl.GL.context.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels);
};
lime.graphics.opengl.GL.uniform1f = function(location,x) {
	lime.graphics.opengl.GL.context.uniform1f(location,x);
};
lime.graphics.opengl.GL.uniform1fv = function(location,x) {
	lime.graphics.opengl.GL.context.uniform1fv(location,x);
};
lime.graphics.opengl.GL.uniform1i = function(location,x) {
	lime.graphics.opengl.GL.context.uniform1i(location,x);
};
lime.graphics.opengl.GL.uniform1iv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform1iv(location,v);
};
lime.graphics.opengl.GL.uniform2f = function(location,x,y) {
	lime.graphics.opengl.GL.context.uniform2f(location,x,y);
};
lime.graphics.opengl.GL.uniform2fv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform2fv(location,v);
};
lime.graphics.opengl.GL.uniform2i = function(location,x,y) {
	lime.graphics.opengl.GL.context.uniform2i(location,x,y);
};
lime.graphics.opengl.GL.uniform2iv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform2iv(location,v);
};
lime.graphics.opengl.GL.uniform3f = function(location,x,y,z) {
	lime.graphics.opengl.GL.context.uniform3f(location,x,y,z);
};
lime.graphics.opengl.GL.uniform3fv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform3fv(location,v);
};
lime.graphics.opengl.GL.uniform3i = function(location,x,y,z) {
	lime.graphics.opengl.GL.context.uniform3i(location,x,y,z);
};
lime.graphics.opengl.GL.uniform3iv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform3iv(location,v);
};
lime.graphics.opengl.GL.uniform4f = function(location,x,y,z,w) {
	lime.graphics.opengl.GL.context.uniform4f(location,x,y,z,w);
};
lime.graphics.opengl.GL.uniform4fv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform4fv(location,v);
};
lime.graphics.opengl.GL.uniform4i = function(location,x,y,z,w) {
	lime.graphics.opengl.GL.context.uniform4i(location,x,y,z,w);
};
lime.graphics.opengl.GL.uniform4iv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform4iv(location,v);
};
lime.graphics.opengl.GL.uniformMatrix2fv = function(location,transpose,v) {
	lime.graphics.opengl.GL.context.uniformMatrix2fv(location,transpose,v);
};
lime.graphics.opengl.GL.uniformMatrix3fv = function(location,transpose,v) {
	lime.graphics.opengl.GL.context.uniformMatrix3fv(location,transpose,v);
};
lime.graphics.opengl.GL.uniformMatrix4fv = function(location,transpose,v) {
	lime.graphics.opengl.GL.context.uniformMatrix4fv(location,transpose,v);
};
lime.graphics.opengl.GL.useProgram = function(program) {
	lime.graphics.opengl.GL.context.useProgram(program);
};
lime.graphics.opengl.GL.validateProgram = function(program) {
	lime.graphics.opengl.GL.context.validateProgram(program);
};
lime.graphics.opengl.GL.vertexAttrib1f = function(indx,x) {
	lime.graphics.opengl.GL.context.vertexAttrib1f(indx,x);
};
lime.graphics.opengl.GL.vertexAttrib1fv = function(indx,values) {
	lime.graphics.opengl.GL.context.vertexAttrib1fv(indx,values);
};
lime.graphics.opengl.GL.vertexAttrib2f = function(indx,x,y) {
	lime.graphics.opengl.GL.context.vertexAttrib2f(indx,x,y);
};
lime.graphics.opengl.GL.vertexAttrib2fv = function(indx,values) {
	lime.graphics.opengl.GL.context.vertexAttrib2fv(indx,values);
};
lime.graphics.opengl.GL.vertexAttrib3f = function(indx,x,y,z) {
	lime.graphics.opengl.GL.context.vertexAttrib3f(indx,x,y,z);
};
lime.graphics.opengl.GL.vertexAttrib3fv = function(indx,values) {
	lime.graphics.opengl.GL.context.vertexAttrib3fv(indx,values);
};
lime.graphics.opengl.GL.vertexAttrib4f = function(indx,x,y,z,w) {
	lime.graphics.opengl.GL.context.vertexAttrib4f(indx,x,y,z,w);
};
lime.graphics.opengl.GL.vertexAttrib4fv = function(indx,values) {
	lime.graphics.opengl.GL.context.vertexAttrib4fv(indx,values);
};
lime.graphics.opengl.GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	lime.graphics.opengl.GL.context.vertexAttribPointer(indx,size,type,normalized,stride,offset);
};
lime.graphics.opengl.GL.viewport = function(x,y,width,height) {
	lime.graphics.opengl.GL.context.viewport(x,y,width,height);
};
lime.graphics.opengl.GL.get_version = function() {
	return 2;
};
lime.graphics.utils = {};
lime.graphics.utils.ImageCanvasUtil = function() { };
$hxClasses["lime.graphics.utils.ImageCanvasUtil"] = lime.graphics.utils.ImageCanvasUtil;
lime.graphics.utils.ImageCanvasUtil.__name__ = ["lime","graphics","utils","ImageCanvasUtil"];
lime.graphics.utils.ImageCanvasUtil.colorTransform = function(image,rect,colorMatrix) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.colorTransform(image,rect,colorMatrix);
};
lime.graphics.utils.ImageCanvasUtil.convertToCanvas = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImage != null) {
		if(buffer.__srcCanvas == null) {
			lime.graphics.utils.ImageCanvasUtil.createCanvas(image,buffer.__srcImage.width,buffer.__srcImage.height);
			buffer.__srcContext.drawImage(buffer.__srcImage,0,0);
		}
		buffer.__srcImage = null;
	}
};
lime.graphics.utils.ImageCanvasUtil.convertToData = function(image) {
	if(image.buffer.data == null) {
		lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
		lime.graphics.utils.ImageCanvasUtil.createImageData(image);
		image.buffer.__srcCanvas = null;
		image.buffer.__srcContext = null;
	}
};
lime.graphics.utils.ImageCanvasUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(sourceImage);
	lime.graphics.utils.ImageCanvasUtil.createImageData(sourceImage);
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.copyChannel(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
};
lime.graphics.utils.ImageCanvasUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	if(alphaImage != null && alphaImage.get_transparent()) {
		if(alphaPoint == null) alphaPoint = new lime.math.Vector2();
		var tempData = image.clone();
		tempData.copyChannel(alphaImage,new lime.math.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new lime.math.Vector2(sourceRect.x,sourceRect.y),lime.graphics.ImageChannel.ALPHA,lime.graphics.ImageChannel.ALPHA);
		sourceImage = tempData;
	}
	lime.graphics.utils.ImageCanvasUtil.sync(image);
	if(!mergeAlpha) {
		if(image.get_transparent() && sourceImage.get_transparent()) image.buffer.__srcContext.clearRect(destPoint.x + image.offsetX,destPoint.y + image.offsetY,sourceRect.width + image.offsetX,sourceRect.height + image.offsetY);
	}
	lime.graphics.utils.ImageCanvasUtil.sync(sourceImage);
	if(sourceImage.buffer.get_src() != null) image.buffer.__srcContext.drawImage(sourceImage.buffer.get_src(),sourceRect.x + sourceImage.offsetX | 0,sourceRect.y + sourceImage.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0,destPoint.x + image.offsetX | 0,destPoint.y + image.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0);
};
lime.graphics.utils.ImageCanvasUtil.createCanvas = function(image,width,height) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		buffer.__srcCanvas = window.document.createElement("canvas");
		buffer.__srcCanvas.width = width;
		buffer.__srcCanvas.height = height;
		if(!image.get_transparent()) {
			if(!image.get_transparent()) buffer.__srcCanvas.setAttribute("moz-opaque","true");
			buffer.__srcContext = buffer.__srcCanvas.getContext ("2d", { alpha: false });
		} else buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
		buffer.__srcContext.mozImageSmoothingEnabled = false;
		buffer.__srcContext.webkitImageSmoothingEnabled = false;
		buffer.__srcContext.imageSmoothingEnabled = false;
	}
};
lime.graphics.utils.ImageCanvasUtil.createImageData = function(image) {
	var buffer = image.buffer;
	if(buffer.data == null) {
		buffer.__srcImageData = buffer.__srcContext.getImageData(0,0,buffer.width,buffer.height);
		buffer.data = new Uint8Array(buffer.__srcImageData.data.buffer);
	}
};
lime.graphics.utils.ImageCanvasUtil.fillRect = function(image,rect,color) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.sync(image);
	if(rect.x == 0 && rect.y == 0 && rect.width == image.width && rect.height == image.height) {
		if(image.get_transparent() && (color & -16777216) == 0) {
			image.buffer.__srcCanvas.width = image.buffer.width;
			return;
		}
	}
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	var r = (color & 16711680) >>> 16;
	var g = (color & 65280) >>> 8;
	var b = color & 255;
	image.buffer.__srcContext.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
	image.buffer.__srcContext.fillRect(rect.x + image.offsetX,rect.y + image.offsetY,rect.width + image.offsetX,rect.height + image.offsetY);
};
lime.graphics.utils.ImageCanvasUtil.floodFill = function(image,x,y,color) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.floodFill(image,x,y,color);
};
lime.graphics.utils.ImageCanvasUtil.getPixel = function(image,x,y) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	return lime.graphics.utils.ImageDataUtil.getPixel(image,x,y);
};
lime.graphics.utils.ImageCanvasUtil.getPixel32 = function(image,x,y) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	return lime.graphics.utils.ImageDataUtil.getPixel32(image,x,y);
};
lime.graphics.utils.ImageCanvasUtil.getPixels = function(image,rect) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	return lime.graphics.utils.ImageDataUtil.getPixels(image,rect);
};
lime.graphics.utils.ImageCanvasUtil.merge = function(image,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(sourceImage);
	lime.graphics.utils.ImageCanvasUtil.createImageData(sourceImage);
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.merge(image,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
};
lime.graphics.utils.ImageCanvasUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		lime.graphics.utils.ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(buffer.get_src(),0,0,newWidth,newHeight);
	} else {
		var sourceCanvas = buffer.__srcCanvas;
		buffer.__srcCanvas = null;
		lime.graphics.utils.ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(sourceCanvas,0,0,newWidth,newHeight);
	}
};
lime.graphics.utils.ImageCanvasUtil.setPixel = function(image,x,y,color) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.setPixel(image,x,y,color);
};
lime.graphics.utils.ImageCanvasUtil.setPixel32 = function(image,x,y,color) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.setPixel32(image,x,y,color);
};
lime.graphics.utils.ImageCanvasUtil.setPixels = function(image,rect,byteArray) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.setPixels(image,rect,byteArray);
};
lime.graphics.utils.ImageCanvasUtil.sync = function(image) {
	if(image.dirty && image.type != lime.graphics.ImageType.DATA) {
		image.buffer.__srcContext.putImageData(image.buffer.__srcImageData,0,0);
		image.buffer.data = null;
		image.dirty = false;
	}
};
lime.graphics.utils.ImageDataUtil = function() { };
$hxClasses["lime.graphics.utils.ImageDataUtil"] = lime.graphics.utils.ImageDataUtil;
lime.graphics.utils.ImageDataUtil.__name__ = ["lime","graphics","utils","ImageDataUtil"];
lime.graphics.utils.ImageDataUtil.__alpha16 = null;
lime.graphics.utils.ImageDataUtil.__clamp = null;
lime.graphics.utils.ImageDataUtil.colorTransform = function(image,rect,colorMatrix) {
	var data = image.buffer.data;
	var stride = image.buffer.width * 4;
	var offset;
	var rowStart = Std["int"](rect.get_top() + image.offsetY);
	var rowEnd = Std["int"](rect.get_bottom() + image.offsetY);
	var columnStart = Std["int"](rect.get_left() + image.offsetX);
	var columnEnd = Std["int"](rect.get_right() + image.offsetX);
	var r;
	var g;
	var b;
	var a;
	var ex = 0;
	var _g = rowStart;
	while(_g < rowEnd) {
		var row = _g++;
		var _g1 = columnStart;
		while(_g1 < columnEnd) {
			var column = _g1++;
			offset = row * stride + column * 4;
			a = data[offset + 3] * colorMatrix[18] + colorMatrix[19] * 255 | 0;
			if(a > 255) ex = a - 255; else ex = 0;
			b = data[offset + 2] * colorMatrix[12] + colorMatrix[14] * 255 + ex | 0;
			if(b > 255) ex = b - 255; else ex = 0;
			g = data[offset + 1] * colorMatrix[6] + colorMatrix[9] * 255 + ex | 0;
			if(g > 255) ex = g - 255; else ex = 0;
			r = data[offset] * colorMatrix[0] + colorMatrix[4] * 255 + ex | 0;
			if(r > 255) data[offset] = 255; else data[offset] = r;
			if(g > 255) data[offset + 1] = 255; else data[offset + 1] = g;
			if(b > 255) data[offset + 2] = 255; else data[offset + 2] = b;
			if(a > 255) data[offset + 3] = 255; else data[offset + 3] = a;
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
	var destIdx;
	switch(destChannel[1]) {
	case 0:
		destIdx = 0;
		break;
	case 1:
		destIdx = 1;
		break;
	case 2:
		destIdx = 2;
		break;
	case 3:
		destIdx = 3;
		break;
	}
	var srcIdx;
	switch(sourceChannel[1]) {
	case 0:
		srcIdx = 0;
		break;
	case 1:
		srcIdx = 1;
		break;
	case 2:
		srcIdx = 2;
		break;
	case 3:
		srcIdx = 3;
		break;
	}
	var srcStride = sourceImage.buffer.width * 4 | 0;
	var srcPosition = (sourceRect.x + sourceImage.offsetX) * 4 + srcStride * (sourceRect.y + sourceImage.offsetY) + srcIdx | 0;
	var srcRowOffset = srcStride - (4 * (sourceRect.width + sourceImage.offsetX) | 0);
	var srcRowEnd = 4 * (sourceRect.x + sourceImage.offsetX + sourceRect.width) | 0;
	var srcData = sourceImage.buffer.data;
	var destStride = image.buffer.width * 4 | 0;
	var destPosition = (destPoint.x + image.offsetX) * 4 + destStride * (destPoint.y + image.offsetY) + destIdx | 0;
	var destRowOffset = destStride - (4 * (sourceRect.width + image.offsetX) | 0);
	var destRowEnd = 4 * (destPoint.x + image.offsetX + sourceRect.width) | 0;
	var destData = image.buffer.data;
	var length = sourceRect.width * sourceRect.height | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		destData[destPosition] = srcData[srcPosition];
		srcPosition += 4;
		destPosition += 4;
		if(srcPosition % srcStride > srcRowEnd) srcPosition += srcRowOffset;
		if(destPosition % destStride > destRowEnd) destPosition += destRowOffset;
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	if(alphaImage != null && alphaImage.get_transparent()) {
		if(alphaPoint == null) alphaPoint = new lime.math.Vector2();
		var tempData = image.clone();
		tempData.copyChannel(alphaImage,new lime.math.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new lime.math.Vector2(sourceRect.x,sourceRect.y),lime.graphics.ImageChannel.ALPHA,lime.graphics.ImageChannel.ALPHA);
		sourceImage = tempData;
	}
	var rowOffset = destPoint.y + image.offsetY - sourceRect.y - sourceImage.offsetY | 0;
	var columnOffset = destPoint.x + image.offsetX - sourceRect.x - sourceImage.offsetY | 0;
	var sourceData = sourceImage.buffer.data;
	var sourceStride = sourceImage.buffer.width * 4;
	var sourceOffset = 0;
	var data = image.buffer.data;
	var stride = image.buffer.width * 4;
	var offset = 0;
	if(!mergeAlpha || !sourceImage.get_transparent()) {
		var _g1 = Std["int"](sourceRect.get_top() + sourceImage.offsetY);
		var _g = Std["int"](sourceRect.get_bottom() + sourceImage.offsetY);
		while(_g1 < _g) {
			var row = _g1++;
			var _g3 = Std["int"](sourceRect.get_left() + sourceImage.offsetX);
			var _g2 = Std["int"](sourceRect.get_right() + sourceImage.offsetX);
			while(_g3 < _g2) {
				var column = _g3++;
				sourceOffset = row * sourceStride + column * 4;
				offset = (row + rowOffset) * stride + (column + columnOffset) * 4;
				data[offset] = sourceData[sourceOffset];
				data[offset + 1] = sourceData[sourceOffset + 1];
				data[offset + 2] = sourceData[sourceOffset + 2];
				data[offset + 3] = sourceData[sourceOffset + 3];
			}
		}
	} else {
		var sourceAlpha;
		var oneMinusSourceAlpha;
		var _g11 = Std["int"](sourceRect.get_top() + sourceImage.offsetY);
		var _g4 = Std["int"](sourceRect.get_bottom() + sourceImage.offsetY);
		while(_g11 < _g4) {
			var row1 = _g11++;
			var _g31 = Std["int"](sourceRect.get_left() + sourceImage.offsetX);
			var _g21 = Std["int"](sourceRect.get_right() + sourceImage.offsetX);
			while(_g31 < _g21) {
				var column1 = _g31++;
				sourceOffset = row1 * sourceStride + column1 * 4;
				offset = (row1 + rowOffset) * stride + (column1 + columnOffset) * 4;
				sourceAlpha = sourceData[sourceOffset + 3] / 255;
				oneMinusSourceAlpha = 1 - sourceAlpha;
				data[offset] = lime.graphics.utils.ImageDataUtil.__clamp[sourceData[sourceOffset] + data[offset] * oneMinusSourceAlpha | 0];
				data[offset + 1] = lime.graphics.utils.ImageDataUtil.__clamp[sourceData[sourceOffset + 1] + data[offset + 1] * oneMinusSourceAlpha | 0];
				data[offset + 2] = lime.graphics.utils.ImageDataUtil.__clamp[sourceData[sourceOffset + 2] + data[offset + 2] * oneMinusSourceAlpha | 0];
				data[offset + 3] = lime.graphics.utils.ImageDataUtil.__clamp[sourceData[sourceOffset + 3] + data[offset + 3] * oneMinusSourceAlpha | 0];
			}
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.fillRect = function(image,rect,color) {
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	var r = (color & 16711680) >>> 16;
	var g = (color & 65280) >>> 8;
	var b = color & 255;
	var rgba = r | g << 8 | b << 16 | a << 24;
	var data = image.buffer.data;
	if(rect.width == image.buffer.width && rect.height == image.buffer.height && rect.x == 0 && rect.y == 0 && image.offsetX == 0 && image.offsetY == 0) {
		var length = image.buffer.width * image.buffer.height;
		var j = 0;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			j = i * 4;
			data[j] = r;
			data[j + 1] = g;
			data[j + 2] = b;
			data[j + 3] = a;
		}
	} else {
		var stride = image.buffer.width * 4;
		var offset;
		var rowStart = rect.y + image.offsetY | 0;
		var rowEnd = Std["int"](rect.get_bottom() + image.offsetY);
		var columnStart = rect.x + image.offsetX | 0;
		var columnEnd = Std["int"](rect.get_right() + image.offsetX);
		var _g1 = rowStart;
		while(_g1 < rowEnd) {
			var row = _g1++;
			var _g11 = columnStart;
			while(_g11 < columnEnd) {
				var column = _g11++;
				offset = row * stride + column * 4;
				data[offset] = r;
				data[offset + 1] = g;
				data[offset + 2] = b;
				data[offset + 3] = a;
			}
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.floodFill = function(image,x,y,color) {
	var data = image.buffer.data;
	var offset = (y + image.offsetY) * (image.buffer.width * 4) + (x + image.offsetX) * 4;
	var hitColorR = data[offset];
	var hitColorG = data[offset + 1];
	var hitColorB = data[offset + 2];
	var hitColorA;
	if(image.get_transparent()) hitColorA = data[offset + 3]; else hitColorA = 255;
	var r = (color & 16711680) >>> 16;
	var g = (color & 65280) >>> 8;
	var b = color & 255;
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	if(hitColorR == r && hitColorG == g && hitColorB == b && hitColorA == a) return;
	var dx = [0,-1,1,0];
	var dy = [-1,0,0,1];
	var minX = -image.offsetX;
	var minY = -image.offsetY;
	var maxX = minX + image.width;
	var maxY = minY + image.height;
	var queue = new Array();
	queue.push(x);
	queue.push(y);
	while(queue.length > 0) {
		var curPointY = queue.pop();
		var curPointX = queue.pop();
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			var nextPointX = curPointX + dx[i];
			var nextPointY = curPointY + dy[i];
			if(nextPointX < minX || nextPointY < minY || nextPointX >= maxX || nextPointY >= maxY) continue;
			var nextPointOffset = (nextPointY * image.width + nextPointX) * 4;
			if(data[nextPointOffset] == hitColorR && data[nextPointOffset + 1] == hitColorG && data[nextPointOffset + 2] == hitColorB && data[nextPointOffset + 3] == hitColorA) {
				data[nextPointOffset] = r;
				data[nextPointOffset + 1] = g;
				data[nextPointOffset + 2] = b;
				data[nextPointOffset + 3] = a;
				queue.push(nextPointX);
				queue.push(nextPointY);
			}
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.getPixel = function(image,x,y) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	if(image.get_premultiplied()) {
		var unmultiply = 255.0 / data[offset + 3];
		haxe.Log.trace(unmultiply,{ fileName : "ImageDataUtil.hx", lineNumber : 364, className : "lime.graphics.utils.ImageDataUtil", methodName : "getPixel"});
		return lime.graphics.utils.ImageDataUtil.__clamp[data[offset] * unmultiply | 0] << 16 | lime.graphics.utils.ImageDataUtil.__clamp[data[offset + 1] * unmultiply | 0] << 8 | lime.graphics.utils.ImageDataUtil.__clamp[data[offset + 2] * unmultiply | 0];
	} else return data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
};
lime.graphics.utils.ImageDataUtil.getPixel32 = function(image,x,y) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	var a;
	if(image.get_transparent()) a = data[offset + 3]; else a = 255;
	if(image.get_premultiplied() && a != 0) {
		var unmultiply = 255.0 / a;
		return a << 24 | (function($this) {
			var $r;
			var index = Math.round(data[offset] * unmultiply);
			$r = lime.graphics.utils.ImageDataUtil.__clamp[index];
			return $r;
		}(this)) << 16 | lime.graphics.utils.ImageDataUtil.__clamp[data[offset + 1] * unmultiply | 0] << 8 | lime.graphics.utils.ImageDataUtil.__clamp[data[offset + 2] * unmultiply | 0];
	} else return a << 24 | data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
};
lime.graphics.utils.ImageDataUtil.getPixels = function(image,rect) {
	var byteArray = new lime.utils.ByteArray(image.width * image.height * 4);
	var srcData = image.buffer.data;
	var srcStride = image.buffer.width * 4 | 0;
	var srcPosition = rect.x * 4 + srcStride * rect.y | 0;
	var srcRowOffset = srcStride - (4 * rect.width | 0);
	var srcRowEnd = 4 * (rect.x + rect.width) | 0;
	var length = rect.width * rect.height | 0;
	byteArray.set_length(length * 4);
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		byteArray.__set(i * 4 + 1,srcData[srcPosition++]);
		byteArray.__set(i * 4 + 2,srcData[srcPosition++]);
		byteArray.__set(i * 4 + 3,srcData[srcPosition++]);
		byteArray.__set(i * 4,srcData[srcPosition++]);
		if(srcPosition % srcStride > srcRowEnd) srcPosition += srcRowOffset;
	}
	byteArray.position = 0;
	return byteArray;
};
lime.graphics.utils.ImageDataUtil.merge = function(image,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
	var rowOffset = destPoint.y + image.offsetY - sourceRect.y - sourceImage.offsetY | 0;
	var columnOffset = destPoint.x + image.offsetX - sourceRect.x - sourceImage.offsetY | 0;
	var sourceData = sourceImage.buffer.data;
	var sourceStride = sourceImage.buffer.width * 4;
	var sourceOffset = 0;
	var data = image.buffer.data;
	var stride = image.buffer.width * 4;
	var offset = 0;
	var _g1 = Std["int"](sourceRect.get_top() + sourceImage.offsetY);
	var _g = Std["int"](sourceRect.get_bottom() + sourceImage.offsetY);
	while(_g1 < _g) {
		var row = _g1++;
		var _g3 = Std["int"](sourceRect.get_left() + sourceImage.offsetX);
		var _g2 = Std["int"](sourceRect.get_right() + sourceImage.offsetX);
		while(_g3 < _g2) {
			var column = _g3++;
			sourceOffset = row * sourceStride + column * 4;
			offset = (row + rowOffset) * stride + (column + columnOffset) * 4;
			data[offset] = (sourceData[offset] * redMultiplier + data[offset] * (256 - redMultiplier)) / 256 | 0;
			data[offset + 1] = (sourceData[offset + 1] * greenMultiplier + data[offset + 1] * (256 - greenMultiplier)) / 256 | 0;
			data[offset + 2] = (sourceData[offset + 2] * blueMultiplier + data[offset + 2] * (256 - blueMultiplier)) / 256 | 0;
			data[offset + 3] = (sourceData[offset + 3] * alphaMultiplier + data[offset + 3] * (256 - alphaMultiplier)) / 256 | 0;
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.multiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null) return;
	var index;
	var a16;
	var length = data.length / 4 | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		index = i * 4;
		var a161 = lime.graphics.utils.ImageDataUtil.__alpha16[data[index + 3]];
		data[index] = data[index] * a161 >> 16;
		data[index + 1] = data[index + 1] * a161 >> 16;
		data[index + 2] = data[index + 2] * a161 >> 16;
	}
	image.buffer.premultiplied = true;
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	var newBuffer = new lime.graphics.ImageBuffer(new Uint8Array(newWidth * newHeight * 4),newWidth,newHeight);
	var imageWidth = image.width;
	var imageHeight = image.height;
	var data = image.get_data();
	var newData = newBuffer.data;
	var sourceIndex;
	var sourceIndexX;
	var sourceIndexY;
	var sourceIndexXY;
	var index;
	var sourceX;
	var sourceY;
	var u;
	var v;
	var uRatio;
	var vRatio;
	var uOpposite;
	var vOpposite;
	var _g = 0;
	while(_g < newHeight) {
		var y = _g++;
		var _g1 = 0;
		while(_g1 < newWidth) {
			var x = _g1++;
			u = (x + 0.5) / newWidth * imageWidth - 0.5;
			v = (y + 0.5) / newHeight * imageHeight - 0.5;
			sourceX = u | 0;
			sourceY = v | 0;
			sourceIndex = (sourceY * imageWidth + sourceX) * 4;
			if(sourceX < imageWidth - 1) sourceIndexX = sourceIndex + 4; else sourceIndexX = sourceIndex;
			if(sourceY < imageHeight - 1) sourceIndexY = sourceIndex + imageWidth * 4; else sourceIndexY = sourceIndex;
			if(sourceIndexX != sourceIndex) sourceIndexXY = sourceIndexY + 4; else sourceIndexXY = sourceIndexY;
			index = (y * newWidth + x) * 4;
			uRatio = u - sourceX;
			vRatio = v - sourceY;
			uOpposite = 1 - uRatio;
			vOpposite = 1 - vRatio;
			newData[index] = (data[sourceIndex] * uOpposite + data[sourceIndexX] * uRatio) * vOpposite + (data[sourceIndexY] * uOpposite + data[sourceIndexXY] * uRatio) * vRatio | 0;
			newData[index + 1] = (data[sourceIndex + 1] * uOpposite + data[sourceIndexX + 1] * uRatio) * vOpposite + (data[sourceIndexY + 1] * uOpposite + data[sourceIndexXY + 1] * uRatio) * vRatio | 0;
			newData[index + 2] = (data[sourceIndex + 2] * uOpposite + data[sourceIndexX + 2] * uRatio) * vOpposite + (data[sourceIndexY + 2] * uOpposite + data[sourceIndexXY + 2] * uRatio) * vRatio | 0;
			if(data[sourceIndexX + 3] == 0 || data[sourceIndexY + 3] == 0 || data[sourceIndexXY + 3] == 0) newData[index + 3] = 0; else newData[index + 3] = data[sourceIndex + 3];
		}
	}
	buffer.data = newData;
	buffer.width = newWidth;
	buffer.height = newHeight;
};
lime.graphics.utils.ImageDataUtil.resizeBuffer = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	var data = image.get_data();
	var newData = new Uint8Array(newWidth * newHeight * 4);
	var sourceIndex;
	var index;
	var _g1 = 0;
	var _g = buffer.height;
	while(_g1 < _g) {
		var y = _g1++;
		var _g3 = 0;
		var _g2 = buffer.width;
		while(_g3 < _g2) {
			var x = _g3++;
			sourceIndex = (y * buffer.width + x) * 4;
			index = (y * newWidth + x) * 4;
			newData[index] = data[sourceIndex];
			newData[index + 1] = data[sourceIndex + 1];
			newData[index + 2] = data[sourceIndex + 2];
			newData[index + 3] = data[sourceIndex + 3];
		}
	}
	buffer.data = newData;
	buffer.width = newWidth;
	buffer.height = newHeight;
};
lime.graphics.utils.ImageDataUtil.setPixel = function(image,x,y,color) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	data[offset] = (color & 16711680) >>> 16;
	data[offset + 1] = (color & 65280) >>> 8;
	data[offset + 2] = color & 255;
	if(image.get_transparent()) data[offset + 3] = 255;
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.setPixel32 = function(image,x,y,color) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	if(image.get_transparent() && image.get_premultiplied()) {
		var a16 = lime.graphics.utils.ImageDataUtil.__alpha16[a];
		data[offset] = ((color & 16711680) >>> 16) * a16 >> 16;
		data[offset + 1] = ((color & 65280) >>> 8) * a16 >> 16;
		data[offset + 2] = (color & 255) * a16 >> 16;
		data[offset + 3] = a;
	} else {
		data[offset] = (color & 16711680) >>> 16;
		data[offset + 1] = (color & 65280) >>> 8;
		data[offset + 2] = color & 255;
		data[offset + 3] = a;
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.setPixels = function(image,rect,byteArray) {
	var len = Math.round(rect.width * rect.height);
	var data = image.buffer.data;
	var offset = Math.round(image.buffer.width * (rect.y + image.offsetX) + (rect.x + image.offsetY));
	var pos = offset * 4;
	var boundR = Math.round(rect.x + rect.width + image.offsetX);
	var width = image.buffer.width;
	var color;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(pos % (width * 4) >= boundR * 4) pos += (width - boundR) * 4;
		color = byteArray.readUnsignedInt();
		data[pos++] = (color & 16711680) >>> 16;
		data[pos++] = (color & 65280) >>> 8;
		data[pos++] = color & 255;
		data[pos++] = (color & -16777216) >>> 24;
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.unmultiplyAlpha = function(image) {
	var data = image.buffer.data;
	var index;
	var a;
	var unmultiply;
	var length = data.length / 4 | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		index = i * 4;
		a = data[index + 3];
		if(a != 0) {
			unmultiply = 255.0 / a;
			data[index] = lime.graphics.utils.ImageDataUtil.__clamp[data[index] * unmultiply | 0];
			data[index + 1] = lime.graphics.utils.ImageDataUtil.__clamp[data[index + 1] * unmultiply | 0];
			data[index + 2] = lime.graphics.utils.ImageDataUtil.__clamp[data[index + 2] * unmultiply | 0];
		}
	}
	image.buffer.premultiplied = false;
	image.dirty = true;
};
lime.math = {};
lime.math._ColorMatrix = {};
lime.math._ColorMatrix.ColorMatrix_Impl_ = function() { };
$hxClasses["lime.math._ColorMatrix.ColorMatrix_Impl_"] = lime.math._ColorMatrix.ColorMatrix_Impl_;
lime.math._ColorMatrix.ColorMatrix_Impl_.__name__ = ["lime","math","_ColorMatrix","ColorMatrix_Impl_"];
lime.math._ColorMatrix.ColorMatrix_Impl_.__properties__ = {set_redOffset:"set_redOffset",get_redOffset:"get_redOffset",set_redMultiplier:"set_redMultiplier",get_redMultiplier:"get_redMultiplier",set_greenOffset:"set_greenOffset",get_greenOffset:"get_greenOffset",set_greenMultiplier:"set_greenMultiplier",get_greenMultiplier:"get_greenMultiplier",set_color:"set_color",get_color:"get_color",set_blueOffset:"set_blueOffset",get_blueOffset:"get_blueOffset",set_blueMultiplier:"set_blueMultiplier",get_blueMultiplier:"get_blueMultiplier",set_alphaOffset:"set_alphaOffset",get_alphaOffset:"get_alphaOffset",set_alphaMultiplier:"set_alphaMultiplier",get_alphaMultiplier:"get_alphaMultiplier"}
lime.math._ColorMatrix.ColorMatrix_Impl_._new = function(data) {
	var this1;
	if(data != null && data.length == 20) this1 = data; else this1 = new Float32Array(lime.math._ColorMatrix.ColorMatrix_Impl_.__identity);
	return this1;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.clone = function(this1) {
	return lime.math._ColorMatrix.ColorMatrix_Impl_._new(new Float32Array(this1));
};
lime.math._ColorMatrix.ColorMatrix_Impl_.concat = function(this1,second) {
	var _g = this1;
	var value = _g[0] + second[0];
	_g[0] = value;
	value;
	var _g1 = this1;
	var value1 = _g1[6] + second[6];
	_g1[6] = value1;
	value1;
	var _g2 = this1;
	var value2 = _g2[12] + second[12];
	_g2[12] = value2;
	value2;
	var _g3 = this1;
	var value3 = _g3[18] + second[18];
	_g3[18] = value3;
	value3;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.copyFrom = function(this1,other) {
	this1.set(other);
};
lime.math._ColorMatrix.ColorMatrix_Impl_.identity = function(this1) {
	this1[0] = 1;
	this1[1] = 0;
	this1[2] = 0;
	this1[3] = 0;
	this1[4] = 0;
	this1[5] = 0;
	this1[6] = 1;
	this1[7] = 0;
	this1[8] = 0;
	this1[9] = 0;
	this1[10] = 0;
	this1[11] = 0;
	this1[12] = 1;
	this1[13] = 0;
	this1[14] = 0;
	this1[15] = 0;
	this1[16] = 0;
	this1[17] = 0;
	this1[18] = 1;
	this1[19] = 0;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.__toFlashColorTransform = function(this1) {
	return null;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_alphaMultiplier = function(this1) {
	return this1[18];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_alphaMultiplier = function(this1,value) {
	this1[18] = value;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_alphaOffset = function(this1) {
	return this1[19] * 255;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_alphaOffset = function(this1,value) {
	this1[19] = value / 255;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_blueMultiplier = function(this1) {
	return this1[12];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_blueMultiplier = function(this1,value) {
	this1[12] = value;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_blueOffset = function(this1) {
	return this1[14] * 255;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_blueOffset = function(this1,value) {
	this1[14] = value / 255;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_color = function(this1) {
	return (this1[4] * 255 | 0) << 16 | (this1[9] * 255 | 0) << 8 | (this1[14] * 255 | 0);
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_color = function(this1,value) {
	var value1 = value >> 16 & 255;
	this1[4] = value1 / 255;
	value1;
	var value2 = value >> 8 & 255;
	this1[9] = value2 / 255;
	value2;
	var value3 = value & 255;
	this1[14] = value3 / 255;
	value3;
	this1[0] = 0;
	0;
	this1[6] = 0;
	0;
	this1[12] = 0;
	0;
	return lime.math._ColorMatrix.ColorMatrix_Impl_.get_color(this1);
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_greenMultiplier = function(this1) {
	return this1[6];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_greenMultiplier = function(this1,value) {
	this1[6] = value;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_greenOffset = function(this1) {
	return this1[9] * 255;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_greenOffset = function(this1,value) {
	this1[9] = value / 255;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_redMultiplier = function(this1) {
	return this1[0];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_redMultiplier = function(this1,value) {
	this1[0] = value;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_redOffset = function(this1) {
	return this1[4] * 255;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_redOffset = function(this1,value) {
	this1[4] = value / 255;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get = function(this1,index) {
	return this1[index];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set = function(this1,index,value) {
	this1[index] = value;
	return value;
};
lime.math.Matrix3 = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["lime.math.Matrix3"] = lime.math.Matrix3;
lime.math.Matrix3.__name__ = ["lime","math","Matrix3"];
lime.math.Matrix3.prototype = {
	clone: function() {
		return new lime.math.Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,copyColumnFrom: function(column,vector4) {
		if(column > 2) throw "Column " + column + " out of bounds (2)"; else if(column == 0) {
			this.a = vector4.x;
			this.c = vector4.y;
		} else if(column == 1) {
			this.b = vector4.x;
			this.d = vector4.y;
		} else {
			this.tx = vector4.x;
			this.ty = vector4.y;
		}
	}
	,copyColumnTo: function(column,vector4) {
		if(column > 2) throw "Column " + column + " out of bounds (2)"; else if(column == 0) {
			vector4.x = this.a;
			vector4.y = this.c;
			vector4.z = 0;
		} else if(column == 1) {
			vector4.x = this.b;
			vector4.y = this.d;
			vector4.z = 0;
		} else {
			vector4.x = this.tx;
			vector4.y = this.ty;
			vector4.z = 1;
		}
	}
	,copyFrom: function(sourceMatrix3) {
		this.a = sourceMatrix3.a;
		this.b = sourceMatrix3.b;
		this.c = sourceMatrix3.c;
		this.d = sourceMatrix3.d;
		this.tx = sourceMatrix3.tx;
		this.ty = sourceMatrix3.ty;
	}
	,copyRowFrom: function(row,vector4) {
		if(row > 2) throw "Row " + row + " out of bounds (2)"; else if(row == 0) {
			this.a = vector4.x;
			this.c = vector4.y;
		} else if(row == 1) {
			this.b = vector4.x;
			this.d = vector4.y;
		} else {
			this.tx = vector4.x;
			this.ty = vector4.y;
		}
	}
	,copyRowTo: function(row,vector4) {
		if(row > 2) throw "Row " + row + " out of bounds (2)"; else if(row == 0) {
			vector4.x = this.a;
			vector4.y = this.b;
			vector4.z = this.tx;
		} else if(row == 1) {
			vector4.x = this.c;
			vector4.y = this.d;
			vector4.z = this.ty;
		} else {
			vector4.x = 0;
			vector4.y = 0;
			vector4.z = 1;
		}
	}
	,createBox: function(scaleX,scaleY,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = scaleX;
		this.d = scaleY;
		this.b = rotation;
		this.tx = tx;
		this.ty = ty;
	}
	,createGradientBox: function(width,height,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = width / 1638.4;
		this.d = height / 1638.4;
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.tx = tx + width / 2;
		this.ty = ty + height / 2;
	}
	,equals: function(Matrix3) {
		return Matrix3 != null && this.tx == Matrix3.tx && this.ty == Matrix3.ty && this.a == Matrix3.a && this.b == Matrix3.b && this.c == Matrix3.c && this.d == Matrix3.d;
	}
	,deltaTransformVector2: function(Vector2) {
		return new lime.math.Vector2(Vector2.x * this.a + Vector2.y * this.c,Vector2.x * this.b + Vector2.y * this.d);
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new lime.math.Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
		result.concat(m);
		return result;
	}
	,rotate: function(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,setRotation: function(theta,scale) {
		if(scale == null) scale = 1;
		this.a = Math.cos(theta) * scale;
		this.c = Math.sin(theta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,to3DString: function(roundPixels) {
		if(roundPixels == null) roundPixels = false;
		if(roundPixels) return "Matrix33d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + (this.tx | 0) + ", " + (this.ty | 0) + ", 0, 1)"; else return "Matrix33d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,toMozString: function() {
		return "Matrix3(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,toString: function() {
		return "Matrix3(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,transformVector2: function(pos) {
		return new lime.math.Vector2(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		var m = new lime.math.Matrix3();
		m.tx = dx;
		m.ty = dy;
		this.concat(m);
	}
	,__cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.tx = Math.round(this.tx * 10) / 10;
		this.ty = Math.round(this.ty * 10) / 10;
	}
	,__transformX: function(pos) {
		return pos.x * this.a + pos.y * this.c + this.tx;
	}
	,__transformY: function(pos) {
		return pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__translateTransformed: function(pos) {
		this.tx = pos.x * this.a + pos.y * this.c + this.tx;
		this.ty = pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__class__: lime.math.Matrix3
};
lime.math._Matrix4 = {};
lime.math._Matrix4.Matrix4_Impl_ = function() { };
$hxClasses["lime.math._Matrix4.Matrix4_Impl_"] = lime.math._Matrix4.Matrix4_Impl_;
lime.math._Matrix4.Matrix4_Impl_.__name__ = ["lime","math","_Matrix4","Matrix4_Impl_"];
lime.math._Matrix4.Matrix4_Impl_.__properties__ = {set_position:"set_position",get_position:"get_position",get_determinant:"get_determinant"}
lime.math._Matrix4.Matrix4_Impl_._new = function(data) {
	var this1;
	if(data != null && data.length == 16) this1 = data; else this1 = new Float32Array(lime.math._Matrix4.Matrix4_Impl_.__identity);
	return this1;
};
lime.math._Matrix4.Matrix4_Impl_.append = function(this1,lhs) {
	var m111 = this1[0];
	var m121 = this1[4];
	var m131 = this1[8];
	var m141 = this1[12];
	var m112 = this1[1];
	var m122 = this1[5];
	var m132 = this1[9];
	var m142 = this1[13];
	var m113 = this1[2];
	var m123 = this1[6];
	var m133 = this1[10];
	var m143 = this1[14];
	var m114 = this1[3];
	var m124 = this1[7];
	var m134 = this1[11];
	var m144 = this1[15];
	var m211 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,0);
	var m221 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,4);
	var m231 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,8);
	var m241 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,12);
	var m212 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,1);
	var m222 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,5);
	var m232 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,9);
	var m242 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,13);
	var m213 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,2);
	var m223 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,6);
	var m233 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,10);
	var m243 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,14);
	var m214 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,3);
	var m224 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,7);
	var m234 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,11);
	var m244 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,15);
	this1[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
	this1[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
	this1[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
	this1[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
	this1[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
	this1[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
	this1[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
	this1[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
	this1[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
	this1[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
	this1[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
	this1[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
	this1[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
	this1[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
	this1[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
	this1[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
};
lime.math._Matrix4.Matrix4_Impl_.appendRotation = function(this1,degrees,axis,pivotPoint) {
	var m = lime.math._Matrix4.Matrix4_Impl_.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		lime.math._Matrix4.Matrix4_Impl_.appendTranslation(m,p.x,p.y,p.z);
	}
	lime.math._Matrix4.Matrix4_Impl_.append(this1,m);
};
lime.math._Matrix4.Matrix4_Impl_.appendScale = function(this1,xScale,yScale,zScale) {
	lime.math._Matrix4.Matrix4_Impl_.append(this1,lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0])));
};
lime.math._Matrix4.Matrix4_Impl_.appendTranslation = function(this1,x,y,z) {
	this1[12] = this1[12] + x;
	this1[13] = this1[13] + y;
	this1[14] = this1[14] + z;
};
lime.math._Matrix4.Matrix4_Impl_.clone = function(this1) {
	return lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array(this1));
};
lime.math._Matrix4.Matrix4_Impl_.copyColumnFrom = function(this1,column,vector) {
	switch(column) {
	case 0:
		this1[0] = vector.x;
		this1[1] = vector.y;
		this1[2] = vector.z;
		this1[3] = vector.w;
		break;
	case 1:
		this1[4] = vector.x;
		this1[5] = vector.y;
		this1[6] = vector.z;
		this1[7] = vector.w;
		break;
	case 2:
		this1[8] = vector.x;
		this1[9] = vector.y;
		this1[10] = vector.z;
		this1[11] = vector.w;
		break;
	case 3:
		this1[12] = vector.x;
		this1[13] = vector.y;
		this1[14] = vector.z;
		this1[15] = vector.w;
		break;
	default:
		throw "Error, Column " + column + " out of bounds [0, ..., 3]";
	}
};
lime.math._Matrix4.Matrix4_Impl_.copyColumnTo = function(this1,column,vector) {
	switch(column) {
	case 0:
		vector.x = this1[0];
		vector.y = this1[1];
		vector.z = this1[2];
		vector.w = this1[3];
		break;
	case 1:
		vector.x = this1[4];
		vector.y = this1[5];
		vector.z = this1[6];
		vector.w = this1[7];
		break;
	case 2:
		vector.x = this1[8];
		vector.y = this1[9];
		vector.z = this1[10];
		vector.w = this1[11];
		break;
	case 3:
		vector.x = this1[12];
		vector.y = this1[13];
		vector.z = this1[14];
		vector.w = this1[15];
		break;
	default:
		throw "Error, Column " + column + " out of bounds [0, ..., 3]";
	}
};
lime.math._Matrix4.Matrix4_Impl_.copyFrom = function(this1,other) {
	this1.set(other);
};
lime.math._Matrix4.Matrix4_Impl_.copythisFrom = function(this1,array,index,transposeValues) {
	if(transposeValues == null) transposeValues = false;
	if(index == null) index = 0;
	if(transposeValues) lime.math._Matrix4.Matrix4_Impl_.transpose(this1);
	var l = array.length - index;
	var _g = 0;
	while(_g < l) {
		var c = _g++;
		this1[c] = array[c + index];
	}
	if(transposeValues) lime.math._Matrix4.Matrix4_Impl_.transpose(this1);
};
lime.math._Matrix4.Matrix4_Impl_.copythisTo = function(this1,array,index,transposeValues) {
	if(transposeValues == null) transposeValues = false;
	if(index == null) index = 0;
	if(transposeValues) lime.math._Matrix4.Matrix4_Impl_.transpose(this1);
	var l = this1.length;
	var _g = 0;
	while(_g < l) {
		var c = _g++;
		array[c + index] = this1[c];
	}
	if(transposeValues) lime.math._Matrix4.Matrix4_Impl_.transpose(this1);
};
lime.math._Matrix4.Matrix4_Impl_.copyRowFrom = function(this1,row,vector) {
	switch(row) {
	case 0:
		this1[0] = vector.x;
		this1[4] = vector.y;
		this1[8] = vector.z;
		this1[12] = vector.w;
		break;
	case 1:
		this1[1] = vector.x;
		this1[5] = vector.y;
		this1[9] = vector.z;
		this1[13] = vector.w;
		break;
	case 2:
		this1[2] = vector.x;
		this1[6] = vector.y;
		this1[10] = vector.z;
		this1[14] = vector.w;
		break;
	case 3:
		this1[3] = vector.x;
		this1[7] = vector.y;
		this1[11] = vector.z;
		this1[15] = vector.w;
		break;
	default:
		throw "Error, Row " + Std.string((function($this) {
			var $r;
			var $int = row;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this))) + " out of bounds [0, ..., 3]";
	}
};
lime.math._Matrix4.Matrix4_Impl_.create2D = function(x,y,scale,rotation) {
	if(rotation == null) rotation = 0;
	if(scale == null) scale = 1;
	var theta = rotation * Math.PI / 180.0;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	return lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([c * scale,-s * scale,0,0,s * scale,c * scale,0,0,0,0,1,0,x,y,0,1]));
};
lime.math._Matrix4.Matrix4_Impl_.createABCD = function(a,b,c,d,tx,ty) {
	return lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([a,b,0,0,c,d,0,0,0,0,1,0,tx,ty,0,1]));
};
lime.math._Matrix4.Matrix4_Impl_.createOrtho = function(x0,x1,y0,y1,zNear,zFar) {
	var sx = 1.0 / (x1 - x0);
	var sy = 1.0 / (y1 - y0);
	var sz = 1.0 / (zFar - zNear);
	return lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([2.0 * sx,0,0,0,0,2.0 * sy,0,0,0,0,-2. * sz,0,-(x0 + x1) * sx,-(y0 + y1) * sy,-(zNear + zFar) * sz,1]));
};
lime.math._Matrix4.Matrix4_Impl_.copyRowTo = function(this1,row,vector) {
	switch(row) {
	case 0:
		vector.x = this1[0];
		vector.y = this1[4];
		vector.z = this1[8];
		vector.w = this1[12];
		break;
	case 1:
		vector.x = this1[1];
		vector.y = this1[5];
		vector.z = this1[9];
		vector.w = this1[13];
		break;
	case 2:
		vector.x = this1[2];
		vector.y = this1[6];
		vector.z = this1[10];
		vector.w = this1[14];
		break;
	case 3:
		vector.x = this1[3];
		vector.y = this1[7];
		vector.z = this1[11];
		vector.w = this1[15];
		break;
	default:
		throw "Error, Row " + row + " out of bounds [0, ..., 3]";
	}
};
lime.math._Matrix4.Matrix4_Impl_.copyToMatrix4 = function(this1,other) {
	(js.Boot.__cast(other , Float32Array)).set(this1);
};
lime.math._Matrix4.Matrix4_Impl_.deltaTransformVector = function(this1,v) {
	var x = v.x;
	var y = v.y;
	var z = v.z;
	return new lime.math.Vector4(x * this1[0] + y * this1[4] + z * this1[8] + this1[3],x * this1[1] + y * this1[5] + z * this1[9] + this1[7],x * this1[2] + y * this1[6] + z * this1[10] + this1[11],0);
};
lime.math._Matrix4.Matrix4_Impl_.identity = function(this1) {
	this1[0] = 1;
	this1[1] = 0;
	this1[2] = 0;
	this1[3] = 0;
	this1[4] = 0;
	this1[5] = 1;
	this1[6] = 0;
	this1[7] = 0;
	this1[8] = 0;
	this1[9] = 0;
	this1[10] = 1;
	this1[11] = 0;
	this1[12] = 0;
	this1[13] = 0;
	this1[14] = 0;
	this1[15] = 1;
};
lime.math._Matrix4.Matrix4_Impl_.interpolate = function(thisMat,toMat,percent) {
	var m = lime.math._Matrix4.Matrix4_Impl_._new();
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		lime.math._Matrix4.Matrix4_Impl_.set(m,i,lime.math._Matrix4.Matrix4_Impl_.get(thisMat,i) + (lime.math._Matrix4.Matrix4_Impl_.get(toMat,i) - lime.math._Matrix4.Matrix4_Impl_.get(thisMat,i)) * percent);
	}
	return m;
};
lime.math._Matrix4.Matrix4_Impl_.interpolateTo = function(this1,toMat,percent) {
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		this1[i] = this1[i] + (lime.math._Matrix4.Matrix4_Impl_.get(toMat,i) - this1[i]) * percent;
	}
};
lime.math._Matrix4.Matrix4_Impl_.invert = function(this1) {
	var d = lime.math._Matrix4.Matrix4_Impl_.get_determinant(this1);
	var invertable = Math.abs(d) > 0.00000000001;
	if(invertable) {
		d = 1 / d;
		var m11 = this1[0];
		var m21 = this1[4];
		var m31 = this1[8];
		var m41 = this1[12];
		var m12 = this1[1];
		var m22 = this1[5];
		var m32 = this1[9];
		var m42 = this1[13];
		var m13 = this1[2];
		var m23 = this1[6];
		var m33 = this1[10];
		var m43 = this1[14];
		var m14 = this1[3];
		var m24 = this1[7];
		var m34 = this1[11];
		var m44 = this1[15];
		this1[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
		this1[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
		this1[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
		this1[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
		this1[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
		this1[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
		this1[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
		this1[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
		this1[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
		this1[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
		this1[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
		this1[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
		this1[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
		this1[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
		this1[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
		this1[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
	}
	return invertable;
};
lime.math._Matrix4.Matrix4_Impl_.pointAt = function(this1,pos,at,up) {
	if(at == null) at = new lime.math.Vector4(0,0,-1);
	if(up == null) up = new lime.math.Vector4(0,-1,0);
	var dir = new lime.math.Vector4(at.x - pos.x,at.y - pos.y,at.z - pos.z);
	var vup = new lime.math.Vector4(up.x,up.y,up.z,up.w);
	var right;
	dir.normalize();
	vup.normalize();
	var dir2 = new lime.math.Vector4(dir.x,dir.y,dir.z,dir.w);
	dir2.scaleBy(vup.x * dir.x + vup.y * dir.y + vup.z * dir.z);
	vup = new lime.math.Vector4(vup.x - dir2.x,vup.y - dir2.y,vup.z - dir2.z);
	if(Math.sqrt(vup.x * vup.x + vup.y * vup.y + vup.z * vup.z) > 0) vup.normalize(); else if(dir.x != 0) vup = new lime.math.Vector4(-dir.y,dir.x,0); else vup = new lime.math.Vector4(1,0,0);
	right = new lime.math.Vector4(vup.y * dir.z - vup.z * dir.y,vup.z * dir.x - vup.x * dir.z,vup.x * dir.y - vup.y * dir.x,1);
	right.normalize();
	this1[0] = right.x;
	this1[4] = right.y;
	this1[8] = right.z;
	this1[12] = 0.0;
	this1[1] = vup.x;
	this1[5] = vup.y;
	this1[9] = vup.z;
	this1[13] = 0.0;
	this1[2] = dir.x;
	this1[6] = dir.y;
	this1[10] = dir.z;
	this1[14] = 0.0;
	this1[3] = pos.x;
	this1[7] = pos.y;
	this1[11] = pos.z;
	this1[15] = 1.0;
};
lime.math._Matrix4.Matrix4_Impl_.prepend = function(this1,rhs) {
	var m111 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,0);
	var m121 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,4);
	var m131 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,8);
	var m141 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,12);
	var m112 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,1);
	var m122 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,5);
	var m132 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,9);
	var m142 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,13);
	var m113 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,2);
	var m123 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,6);
	var m133 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,10);
	var m143 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,14);
	var m114 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,3);
	var m124 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,7);
	var m134 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,11);
	var m144 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,15);
	var m211 = this1[0];
	var m221 = this1[4];
	var m231 = this1[8];
	var m241 = this1[12];
	var m212 = this1[1];
	var m222 = this1[5];
	var m232 = this1[9];
	var m242 = this1[13];
	var m213 = this1[2];
	var m223 = this1[6];
	var m233 = this1[10];
	var m243 = this1[14];
	var m214 = this1[3];
	var m224 = this1[7];
	var m234 = this1[11];
	var m244 = this1[15];
	this1[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
	this1[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
	this1[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
	this1[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
	this1[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
	this1[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
	this1[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
	this1[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
	this1[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
	this1[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
	this1[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
	this1[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
	this1[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
	this1[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
	this1[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
	this1[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
};
lime.math._Matrix4.Matrix4_Impl_.prependRotation = function(this1,degrees,axis,pivotPoint) {
	var m = lime.math._Matrix4.Matrix4_Impl_.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		lime.math._Matrix4.Matrix4_Impl_.appendTranslation(m,p.x,p.y,p.z);
	}
	lime.math._Matrix4.Matrix4_Impl_.prepend(this1,m);
};
lime.math._Matrix4.Matrix4_Impl_.prependScale = function(this1,xScale,yScale,zScale) {
	lime.math._Matrix4.Matrix4_Impl_.prepend(this1,lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0])));
};
lime.math._Matrix4.Matrix4_Impl_.prependTranslation = function(this1,x,y,z) {
	var m = lime.math._Matrix4.Matrix4_Impl_._new();
	lime.math._Matrix4.Matrix4_Impl_.set_position(m,new lime.math.Vector4(x,y,z));
	lime.math._Matrix4.Matrix4_Impl_.prepend(this1,m);
};
lime.math._Matrix4.Matrix4_Impl_.transformVector = function(this1,v) {
	var x = v.x;
	var y = v.y;
	var z = v.z;
	return new lime.math.Vector4(x * this1[0] + y * this1[4] + z * this1[8] + this1[12],x * this1[1] + y * this1[5] + z * this1[9] + this1[13],x * this1[2] + y * this1[6] + z * this1[10] + this1[14],x * this1[3] + y * this1[7] + z * this1[11] + this1[15]);
};
lime.math._Matrix4.Matrix4_Impl_.transformVectors = function(this1,ain,aout) {
	var i = 0;
	while(i + 3 <= ain.length) {
		var x = ain[i];
		var y = ain[i + 1];
		var z = ain[i + 2];
		aout[i] = x * this1[0] + y * this1[4] + z * this1[8] + this1[12];
		aout[i + 1] = x * this1[1] + y * this1[5] + z * this1[9] + this1[13];
		aout[i + 2] = x * this1[2] + y * this1[6] + z * this1[10] + this1[14];
		i += 3;
	}
};
lime.math._Matrix4.Matrix4_Impl_.transpose = function(this1) {
	var othis = new Float32Array(this1);
	this1[1] = othis[4];
	this1[2] = othis[8];
	this1[3] = othis[12];
	this1[4] = othis[1];
	this1[6] = othis[9];
	this1[7] = othis[13];
	this1[8] = othis[2];
	this1[9] = othis[6];
	this1[11] = othis[14];
	this1[12] = othis[3];
	this1[13] = othis[7];
	this1[14] = othis[11];
};
lime.math._Matrix4.Matrix4_Impl_.getAxisRotation = function(x,y,z,degrees) {
	var m = lime.math._Matrix4.Matrix4_Impl_._new();
	var a1 = new lime.math.Vector4(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	lime.math._Matrix4.Matrix4_Impl_.set(m,0,c + a1.x * a1.x * t);
	lime.math._Matrix4.Matrix4_Impl_.set(m,5,c + a1.y * a1.y * t);
	lime.math._Matrix4.Matrix4_Impl_.set(m,10,c + a1.z * a1.z * t);
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	lime.math._Matrix4.Matrix4_Impl_.set(m,4,tmp1 + tmp2);
	lime.math._Matrix4.Matrix4_Impl_.set(m,1,tmp1 - tmp2);
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	lime.math._Matrix4.Matrix4_Impl_.set(m,8,tmp1 - tmp2);
	lime.math._Matrix4.Matrix4_Impl_.set(m,2,tmp1 + tmp2);
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	lime.math._Matrix4.Matrix4_Impl_.set(m,9,tmp1 + tmp2);
	lime.math._Matrix4.Matrix4_Impl_.set(m,6,tmp1 - tmp2);
	return m;
};
lime.math._Matrix4.Matrix4_Impl_.get_determinant = function(this1) {
	return (this1[0] * this1[5] - this1[4] * this1[1]) * (this1[10] * this1[15] - this1[14] * this1[11]) - (this1[0] * this1[9] - this1[8] * this1[1]) * (this1[6] * this1[15] - this1[14] * this1[7]) + (this1[0] * this1[13] - this1[12] * this1[1]) * (this1[6] * this1[11] - this1[10] * this1[7]) + (this1[4] * this1[9] - this1[8] * this1[5]) * (this1[2] * this1[15] - this1[14] * this1[3]) - (this1[4] * this1[13] - this1[12] * this1[5]) * (this1[2] * this1[11] - this1[10] * this1[3]) + (this1[8] * this1[13] - this1[12] * this1[9]) * (this1[2] * this1[7] - this1[6] * this1[3]);
};
lime.math._Matrix4.Matrix4_Impl_.get_position = function(this1) {
	return new lime.math.Vector4(this1[12],this1[13],this1[14]);
};
lime.math._Matrix4.Matrix4_Impl_.set_position = function(this1,val) {
	this1[12] = val.x;
	this1[13] = val.y;
	this1[14] = val.z;
	return val;
};
lime.math._Matrix4.Matrix4_Impl_.get = function(this1,index) {
	return this1[index];
};
lime.math._Matrix4.Matrix4_Impl_.set = function(this1,index,value) {
	this1[index] = value;
	return value;
};
lime.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.math.Rectangle"] = lime.math.Rectangle;
lime.math.Rectangle.__name__ = ["lime","math","Rectangle"];
lime.math.Rectangle.prototype = {
	clone: function() {
		return new lime.math.Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(x,y) {
		return x >= this.x && y >= this.y && x < this.get_right() && y < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,equals: function(toCompare) {
		return toCompare != null && this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,intersection: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return new lime.math.Rectangle();
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		if(y1 <= y0) return new lime.math.Rectangle();
		return new lime.math.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,intersects: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return false;
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		return y1 > y0;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,setTo: function(xa,ya,widtha,heighta) {
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new lime.math.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,union: function(toUnion) {
		if(this.width == 0 || this.height == 0) return toUnion.clone(); else if(toUnion.width == 0 || toUnion.height == 0) return this.clone();
		var x0;
		if(this.x > toUnion.x) x0 = toUnion.x; else x0 = this.x;
		var x1;
		if(this.get_right() < toUnion.get_right()) x1 = toUnion.get_right(); else x1 = this.get_right();
		var y0;
		if(this.y > toUnion.y) y0 = toUnion.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() < toUnion.get_bottom()) y1 = toUnion.get_bottom(); else y1 = this.get_bottom();
		return new lime.math.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,__contract: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) return;
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x < x) this.x = x;
		if(this.y < y) this.y = y;
		if(this.get_right() > x + width) this.width = x + width - this.x;
		if(this.get_bottom() > y + height) this.height = y + height - this.y;
	}
	,__expand: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return;
		}
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x > x) this.x = x;
		if(this.y > y) this.y = y;
		if(cacheRight < x + width) this.width = x + width - this.x;
		if(cacheBottom < y + height) this.height = y + height - this.y;
	}
	,__toFlashRectangle: function() {
		return null;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottomRight: function() {
		return new lime.math.Vector2(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_size: function() {
		return new lime.math.Vector2(this.width,this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_topLeft: function() {
		return new lime.math.Vector2(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,__class__: lime.math.Rectangle
	,__properties__: {set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_top:"set_top",get_top:"get_top",set_size:"set_size",get_size:"get_size",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_bottom:"set_bottom",get_bottom:"get_bottom"}
};
lime.math.Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["lime.math.Vector2"] = lime.math.Vector2;
lime.math.Vector2.__name__ = ["lime","math","Vector2"];
lime.math.Vector2.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
};
lime.math.Vector2.interpolate = function(pt1,pt2,f) {
	return new lime.math.Vector2(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
};
lime.math.Vector2.polar = function(len,angle) {
	return new lime.math.Vector2(len * Math.cos(angle),len * Math.sin(angle));
};
lime.math.Vector2.prototype = {
	add: function(v) {
		return new lime.math.Vector2(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new lime.math.Vector2(this.x,this.y);
	}
	,equals: function(toCompare) {
		return toCompare != null && toCompare.x == this.x && toCompare.y == this.y;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,subtract: function(v) {
		return new lime.math.Vector2(this.x - v.x,this.y - v.y);
	}
	,__toFlashPoint: function() {
		return null;
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: lime.math.Vector2
	,__properties__: {get_length:"get_length"}
};
lime.math.Vector4 = function(x,y,z,w) {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["lime.math.Vector4"] = lime.math.Vector4;
lime.math.Vector4.__name__ = ["lime","math","Vector4"];
lime.math.Vector4.__properties__ = {get_Z_AXIS:"get_Z_AXIS",get_Y_AXIS:"get_Y_AXIS",get_X_AXIS:"get_X_AXIS"}
lime.math.Vector4.X_AXIS = null;
lime.math.Vector4.Y_AXIS = null;
lime.math.Vector4.Z_AXIS = null;
lime.math.Vector4.angleBetween = function(a,b) {
	var a0 = new lime.math.Vector4(a.x,a.y,a.z,a.w);
	a0.normalize();
	var b0 = new lime.math.Vector4(b.x,b.y,b.z,b.w);
	b0.normalize();
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
};
lime.math.Vector4.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
};
lime.math.Vector4.get_X_AXIS = function() {
	return new lime.math.Vector4(1,0,0);
};
lime.math.Vector4.get_Y_AXIS = function() {
	return new lime.math.Vector4(0,1,0);
};
lime.math.Vector4.get_Z_AXIS = function() {
	return new lime.math.Vector4(0,0,1);
};
lime.math.Vector4.prototype = {
	add: function(a) {
		return new lime.math.Vector4(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new lime.math.Vector4(this.x,this.y,this.z,this.w);
	}
	,copyFrom: function(sourceVector4) {
		this.x = sourceVector4.x;
		this.y = sourceVector4.y;
		this.z = sourceVector4.z;
	}
	,crossProduct: function(a) {
		return new lime.math.Vector4(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,decrementBy: function(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,equals: function(toCompare,allFour) {
		if(allFour == null) allFour = false;
		return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
	}
	,incrementBy: function(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
	}
	,nearEquals: function(toCompare,tolerance,allFour) {
		if(allFour == null) allFour = false;
		return Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance && (!allFour || Math.abs(this.w - toCompare.w) < tolerance);
	}
	,negate: function() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
	}
	,normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,project: function() {
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
	}
	,scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,setTo: function(xa,ya,za) {
		this.x = xa;
		this.y = ya;
		this.z = za;
	}
	,subtract: function(a) {
		return new lime.math.Vector4(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	,toString: function() {
		return "Vector4(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,__class__: lime.math.Vector4
	,__properties__: {get_lengthSquared:"get_lengthSquared",get_length:"get_length"}
};
lime.net = {};
lime.net.URLLoader = function(request) {
	this.onSecurityError = new lime.app.Event();
	this.onProgress = new lime.app.Event();
	this.onOpen = new lime.app.Event();
	this.onIOError = new lime.app.Event();
	this.onHTTPStatus = new lime.app.Event();
	this.onComplete = new lime.app.Event();
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(lime.net.URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["lime.net.URLLoader"] = lime.net.URLLoader;
lime.net.URLLoader.__name__ = ["lime","net","URLLoader"];
lime.net.URLLoader.prototype = {
	close: function() {
	}
	,getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var _g = this;
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.__onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s;
			try {
				s = subject.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) {
				var listeners = self.onHTTPStatus.listeners;
				var repeat = self.onHTTPStatus.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i](_g,s);
					if(!repeat[i]) {
						self.onHTTPStatus.remove(listeners[i]);
						length--;
					} else i++;
				}
			}
			if(s != null && s >= 200 && s < 400) self.__onData(subject.response); else if(s == null) {
				var listeners1 = self.onIOError.listeners;
				var repeat1 = self.onIOError.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1](_g,"Failed to connect or resolve host");
					if(!repeat1[i1]) {
						self.onIOError.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
			} else if(s == 12029) {
				var listeners2 = self.onIOError.listeners;
				var repeat2 = self.onIOError.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2](_g,"Failed to connect to host");
					if(!repeat2[i2]) {
						self.onIOError.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
			} else if(s == 12007) {
				var listeners3 = self.onIOError.listeners;
				var repeat3 = self.onIOError.repeat;
				var length3 = listeners3.length;
				var i3 = 0;
				while(i3 < length3) {
					listeners3[i3](_g,"Unknown host");
					if(!repeat3[i3]) {
						self.onIOError.remove(listeners3[i3]);
						length3--;
					} else i3++;
				}
			} else if(s == 0) {
				var listeners4 = self.onIOError.listeners;
				var repeat4 = self.onIOError.repeat;
				var length4 = listeners4.length;
				var i4 = 0;
				while(i4 < length4) {
					listeners4[i4](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat4[i4]) {
						self.onIOError.remove(listeners4[i4]);
						length4--;
					} else i4++;
				}
				var listeners5 = self.onSecurityError.listeners;
				var repeat5 = self.onSecurityError.repeat;
				var length5 = listeners5.length;
				var i5 = 0;
				while(i5 < length5) {
					listeners5[i5](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat5[i5]) {
						self.onSecurityError.remove(listeners5[i5]);
						length5--;
					} else i5++;
				}
			} else {
				var listeners6 = self.onIOError.listeners;
				var repeat6 = self.onIOError.repeat;
				var length6 = listeners6.length;
				var i6 = 0;
				while(i6 < length6) {
					listeners6[i6](_g,"Http Error #" + subject.status);
					if(!repeat6[i6]) {
						self.onIOError.remove(listeners6[i6]);
						length6--;
					} else i6++;
				}
			}
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,lime.utils.ByteArray)) {
			var data1 = data;
			var _g = this.dataFormat;
			switch(_g[1]) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,lime.net.URLVariables)) {
			var data2 = data;
			var _g1 = 0;
			var _g11 = Reflect.fields(data2);
			while(_g1 < _g11.length) {
				var p = _g11[_g1];
				++_g1;
				if(uri.length != 0) uri += "&";
				uri += encodeURIComponent(p) + "=" + StringTools.urlEncode(Reflect.field(data2,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open("GET",url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(js.Boot.__cast(method , String),url,true);
		} catch( e ) {
			var listeners = this.onIOError.listeners;
			var repeat = this.onIOError.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](this,e.toString());
				if(!repeat[i]) {
					this.onIOError.remove(listeners[i]);
					length--;
				} else i++;
			}
			return;
		}
		var _g2 = this.dataFormat;
		switch(_g2[1]) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g3 = 0;
		while(_g3 < requestHeaders.length) {
			var header = requestHeaders[_g3];
			++_g3;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		var listeners1 = this.onOpen.listeners;
		var repeat1 = this.onOpen.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](this);
			if(!repeat1[i1]) {
				this.onOpen.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,__onData: function(_) {
		var content = this.getData();
		var _g = this.dataFormat;
		switch(_g[1]) {
		case 0:
			this.data = lime.utils.ByteArray.__ofBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var listeners = this.onComplete.listeners;
		var repeat = this.onComplete.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](this);
			if(!repeat[i]) {
				this.onComplete.remove(listeners[i]);
				length--;
			} else i++;
		}
	}
	,__onProgress: function(event) {
		this.bytesLoaded = event.loaded;
		this.bytesTotal = event.total;
		var listeners = this.onProgress.listeners;
		var repeat = this.onProgress.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](this,this.bytesLoaded,this.bytesTotal);
			if(!repeat[i]) {
				this.onProgress.remove(listeners[i]);
				length--;
			} else i++;
		}
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == lime.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(window,"ArrayBuffer")) this.dataFormat = lime.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: lime.net.URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
};
lime.net.URLLoaderDataFormat = $hxClasses["lime.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] };
lime.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
lime.net.URLLoaderDataFormat.BINARY.toString = $estr;
lime.net.URLLoaderDataFormat.BINARY.__enum__ = lime.net.URLLoaderDataFormat;
lime.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
lime.net.URLLoaderDataFormat.TEXT.toString = $estr;
lime.net.URLLoaderDataFormat.TEXT.__enum__ = lime.net.URLLoaderDataFormat;
lime.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
lime.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
lime.net.URLLoaderDataFormat.VARIABLES.__enum__ = lime.net.URLLoaderDataFormat;
lime.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["lime.net.URLRequest"] = lime.net.URLRequest;
lime.net.URLRequest.__name__ = ["lime","net","URLRequest"];
lime.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == "GET" || this.data == null) return res;
		if(typeof(this.data) == "string" || js.Boot.__instanceof(this.data,lime.utils.ByteArray)) {
			res = res.slice();
			res.push(new lime.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: lime.net.URLRequest
};
lime.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["lime.net.URLRequestHeader"] = lime.net.URLRequestHeader;
lime.net.URLRequestHeader.__name__ = ["lime","net","URLRequestHeader"];
lime.net.URLRequestHeader.prototype = {
	__class__: lime.net.URLRequestHeader
};
lime.net._URLRequestMethod = {};
lime.net._URLRequestMethod.URLRequestMethod_Impl_ = function() { };
$hxClasses["lime.net._URLRequestMethod.URLRequestMethod_Impl_"] = lime.net._URLRequestMethod.URLRequestMethod_Impl_;
lime.net._URLRequestMethod.URLRequestMethod_Impl_.__name__ = ["lime","net","_URLRequestMethod","URLRequestMethod_Impl_"];
lime.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["lime.net.URLVariables"] = lime.net.URLVariables;
lime.net.URLVariables.__name__ = ["lime","net","URLVariables"];
lime.net.URLVariables.prototype = {
	decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g1 = 0;
		while(_g1 < fields1.length) {
			var f1 = fields1[_g1];
			++_g1;
			var eq = f1.indexOf("=");
			if(eq > 0) Reflect.setField(this,StringTools.urlDecode(HxOverrides.substr(f1,0,eq)),StringTools.urlDecode(HxOverrides.substr(f1,eq + 1,null))); else if(eq != 0) Reflect.setField(this,decodeURIComponent(f1.split("+").join(" ")),"");
		}
	}
	,toString: function() {
		var result = new Array();
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			result.push(encodeURIComponent(f) + "=" + StringTools.urlEncode(Reflect.field(this,f)));
		}
		return result.join("&");
	}
	,__class__: lime.net.URLVariables
};
lime.system = {};
lime.system.System = function() { };
$hxClasses["lime.system.System"] = lime.system.System;
lime.system.System.__name__ = ["lime","system","System"];
lime.system.System.disableCFFI = null;
lime.system.System.embed = $hx_exports.lime.embed = function(element,width,height,background,assetsPrefix) {
	var htmlElement = null;
	if(typeof(element) == "string") htmlElement = window.document.getElementById(js.Boot.__cast(element , String)); else if(element == null) htmlElement = window.document.createElement("div"); else htmlElement = element;
	var color = null;
	if(background != null) {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	if(width == null) width = 0;
	if(height == null) height = 0;
	ApplicationMain.config.background = color;
	ApplicationMain.config.element = htmlElement;
	ApplicationMain.config.width = width;
	ApplicationMain.config.height = height;
	ApplicationMain.config.assetsPrefix = assetsPrefix;
	ApplicationMain.create();
};
lime.system.System.findHaxeLib = function(library) {
	return "";
};
lime.system.System.getTimer = function() {
	return Std["int"]((haxe.Timer.stamp() - lime.system.System.__startTime) * 1000);
};
lime.system.System.load = function(library,method,args,lazy) {
	if(lazy == null) lazy = false;
	if(args == null) args = 0;
	if(lime.system.System.disableCFFI) return Reflect.makeVarArgs(function(__) {
		return { };
	});
	if(lazy) {
	}
	var result = null;
	return result;
};
lime.system.System.sysName = function() {
	return null;
};
lime.system.System.tryLoad = function(name,library,func,args) {
	return null;
};
lime.system.System.loaderTrace = function(message) {
};
lime.ui = {};
lime.ui._KeyCode = {};
lime.ui._KeyCode.KeyCode_Impl_ = function() { };
$hxClasses["lime.ui._KeyCode.KeyCode_Impl_"] = lime.ui._KeyCode.KeyCode_Impl_;
lime.ui._KeyCode.KeyCode_Impl_.__name__ = ["lime","ui","_KeyCode","KeyCode_Impl_"];
lime.ui._KeyModifier = {};
lime.ui._KeyModifier.KeyModifier_Impl_ = function() { };
$hxClasses["lime.ui._KeyModifier.KeyModifier_Impl_"] = lime.ui._KeyModifier.KeyModifier_Impl_;
lime.ui._KeyModifier.KeyModifier_Impl_.__name__ = ["lime","ui","_KeyModifier","KeyModifier_Impl_"];
lime.ui._KeyModifier.KeyModifier_Impl_.__properties__ = {set_shiftKey:"set_shiftKey",get_shiftKey:"get_shiftKey",set_numLock:"set_numLock",get_numLock:"get_numLock",set_metaKey:"set_metaKey",get_metaKey:"get_metaKey",set_ctrlKey:"set_ctrlKey",get_ctrlKey:"get_ctrlKey",set_capsLock:"set_capsLock",get_capsLock:"get_capsLock",set_altKey:"set_altKey",get_altKey:"get_altKey"}
lime.ui._KeyModifier.KeyModifier_Impl_.get_altKey = function(this1) {
	return (this1 & 256) > 0 || (this1 & 512) > 0;
};
lime.ui._KeyModifier.KeyModifier_Impl_.set_altKey = function(this1,value) {
	if(value) this1 |= 768; else this1 &= 268435455 - 768;
	return value;
};
lime.ui._KeyModifier.KeyModifier_Impl_.get_capsLock = function(this1) {
	return (this1 & 8192) > 0 || (this1 & 8192) > 0;
};
lime.ui._KeyModifier.KeyModifier_Impl_.set_capsLock = function(this1,value) {
	if(value) this1 |= 8192; else this1 &= 268435455 - 8192;
	return value;
};
lime.ui._KeyModifier.KeyModifier_Impl_.get_ctrlKey = function(this1) {
	return (this1 & 64) > 0 || (this1 & 128) > 0;
};
lime.ui._KeyModifier.KeyModifier_Impl_.set_ctrlKey = function(this1,value) {
	if(value) this1 |= 192; else this1 &= 268435455 - 192;
	return value;
};
lime.ui._KeyModifier.KeyModifier_Impl_.get_metaKey = function(this1) {
	return (this1 & 1024) > 0 || (this1 & 2048) > 0;
};
lime.ui._KeyModifier.KeyModifier_Impl_.set_metaKey = function(this1,value) {
	if(value) this1 |= 3072; else this1 &= 268435455 - 3072;
	return value;
};
lime.ui._KeyModifier.KeyModifier_Impl_.get_numLock = function(this1) {
	return (this1 & 4096) > 0 || (this1 & 4096) > 0;
};
lime.ui._KeyModifier.KeyModifier_Impl_.set_numLock = function(this1,value) {
	if(value) this1 |= 4096; else this1 &= 268435455 - 4096;
	return value;
};
lime.ui._KeyModifier.KeyModifier_Impl_.get_shiftKey = function(this1) {
	return (this1 & 1) > 0 || (this1 & 2) > 0;
};
lime.ui._KeyModifier.KeyModifier_Impl_.set_shiftKey = function(this1,value) {
	if(value) this1 |= 3; else this1 &= 268435455 - 3;
	return value;
};
lime.ui.Mouse = function() { };
$hxClasses["lime.ui.Mouse"] = lime.ui.Mouse;
lime.ui.Mouse.__name__ = ["lime","ui","Mouse"];
lime.ui.Mouse.__properties__ = {set_cursor:"set_cursor",get_cursor:"get_cursor"}
lime.ui.Mouse.hide = function() {
	lime._backend.html5.HTML5Mouse.hide();
};
lime.ui.Mouse.show = function() {
	lime._backend.html5.HTML5Mouse.show();
};
lime.ui.Mouse.get_cursor = function() {
	return lime._backend.html5.HTML5Mouse.get_cursor();
};
lime.ui.Mouse.set_cursor = function(value) {
	return lime._backend.html5.HTML5Mouse.set_cursor(value);
};
lime.ui.MouseCursor = $hxClasses["lime.ui.MouseCursor"] = { __ename__ : true, __constructs__ : ["ARROW","CROSSHAIR","DEFAULT","MOVE","POINTER","RESIZE_NESW","RESIZE_NS","RESIZE_NWSE","RESIZE_WE","TEXT","WAIT","WAIT_ARROW","CUSTOM"] };
lime.ui.MouseCursor.ARROW = ["ARROW",0];
lime.ui.MouseCursor.ARROW.toString = $estr;
lime.ui.MouseCursor.ARROW.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.CROSSHAIR = ["CROSSHAIR",1];
lime.ui.MouseCursor.CROSSHAIR.toString = $estr;
lime.ui.MouseCursor.CROSSHAIR.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.DEFAULT = ["DEFAULT",2];
lime.ui.MouseCursor.DEFAULT.toString = $estr;
lime.ui.MouseCursor.DEFAULT.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.MOVE = ["MOVE",3];
lime.ui.MouseCursor.MOVE.toString = $estr;
lime.ui.MouseCursor.MOVE.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.POINTER = ["POINTER",4];
lime.ui.MouseCursor.POINTER.toString = $estr;
lime.ui.MouseCursor.POINTER.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.RESIZE_NESW = ["RESIZE_NESW",5];
lime.ui.MouseCursor.RESIZE_NESW.toString = $estr;
lime.ui.MouseCursor.RESIZE_NESW.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.RESIZE_NS = ["RESIZE_NS",6];
lime.ui.MouseCursor.RESIZE_NS.toString = $estr;
lime.ui.MouseCursor.RESIZE_NS.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.RESIZE_NWSE = ["RESIZE_NWSE",7];
lime.ui.MouseCursor.RESIZE_NWSE.toString = $estr;
lime.ui.MouseCursor.RESIZE_NWSE.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.RESIZE_WE = ["RESIZE_WE",8];
lime.ui.MouseCursor.RESIZE_WE.toString = $estr;
lime.ui.MouseCursor.RESIZE_WE.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.TEXT = ["TEXT",9];
lime.ui.MouseCursor.TEXT.toString = $estr;
lime.ui.MouseCursor.TEXT.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.WAIT = ["WAIT",10];
lime.ui.MouseCursor.WAIT.toString = $estr;
lime.ui.MouseCursor.WAIT.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.WAIT_ARROW = ["WAIT_ARROW",11];
lime.ui.MouseCursor.WAIT_ARROW.toString = $estr;
lime.ui.MouseCursor.WAIT_ARROW.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.CUSTOM = ["CUSTOM",12];
lime.ui.MouseCursor.CUSTOM.toString = $estr;
lime.ui.MouseCursor.CUSTOM.__enum__ = lime.ui.MouseCursor;
lime.ui.Window = function(config) {
	this.onWindowResize = new lime.app.Event();
	this.onWindowMove = new lime.app.Event();
	this.onWindowFocusOut = new lime.app.Event();
	this.onWindowFocusIn = new lime.app.Event();
	this.onWindowDeactivate = new lime.app.Event();
	this.onWindowClose = new lime.app.Event();
	this.onWindowActivate = new lime.app.Event();
	this.onTouchStart = new lime.app.Event();
	this.onTouchMove = new lime.app.Event();
	this.onTouchEnd = new lime.app.Event();
	this.onMouseWheel = new lime.app.Event();
	this.onMouseUp = new lime.app.Event();
	this.onMouseMove = new lime.app.Event();
	this.onMouseDown = new lime.app.Event();
	this.onKeyUp = new lime.app.Event();
	this.onKeyDown = new lime.app.Event();
	this.config = config;
	this.width = 0;
	this.height = 0;
	this.fullscreen = false;
	this.x = 0;
	this.y = 0;
	if(config != null) {
		if(Object.prototype.hasOwnProperty.call(config,"width")) this.width = config.width;
		if(Object.prototype.hasOwnProperty.call(config,"height")) this.height = config.height;
		if(Object.prototype.hasOwnProperty.call(config,"fullscreen")) this.fullscreen = config.fullscreen;
	}
	this.backend = new lime._backend.html5.HTML5Window(this);
};
$hxClasses["lime.ui.Window"] = lime.ui.Window;
lime.ui.Window.__name__ = ["lime","ui","Window"];
lime.ui.Window.prototype = {
	close: function() {
		this.backend.close();
	}
	,create: function(application) {
		this.backend.create(application);
		if(this.currentRenderer != null) this.currentRenderer.create();
	}
	,move: function(x,y) {
		this.backend.move(x,y);
		this.x = x;
		this.y = y;
	}
	,resize: function(width,height) {
		this.backend.resize(width,height);
		this.width = width;
		this.height = height;
	}
	,setIcon: function(image) {
		if(image == null) return;
		this.backend.setIcon(image);
	}
	,__class__: lime.ui.Window
};
lime.utils = {};
lime.utils.ByteArray = function(size) {
	if(size == null) size = 0;
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	if(size > 0) this.allocated = size;
	this.___resizeBuffer(this.allocated);
	this.set_length(this.allocated);
};
$hxClasses["lime.utils.ByteArray"] = lime.utils.ByteArray;
lime.utils.ByteArray.__name__ = ["lime","utils","ByteArray"];
lime.utils.ByteArray.fromBytes = function(bytes) {
	var result = new lime.utils.ByteArray();
	result.byteView = new Uint8Array(bytes.b);
	result.set_length(result.byteView.length);
	result.allocated = result.length;
	return result;
};
lime.utils.ByteArray.readFile = function(path) {
	return null;
};
lime.utils.ByteArray.__ofBuffer = function(buffer) {
	var bytes = new lime.utils.ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
};
lime.utils.ByteArray.prototype = {
	clear: function() {
		if(this.allocated < 0) this.___resizeBuffer(this.allocated = Std["int"](Math.max(0,this.allocated * 2))); else if(this.allocated > 0) this.___resizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
		this.position = 0;
	}
	,compress: function(algorithm) {
	}
	,deflate: function() {
		this.compress(lime.utils.CompressionAlgorithm.DEFLATE);
	}
	,inflate: function() {
		this.uncompress(lime.utils.CompressionAlgorithm.DEFLATE);
	}
	,readBoolean: function() {
		return this.readByte() != 0;
	}
	,readByte: function() {
		var data = this.data;
		return data.getInt8(this.position++);
	}
	,readBytes: function(bytes,offset,length) {
		if(length == null) length = 0;
		if(offset == null) offset = 0;
		if(offset < 0 || length < 0) throw "Read error - Out of bounds";
		if(length == 0) length = this.length - this.position;
		var lengthToEnsure = offset + length;
		if(bytes.length < lengthToEnsure) {
			if(bytes.allocated < lengthToEnsure) bytes.___resizeBuffer(bytes.allocated = Std["int"](Math.max(lengthToEnsure,bytes.allocated * 2))); else if(bytes.allocated > lengthToEnsure) bytes.___resizeBuffer(bytes.allocated = lengthToEnsure);
			bytes.length = lengthToEnsure;
			lengthToEnsure;
		}
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readDouble: function() {
		var $double = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return $double;
	}
	,readFloat: function() {
		var $float = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return $float;
	}
	,readInt: function() {
		var $int = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return $int;
	}
	,readMultiByte: function(length,charSet) {
		return this.readUTFBytes(length);
	}
	,readShort: function() {
		var $short = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return $short;
	}
	,readUnsignedByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedShort: function() {
		var uShort = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return uShort;
	}
	,readUTF: function() {
		var bytesCount = this.readUnsignedShort();
		return this.readUTFBytes(bytesCount);
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c21 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,toString: function() {
		var cachePosition = this.position;
		this.position = 0;
		var value = this.readUTFBytes(this.length);
		this.position = cachePosition;
		return value;
	}
	,uncompress: function(algorithm) {
		haxe.Log.trace("Warning: ByteArray.uncompress on JS target requires the 'format' haxelib",{ fileName : "ByteArray.hx", lineNumber : 659, className : "lime.utils.ByteArray", methodName : "uncompress"});
	}
	,write_uncheck: function($byte) {
	}
	,writeBoolean: function(value) {
		this.writeByte(value?1:0);
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeBytes: function(bytes,offset,length) {
		if(length == null) length = 0;
		if(offset == null) offset = 0;
		if(bytes.length == 0) return;
		if((function($this) {
			var $r;
			var aNeg = 0 < 0;
			var bNeg = offset < 0;
			$r = aNeg != bNeg?aNeg:0 > offset;
			return $r;
		}(this)) || (function($this) {
			var $r;
			var aNeg1 = 0 < 0;
			var bNeg1 = length < 0;
			$r = aNeg1 != bNeg1?aNeg1:0 > length;
			return $r;
		}(this))) throw "Write error - Out of bounds";
		if((function($this) {
			var $r;
			var $int = length;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) == 0) length = bytes.length;
		var lengthToEnsure = this.position + length;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position = this.position + length;
	}
	,writeDouble: function(x) {
		var lengthToEnsure = this.position + 8;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeFile: function(path) {
	}
	,writeFloat: function(x) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeUnsignedShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this.__getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,__fromBytes: function(bytes) {
		this.byteView = new Uint8Array(bytes.b);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,__get: function(pos) {
		return this.data.getInt8(pos);
	}
	,__getBuffer: function() {
		return this.data.buffer;
	}
	,__getUTFBytesCount: function(value) {
		var count = 0;
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) count += 1; else if(c <= 2047) count += 2; else if(c <= 65535) count += 3; else count += 4;
		}
		return count;
	}
	,___resizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,get_endian: function() {
		if(this.littleEndian) return "littleEndian"; else return "bigEndian";
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,set_length: function(value) {
		if(this.allocated < value) this.___resizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value) this.___resizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,__class__: lime.utils.ByteArray
	,__properties__: {set_length:"set_length",set_endian:"set_endian",get_endian:"get_endian",get_bytesAvailable:"get_bytesAvailable"}
};
lime.utils.CompressionAlgorithm = $hxClasses["lime.utils.CompressionAlgorithm"] = { __ename__ : true, __constructs__ : ["DEFLATE","ZLIB","LZMA","GZIP"] };
lime.utils.CompressionAlgorithm.DEFLATE = ["DEFLATE",0];
lime.utils.CompressionAlgorithm.DEFLATE.toString = $estr;
lime.utils.CompressionAlgorithm.DEFLATE.__enum__ = lime.utils.CompressionAlgorithm;
lime.utils.CompressionAlgorithm.ZLIB = ["ZLIB",1];
lime.utils.CompressionAlgorithm.ZLIB.toString = $estr;
lime.utils.CompressionAlgorithm.ZLIB.__enum__ = lime.utils.CompressionAlgorithm;
lime.utils.CompressionAlgorithm.LZMA = ["LZMA",2];
lime.utils.CompressionAlgorithm.LZMA.toString = $estr;
lime.utils.CompressionAlgorithm.LZMA.__enum__ = lime.utils.CompressionAlgorithm;
lime.utils.CompressionAlgorithm.GZIP = ["GZIP",3];
lime.utils.CompressionAlgorithm.GZIP.toString = $estr;
lime.utils.CompressionAlgorithm.GZIP.__enum__ = lime.utils.CompressionAlgorithm;
lime.utils.GLUtils = function() { };
$hxClasses["lime.utils.GLUtils"] = lime.utils.GLUtils;
lime.utils.GLUtils.__name__ = ["lime","utils","GLUtils"];
lime.utils.GLUtils.compileShader = function(source,type) {
	var shader = lime.graphics.opengl.GL.context.createShader(type);
	lime.graphics.opengl.GL.context.shaderSource(shader,source);
	lime.graphics.opengl.GL.context.compileShader(shader);
	if(lime.graphics.opengl.GL.context.getShaderParameter(shader,35713) == 0) switch(type) {
	case 35633:
		throw "Error compiling vertex shader";
		break;
	case 35632:
		throw "Error compiling fragment shader";
		break;
	default:
		throw "Error compiling unknown shader type";
	}
	return shader;
};
lime.utils.GLUtils.createProgram = function(vertexSource,fragmentSource) {
	var vertexShader = lime.utils.GLUtils.compileShader(vertexSource,35633);
	var fragmentShader = lime.utils.GLUtils.compileShader(fragmentSource,35632);
	var program = lime.graphics.opengl.GL.context.createProgram();
	lime.graphics.opengl.GL.context.attachShader(program,vertexShader);
	lime.graphics.opengl.GL.context.attachShader(program,fragmentShader);
	lime.graphics.opengl.GL.context.linkProgram(program);
	if(lime.graphics.opengl.GL.context.getProgramParameter(program,35714) == 0) throw "Unable to initialize the shader program.";
	return program;
};
lime.utils.IDataInput = function() { };
$hxClasses["lime.utils.IDataInput"] = lime.utils.IDataInput;
lime.utils.IDataInput.__name__ = ["lime","utils","IDataInput"];
lime.utils.IDataInput.prototype = {
	__class__: lime.utils.IDataInput
	,__properties__: {set_endian:"set_endian",get_endian:"get_endian",get_bytesAvailable:"get_bytesAvailable"}
};
lime.utils.IMemoryRange = function() { };
$hxClasses["lime.utils.IMemoryRange"] = lime.utils.IMemoryRange;
lime.utils.IMemoryRange.__name__ = ["lime","utils","IMemoryRange"];
lime.utils.IMemoryRange.prototype = {
	__class__: lime.utils.IMemoryRange
};
openfl.display.MovieClip = function() {
	openfl.display.Sprite.call(this);
	this.__currentFrame = 0;
	this.__currentLabels = [];
	this.__totalFrames = 0;
	this.enabled = true;
};
$hxClasses["openfl.display.MovieClip"] = openfl.display.MovieClip;
openfl.display.MovieClip.__name__ = ["openfl","display","MovieClip"];
openfl.display.MovieClip.__super__ = openfl.display.Sprite;
openfl.display.MovieClip.prototype = $extend(openfl.display.Sprite.prototype,{
	gotoAndPlay: function(frame,scene) {
	}
	,gotoAndStop: function(frame,scene) {
	}
	,nextFrame: function() {
	}
	,play: function() {
	}
	,prevFrame: function() {
	}
	,stop: function() {
	}
	,get_currentFrame: function() {
		return this.__currentFrame;
	}
	,get_currentFrameLabel: function() {
		return this.__currentFrameLabel;
	}
	,get_currentLabel: function() {
		return this.__currentLabel;
	}
	,get_currentLabels: function() {
		return this.__currentLabels;
	}
	,get_framesLoaded: function() {
		return this.__totalFrames;
	}
	,get_totalFrames: function() {
		return this.__totalFrames;
	}
	,__class__: openfl.display.MovieClip
	,__properties__: $extend(openfl.display.Sprite.prototype.__properties__,{get_totalFrames:"get_totalFrames",get_framesLoaded:"get_framesLoaded",get_currentLabels:"get_currentLabels",get_currentLabel:"get_currentLabel",get_currentFrameLabel:"get_currentFrameLabel",get_currentFrame:"get_currentFrame"})
});
openfl.display.LoaderInfo = function() {
	openfl.events.EventDispatcher.call(this);
	this.applicationDomain = openfl.system.ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["openfl.display.LoaderInfo"] = openfl.display.LoaderInfo;
openfl.display.LoaderInfo.__name__ = ["openfl","display","LoaderInfo"];
openfl.display.LoaderInfo.create = function(loader) {
	var loaderInfo = new openfl.display.LoaderInfo();
	loaderInfo.uncaughtErrorEvents = new openfl.events.UncaughtErrorEvents();
	if(loader != null) loaderInfo.loader = loader; else loaderInfo.url = openfl.display.LoaderInfo.__rootURL;
	return loaderInfo;
};
openfl.display.LoaderInfo.__super__ = openfl.events.EventDispatcher;
openfl.display.LoaderInfo.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	__class__: openfl.display.LoaderInfo
});
openfl.system = {};
openfl.system.ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = openfl.system.ApplicationDomain.currentDomain;
};
$hxClasses["openfl.system.ApplicationDomain"] = openfl.system.ApplicationDomain;
openfl.system.ApplicationDomain.__name__ = ["openfl","system","ApplicationDomain"];
openfl.system.ApplicationDomain.prototype = {
	getDefinition: function(name) {
		return Type.resolveClass(name);
	}
	,hasDefinition: function(name) {
		return Type.resolveClass(name) != null;
	}
	,__class__: openfl.system.ApplicationDomain
};
openfl.events.UncaughtErrorEvents = function(target) {
	openfl.events.EventDispatcher.call(this,target);
};
$hxClasses["openfl.events.UncaughtErrorEvents"] = openfl.events.UncaughtErrorEvents;
openfl.events.UncaughtErrorEvents.__name__ = ["openfl","events","UncaughtErrorEvents"];
openfl.events.UncaughtErrorEvents.__super__ = openfl.events.EventDispatcher;
openfl.events.UncaughtErrorEvents.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	__class__: openfl.events.UncaughtErrorEvents
});
openfl.geom = {};
openfl.geom.Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
	this.__array = new Float32Array([a,b,c,d,tx,ty,0,0,1]);
};
$hxClasses["openfl.geom.Matrix"] = openfl.geom.Matrix;
openfl.geom.Matrix.__name__ = ["openfl","geom","Matrix"];
openfl.geom.Matrix.prototype = {
	clone: function() {
		return new openfl.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,copyColumnFrom: function(column,vector3D) {
		if(column > 2) throw "Column " + column + " out of bounds (2)"; else if(column == 0) {
			this.a = vector3D.x;
			this.c = vector3D.y;
		} else if(column == 1) {
			this.b = vector3D.x;
			this.d = vector3D.y;
		} else {
			this.tx = vector3D.x;
			this.ty = vector3D.y;
		}
	}
	,copyColumnTo: function(column,vector3D) {
		if(column > 2) throw "Column " + column + " out of bounds (2)"; else if(column == 0) {
			vector3D.x = this.a;
			vector3D.y = this.c;
			vector3D.z = 0;
		} else if(column == 1) {
			vector3D.x = this.b;
			vector3D.y = this.d;
			vector3D.z = 0;
		} else {
			vector3D.x = this.tx;
			vector3D.y = this.ty;
			vector3D.z = 1;
		}
	}
	,copyFrom: function(sourceMatrix) {
		this.a = sourceMatrix.a;
		this.b = sourceMatrix.b;
		this.c = sourceMatrix.c;
		this.d = sourceMatrix.d;
		this.tx = sourceMatrix.tx;
		this.ty = sourceMatrix.ty;
	}
	,copyRowFrom: function(row,vector3D) {
		if(row > 2) throw "Row " + row + " out of bounds (2)"; else if(row == 0) {
			this.a = vector3D.x;
			this.c = vector3D.y;
		} else if(row == 1) {
			this.b = vector3D.x;
			this.d = vector3D.y;
		} else {
			this.tx = vector3D.x;
			this.ty = vector3D.y;
		}
	}
	,copyRowTo: function(row,vector3D) {
		if(row > 2) throw "Row " + row + " out of bounds (2)"; else if(row == 0) {
			vector3D.x = this.a;
			vector3D.y = this.b;
			vector3D.z = this.tx;
		} else if(row == 1) {
			vector3D.x = this.c;
			vector3D.y = this.d;
			vector3D.z = this.ty;
		} else {
			vector3D.x = 0;
			vector3D.y = 0;
			vector3D.z = 1;
		}
	}
	,createBox: function(scaleX,scaleY,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.a = cos * scaleX;
			this.b = sin * scaleY;
			this.c = -sin * scaleX;
			this.d = cos * scaleY;
		} else {
			this.a = scaleX;
			this.b = 0;
			this.c = 0;
			this.d = scaleY;
		}
		this.tx = tx;
		this.ty = ty;
	}
	,createGradientBox: function(width,height,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = width / 1638.4;
		this.d = height / 1638.4;
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.tx = tx + width / 2;
		this.ty = ty + height / 2;
	}
	,deltaTransformPoint: function(point) {
		return new openfl.geom.Point(point.x * this.a + point.y * this.c,point.x * this.b + point.y * this.d);
	}
	,equals: function(matrix) {
		return matrix != null && this.tx == matrix.tx && this.ty == matrix.ty && this.a == matrix.a && this.b == matrix.b && this.c == matrix.c && this.d == matrix.d;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new openfl.geom.Matrix();
		result.a = this.a * m.a + this.b * m.c;
		result.b = this.a * m.b + this.b * m.d;
		result.c = this.c * m.a + this.d * m.c;
		result.d = this.c * m.b + this.d * m.d;
		result.tx = this.tx * m.a + this.ty * m.c + m.tx;
		result.ty = this.tx * m.b + this.ty * m.d + m.ty;
		return result;
	}
	,rotate: function(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,setRotation: function(theta,scale) {
		if(scale == null) scale = 1;
		this.a = Math.cos(theta) * scale;
		this.c = Math.sin(theta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,to3DString: function(roundPixels) {
		if(roundPixels == null) roundPixels = false;
		if(roundPixels) return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + (this.tx | 0) + ", " + (this.ty | 0) + ", 0, 1)"; else return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,toMozString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,transformPoint: function(pos) {
		return new openfl.geom.Point(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		var m = new openfl.geom.Matrix();
		m.tx = dx;
		m.ty = dy;
		this.concat(m);
	}
	,toArray: function(transpose) {
		if(transpose == null) transpose = false;
		if(transpose) {
			this.__array[0] = this.a;
			this.__array[1] = this.c;
			this.__array[2] = 0;
			this.__array[3] = this.b;
			this.__array[4] = this.d;
			this.__array[5] = 0;
			this.__array[6] = this.tx;
			this.__array[7] = this.ty;
			this.__array[8] = 1;
		} else {
			this.__array[0] = this.a;
			this.__array[1] = this.b;
			this.__array[2] = this.tx;
			this.__array[3] = this.c;
			this.__array[4] = this.d;
			this.__array[5] = this.ty;
			this.__array[6] = 0;
			this.__array[7] = 0;
			this.__array[8] = 1;
		}
		return this.__array;
	}
	,__cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.tx = Math.round(this.tx * 10) / 10;
		this.ty = Math.round(this.ty * 10) / 10;
	}
	,__transformX: function(pos) {
		return pos.x * this.a + pos.y * this.c + this.tx;
	}
	,__transformY: function(pos) {
		return pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__translateTransformed: function(pos) {
		this.tx = pos.x * this.a + pos.y * this.c + this.tx;
		this.ty = pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__class__: openfl.geom.Matrix
};
openfl.Lib = function() { };
$hxClasses["openfl.Lib"] = openfl.Lib;
openfl.Lib.__name__ = ["openfl","Lib"];
openfl.Lib.application = null;
openfl.Lib["as"] = function(v,c) {
	if(js.Boot.__instanceof(v,c)) return v; else return null;
};
openfl.Lib.attach = function(name) {
	return new openfl.display.MovieClip();
};
openfl.Lib.embed = $hx_exports.openfl.embed = function(elementName,width,height,background,assetsPrefix) {
	lime.system.System.embed(elementName,width,height,background,assetsPrefix);
};
openfl.Lib.getTimer = function() {
	return lime.system.System.getTimer();
};
openfl.Lib.getURL = function(request,target) {
	if(target == null) target = "_blank";
	window.open(request.url,target);
};
openfl.Lib.notImplemented = function(api) {
	if(!openfl.Lib.__sentWarnings.exists(api)) {
		openfl.Lib.__sentWarnings.set(api,true);
		haxe.Log.trace("Warning: " + api + " is not implemented",{ fileName : "Lib.hx", lineNumber : 115, className : "openfl.Lib", methodName : "notImplemented"});
	}
};
openfl.Lib.preventDefaultTouchMove = function() {
	window.document.addEventListener("touchmove",function(evt) {
		evt.preventDefault();
	},false);
};
openfl.Lib.trace = function(arg) {
	haxe.Log.trace(arg,{ fileName : "Lib.hx", lineNumber : 146, className : "openfl.Lib", methodName : "trace"});
};
openfl.Memory = function() { };
$hxClasses["openfl.Memory"] = openfl.Memory;
openfl.Memory.__name__ = ["openfl","Memory"];
openfl.Memory.gcRef = null;
openfl.Memory.len = null;
openfl.Memory._setPositionTemporarily = function(position,action) {
	var oldPosition = openfl.Memory.gcRef.position;
	openfl.Memory.gcRef.position = position;
	var value = action();
	openfl.Memory.gcRef.position = oldPosition;
	return value;
};
openfl.Memory.getByte = function(addr) {
	return openfl.Memory.gcRef.data.getInt8(addr);
};
openfl.Memory.getDouble = function(addr) {
	return openfl.Memory._setPositionTemporarily(addr,function() {
		return openfl.Memory.gcRef.readDouble();
	});
};
openfl.Memory.getFloat = function(addr) {
	return openfl.Memory._setPositionTemporarily(addr,function() {
		return openfl.Memory.gcRef.readFloat();
	});
};
openfl.Memory.getI32 = function(addr) {
	return openfl.Memory._setPositionTemporarily(addr,function() {
		return openfl.Memory.gcRef.readInt();
	});
};
openfl.Memory.getUI16 = function(addr) {
	return openfl.Memory._setPositionTemporarily(addr,function() {
		return openfl.Memory.gcRef.readUnsignedShort();
	});
};
openfl.Memory.select = function(inBytes) {
	openfl.Memory.gcRef = inBytes;
	if(inBytes != null) openfl.Memory.len = inBytes.length; else openfl.Memory.len = 0;
};
openfl.Memory.setByte = function(addr,v) {
	openfl.Memory.gcRef.data.setUint8(addr,v);
};
openfl.Memory.setDouble = function(addr,v) {
	openfl.Memory._setPositionTemporarily(addr,function() {
		openfl.Memory.gcRef.writeDouble(v);
	});
};
openfl.Memory.setFloat = function(addr,v) {
	openfl.Memory._setPositionTemporarily(addr,function() {
		openfl.Memory.gcRef.writeFloat(v);
	});
};
openfl.Memory.setI16 = function(addr,v) {
	openfl.Memory._setPositionTemporarily(addr,function() {
		openfl.Memory.gcRef.writeUnsignedShort(v);
	});
};
openfl.Memory.setI32 = function(addr,v) {
	openfl.Memory._setPositionTemporarily(addr,function() {
		openfl.Memory.gcRef.writeInt(v);
	});
};
openfl._Vector = {};
openfl._Vector.Vector_Impl_ = function() { };
$hxClasses["openfl._Vector.Vector_Impl_"] = openfl._Vector.Vector_Impl_;
openfl._Vector.Vector_Impl_.__name__ = ["openfl","_Vector","Vector_Impl_"];
openfl._Vector.Vector_Impl_.__properties__ = {set_fixed:"set_fixed",get_fixed:"get_fixed",set_length:"set_length",get_length:"get_length"}
openfl._Vector.Vector_Impl_._new = function(length,fixed) {
	if(fixed == null) fixed = false;
	if(length == null) length = 0;
	var this1;
	this1 = new openfl.VectorData();
	var this2;
	this2 = new Array(length);
	this1.data = this2;
	this1.length = length;
	this1.fixed = fixed;
	return this1;
};
openfl._Vector.Vector_Impl_.concat = function(this1,a) {
	var vectorData = new openfl.VectorData();
	if(a != null) vectorData.length = this1.length + a.length; else vectorData.length = this1.length;
	vectorData.fixed = false;
	var this2;
	this2 = new Array(vectorData.length);
	vectorData.data = this2;
	haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,vectorData.data,0,this1.length);
	if(a != null) haxe.ds._Vector.Vector_Impl_.blit(a.data,0,vectorData.data,this1.length,a.length);
	return vectorData;
};
openfl._Vector.Vector_Impl_.copy = function(this1) {
	var vectorData = new openfl.VectorData();
	vectorData.length = this1.length;
	vectorData.fixed = this1.fixed;
	var this2;
	this2 = new Array(this1.length);
	vectorData.data = this2;
	haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,vectorData.data,0,this1.length);
	return vectorData;
};
openfl._Vector.Vector_Impl_.iterator = function(this1) {
	return new openfl.VectorDataIterator(this1);
};
openfl._Vector.Vector_Impl_.join = function(this1,sep) {
	var output = "";
	var _g1 = 0;
	var _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(i > 0) output += sep;
		output += Std.string(this1.data[i]);
	}
	return output;
};
openfl._Vector.Vector_Impl_.pop = function(this1) {
	var value = null;
	if(!this1.fixed) {
		if(this1.length > 0) {
			this1.length--;
			value = this1.data[this1.length];
		}
	}
	return value;
};
openfl._Vector.Vector_Impl_.push = function(this1,x) {
	if(!this1.fixed) {
		this1.length++;
		if(this1.data.length < this1.length) {
			var data;
			var this2;
			this2 = new Array(this1.data.length + 10);
			data = this2;
			haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
			this1.data = data;
		}
		this1.data[this1.length - 1] = x;
	}
	return this1.length;
};
openfl._Vector.Vector_Impl_.reverse = function(this1) {
	var data;
	var this2;
	this2 = new Array(this1.length);
	data = this2;
	var _g1 = 0;
	var _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		data[this1.length - 1 - i] = this1.data[i];
	}
	this1.data = data;
};
openfl._Vector.Vector_Impl_.shift = function(this1) {
	if(!this1.fixed && this1.length > 0) {
		this1.length--;
		var value = this1.data[0];
		haxe.ds._Vector.Vector_Impl_.blit(this1.data,1,this1.data,0,this1.length);
		return value;
	}
	return null;
};
openfl._Vector.Vector_Impl_.unshift = function(this1,x) {
	if(!this1.fixed) {
		this1.length++;
		if(this1.data.length < this1.length) {
			var data;
			var this2;
			this2 = new Array(this1.length + 10);
			data = this2;
			haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,1,this1.data.length);
			this1.data = data;
		} else haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,this1.data,1,this1.length - 1);
		this1.data[0] = x;
	}
};
openfl._Vector.Vector_Impl_.slice = function(this1,pos,end) {
	if(end == null) end = 0;
	if(pos == null) pos = 0;
	if(pos < 0) pos += this1.length;
	if(end <= 0) end += this1.length;
	if(end > this1.length) end = this1.length;
	var length = end - pos;
	if(length <= 0 || length > this1.length) length = this1.length;
	var vectorData = new openfl.VectorData();
	vectorData.length = end - pos;
	vectorData.fixed = true;
	var this2;
	this2 = new Array(length);
	vectorData.data = this2;
	haxe.ds._Vector.Vector_Impl_.blit(this1.data,pos,vectorData.data,0,length);
	return vectorData;
};
openfl._Vector.Vector_Impl_.sort = function(this1,f) {
	var array = haxe.ds._Vector.Vector_Impl_.toArray(this1.data);
	array.sort(f);
	var vec;
	var this2;
	this2 = new Array(array.length);
	vec = this2;
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		vec[i] = array[i];
	}
	this1.data = vec;
};
openfl._Vector.Vector_Impl_.splice = function(this1,pos,len) {
	if(pos < 0) pos += this1.length;
	if(pos + len > this1.length) len = this1.length - pos;
	if(len < 0) len = 0;
	var vectorData = new openfl.VectorData();
	vectorData.length = len;
	vectorData.fixed = false;
	var this2;
	this2 = new Array(len);
	vectorData.data = this2;
	haxe.ds._Vector.Vector_Impl_.blit(this1.data,pos,vectorData.data,0,len);
	if(len > 0) {
		this1.length -= len;
		haxe.ds._Vector.Vector_Impl_.blit(this1.data,pos + len,this1.data,pos,this1.length - pos);
	}
	return vectorData;
};
openfl._Vector.Vector_Impl_.toString = function(this1) {
	return haxe.ds._Vector.Vector_Impl_.toArray(this1.data).toString();
};
openfl._Vector.Vector_Impl_.indexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var value = -1;
	var _g1 = from;
	var _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this1.data[i] == x) {
			value = i;
			break;
		}
	}
	return value;
};
openfl._Vector.Vector_Impl_.lastIndexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var value = -1;
	var i = this1.length - 1;
	while(i >= from) {
		if(this1.data[i] == x) {
			value = i;
			break;
		}
		i--;
	}
	return value;
};
openfl._Vector.Vector_Impl_.ofArray = function(a) {
	var vectorData = new openfl.VectorData();
	vectorData.length = a.length;
	vectorData.fixed = true;
	var vec;
	var this1;
	this1 = new Array(a.length);
	vec = this1;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		vec[i] = a[i];
	}
	vectorData.data = vec;
	return vectorData;
};
openfl._Vector.Vector_Impl_.convert = function(v) {
	return v;
};
openfl._Vector.Vector_Impl_.get = function(this1,index) {
	return this1.data[index];
};
openfl._Vector.Vector_Impl_.set = function(this1,key,value) {
	if(!this1.fixed) {
		if(key >= this1.length) this1.length = key + 1;
		if(this1.data.length < this1.length) {
			var data;
			var this2;
			this2 = new Array(this1.data.length + 10);
			data = this2;
			haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
			this1.data = data;
		}
	}
	return this1.data[key] = value;
};
openfl._Vector.Vector_Impl_.fromArray = function(value) {
	var vectorData = new openfl.VectorData();
	vectorData.length = value.length;
	vectorData.fixed = true;
	var vec;
	var this1;
	this1 = new Array(value.length);
	vec = this1;
	var _g1 = 0;
	var _g = value.length;
	while(_g1 < _g) {
		var i = _g1++;
		vec[i] = value[i];
	}
	vectorData.data = vec;
	return vectorData;
};
openfl._Vector.Vector_Impl_.toArray = function(this1) {
	var value = new Array();
	var _g1 = 0;
	var _g = this1.data.length;
	while(_g1 < _g) {
		var i = _g1++;
		value.push(this1.data[i]);
	}
	return value;
};
openfl._Vector.Vector_Impl_.fromHaxeVector = function(value) {
	var vectorData = new openfl.VectorData();
	vectorData.length = value.length;
	vectorData.fixed = true;
	vectorData.data = value;
	return vectorData;
};
openfl._Vector.Vector_Impl_.toHaxeVector = function(this1) {
	return this1.data;
};
openfl._Vector.Vector_Impl_.fromVectorData = function(value) {
	return value;
};
openfl._Vector.Vector_Impl_.toVectorData = function(this1) {
	return this1;
};
openfl._Vector.Vector_Impl_.get_length = function(this1) {
	return this1.length;
};
openfl._Vector.Vector_Impl_.set_length = function(this1,value) {
	if(!this1.fixed) {
		if(value > this1.length) {
			var data;
			var this2;
			this2 = new Array(value);
			data = this2;
			haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,Std["int"](Math.min(this1.data.length,value)));
			this1.data = data;
		}
		this1.length = value;
	}
	return value;
};
openfl._Vector.Vector_Impl_.get_fixed = function(this1) {
	return this1.fixed;
};
openfl._Vector.Vector_Impl_.set_fixed = function(this1,value) {
	return this1.fixed = value;
};
openfl.VectorData = function() {
	this.length = 0;
};
$hxClasses["openfl.VectorData"] = openfl.VectorData;
openfl.VectorData.__name__ = ["openfl","VectorData"];
openfl.VectorData.prototype = {
	__class__: openfl.VectorData
};
openfl.VectorDataIterator = function(data) {
	this.index = 0;
	this.vectorData = data;
};
$hxClasses["openfl.VectorDataIterator"] = openfl.VectorDataIterator;
openfl.VectorDataIterator.__name__ = ["openfl","VectorDataIterator"];
openfl.VectorDataIterator.prototype = {
	hasNext: function() {
		return this.index < this.vectorData.length;
	}
	,next: function() {
		var index = this.index++;
		return this.vectorData.data[index];
	}
	,__class__: openfl.VectorDataIterator
};
openfl._internal = {};
openfl._internal.renderer = {};
openfl._internal.renderer.AbstractRenderer = function(width,height) {
	this.width = width;
	this.height = height;
};
$hxClasses["openfl._internal.renderer.AbstractRenderer"] = openfl._internal.renderer.AbstractRenderer;
openfl._internal.renderer.AbstractRenderer.__name__ = ["openfl","_internal","renderer","AbstractRenderer"];
openfl._internal.renderer.AbstractRenderer.prototype = {
	render: function(stage) {
	}
	,renderShape: function(shape) {
	}
	,resize: function(width,height) {
	}
	,__class__: openfl._internal.renderer.AbstractRenderer
};
openfl._internal.renderer.RenderSession = function() {
};
$hxClasses["openfl._internal.renderer.RenderSession"] = openfl._internal.renderer.RenderSession;
openfl._internal.renderer.RenderSession.__name__ = ["openfl","_internal","renderer","RenderSession"];
openfl._internal.renderer.RenderSession.prototype = {
	__class__: openfl._internal.renderer.RenderSession
};
openfl._internal.renderer.canvas = {};
openfl._internal.renderer.canvas.CanvasBitmap = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasBitmap"] = openfl._internal.renderer.canvas.CanvasBitmap;
openfl._internal.renderer.canvas.CanvasBitmap.__name__ = ["openfl","_internal","renderer","canvas","CanvasBitmap"];
openfl._internal.renderer.canvas.CanvasBitmap.render = function(bitmap,renderSession) {
	if(!bitmap.__renderable || bitmap.__worldAlpha <= 0) return;
	var context = renderSession.context;
	if(bitmap.bitmapData != null && bitmap.bitmapData.__isValid) {
		if(bitmap.__mask != null) renderSession.maskManager.pushMask(bitmap.__mask);
		bitmap.bitmapData.__sync();
		context.globalAlpha = bitmap.__worldAlpha;
		var transform = bitmap.__worldTransform;
		var scrollRect = bitmap.get_scrollRect();
		if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		if(!bitmap.smoothing) {
			context.mozImageSmoothingEnabled = false;
			context.webkitImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
		}
		if(scrollRect == null) context.drawImage(bitmap.bitmapData.__image.get_src(),0,0); else context.drawImage(bitmap.bitmapData.__image.get_src(),scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height,scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height);
		if(!bitmap.smoothing) {
			context.mozImageSmoothingEnabled = true;
			context.webkitImageSmoothingEnabled = true;
			context.imageSmoothingEnabled = true;
		}
		if(bitmap.__mask != null) renderSession.maskManager.popMask();
	}
};
openfl._internal.renderer.canvas.CanvasGraphics = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasGraphics"] = openfl._internal.renderer.canvas.CanvasGraphics;
openfl._internal.renderer.canvas.CanvasGraphics.__name__ = ["openfl","_internal","renderer","canvas","CanvasGraphics"];
openfl._internal.renderer.canvas.CanvasGraphics.bounds = null;
openfl._internal.renderer.canvas.CanvasGraphics.hasFill = null;
openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = null;
openfl._internal.renderer.canvas.CanvasGraphics.inPath = null;
openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix = null;
openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix = null;
openfl._internal.renderer.canvas.CanvasGraphics.positionX = null;
openfl._internal.renderer.canvas.CanvasGraphics.positionY = null;
openfl._internal.renderer.canvas.CanvasGraphics.setFill = null;
openfl._internal.renderer.canvas.CanvasGraphics.context = null;
openfl._internal.renderer.canvas.CanvasGraphics.pattern = null;
openfl._internal.renderer.canvas.CanvasGraphics.beginPath = function() {
	if(!openfl._internal.renderer.canvas.CanvasGraphics.inPath) {
		openfl._internal.renderer.canvas.CanvasGraphics.context.beginPath();
		openfl._internal.renderer.canvas.CanvasGraphics.inPath = true;
	}
};
openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill = function(bitmapFill,bitmapRepeat) {
	if(openfl._internal.renderer.canvas.CanvasGraphics.setFill || bitmapFill == null) return;
	if(openfl._internal.renderer.canvas.CanvasGraphics.pattern == null) openfl._internal.renderer.canvas.CanvasGraphics.pattern = openfl._internal.renderer.canvas.CanvasGraphics.context.createPattern(bitmapFill.__image.get_src(),bitmapRepeat?"repeat":"no-repeat");
	openfl._internal.renderer.canvas.CanvasGraphics.context.fillStyle = openfl._internal.renderer.canvas.CanvasGraphics.pattern;
	openfl._internal.renderer.canvas.CanvasGraphics.setFill = true;
};
openfl._internal.renderer.canvas.CanvasGraphics.closePath = function(closeFill) {
	if(openfl._internal.renderer.canvas.CanvasGraphics.inPath) {
		if(openfl._internal.renderer.canvas.CanvasGraphics.hasFill) {
			openfl._internal.renderer.canvas.CanvasGraphics.context.translate(-openfl._internal.renderer.canvas.CanvasGraphics.bounds.x,-openfl._internal.renderer.canvas.CanvasGraphics.bounds.y);
			if(openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix != null) {
				openfl._internal.renderer.canvas.CanvasGraphics.context.transform(openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.a,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.b,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.c,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.d,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.tx,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.ty);
				openfl._internal.renderer.canvas.CanvasGraphics.context.fill();
				openfl._internal.renderer.canvas.CanvasGraphics.context.transform(openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.a,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.b,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.c,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.d,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.tx,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.ty);
			} else openfl._internal.renderer.canvas.CanvasGraphics.context.fill();
			openfl._internal.renderer.canvas.CanvasGraphics.context.translate(openfl._internal.renderer.canvas.CanvasGraphics.bounds.x,openfl._internal.renderer.canvas.CanvasGraphics.bounds.y);
		}
		openfl._internal.renderer.canvas.CanvasGraphics.context.closePath();
		if(openfl._internal.renderer.canvas.CanvasGraphics.hasStroke) openfl._internal.renderer.canvas.CanvasGraphics.context.stroke();
	}
	openfl._internal.renderer.canvas.CanvasGraphics.inPath = false;
	if(closeFill) {
		openfl._internal.renderer.canvas.CanvasGraphics.hasFill = false;
		openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = false;
		openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix = null;
		openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix = null;
	}
};
openfl._internal.renderer.canvas.CanvasGraphics.drawRoundRect = function(x,y,width,height,rx,ry) {
	if(ry == -1) ry = rx;
	rx *= 0.5;
	ry *= 0.5;
	if(rx > width / 2) rx = width / 2;
	if(ry > height / 2) ry = height / 2;
	var xe = x + width;
	var ye = y + height;
	var cx1 = -rx + rx * openfl._internal.renderer.canvas.CanvasGraphics.SIN45;
	var cx2 = -rx + rx * openfl._internal.renderer.canvas.CanvasGraphics.TAN22;
	var cy1 = -ry + ry * openfl._internal.renderer.canvas.CanvasGraphics.SIN45;
	var cy2 = -ry + ry * openfl._internal.renderer.canvas.CanvasGraphics.TAN22;
	openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(xe,ye - ry);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(xe,ye + cy2,xe + cx1,ye + cy1);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(xe + cx2,ye,xe - rx,ye);
	openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x + rx,ye);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(x - cx2,ye,x - cx1,ye + cy1);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(x,ye + cy2,x,ye - ry);
	openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x,y + ry);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(x,y - cy2,x - cx1,y - cy1);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(x - cx2,y,x + rx,y);
	openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(xe - rx,y);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(xe + cx2,y,xe + cx1,y - cy1);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(xe,y - cy2,xe,y + ry);
	openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(xe,ye - ry);
};
openfl._internal.renderer.canvas.CanvasGraphics.render = function(graphics,renderSession) {
	if(graphics.__dirty) {
		openfl._internal.renderer.canvas.CanvasGraphics.bounds = graphics.__bounds;
		openfl._internal.renderer.canvas.CanvasGraphics.hasFill = false;
		openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = false;
		openfl._internal.renderer.canvas.CanvasGraphics.inPath = false;
		openfl._internal.renderer.canvas.CanvasGraphics.positionX = 0;
		openfl._internal.renderer.canvas.CanvasGraphics.positionY = 0;
		if(!graphics.__visible || graphics.__commands.length == 0 || openfl._internal.renderer.canvas.CanvasGraphics.bounds == null || openfl._internal.renderer.canvas.CanvasGraphics.bounds.width == 0 || openfl._internal.renderer.canvas.CanvasGraphics.bounds.height == 0) {
			graphics.__canvas = null;
			graphics.__context = null;
		} else {
			if(graphics.__canvas == null) {
				graphics.__canvas = window.document.createElement("canvas");
				graphics.__context = graphics.__canvas.getContext("2d");
			}
			openfl._internal.renderer.canvas.CanvasGraphics.context = graphics.__context;
			graphics.__canvas.width = Math.ceil(openfl._internal.renderer.canvas.CanvasGraphics.bounds.width);
			graphics.__canvas.height = Math.ceil(openfl._internal.renderer.canvas.CanvasGraphics.bounds.height);
			var offsetX = openfl._internal.renderer.canvas.CanvasGraphics.bounds.x;
			var offsetY = openfl._internal.renderer.canvas.CanvasGraphics.bounds.y;
			var bitmapFill = null;
			var bitmapRepeat = false;
			var _g = 0;
			var _g1 = graphics.__commands;
			try {
				while(_g < _g1.length) {
					var command = _g1[_g];
					++_g;
					switch(command[1]) {
					case 0:
						var smooth = command[5];
						var repeat = command[4];
						var matrix = command[3];
						var bitmap = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						if(bitmap != bitmapFill || repeat != bitmapRepeat) {
							bitmapFill = bitmap;
							bitmapRepeat = repeat;
							openfl._internal.renderer.canvas.CanvasGraphics.pattern = null;
							openfl._internal.renderer.canvas.CanvasGraphics.setFill = false;
							bitmap.__sync();
						}
						if(matrix != null) {
							openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix = matrix;
							openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix = new openfl.geom.Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
							openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.invert();
						} else {
							openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix = null;
							openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix = null;
						}
						openfl._internal.renderer.canvas.CanvasGraphics.hasFill = true;
						break;
					case 1:
						var alpha = command[3];
						var rgb = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						if(alpha == 1) openfl._internal.renderer.canvas.CanvasGraphics.context.fillStyle = "#" + StringTools.hex(rgb,6); else {
							var r = (rgb & 16711680) >>> 16;
							var g = (rgb & 65280) >>> 8;
							var b = rgb & 255;
							openfl._internal.renderer.canvas.CanvasGraphics.context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
						}
						bitmapFill = null;
						openfl._internal.renderer.canvas.CanvasGraphics.setFill = true;
						openfl._internal.renderer.canvas.CanvasGraphics.hasFill = true;
						break;
					case 2:
						var y = command[7];
						var x = command[6];
						var cy2 = command[5];
						var cx2 = command[4];
						var cy1 = command[3];
						var cx1 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.positionX = x;
						openfl._internal.renderer.canvas.CanvasGraphics.positionY = y;
						break;
					case 3:
						var y1 = command[5];
						var x1 = command[4];
						var cy = command[3];
						var cx = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.positionX = x1;
						openfl._internal.renderer.canvas.CanvasGraphics.positionY = y1;
						break;
					case 4:
						var radius = command[4];
						var y2 = command[3];
						var x2 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x2 - offsetX + radius,y2 - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.context.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2,true);
						break;
					case 5:
						var height = command[5];
						var width = command[4];
						var y3 = command[3];
						var x3 = command[2];
						x3 -= offsetX;
						y3 -= offsetY;
						var kappa = .5522848;
						var ox = width / 2 * kappa;
						var oy = height / 2 * kappa;
						var xe = x3 + width;
						var ye = y3 + height;
						var xm = x3 + width / 2;
						var ym = y3 + height / 2;
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x3,ym);
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(x3,ym - oy,xm - ox,y3,xm,y3);
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(xm + ox,y3,xe,ym - oy,xe,ym);
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(xm - ox,ye,x3,ym + oy,x3,ym);
						break;
					case 6:
						var height1 = command[5];
						var width1 = command[4];
						var y4 = command[3];
						var x4 = command[2];
						var optimizationUsed = false;
						if(bitmapFill != null) {
							var st = 0;
							var sr = 0;
							var sb = 0;
							var sl = 0;
							var canOptimizeMatrix = true;
							if(openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix != null) {
								if(openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.b != 0 || openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.c != 0) canOptimizeMatrix = false; else {
									var stl = openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.transformPoint(new openfl.geom.Point(x4,y4));
									var sbr = openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.transformPoint(new openfl.geom.Point(x4 + width1,y4 + height1));
									st = stl.y;
									sl = stl.x;
									sb = sbr.y;
									sr = sbr.x;
								}
							} else {
								st = y4;
								sl = x4;
								sb = y4 + height1;
								sr = x4 + width1;
							}
							if(canOptimizeMatrix && st >= 0 && sl >= 0 && sr <= bitmapFill.width && sb <= bitmapFill.height) {
								optimizationUsed = true;
								openfl._internal.renderer.canvas.CanvasGraphics.context.drawImage(bitmapFill.__image.get_src(),sl,st,sr - sl,sb - st,x4 - offsetX,y4 - offsetY,width1,height1);
							}
						}
						if(!optimizationUsed) {
							openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
							openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
							openfl._internal.renderer.canvas.CanvasGraphics.context.rect(x4 - offsetX,y4 - offsetY,width1,height1);
						}
						break;
					case 7:
						var ry = command[7];
						var rx = command[6];
						var height2 = command[5];
						var width2 = command[4];
						var y5 = command[3];
						var x5 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.drawRoundRect(x5 - offsetX,y5 - offsetY,width2,height2,rx,ry);
						break;
					case 8:
						var count = command[6];
						var flags = command[5];
						var smooth1 = command[4];
						var tileData = command[3];
						var sheet = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						var useScale = (flags & 1) > 0;
						var useRotation = (flags & 2) > 0;
						var useTransform = (flags & 16) > 0;
						var useRGB = (flags & 4) > 0;
						var useAlpha = (flags & 8) > 0;
						var useRect = (flags & 32) > 0;
						var useOrigin = (flags & 64) > 0;
						var useBlendAdd = (flags & 65536) > 0;
						if(useTransform) {
							useScale = false;
							useRotation = false;
						}
						var scaleIndex = 0;
						var rotationIndex = 0;
						var rgbIndex = 0;
						var alphaIndex = 0;
						var transformIndex = 0;
						var numValues = 3;
						if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
						if(useScale) {
							scaleIndex = numValues;
							numValues++;
						}
						if(useRotation) {
							rotationIndex = numValues;
							numValues++;
						}
						if(useTransform) {
							transformIndex = numValues;
							numValues += 4;
						}
						if(useRGB) {
							rgbIndex = numValues;
							numValues += 3;
						}
						if(useAlpha) {
							alphaIndex = numValues;
							numValues++;
						}
						var totalCount = tileData.length;
						if(count >= 0 && totalCount > count) totalCount = count;
						var itemCount = totalCount / numValues | 0;
						var index = 0;
						var rect = null;
						var center = null;
						var previousTileID = -1;
						var surface;
						sheet.__bitmap.__sync();
						surface = sheet.__bitmap.__image.get_src();
						if(useBlendAdd) openfl._internal.renderer.canvas.CanvasGraphics.context.globalCompositeOperation = "lighter";
						while(index < totalCount) {
							var tileID;
							if(!useRect) tileID = tileData[index + 2] | 0; else tileID = -1;
							if(!useRect && tileID != previousTileID) {
								rect = sheet.__tileRects[tileID];
								center = sheet.__centerPoints[tileID];
								previousTileID = tileID;
							} else if(useRect) {
								rect = sheet.__rectTile;
								rect.setTo(tileData[index + 2],tileData[index + 3],tileData[index + 4],tileData[index + 5]);
								center = sheet.__point;
								if(useOrigin) {
									center.x = tileData[index + 6];
									center.y = tileData[index + 7];
								} else {
									center.x = 0;
									center.y = 0;
								}
							}
							if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
								openfl._internal.renderer.canvas.CanvasGraphics.context.save();
								openfl._internal.renderer.canvas.CanvasGraphics.context.translate(tileData[index],tileData[index + 1]);
								if(useRotation) openfl._internal.renderer.canvas.CanvasGraphics.context.rotate(tileData[index + rotationIndex]);
								var scale = 1.0;
								if(useScale) scale = tileData[index + scaleIndex];
								if(useTransform) openfl._internal.renderer.canvas.CanvasGraphics.context.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
								if(useAlpha) openfl._internal.renderer.canvas.CanvasGraphics.context.globalAlpha = tileData[index + alphaIndex];
								openfl._internal.renderer.canvas.CanvasGraphics.context.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
								openfl._internal.renderer.canvas.CanvasGraphics.context.restore();
							}
							index += numValues;
						}
						if(useBlendAdd) openfl._internal.renderer.canvas.CanvasGraphics.context.globalCompositeOperation = "source-over";
						break;
					case 10:
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(true);
						break;
					case 11:
						var miterLimit = command[9];
						var joints = command[8];
						var caps = command[7];
						var scaleMode = command[6];
						var pixelHinting = command[5];
						var alpha1 = command[4];
						var color = command[3];
						var thickness = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						if(thickness == null) openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = false; else {
							openfl._internal.renderer.canvas.CanvasGraphics.context.lineWidth = thickness;
							if(joints == null) openfl._internal.renderer.canvas.CanvasGraphics.context.lineJoin = "round"; else openfl._internal.renderer.canvas.CanvasGraphics.context.lineJoin = Std.string(joints).toLowerCase();
							if(caps == null) openfl._internal.renderer.canvas.CanvasGraphics.context.lineCap = "round"; else switch(caps[1]) {
							case 0:
								openfl._internal.renderer.canvas.CanvasGraphics.context.lineCap = "butt";
								break;
							default:
								openfl._internal.renderer.canvas.CanvasGraphics.context.lineCap = Std.string(caps).toLowerCase();
							}
							if(miterLimit == null) openfl._internal.renderer.canvas.CanvasGraphics.context.miterLimit = 3; else openfl._internal.renderer.canvas.CanvasGraphics.context.miterLimit = miterLimit;
							if(alpha1 == 1 || alpha1 == null) if(color == null) openfl._internal.renderer.canvas.CanvasGraphics.context.strokeStyle = "#000000"; else openfl._internal.renderer.canvas.CanvasGraphics.context.strokeStyle = "#" + StringTools.hex(color & 16777215,6); else {
								var r1 = (color & 16711680) >>> 16;
								var g1 = (color & 65280) >>> 8;
								var b1 = color & 255;
								if(color == null) openfl._internal.renderer.canvas.CanvasGraphics.context.strokeStyle = "#000000"; else openfl._internal.renderer.canvas.CanvasGraphics.context.strokeStyle = "rgba(" + r1 + ", " + g1 + ", " + b1 + ", " + alpha1 + ")";
							}
							openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = true;
						}
						break;
					case 12:
						var y6 = command[3];
						var x6 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x6 - offsetX,y6 - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.positionX = x6;
						openfl._internal.renderer.canvas.CanvasGraphics.positionY = y6;
						break;
					case 13:
						var y7 = command[3];
						var x7 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x7 - offsetX,y7 - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.positionX = x7;
						openfl._internal.renderer.canvas.CanvasGraphics.positionY = y7;
						break;
					case 9:
						var culling = command[5];
						var uvtData = command[4];
						var indices = command[3];
						var vertices = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						var v = vertices;
						var ind = indices;
						var uvt = uvtData;
						var pattern = null;
						var colorFill = bitmapFill == null;
						if(colorFill && uvt != null) throw "__break__";
						if(!colorFill) {
							if(uvtData == null) {
								var this1;
								this1 = new openfl.VectorData();
								var this2;
								this2 = new Array(0);
								this1.data = this2;
								this1.length = 0;
								this1.fixed = false;
								uvtData = this1;
								var _g3 = 0;
								var _g2 = v.length / 2 | 0;
								while(_g3 < _g2) {
									var i = _g3++;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data;
											var this3;
											this3 = new Array(uvtData.data.length + 10);
											data = this3;
											haxe.ds._Vector.Vector_Impl_.blit(uvtData.data,0,data,0,uvtData.data.length);
											uvtData.data = data;
										}
										uvtData.data[uvtData.length - 1] = v.data[i * 2] / bitmapFill.width;
									}
									uvtData.length;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data1;
											var this4;
											this4 = new Array(uvtData.data.length + 10);
											data1 = this4;
											haxe.ds._Vector.Vector_Impl_.blit(uvtData.data,0,data1,0,uvtData.data.length);
											uvtData.data = data1;
										}
										uvtData.data[uvtData.length - 1] = v.data[i * 2 + 1] / bitmapFill.height;
									}
									uvtData.length;
								}
							}
							var skipT = uvtData.length != v.length;
							var normalizedUvt = openfl._internal.renderer.canvas.CanvasGraphics.normalizeUvt(uvtData,skipT);
							var maxUvt = normalizedUvt.max;
							uvt = normalizedUvt.uvt;
							if(maxUvt > 1) pattern = openfl._internal.renderer.canvas.CanvasGraphics.createTempPatternCanvas(bitmapFill,bitmapRepeat,openfl._internal.renderer.canvas.CanvasGraphics.bounds.width,openfl._internal.renderer.canvas.CanvasGraphics.bounds.height); else pattern = openfl._internal.renderer.canvas.CanvasGraphics.createTempPatternCanvas(bitmapFill,bitmapRepeat,bitmapFill.width,bitmapFill.height);
						}
						var i1 = 0;
						var l = ind.length;
						var a;
						var b2;
						var c;
						var iax;
						var iay;
						var ibx;
						var iby;
						var icx;
						var icy;
						var x11;
						var y11;
						var x21;
						var y21;
						var x31;
						var y31;
						var uvx1;
						var uvy1;
						var uvx2;
						var uvy2;
						var uvx3;
						var uvy3;
						var denom;
						var t1;
						var t2;
						var t3;
						var t4;
						var dx;
						var dy;
						while(i1 < l) {
							a = i1;
							b2 = i1 + 1;
							c = i1 + 2;
							iax = ind.data[a] * 2;
							iay = ind.data[a] * 2 + 1;
							ibx = ind.data[b2] * 2;
							iby = ind.data[b2] * 2 + 1;
							icx = ind.data[c] * 2;
							icy = ind.data[c] * 2 + 1;
							x11 = v.data[iax];
							y11 = v.data[iay];
							x21 = v.data[ibx];
							y21 = v.data[iby];
							x31 = v.data[icx];
							y31 = v.data[icy];
							switch(culling[1]) {
							case 2:
								if(!((x21 - x11) * (y31 - y11) - (y21 - y11) * (x31 - x11) < 0)) {
									i1 += 3;
									continue;
								}
								break;
							case 0:
								if((x21 - x11) * (y31 - y11) - (y21 - y11) * (x31 - x11) < 0) {
									i1 += 3;
									continue;
								}
								break;
							default:
							}
							if(colorFill) {
								openfl._internal.renderer.canvas.CanvasGraphics.context.beginPath();
								openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x11,y11);
								openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x21,y21);
								openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x31,y31);
								openfl._internal.renderer.canvas.CanvasGraphics.context.closePath();
								openfl._internal.renderer.canvas.CanvasGraphics.context.fill();
								i1 += 3;
								continue;
							}
							openfl._internal.renderer.canvas.CanvasGraphics.context.save();
							openfl._internal.renderer.canvas.CanvasGraphics.context.beginPath();
							openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x11,y11);
							openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x21,y21);
							openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x31,y31);
							openfl._internal.renderer.canvas.CanvasGraphics.context.closePath();
							openfl._internal.renderer.canvas.CanvasGraphics.context.clip();
							uvx1 = uvt.data[iax] * pattern.width;
							uvx2 = uvt.data[ibx] * pattern.width;
							uvx3 = uvt.data[icx] * pattern.width;
							uvy1 = uvt.data[iay] * pattern.height;
							uvy2 = uvt.data[iby] * pattern.height;
							uvy3 = uvt.data[icy] * pattern.height;
							denom = uvx1 * (uvy3 - uvy2) - uvx2 * uvy3 + uvx3 * uvy2 + (uvx2 - uvx3) * uvy1;
							if(denom == 0) {
								i1 += 3;
								continue;
							}
							t1 = -(uvy1 * (x31 - x21) - uvy2 * x31 + uvy3 * x21 + (uvy2 - uvy3) * x11) / denom;
							t2 = (uvy2 * y31 + uvy1 * (y21 - y31) - uvy3 * y21 + (uvy3 - uvy2) * y11) / denom;
							t3 = (uvx1 * (x31 - x21) - uvx2 * x31 + uvx3 * x21 + (uvx2 - uvx3) * x11) / denom;
							t4 = -(uvx2 * y31 + uvx1 * (y21 - y31) - uvx3 * y21 + (uvx3 - uvx2) * y11) / denom;
							dx = (uvx1 * (uvy3 * x21 - uvy2 * x31) + uvy1 * (uvx2 * x31 - uvx3 * x21) + (uvx3 * uvy2 - uvx2 * uvy3) * x11) / denom;
							dy = (uvx1 * (uvy3 * y21 - uvy2 * y31) + uvy1 * (uvx2 * y31 - uvx3 * y21) + (uvx3 * uvy2 - uvx2 * uvy3) * y11) / denom;
							openfl._internal.renderer.canvas.CanvasGraphics.context.transform(t1,t2,t3,t4,dx,dy);
							openfl._internal.renderer.canvas.CanvasGraphics.context.drawImage(pattern,0,0);
							openfl._internal.renderer.canvas.CanvasGraphics.context.restore();
							i1 += 3;
						}
						break;
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
		}
		graphics.__dirty = false;
		openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
	}
};
openfl._internal.renderer.canvas.CanvasGraphics.renderMask = function(graphics,renderSession) {
	if(graphics.__commands.length != 0) {
		var context = renderSession.context;
		var positionX = 0.0;
		var positionY = 0.0;
		var offsetX = 0;
		var offsetY = 0;
		var _g = 0;
		var _g1 = graphics.__commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			switch(command[1]) {
			case 2:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cy1 = command[4];
				var cx2 = command[3];
				var cx1 = command[2];
				context.bezierCurveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
				positionX = x;
				positionY = y;
				break;
			case 3:
				var y1 = command[5];
				var x1 = command[4];
				var cy = command[3];
				var cx = command[2];
				context.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
				positionX = x1;
				positionY = y1;
				break;
			case 4:
				var radius = command[4];
				var y2 = command[3];
				var x2 = command[2];
				context.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2,true);
				break;
			case 5:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				x3 -= offsetX;
				y3 -= offsetY;
				var kappa = .5522848;
				var ox = width / 2 * kappa;
				var oy = height / 2 * kappa;
				var xe = x3 + width;
				var ye = y3 + height;
				var xm = x3 + width / 2;
				var ym = y3 + height / 2;
				context.moveTo(x3,ym);
				context.bezierCurveTo(x3,ym - oy,xm - ox,y3,xm,y3);
				context.bezierCurveTo(xm + ox,y3,xe,ym - oy,xe,ym);
				context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
				context.bezierCurveTo(xm - ox,ye,x3,ym + oy,x3,ym);
				break;
			case 6:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				context.rect(x4 - offsetX,y4 - offsetY,width1,height1);
				break;
			case 7:
				var ry = command[7];
				var rx = command[6];
				var height2 = command[5];
				var width2 = command[4];
				var y5 = command[3];
				var x5 = command[2];
				openfl._internal.renderer.canvas.CanvasGraphics.drawRoundRect(x5 - offsetX,y5 - offsetY,width2,height2,rx,ry);
				break;
			case 12:
				var y6 = command[3];
				var x6 = command[2];
				context.lineTo(x6 - offsetX,y6 - offsetY);
				positionX = x6;
				positionY = y6;
				break;
			case 13:
				var y7 = command[3];
				var x7 = command[2];
				context.moveTo(x7 - offsetX,y7 - offsetY);
				positionX = x7;
				positionY = y7;
				break;
			default:
			}
		}
	}
};
openfl._internal.renderer.canvas.CanvasGraphics.createTempPatternCanvas = function(bitmap,repeat,width,height) {
	var canvas = window.document.createElement("canvas");
	var context = canvas.getContext("2d");
	canvas.width = Math.ceil(width);
	canvas.height = Math.ceil(height);
	context.fillStyle = context.createPattern(bitmap.__image.get_src(),repeat?"repeat":"no-repeat");
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,height);
	context.lineTo(width,height);
	context.lineTo(width,0);
	context.lineTo(0,0);
	context.closePath();
	context.fill();
	return canvas;
};
openfl._internal.renderer.canvas.CanvasGraphics.isCCW = function(x1,y1,x2,y2,x3,y3) {
	return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0;
};
openfl._internal.renderer.canvas.CanvasGraphics.normalizeUvt = function(uvt,skipT) {
	if(skipT == null) skipT = false;
	var max = Math.NEGATIVE_INFINITY;
	var tmp = Math.NEGATIVE_INFINITY;
	var len = uvt.length;
	var _g1 = 1;
	var _g = len + 1;
	while(_g1 < _g) {
		var t = _g1++;
		if(skipT && t % 3 == 0) continue;
		tmp = uvt.data[t - 1];
		if(max < tmp) max = tmp;
	}
	var result;
	var this1;
	this1 = new openfl.VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	result = this1;
	var _g11 = 1;
	var _g2 = len + 1;
	while(_g11 < _g2) {
		var t1 = _g11++;
		if(skipT && t1 % 3 == 0) continue;
		if(!result.fixed) {
			result.length++;
			if(result.data.length < result.length) {
				var data;
				var this3;
				this3 = new Array(result.data.length + 10);
				data = this3;
				haxe.ds._Vector.Vector_Impl_.blit(result.data,0,data,0,result.data.length);
				result.data = data;
			}
			result.data[result.length - 1] = uvt.data[t1 - 1] / max;
		}
		result.length;
	}
	return { max : max, uvt : result};
};
openfl._internal.renderer.canvas.CanvasRenderer = function(width,height,context) {
	openfl._internal.renderer.AbstractRenderer.call(this,width,height);
	this.context = context;
	this.renderSession = new openfl._internal.renderer.RenderSession();
	this.renderSession.context = context;
	this.renderSession.roundPixels = true;
	this.renderSession.renderer = this;
	this.renderSession.maskManager = new openfl._internal.renderer.canvas.MaskManager(this.renderSession);
};
$hxClasses["openfl._internal.renderer.canvas.CanvasRenderer"] = openfl._internal.renderer.canvas.CanvasRenderer;
openfl._internal.renderer.canvas.CanvasRenderer.__name__ = ["openfl","_internal","renderer","canvas","CanvasRenderer"];
openfl._internal.renderer.canvas.CanvasRenderer.__super__ = openfl._internal.renderer.AbstractRenderer;
openfl._internal.renderer.canvas.CanvasRenderer.prototype = $extend(openfl._internal.renderer.AbstractRenderer.prototype,{
	render: function(stage) {
		this.context.setTransform(1,0,0,1,0,0);
		this.context.globalAlpha = 1;
		if(!stage.__transparent && stage.__clearBeforeRender) {
			this.context.fillStyle = stage.__colorString;
			this.context.fillRect(0,0,stage.stageWidth,stage.stageHeight);
		} else if(stage.__transparent && stage.__clearBeforeRender) this.context.clearRect(0,0,stage.stageWidth,stage.stageHeight);
		stage.__renderCanvas(this.renderSession);
	}
	,__class__: openfl._internal.renderer.canvas.CanvasRenderer
});
openfl._internal.renderer.canvas.CanvasShape = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasShape"] = openfl._internal.renderer.canvas.CanvasShape;
openfl._internal.renderer.canvas.CanvasShape.__name__ = ["openfl","_internal","renderer","canvas","CanvasShape"];
openfl._internal.renderer.canvas.CanvasShape.render = function(shape,renderSession) {
	if(!shape.__renderable || shape.__worldAlpha <= 0) return;
	var graphics = shape.__graphics;
	if(graphics != null) {
		openfl._internal.renderer.canvas.CanvasGraphics.render(graphics,renderSession);
		if(graphics.__canvas != null) {
			if(shape.__mask != null) renderSession.maskManager.pushMask(shape.__mask);
			var context = renderSession.context;
			var scrollRect = shape.get_scrollRect();
			context.globalAlpha = shape.__worldAlpha;
			var transform = shape.__worldTransform;
			if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
			if(scrollRect == null) context.drawImage(graphics.__canvas,graphics.__bounds.x,graphics.__bounds.y); else context.drawImage(graphics.__canvas,scrollRect.x - graphics.__bounds.x,scrollRect.y - graphics.__bounds.y,scrollRect.width,scrollRect.height,graphics.__bounds.x + scrollRect.x,graphics.__bounds.y + scrollRect.y,scrollRect.width,scrollRect.height);
			if(shape.__mask != null) renderSession.maskManager.popMask();
		}
	}
};
openfl._internal.renderer.canvas.CanvasTextField = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasTextField"] = openfl._internal.renderer.canvas.CanvasTextField;
openfl._internal.renderer.canvas.CanvasTextField.__name__ = ["openfl","_internal","renderer","canvas","CanvasTextField"];
openfl._internal.renderer.canvas.CanvasTextField.context = null;
openfl._internal.renderer.canvas.CanvasTextField.render = function(textField,renderSession) {
	if(!textField.__renderable || textField.__worldAlpha <= 0) return;
	openfl._internal.renderer.canvas.CanvasTextField.update(textField);
	if(textField.__canvas != null) {
		var context = renderSession.context;
		context.globalAlpha = textField.__worldAlpha;
		var transform = textField.__worldTransform;
		var scrollRect = textField.get_scrollRect();
		if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		if(scrollRect == null) context.drawImage(textField.__canvas,0,0); else context.drawImage(textField.__canvas,scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height,scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height);
	}
};
openfl._internal.renderer.canvas.CanvasTextField.renderText = function(textField,text,format,offsetX) {
	openfl._internal.renderer.canvas.CanvasTextField.context.font = textField.__getFont(format);
	openfl._internal.renderer.canvas.CanvasTextField.context.textBaseline = "top";
	openfl._internal.renderer.canvas.CanvasTextField.context.fillStyle = "#" + StringTools.hex(format.color,6);
	var lines = text.split("\n");
	var yOffset = 0;
	var _g = 0;
	while(_g < lines.length) {
		var line = lines[_g];
		++_g;
		var _g1 = format.align;
		switch(_g1[1]) {
		case 3:
			openfl._internal.renderer.canvas.CanvasTextField.context.textAlign = "center";
			openfl._internal.renderer.canvas.CanvasTextField.context.fillText(line,textField.__width / 2,2 + yOffset,textField.__width - 4);
			break;
		case 1:
			openfl._internal.renderer.canvas.CanvasTextField.context.textAlign = "end";
			openfl._internal.renderer.canvas.CanvasTextField.context.fillText(line,textField.__width - 2,2 + yOffset,textField.__width - 4);
			break;
		default:
			openfl._internal.renderer.canvas.CanvasTextField.context.textAlign = "start";
			openfl._internal.renderer.canvas.CanvasTextField.context.fillText(line,2 + offsetX,2 + yOffset,textField.__width - 4);
		}
		yOffset += textField.get_textHeight();
	}
};
openfl._internal.renderer.canvas.CanvasTextField.update = function(textField) {
	if(textField.__dirty) {
		if((textField.__text == null || textField.__text == "") && !textField.background && !textField.border || (textField.get_width() <= 0 || textField.get_height() <= 0) && textField.autoSize != openfl.text.TextFieldAutoSize.LEFT) {
			textField.__canvas = null;
			textField.__context = null;
			textField.__dirty = false;
		} else {
			if(textField.__canvas == null) {
				textField.__canvas = window.document.createElement("canvas");
				textField.__context = textField.__canvas.getContext("2d");
			}
			openfl._internal.renderer.canvas.CanvasTextField.context = textField.__context;
			if(textField.__text != null && textField.__text != "") {
				var text = textField.get_text();
				if(textField.displayAsPassword) {
					var length = text.length;
					var mask = "";
					var _g = 0;
					while(_g < length) {
						var i = _g++;
						mask += "*";
					}
					text = mask;
				}
				var measurements = textField.__measureText();
				var textWidth = 0.0;
				var _g1 = 0;
				while(_g1 < measurements.length) {
					var measurement = measurements[_g1];
					++_g1;
					textWidth += measurement;
				}
				if(textField.autoSize == openfl.text.TextFieldAutoSize.LEFT) textField.__width = textWidth + 4;
				textField.__canvas.width = Math.ceil(textField.__width);
				textField.__canvas.height = Math.ceil(textField.__height);
				if(textField.border || textField.background) {
					textField.__context.rect(0.5,0.5,textField.__width - 1,textField.__height - 1);
					if(textField.background) {
						openfl._internal.renderer.canvas.CanvasTextField.context.fillStyle = "#" + StringTools.hex(textField.backgroundColor,6);
						openfl._internal.renderer.canvas.CanvasTextField.context.fill();
					}
					if(textField.border) {
						openfl._internal.renderer.canvas.CanvasTextField.context.lineWidth = 1;
						openfl._internal.renderer.canvas.CanvasTextField.context.strokeStyle = "#" + StringTools.hex(textField.borderColor,6);
						openfl._internal.renderer.canvas.CanvasTextField.context.stroke();
					}
				}
				if(textField.__hasFocus && textField.__selectionStart == textField.__cursorPosition && textField.__showCursor) {
					var cursorOffset = textField.__getTextWidth(text.substring(0,textField.__cursorPosition));
					openfl._internal.renderer.canvas.CanvasTextField.context.fillStyle = "#" + StringTools.hex(textField.__textFormat.color,6);
					openfl._internal.renderer.canvas.CanvasTextField.context.fillRect(cursorOffset,5,1,textField.__textFormat.size - 5);
				} else if(textField.__hasFocus && Math.abs(textField.__selectionStart - textField.__cursorPosition) > 0 && !textField.__isKeyDown) {
					var lowPos = Std["int"](Math.min(textField.__selectionStart,textField.__cursorPosition));
					var highPos = Std["int"](Math.max(textField.__selectionStart,textField.__cursorPosition));
					var xPos = textField.__getTextWidth(text.substring(0,lowPos));
					var widthPos = textField.__getTextWidth(text.substring(lowPos,highPos));
					openfl._internal.renderer.canvas.CanvasTextField.context.fillStyle = "#" + StringTools.hex(textField.__textFormat.color,6);
					openfl._internal.renderer.canvas.CanvasTextField.context.fillRect(xPos,5,widthPos,textField.__textFormat.size - 5);
				}
				if(textField.__ranges == null) openfl._internal.renderer.canvas.CanvasTextField.renderText(textField,text,textField.__textFormat,0); else {
					var currentIndex = 0;
					var range;
					var offsetX = 0.0;
					var _g11 = 0;
					var _g2 = textField.__ranges.length;
					while(_g11 < _g2) {
						var i1 = _g11++;
						range = textField.__ranges[i1];
						openfl._internal.renderer.canvas.CanvasTextField.renderText(textField,text.substring(range.start,range.end),range.format,offsetX);
						offsetX += measurements[i1];
					}
				}
			} else {
				if(textField.autoSize == openfl.text.TextFieldAutoSize.LEFT) textField.__width = 4;
				textField.__canvas.width = Math.ceil(textField.__width);
				textField.__canvas.height = Math.ceil(textField.__height);
				if(textField.border || textField.background) {
					if(textField.border) openfl._internal.renderer.canvas.CanvasTextField.context.rect(0.5,0.5,textField.__width - 1,textField.__height - 1); else textField.__context.rect(0,0,textField.__width,textField.__height);
					if(textField.background) {
						openfl._internal.renderer.canvas.CanvasTextField.context.fillStyle = "#" + StringTools.hex(textField.backgroundColor,6);
						openfl._internal.renderer.canvas.CanvasTextField.context.fill();
					}
					if(textField.border) {
						openfl._internal.renderer.canvas.CanvasTextField.context.lineWidth = 1;
						openfl._internal.renderer.canvas.CanvasTextField.context.lineCap = "square";
						openfl._internal.renderer.canvas.CanvasTextField.context.strokeStyle = "#" + StringTools.hex(textField.borderColor,6);
						openfl._internal.renderer.canvas.CanvasTextField.context.stroke();
					}
				}
			}
			textField.__dirty = false;
			return true;
		}
	}
	return false;
};
openfl._internal.renderer.canvas.MaskManager = function(renderSession) {
	this.renderSession = renderSession;
};
$hxClasses["openfl._internal.renderer.canvas.MaskManager"] = openfl._internal.renderer.canvas.MaskManager;
openfl._internal.renderer.canvas.MaskManager.__name__ = ["openfl","_internal","renderer","canvas","MaskManager"];
openfl._internal.renderer.canvas.MaskManager.prototype = {
	pushMask: function(mask) {
		var context = this.renderSession.context;
		context.save();
		var transform = mask.__getTransform();
		context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);
		context.beginPath();
		mask.__renderMask(this.renderSession);
		context.clip();
	}
	,pushRect: function(rect,transform) {
		var context = this.renderSession.context;
		context.save();
		context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);
		context.beginPath();
		context.rect(rect.x,rect.y,rect.width,rect.height);
		context.clip();
	}
	,popMask: function() {
		this.renderSession.context.restore();
	}
	,__class__: openfl._internal.renderer.canvas.MaskManager
};
openfl._internal.renderer.dom = {};
openfl._internal.renderer.dom.DOMBitmap = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMBitmap"] = openfl._internal.renderer.dom.DOMBitmap;
openfl._internal.renderer.dom.DOMBitmap.__name__ = ["openfl","_internal","renderer","dom","DOMBitmap"];
openfl._internal.renderer.dom.DOMBitmap.render = function(bitmap,renderSession) {
	if(bitmap.stage != null && bitmap.__worldVisible && bitmap.__renderable && bitmap.bitmapData != null && bitmap.bitmapData.__isValid) {
		if(bitmap.bitmapData.__image.buffer.__srcImage != null) openfl._internal.renderer.dom.DOMBitmap.renderImage(bitmap,renderSession); else openfl._internal.renderer.dom.DOMBitmap.renderCanvas(bitmap,renderSession);
	} else {
		if(bitmap.__image != null) {
			renderSession.element.removeChild(bitmap.__image);
			bitmap.__image = null;
			bitmap.__style = null;
		}
		if(bitmap.__canvas != null) {
			renderSession.element.removeChild(bitmap.__canvas);
			bitmap.__canvas = null;
			bitmap.__style = null;
		}
	}
};
openfl._internal.renderer.dom.DOMBitmap.renderCanvas = function(bitmap,renderSession) {
	if(bitmap.__image != null) {
		renderSession.element.removeChild(bitmap.__image);
		bitmap.__image = null;
	}
	if(bitmap.__canvas == null) {
		bitmap.__canvas = window.document.createElement("canvas");
		bitmap.__context = bitmap.__canvas.getContext("2d");
		if(!bitmap.smoothing) {
			bitmap.__context.mozImageSmoothingEnabled = false;
			bitmap.__context.webkitImageSmoothingEnabled = false;
			bitmap.__context.imageSmoothingEnabled = false;
		}
		openfl._internal.renderer.dom.DOMRenderer.initializeElement(bitmap,bitmap.__canvas,renderSession);
	}
	bitmap.bitmapData.__sync();
	bitmap.__canvas.width = bitmap.bitmapData.width;
	bitmap.__canvas.height = bitmap.bitmapData.height;
	bitmap.__context.globalAlpha = bitmap.__worldAlpha;
	bitmap.__context.drawImage(bitmap.bitmapData.__image.buffer.__srcCanvas,0,0);
	openfl._internal.renderer.dom.DOMRenderer.applyStyle(bitmap,renderSession,true,false,true);
};
openfl._internal.renderer.dom.DOMBitmap.renderImage = function(bitmap,renderSession) {
	if(bitmap.__canvas != null) {
		renderSession.element.removeChild(bitmap.__canvas);
		bitmap.__canvas = null;
	}
	if(bitmap.__image == null) {
		bitmap.__image = window.document.createElement("img");
		bitmap.__image.src = bitmap.bitmapData.__image.buffer.__srcImage.src;
		openfl._internal.renderer.dom.DOMRenderer.initializeElement(bitmap,bitmap.__image,renderSession);
	}
	openfl._internal.renderer.dom.DOMRenderer.applyStyle(bitmap,renderSession,true,true,true);
};
openfl._internal.renderer.dom.DOMRenderer = function(width,height,element) {
	openfl._internal.renderer.AbstractRenderer.call(this,width,height);
	this.element = element;
	this.renderSession = new openfl._internal.renderer.RenderSession();
	this.renderSession.element = element;
	this.renderSession.roundPixels = true;
	var prefix = (function () {
		  var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
			  .call(styles)
			  .join('') 
			  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		  return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		  };
		})();
	this.renderSession.vendorPrefix = prefix.lowercase;
	if(prefix.lowercase == "webkit") this.renderSession.transformProperty = "-webkit-transform"; else this.renderSession.transformProperty = "transform";
	if(prefix.lowercase == "webkit") this.renderSession.transformOriginProperty = "-webkit-transform-origin"; else this.renderSession.transformOriginProperty = "transform-origin";
	this.renderSession.renderer = this;
};
$hxClasses["openfl._internal.renderer.dom.DOMRenderer"] = openfl._internal.renderer.dom.DOMRenderer;
openfl._internal.renderer.dom.DOMRenderer.__name__ = ["openfl","_internal","renderer","dom","DOMRenderer"];
openfl._internal.renderer.dom.DOMRenderer.applyStyle = function(displayObject,renderSession,setTransform,setAlpha,setClip) {
	var style = displayObject.__style;
	if(setTransform && displayObject.__worldTransformChanged) style.setProperty(renderSession.transformProperty,displayObject.__worldTransform.to3DString(renderSession.roundPixels),null);
	if(displayObject.__worldZ != ++renderSession.z) {
		displayObject.__worldZ = renderSession.z;
		style.setProperty("z-index",displayObject.__worldZ == null?"null":"" + displayObject.__worldZ,null);
	}
	if(setAlpha && displayObject.__worldAlphaChanged) {
		if(displayObject.__worldAlpha < 1) style.setProperty("opacity",displayObject.__worldAlpha == null?"null":"" + displayObject.__worldAlpha,null); else style.removeProperty("opacity");
	}
	if(setClip && displayObject.__worldClipChanged) {
		if(displayObject.__worldClip == null) style.removeProperty("clip"); else {
			var clip = displayObject.__worldClip.transform(displayObject.__worldTransform.clone().invert());
			style.setProperty("clip","rect(" + clip.y + "px, " + clip.get_right() + "px, " + clip.get_bottom() + "px, " + clip.x + "px)",null);
		}
	}
};
openfl._internal.renderer.dom.DOMRenderer.initializeElement = function(displayObject,element,renderSession) {
	var style = displayObject.__style = element.style;
	style.setProperty("position","absolute",null);
	style.setProperty("top","0",null);
	style.setProperty("left","0",null);
	style.setProperty(renderSession.transformOriginProperty,"0 0 0",null);
	renderSession.element.appendChild(element);
	displayObject.__worldAlphaChanged = true;
	displayObject.__worldClipChanged = true;
	displayObject.__worldTransformChanged = true;
	displayObject.__worldVisibleChanged = true;
	displayObject.__worldZ = -1;
};
openfl._internal.renderer.dom.DOMRenderer.__super__ = openfl._internal.renderer.AbstractRenderer;
openfl._internal.renderer.dom.DOMRenderer.prototype = $extend(openfl._internal.renderer.AbstractRenderer.prototype,{
	render: function(stage) {
		this.element.style.background = stage.__colorString;
		this.renderSession.z = 1;
		stage.__renderDOM(this.renderSession);
	}
	,__class__: openfl._internal.renderer.dom.DOMRenderer
});
openfl._internal.renderer.dom.DOMShape = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMShape"] = openfl._internal.renderer.dom.DOMShape;
openfl._internal.renderer.dom.DOMShape.__name__ = ["openfl","_internal","renderer","dom","DOMShape"];
openfl._internal.renderer.dom.DOMShape.render = function(shape,renderSession) {
	var graphics = shape.__graphics;
	if(shape.stage != null && shape.__worldVisible && shape.__renderable && graphics != null) {
		if(graphics.__dirty || shape.__worldAlphaChanged || shape.__canvas == null && graphics.__canvas != null) {
			openfl._internal.renderer.canvas.CanvasGraphics.render(graphics,renderSession);
			if(graphics.__canvas != null) {
				if(shape.__canvas == null) {
					shape.__canvas = window.document.createElement("canvas");
					shape.__context = shape.__canvas.getContext("2d");
					openfl._internal.renderer.dom.DOMRenderer.initializeElement(shape,shape.__canvas,renderSession);
				}
				shape.__canvas.width = graphics.__canvas.width;
				shape.__canvas.height = graphics.__canvas.height;
				shape.__context.globalAlpha = shape.__worldAlpha;
				shape.__context.drawImage(graphics.__canvas,0,0);
			} else if(shape.__canvas != null) {
				renderSession.element.removeChild(shape.__canvas);
				shape.__canvas = null;
				shape.__style = null;
			}
		}
		if(shape.__canvas != null) {
			if(shape.__worldTransformChanged || graphics.__transformDirty) {
				graphics.__transformDirty = false;
				var transform = new openfl.geom.Matrix();
				transform.translate(graphics.__bounds.x,graphics.__bounds.y);
				transform = transform.mult(shape.__worldTransform);
				shape.__style.setProperty(renderSession.transformProperty,renderSession.roundPixels?"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + (transform.tx | 0) + ", " + (transform.ty | 0) + ", 0, 1)":"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + transform.tx + ", " + transform.ty + ", 0, 1)",null);
			}
			openfl._internal.renderer.dom.DOMRenderer.applyStyle(shape,renderSession,false,false,true);
		}
	} else if(shape.__canvas != null) {
		renderSession.element.removeChild(shape.__canvas);
		shape.__canvas = null;
		shape.__style = null;
	}
};
openfl._internal.renderer.dom.DOMTextField = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMTextField"] = openfl._internal.renderer.dom.DOMTextField;
openfl._internal.renderer.dom.DOMTextField.__name__ = ["openfl","_internal","renderer","dom","DOMTextField"];
openfl._internal.renderer.dom.DOMTextField.render = function(textField,renderSession) {
	if(textField.stage != null && textField.__worldVisible && textField.__renderable) {
		if(textField.__dirty || textField.__div == null) {
			if(textField.__text != "" || textField.background || textField.border) {
				if(textField.__div == null) {
					textField.__div = window.document.createElement("div");
					openfl._internal.renderer.dom.DOMRenderer.initializeElement(textField,textField.__div,renderSession);
					textField.__style.setProperty("cursor","inherit",null);
				}
				var style = textField.__style;
				textField.__div.innerHTML = textField.__text;
				if(textField.background) style.setProperty("background-color","#" + StringTools.hex(textField.backgroundColor,6),null); else style.removeProperty("background-color");
				if(textField.border) style.setProperty("border","solid 1px #" + StringTools.hex(textField.borderColor,6),null); else style.removeProperty("border");
				style.setProperty("font",textField.__getFont(textField.__textFormat),null);
				style.setProperty("color","#" + StringTools.hex(textField.__textFormat.color,6),null);
				if(textField.autoSize != openfl.text.TextFieldAutoSize.NONE) style.setProperty("width","auto",null); else style.setProperty("width",textField.__width + "px",null);
				style.setProperty("height",textField.__height + "px",null);
				var _g = textField.__textFormat.align;
				switch(_g[1]) {
				case 3:
					style.setProperty("text-align","center",null);
					break;
				case 1:
					style.setProperty("text-align","right",null);
					break;
				default:
					style.setProperty("text-align","left",null);
				}
				textField.__dirty = false;
			} else if(textField.__div != null) {
				renderSession.element.removeChild(textField.__div);
				textField.__div = null;
			}
		}
		if(textField.__div != null) openfl._internal.renderer.dom.DOMRenderer.applyStyle(textField,renderSession,true,true,false);
	} else if(textField.__div != null) {
		renderSession.element.removeChild(textField.__div);
		textField.__div = null;
		textField.__style = null;
	}
};
openfl._internal.renderer.opengl = {};
openfl._internal.renderer.opengl.GLBitmap = function() { };
$hxClasses["openfl._internal.renderer.opengl.GLBitmap"] = openfl._internal.renderer.opengl.GLBitmap;
openfl._internal.renderer.opengl.GLBitmap.__name__ = ["openfl","_internal","renderer","opengl","GLBitmap"];
openfl._internal.renderer.opengl.GLBitmap.render = function(bitmap,renderSession) {
	if(!bitmap.__renderable || bitmap.__worldAlpha <= 0) return;
	var i;
	var j;
	renderSession.spriteBatch.render(bitmap);
};
openfl._internal.renderer.opengl.GLRenderer = function(width,height,gl,transparent,antialias,preserveDrawingBuffer) {
	if(preserveDrawingBuffer == null) preserveDrawingBuffer = false;
	if(antialias == null) antialias = false;
	if(transparent == null) transparent = false;
	if(height == null) height = 600;
	if(width == null) width = 800;
	openfl._internal.renderer.AbstractRenderer.call(this,width,height);
	this.transparent = transparent;
	this.preserveDrawingBuffer = preserveDrawingBuffer;
	this.width = width;
	this.height = height;
	this.options = { alpha : transparent, antialias : antialias, premultipliedAlpha : transparent, stencil : true, preserveDrawingBuffer : preserveDrawingBuffer};
	this._glContextId = openfl._internal.renderer.opengl.GLRenderer.glContextId++;
	this.gl = gl;
	openfl._internal.renderer.opengl.GLRenderer.glContexts[this._glContextId] = gl;
	if(openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL == null) {
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL = new haxe.ds.EnumValueMap();
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.NORMAL,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.ADD,[gl.SRC_ALPHA,gl.DST_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.MULTIPLY,[gl.DST_COLOR,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.SCREEN,[gl.SRC_ALPHA,gl.ONE]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.ALPHA,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.DARKEN,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.DIFFERENCE,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.ERASE,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.HARDLIGHT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.INVERT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.LAYER,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.LIGHTEN,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.OVERLAY,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.SUBTRACT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
	}
	this.projection = new openfl.geom.Point();
	this.projection.x = this.width / 2;
	this.projection.y = -this.height / 2;
	this.offset = new openfl.geom.Point(0,0);
	this.resize(this.width,this.height);
	this.contextLost = false;
	this.shaderManager = new openfl._internal.renderer.opengl.utils.ShaderManager(gl);
	this.spriteBatch = new openfl._internal.renderer.opengl.utils.SpriteBatch(gl);
	this.maskManager = new openfl._internal.renderer.opengl.utils.MaskManager(gl);
	this.filterManager = new openfl._internal.renderer.opengl.utils.FilterManager(gl,this.transparent);
	this.stencilManager = new openfl._internal.renderer.opengl.utils.StencilManager(gl);
	this.blendModeManager = new openfl._internal.renderer.opengl.utils.BlendModeManager(gl);
	this.renderSession = new openfl._internal.renderer.RenderSession();
	this.renderSession.gl = this.gl;
	this.renderSession.drawCount = 0;
	this.renderSession.shaderManager = this.shaderManager;
	this.renderSession.maskManager = this.maskManager;
	this.renderSession.filterManager = this.filterManager;
	this.renderSession.blendModeManager = this.blendModeManager;
	this.renderSession.spriteBatch = this.spriteBatch;
	this.renderSession.stencilManager = this.stencilManager;
	this.renderSession.renderer = this;
	gl.useProgram(this.shaderManager.defaultShader.program);
	gl.disable(gl.DEPTH_TEST);
	gl.disable(gl.CULL_FACE);
	gl.enable(gl.BLEND);
	gl.colorMask(true,true,true,this.transparent);
};
$hxClasses["openfl._internal.renderer.opengl.GLRenderer"] = openfl._internal.renderer.opengl.GLRenderer;
openfl._internal.renderer.opengl.GLRenderer.__name__ = ["openfl","_internal","renderer","opengl","GLRenderer"];
openfl._internal.renderer.opengl.GLRenderer.__super__ = openfl._internal.renderer.AbstractRenderer;
openfl._internal.renderer.opengl.GLRenderer.prototype = $extend(openfl._internal.renderer.AbstractRenderer.prototype,{
	destroy: function() {
		openfl._internal.renderer.opengl.GLRenderer.glContexts[this._glContextId] = null;
		this.projection = null;
		this.offset = null;
		this.shaderManager.destroy();
		this.spriteBatch.destroy();
		this.maskManager.destroy();
		this.filterManager.destroy();
		this.shaderManager = null;
		this.spriteBatch = null;
		this.maskManager = null;
		this.filterManager = null;
		this.gl = null;
		this.renderSession = null;
	}
	,handleContextLost: function(event) {
		event.preventDefault();
		this.contextLost = true;
	}
	,handleContextRestored: function() {
		var gl = this.gl;
		openfl._internal.renderer.opengl.GLRenderer.glContextId++;
		this.shaderManager.setContext(gl);
		this.spriteBatch.setContext(gl);
		this.maskManager.setContext(gl);
		this.filterManager.setContext(gl);
		this.renderSession.gl = gl;
		gl.disable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);
		gl.enable(gl.BLEND);
		gl.colorMask(true,true,true,this.transparent);
		gl.viewport(0,0,this.width,this.height);
		this.contextLost = false;
	}
	,render: function(stage) {
		if(this.contextLost) return;
		var gl = this.gl;
		gl.viewport(0,0,this.width,this.height);
		gl.bindFramebuffer(gl.FRAMEBUFFER,null);
		if(this.transparent) gl.clearColor(0,0,0,0); else gl.clearColor(stage.__colorSplit[0] | 0,stage.__colorSplit[1] | 0,stage.__colorSplit[2] | 0,1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		this.renderDisplayObject(stage,this.projection);
	}
	,renderDisplayObject: function(displayObject,projection,buffer) {
		this.renderSession.blendModeManager.setBlendMode(openfl.display.BlendMode.NORMAL);
		this.renderSession.drawCount = 0;
		this.renderSession.currentBlendMode = null;
		this.renderSession.projection = projection;
		this.renderSession.offset = this.offset;
		this.spriteBatch.begin(this.renderSession);
		this.filterManager.begin(this.renderSession,buffer);
		displayObject.__renderGL(this.renderSession);
		this.spriteBatch.end();
	}
	,resize: function(width,height) {
		openfl._internal.renderer.AbstractRenderer.prototype.resize.call(this,width,height);
		this.gl.viewport(0,0,width,height);
		this.projection.x = width / 2;
		this.projection.y = -height / 2;
	}
	,__class__: openfl._internal.renderer.opengl.GLRenderer
});
openfl._internal.renderer.opengl.GLTextField = function() { };
$hxClasses["openfl._internal.renderer.opengl.GLTextField"] = openfl._internal.renderer.opengl.GLTextField;
openfl._internal.renderer.opengl.GLTextField.__name__ = ["openfl","_internal","renderer","opengl","GLTextField"];
openfl._internal.renderer.opengl.GLTextField.render = function(textField,renderSession) {
	if(!textField.__renderable || textField.__worldAlpha <= 0) return;
	var gl = renderSession.gl;
	var changed = openfl._internal.renderer.canvas.CanvasTextField.update(textField);
	if(textField.__texture == null) {
		textField.__texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D,textField.__texture);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
		changed = true;
	}
	if(changed) {
		gl.bindTexture(gl.TEXTURE_2D,textField.__texture);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,textField.__canvas);
		gl.bindTexture(gl.TEXTURE_2D,null);
	}
};
openfl._internal.renderer.opengl.shaders = {};
openfl._internal.renderer.opengl.shaders.AbstractShader = function(gl) {
	this._UID = openfl._internal.renderer.opengl.shaders.AbstractShader.__UID++;
	this.gl = gl;
	this.program = null;
	this.attributes = [];
};
$hxClasses["openfl._internal.renderer.opengl.shaders.AbstractShader"] = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.AbstractShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","AbstractShader"];
openfl._internal.renderer.opengl.shaders.AbstractShader.compileProgram = function(gl,vertexSrc,fragmentSrc) {
	var fragmentShader = openfl._internal.renderer.opengl.shaders.AbstractShader.CompileFragmentShader(gl,fragmentSrc);
	var vertexShader = openfl._internal.renderer.opengl.shaders.AbstractShader.CompileVertexShader(gl,vertexSrc);
	var shaderProgram = gl.createProgram();
	if(fragmentShader != null && vertexShader != null) {
		gl.attachShader(shaderProgram,vertexShader);
		gl.attachShader(shaderProgram,fragmentShader);
		gl.linkProgram(shaderProgram);
		if(gl.getProgramParameter(shaderProgram,gl.LINK_STATUS) == 0) haxe.Log.trace("Could not initialize shaders",{ fileName : "AbstractShader.hx", lineNumber : 80, className : "openfl._internal.renderer.opengl.shaders.AbstractShader", methodName : "compileProgram"});
	}
	return shaderProgram;
};
openfl._internal.renderer.opengl.shaders.AbstractShader.CompileVertexShader = function(gl,shaderSrc) {
	return openfl._internal.renderer.opengl.shaders.AbstractShader._CompileShader(gl,shaderSrc,gl.VERTEX_SHADER);
};
openfl._internal.renderer.opengl.shaders.AbstractShader.CompileFragmentShader = function(gl,shaderSrc) {
	return openfl._internal.renderer.opengl.shaders.AbstractShader._CompileShader(gl,shaderSrc,gl.FRAGMENT_SHADER);
};
openfl._internal.renderer.opengl.shaders.AbstractShader._CompileShader = function(gl,shaderSrc,shaderType) {
	var src = shaderSrc.join("\n");
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader,src);
	gl.compileShader(shader);
	if(gl.getShaderParameter(shader,gl.COMPILE_STATUS) == 0) {
		haxe.Log.trace(gl.getShaderInfoLog(shader),{ fileName : "AbstractShader.hx", lineNumber : 115, className : "openfl._internal.renderer.opengl.shaders.AbstractShader", methodName : "_CompileShader"});
		return null;
	}
	return shader;
};
openfl._internal.renderer.opengl.shaders.AbstractShader.prototype = {
	destroy: function() {
		if(this.program != null) this.gl.deleteProgram(this.program);
		this.uniforms = null;
		this.gl = null;
		this.attributes = null;
	}
	,init: function() {
		var gl = this.gl;
		var program = openfl._internal.renderer.opengl.shaders.AbstractShader.compileProgram(gl,this.vertexSrc,this.fragmentSrc);
		gl.useProgram(program);
		this.program = program;
	}
	,__class__: openfl._internal.renderer.opengl.shaders.AbstractShader
};
openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader"] = openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader;
openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","ComplexPrimitiveShader"];
openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.tintColor = gl.getUniformLocation(this.program,"tint");
		this.color = gl.getUniformLocation(this.program,"color");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.attributes = [this.aVertexPosition];
		this.translationMatrix = gl.getUniformLocation(this.program,"translationMatrix");
		this.alpha = gl.getUniformLocation(this.program,"alpha");
	}
	,__class__: openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader
});
openfl._internal.renderer.opengl.shaders.DefaultShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"];
	this.textureCount = 0;
	this.attributes = [];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.DefaultShader"] = openfl._internal.renderer.opengl.shaders.DefaultShader;
openfl._internal.renderer.opengl.shaders.DefaultShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","DefaultShader"];
openfl._internal.renderer.opengl.shaders.DefaultShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.DefaultShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	init: function() {
		if(this.vertexSrc == null) this.vertexSrc = openfl._internal.renderer.opengl.shaders.DefaultShader.defaultVertexSrc;
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.uSampler = gl.getUniformLocation(this.program,"uSampler");
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.dimensions = gl.getUniformLocation(this.program,"dimensions");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.aTextureCoord = gl.getAttribLocation(this.program,"aTextureCoord");
		this.colorAttribute = gl.getAttribLocation(this.program,"aColor");
		if(this.colorAttribute == -1) this.colorAttribute = 2;
		this.attributes = [this.aVertexPosition,this.aTextureCoord,this.colorAttribute];
		if(this.uniforms != null) {
			var $it0 = this.uniforms.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				this.uniforms.get(key).uniformLocation = gl.getUniformLocation(this.program,key);
			}
		}
		this.initUniforms();
	}
	,initSampler2D: function(uniform) {
		if(uniform.value == null || uniform.value.baseTexture == null || uniform.value.baseTexture.hasLoaded == null) return;
		var gl = this.gl;
		gl.activeTexture(Reflect.field(gl,"TEXTURE" + this.textureCount));
		gl.bindTexture(gl.TEXTURE_2D,uniform.value.baseTexture._glTextures[openfl._internal.renderer.opengl.GLRenderer.glContextId]);
		if(uniform.textureData != null) {
			var data = uniform.textureData;
			var magFilter;
			if(data.magFilter != 0) magFilter = data.magFilter; else magFilter = gl.LINEAR;
			var minFilter;
			if(data.minFilter != 0) minFilter = data.minFilter; else minFilter = gl.LINEAR;
			var wrapS;
			if(data.wrapS != 0) wrapS = data.wrapS; else wrapS = gl.CLAMP_TO_EDGE;
			var wrapT;
			if(data.wrapT != 0) wrapT = data.wrapT; else wrapT = gl.CLAMP_TO_EDGE;
			var format;
			if(data.luminance != 0) format = gl.LUMINANCE; else format = gl.RGBA;
			if(data.repeat) {
				wrapS = gl.REPEAT;
				wrapT = gl.REPEAT;
			}
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,data.flip);
			if(data.width != 0) {
				var width;
				if(data.width != 0) width = data.width; else width = 512;
				var height;
				if(data.height != 0) height = data.height; else height = 2;
				var border;
				if(data.border != 0) border = data.border; else border = 0;
				gl.texImage2D(gl.TEXTURE_2D,0,format,width,height,border,format,gl.UNSIGNED_BYTE,null);
			} else gl.texImage2D(gl.TEXTURE_2D,0,format,gl.RGBA,gl.UNSIGNED_BYTE,uniform.value.baseTexture.source);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,magFilter);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,minFilter);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,wrapS);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,wrapT);
		}
		gl.uniform1i(uniform.uniformLocation,this.textureCount);
		uniform._init = true;
		this.textureCount++;
	}
	,initUniforms: function() {
		this.textureCount = 1;
		var gl = this.gl;
		var uniform;
		if(this.uniforms == null) return;
		var $it0 = this.uniforms.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			uniform = this.uniforms.get(key);
			var type = uniform.type;
			if(type == "sampler2D") {
				uniform._init = false;
				if(uniform.value != null) this.initSampler2D(uniform);
			} else if(type == "mat2" || type == "mat3" || type == "mat4") {
				uniform.glMatrix = true;
				uniform.glValueLength = 1;
				if(type == "mat2") uniform.glFunc = $bind(gl,gl.uniformMatrix2fv); else if(type == "mat3") uniform.glFunc = $bind(gl,gl.uniformMatrix3fv); else if(type == "mat4") uniform.glFunc = $bind(gl,gl.uniformMatrix4fv);
			} else {
				uniform.glFunc = Reflect.field(gl,"uniform" + type);
				if(type == "2f" || type == "2i") uniform.glValueLength = 2; else if(type == "3f" || type == "3i") uniform.glValueLength = 3; else if(type == "4f" || type == "4i") uniform.glValueLength = 4; else uniform.glValueLength = 1;
			}
		}
	}
	,syncUniforms: function() {
		this.textureCount = 1;
		var uniform;
		var gl = this.gl;
		if(this.uniforms == null) return;
		var $it0 = this.uniforms.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			uniform = this.uniforms.get(key);
			if(uniform.glValueLength == 1) {
				if(uniform.glMatrix == true) uniform.glFunc.call(gl,uniform.uniformLocation,uniform.transpose,uniform.value); else uniform.glFunc.call(gl,uniform.uniformLocation,uniform.value);
			} else if(uniform.glValueLength == 2) uniform.glFunc.call(gl,uniform.uniformLocation,uniform.value.x,uniform.value.y); else if(uniform.glValueLength == 3) uniform.glFunc.call(gl,uniform.uniformLocation,uniform.value.x,uniform.value.y,uniform.value.z); else if(uniform.glValueLength == 4) uniform.glFunc.call(gl,uniform.uniformLocation,uniform.value.x,uniform.value.y,uniform.value.z,uniform.value.w); else if(uniform.type == "sampler2D") {
				if(uniform._init) {
					gl.activeTexture(Reflect.field(gl,"TEXTURE" + this.textureCount));
					var tex = uniform.value.getTexture();
					gl.bindTexture(gl.TEXTURE_2D,tex);
					gl.uniform1i(uniform.uniformLocation,this.textureCount);
					this.textureCount++;
				} else this.initSampler2D(uniform);
			}
		}
	}
	,__class__: openfl._internal.renderer.opengl.shaders.DefaultShader
});
openfl._internal.renderer.opengl.shaders.DrawTrianglesShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vPos;","varying vec4 vColor;","void main(void) {","   vec3 v = vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vPos = aTextureCoord;","   vColor = aColor;","}"];
	this.fragmentSrc = ["precision mediump float;","uniform sampler2D sampler;","uniform vec3 color;","uniform bool useTexture;","uniform float alpha;","varying vec2 vPos;","varying vec4 vColor;","vec4 tmp;","void main(void) {","   if(useTexture) {","       tmp = texture2D(sampler, vPos);","   } else {","       tmp = vec4(color, 1.);","   }","   float a = tmp.a * vColor.a * alpha;","   gl_FragColor = vec4(vec3((tmp.rgb * vColor.rgb) * a), a);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.DrawTrianglesShader"] = openfl._internal.renderer.opengl.shaders.DrawTrianglesShader;
openfl._internal.renderer.opengl.shaders.DrawTrianglesShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","DrawTrianglesShader"];
openfl._internal.renderer.opengl.shaders.DrawTrianglesShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.DrawTrianglesShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		this.translationMatrix = this.gl.getUniformLocation(this.program,"translationMatrix");
		this.projectionVector = this.gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = this.gl.getUniformLocation(this.program,"offsetVector");
		this.sampler = this.gl.getUniformLocation(this.program,"sampler");
		this.alpha = this.gl.getUniformLocation(this.program,"alpha");
		this.color = this.gl.getUniformLocation(this.program,"color");
		this.useTexture = this.gl.getUniformLocation(this.program,"useTexture");
		this.aVertexPosition = this.gl.getAttribLocation(this.program,"aVertexPosition");
		this.aTextureCoord = this.gl.getAttribLocation(this.program,"aTextureCoord");
		this.colorAttribute = this.gl.getAttribLocation(this.program,"aColor");
		this.attributes = [this.aVertexPosition,this.aTextureCoord,this.colorAttribute];
	}
	,__class__: openfl._internal.renderer.opengl.shaders.DrawTrianglesShader
});
openfl._internal.renderer.opengl.shaders.FastShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 uMatrix;","varying vec2 vTextureCoord;","varying float vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   vec2 v;","   vec2 sv = aVertexPosition * aScale;","   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);","   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);","   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;","   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"];
	this.textureCount = 0;
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.FastShader"] = openfl._internal.renderer.opengl.shaders.FastShader;
openfl._internal.renderer.opengl.shaders.FastShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","FastShader"];
openfl._internal.renderer.opengl.shaders.FastShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.FastShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.uSampler = gl.getUniformLocation(this.program,"uSampler");
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.dimensions = gl.getUniformLocation(this.program,"dimensions");
		this.uMatrix = gl.getUniformLocation(this.program,"uMatrix");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.aPositionCoord = gl.getAttribLocation(this.program,"aPositionCoord");
		this.aScale = gl.getAttribLocation(this.program,"aScale");
		this.aRotation = gl.getAttribLocation(this.program,"aRotation");
		this.aTextureCoord = gl.getAttribLocation(this.program,"aTextureCoord");
		this.colorAttribute = gl.getAttribLocation(this.program,"aColor");
		if(this.colorAttribute == -1) this.colorAttribute = 2;
		this.attributes = [this.aVertexPosition,this.aPositionCoord,this.aScale,this.aRotation,this.aTextureCoord,this.colorAttribute];
	}
	,__class__: openfl._internal.renderer.opengl.shaders.FastShader
});
openfl._internal.renderer.opengl.shaders.FillShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.vertexSrc = ["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","}"];
	this.fragmentSrc = ["precision mediump float;","uniform vec3 color;","uniform float alpha;","void main(void) {","   gl_FragColor = vec4((color * alpha), alpha);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.FillShader"] = openfl._internal.renderer.opengl.shaders.FillShader;
openfl._internal.renderer.opengl.shaders.FillShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","FillShader"];
openfl._internal.renderer.opengl.shaders.FillShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.FillShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		this.translationMatrix = this.gl.getUniformLocation(this.program,"translationMatrix");
		this.projectionVector = this.gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = this.gl.getUniformLocation(this.program,"offsetVector");
		this.color = this.gl.getUniformLocation(this.program,"color");
		this.alpha = this.gl.getUniformLocation(this.program,"alpha");
		this.aVertexPosition = this.gl.getAttribLocation(this.program,"aVertexPosition");
		this.attributes = [this.aVertexPosition];
	}
	,__class__: openfl._internal.renderer.opengl.shaders.FillShader
});
openfl._internal.renderer.opengl.shaders.PatternFillShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.vertexSrc = ["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 patternMatrix;","varying vec2 vPos;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vPos = (patternMatrix * vec3(aVertexPosition, 1)).xy;","}"];
	this.fragmentSrc = ["precision mediump float;","uniform float alpha;","uniform vec2 patternTL;","uniform vec2 patternBR;","uniform sampler2D sampler;","varying vec2 vPos;","void main(void) {","   vec2 pos = mix(patternTL, patternBR, vPos);","   vec4 tcol = texture2D(sampler, pos);","   gl_FragColor = vec4(tcol.rgb * alpha, tcol.a * alpha);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.PatternFillShader"] = openfl._internal.renderer.opengl.shaders.PatternFillShader;
openfl._internal.renderer.opengl.shaders.PatternFillShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","PatternFillShader"];
openfl._internal.renderer.opengl.shaders.PatternFillShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.PatternFillShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		this.translationMatrix = this.gl.getUniformLocation(this.program,"translationMatrix");
		this.projectionVector = this.gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = this.gl.getUniformLocation(this.program,"offsetVector");
		this.patternMatrix = this.gl.getUniformLocation(this.program,"patternMatrix");
		this.patternTL = this.gl.getUniformLocation(this.program,"patternTL");
		this.patternBR = this.gl.getUniformLocation(this.program,"patternBR");
		this.sampler = this.gl.getUniformLocation(this.program,"sampler");
		this.alpha = this.gl.getUniformLocation(this.program,"alpha");
		this.aVertexPosition = this.gl.getAttribLocation(this.program,"aVertexPosition");
		this.attributes = [this.aVertexPosition];
	}
	,__class__: openfl._internal.renderer.opengl.shaders.PatternFillShader
});
openfl._internal.renderer.opengl.shaders.PrimitiveShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform float alpha;","uniform vec3 tint;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vColor = aColor;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.PrimitiveShader"] = openfl._internal.renderer.opengl.shaders.PrimitiveShader;
openfl._internal.renderer.opengl.shaders.PrimitiveShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","PrimitiveShader"];
openfl._internal.renderer.opengl.shaders.PrimitiveShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.PrimitiveShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.tintColor = gl.getUniformLocation(this.program,"tint");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.colorAttribute = gl.getAttribLocation(this.program,"aColor");
		this.attributes = [this.aVertexPosition,this.colorAttribute];
		this.translationMatrix = gl.getUniformLocation(this.program,"translationMatrix");
		this.alpha = gl.getUniformLocation(this.program,"alpha");
	}
	,__class__: openfl._internal.renderer.opengl.shaders.PrimitiveShader
});
openfl._internal.renderer.opengl.shaders.StripShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision mediump float;","varying vec2 vTextureCoord;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.StripShader"] = openfl._internal.renderer.opengl.shaders.StripShader;
openfl._internal.renderer.opengl.shaders.StripShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","StripShader"];
openfl._internal.renderer.opengl.shaders.StripShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.StripShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.uSampler = gl.getUniformLocation(this.program,"uSampler");
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.colorAttribute = gl.getAttribLocation(this.program,"aColor");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.aTextureCoord = gl.getAttribLocation(this.program,"aTextureCoord");
		this.attributes = [this.aVertexPosition,this.aTextureCoord];
		this.translationMatrix = gl.getUniformLocation(this.program,"translationMatrix");
		this.alpha = gl.getUniformLocation(this.program,"alpha");
	}
	,__class__: openfl._internal.renderer.opengl.shaders.StripShader
});
openfl._internal.renderer.opengl.utils = {};
openfl._internal.renderer.opengl.utils.BlendModeManager = function(gl) {
	this.gl = gl;
	this.currentBlendMode = null;
};
$hxClasses["openfl._internal.renderer.opengl.utils.BlendModeManager"] = openfl._internal.renderer.opengl.utils.BlendModeManager;
openfl._internal.renderer.opengl.utils.BlendModeManager.__name__ = ["openfl","_internal","renderer","opengl","utils","BlendModeManager"];
openfl._internal.renderer.opengl.utils.BlendModeManager.prototype = {
	destroy: function() {
		this.gl = null;
	}
	,setBlendMode: function(blendMode) {
		if(blendMode == null) blendMode = openfl.display.BlendMode.NORMAL;
		if(this.currentBlendMode == blendMode) return false;
		this.currentBlendMode = blendMode;
		var blendModeWebGL = openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.get(this.currentBlendMode);
		this.gl.blendFunc(blendModeWebGL[0],blendModeWebGL[1]);
		return true;
	}
	,__class__: openfl._internal.renderer.opengl.utils.BlendModeManager
};
openfl._internal.renderer.opengl.utils.DrawPath = function() {
	this.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
	this.points = [];
	this.isRemovable = true;
	this.fillIndex = 0;
	this.line = new openfl._internal.renderer.opengl.utils.LineStyle();
	this.fill = openfl._internal.renderer.opengl.utils.FillType.None;
};
$hxClasses["openfl._internal.renderer.opengl.utils.DrawPath"] = openfl._internal.renderer.opengl.utils.DrawPath;
openfl._internal.renderer.opengl.utils.DrawPath.__name__ = ["openfl","_internal","renderer","opengl","utils","DrawPath"];
openfl._internal.renderer.opengl.utils.DrawPath.getStack = function(graphics,gl) {
	return openfl._internal.renderer.opengl.utils.PathBuiler.build(graphics,gl);
};
openfl._internal.renderer.opengl.utils.DrawPath.prototype = {
	update: function(line,fill,fillIndex) {
		this.updateLine(line);
		this.fill = fill;
		this.fillIndex = fillIndex;
	}
	,updateLine: function(line) {
		this.line.width = line.width;
		this.line.color = line.color & 16777215;
		if(line.alpha == null) this.line.alpha = 1; else this.line.alpha = line.alpha;
		if(line.scaleMode == null) this.line.scaleMode = openfl.display.LineScaleMode.NORMAL; else this.line.scaleMode = line.scaleMode;
		if(line.caps == null) this.line.caps = openfl.display.CapsStyle.ROUND; else this.line.caps = line.caps;
		if(line.joints == null) this.line.joints = openfl.display.JointStyle.ROUND; else this.line.joints = line.joints;
		this.line.miterLimit = line.miterLimit;
	}
	,__class__: openfl._internal.renderer.opengl.utils.DrawPath
};
openfl._internal.renderer.opengl.utils.PathBuiler = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PathBuiler"] = openfl._internal.renderer.opengl.utils.PathBuiler;
openfl._internal.renderer.opengl.utils.PathBuiler.__name__ = ["openfl","_internal","renderer","opengl","utils","PathBuiler"];
openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = null;
openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths = null;
openfl._internal.renderer.opengl.utils.PathBuiler.__line = null;
openfl._internal.renderer.opengl.utils.PathBuiler.__fill = null;
openfl._internal.renderer.opengl.utils.PathBuiler.closePath = function() {
	var l = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length;
	if(l <= 0) return;
	if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type == openfl._internal.renderer.opengl.utils.GraphicType.Polygon && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.fill != openfl._internal.renderer.opengl.utils.FillType.None) {
		var sx = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points[0];
		var sy = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points[1];
		var ex = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points[l - 2];
		var ey = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points[l - 1];
		if(!(sx == ex && sy == ey)) {
			openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(sx);
			openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(sy);
		}
	}
};
openfl._internal.renderer.opengl.utils.PathBuiler.endFill = function() {
	openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.None;
	openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex++;
};
openfl._internal.renderer.opengl.utils.PathBuiler.moveTo = function(x,y) {
	if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(x);
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(y);
	openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
};
openfl._internal.renderer.opengl.utils.PathBuiler.graphicDataPop = function() {
	if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
};
openfl._internal.renderer.opengl.utils.PathBuiler.build = function(graphics,gl) {
	var glStack = null;
	var bounds = graphics.__bounds;
	openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths = new Array();
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
	openfl._internal.renderer.opengl.utils.PathBuiler.__line = new openfl._internal.renderer.opengl.utils.LineStyle();
	openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.None;
	openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex = 0;
	glStack = graphics.__glStack[openfl._internal.renderer.opengl.GLRenderer.glContextId];
	if(glStack == null) glStack = graphics.__glStack[openfl._internal.renderer.opengl.GLRenderer.glContextId] = new openfl._internal.renderer.opengl.utils.GLStack(gl);
	if(!graphics.__visible || graphics.__commands.length == 0 || bounds == null || bounds.width == 0 || bounds.height == 0) {
	} else {
		var _g = 0;
		var _g1 = graphics.__commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			switch(command[1]) {
			case 0:
				var smooth = command[5];
				var repeat = command[4];
				var matrix = command[3];
				var bitmap = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.endFill();
				if(bitmap != null) openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.Texture(bitmap,matrix,repeat,smooth); else openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.None;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) {
					if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [];
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
					openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				}
				break;
			case 1:
				var alpha = command[3];
				var rgb = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.endFill();
				if(alpha > 0) openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.Color(rgb & 16777215,alpha); else openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.None;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) {
					if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [];
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
					openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				}
				break;
			case 2:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cx2 = command[4];
				var cy = command[3];
				var cx = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.moveTo(0,0);
				var n = 20;
				var dt = 0;
				var dt2 = 0;
				var dt3 = 0;
				var t2 = 0;
				var t3 = 0;
				var points = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points;
				var fromX = points[points.length - 2];
				var fromY = points[points.length - 1];
				var px = 0;
				var py = 0;
				var tmp = 0;
				var _g3 = 1;
				var _g2 = n + 1;
				while(_g3 < _g2) {
					var i = _g3++;
					tmp = i / n;
					dt = 1 - tmp;
					dt2 = dt * dt;
					dt3 = dt2 * dt;
					t2 = tmp * tmp;
					t3 = t2 * tmp;
					px = dt3 * fromX + 3 * dt2 * tmp * cx + 3 * dt * t2 * cx2 + t3 * x;
					py = dt3 * fromY + 3 * dt2 * tmp * cy + 3 * dt * t2 * cy2 + t3 * y;
					points.push(px);
					points.push(py);
				}
				break;
			case 3:
				var y1 = command[5];
				var x1 = command[4];
				var cy1 = command[3];
				var cx1 = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.moveTo(0,0);
				var xa = 0;
				var ya = 0;
				var n1 = 20;
				var points1 = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points;
				var fromX1 = points1[points1.length - 2];
				var fromY1 = points1[points1.length - 1];
				var px1 = 0;
				var py1 = 0;
				var tmp1 = 0;
				var _g31 = 1;
				var _g21 = n1 + 1;
				while(_g31 < _g21) {
					var i1 = _g31++;
					tmp1 = i1 / n1;
					xa = fromX1 + (cx1 - fromX1) * tmp1;
					ya = fromY1 + (cy1 - fromY1) * tmp1;
					px1 = xa + (cx1 + (x1 - cx1) * tmp1 - xa) * tmp1;
					py1 = ya + (cy1 + (y1 - cy1) * tmp1 - ya) * tmp1;
					points1.push(px1);
					points1.push(py1);
				}
				break;
			case 4:
				var radius = command[4];
				var y2 = command[3];
				var x2 = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Circle;
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [x2,y2,radius];
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 5:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Ellipse;
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [x3,y3,width,height];
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 6:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Rectangle(false);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [x4,y4,width1,height1];
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 7:
				var ry = command[7];
				var rx = command[6];
				var height2 = command[5];
				var width2 = command[4];
				var y5 = command[3];
				var x5 = command[2];
				if(ry == -1) ry = rx;
				rx *= 0.5;
				ry *= 0.5;
				if(rx > width2 / 2) rx = width2 / 2;
				if(ry > height2 / 2) ry = height2 / 2;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Rectangle(true);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [x5,y5,width2,height2,rx,ry];
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 10:
				openfl._internal.renderer.opengl.utils.PathBuiler.endFill();
				break;
			case 11:
				var miterLimit = command[9];
				var joints = command[8];
				var caps = command[7];
				var scaleMode = command[6];
				var pixelHinting = command[5];
				var alpha1 = command[4];
				var color = command[3];
				var thickness = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.__line = new openfl._internal.renderer.opengl.utils.LineStyle();
				if(thickness == null || thickness == Math.NaN || thickness < 0) openfl._internal.renderer.opengl.utils.PathBuiler.__line.width = 0; else if(thickness == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__line.width = 1; else openfl._internal.renderer.opengl.utils.PathBuiler.__line.width = thickness;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.color = color;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.alpha = alpha1;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.scaleMode = scaleMode;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.caps = caps;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.joints = joints;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.miterLimit = miterLimit;
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [];
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 12:
				var y6 = command[3];
				var x6 = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(x6);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(y6);
				break;
			case 13:
				var y7 = command[3];
				var x7 = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.moveTo(x7,y7);
				break;
			case 9:
				var blendMode = command[7];
				var colors = command[6];
				var culling = command[5];
				var uvtData = command[4];
				var indices = command[3];
				var vertices = command[2];
				var isColor;
				{
					var _g22 = openfl._internal.renderer.opengl.utils.PathBuiler.__fill;
					switch(_g22[1]) {
					case 1:
						isColor = true;
						break;
					default:
						isColor = false;
					}
				}
				if(isColor && uvtData != null) continue;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				if(uvtData == null) {
					var this1;
					this1 = new openfl.VectorData();
					var this2;
					this2 = new Array(0);
					this1.data = this2;
					this1.length = 0;
					this1.fixed = false;
					uvtData = this1;
					{
						var _g23 = openfl._internal.renderer.opengl.utils.PathBuiler.__fill;
						switch(_g23[1]) {
						case 2:
							var b = _g23[2];
							var _g4 = 0;
							var _g32 = vertices.length / 2 | 0;
							while(_g4 < _g32) {
								var i2 = _g4++;
								if(!uvtData.fixed) {
									uvtData.length++;
									if(uvtData.data.length < uvtData.length) {
										var data;
										var this3;
										this3 = new Array(uvtData.data.length + 10);
										data = this3;
										haxe.ds._Vector.Vector_Impl_.blit(uvtData.data,0,data,0,uvtData.data.length);
										uvtData.data = data;
									}
									uvtData.data[uvtData.length - 1] = vertices.data[i2 * 2] / b.width;
								}
								uvtData.length;
								if(!uvtData.fixed) {
									uvtData.length++;
									if(uvtData.data.length < uvtData.length) {
										var data1;
										var this4;
										this4 = new Array(uvtData.data.length + 10);
										data1 = this4;
										haxe.ds._Vector.Vector_Impl_.blit(uvtData.data,0,data1,0,uvtData.data.length);
										uvtData.data = data1;
									}
									uvtData.data[uvtData.length - 1] = vertices.data[i2 * 2 + 1] / b.height;
								}
								uvtData.length;
							}
							break;
						default:
						}
					}
				}
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.DrawTriangles(vertices,indices,uvtData,culling,colors,blendMode);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable = false;
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 8:
				var count = command[6];
				var flags = command[5];
				var smooth1 = command[4];
				var tileData = command[3];
				var sheet = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex++;
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.DrawTiles(sheet,tileData,smooth1,flags,count);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable = false;
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			}
		}
		openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
	}
	graphics.__drawPaths = openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths;
	return glStack;
};
openfl._internal.renderer.opengl.utils.LineStyle = function() {
	this.width = 0;
	this.color = 0;
	this.alpha = 1;
	this.scaleMode = openfl.display.LineScaleMode.NORMAL;
	this.caps = openfl.display.CapsStyle.ROUND;
	this.joints = openfl.display.JointStyle.ROUND;
	this.miterLimit = 3;
};
$hxClasses["openfl._internal.renderer.opengl.utils.LineStyle"] = openfl._internal.renderer.opengl.utils.LineStyle;
openfl._internal.renderer.opengl.utils.LineStyle.__name__ = ["openfl","_internal","renderer","opengl","utils","LineStyle"];
openfl._internal.renderer.opengl.utils.LineStyle.prototype = {
	__class__: openfl._internal.renderer.opengl.utils.LineStyle
};
openfl._internal.renderer.opengl.utils.FillType = $hxClasses["openfl._internal.renderer.opengl.utils.FillType"] = { __ename__ : true, __constructs__ : ["None","Color","Texture","Gradient"] };
openfl._internal.renderer.opengl.utils.FillType.None = ["None",0];
openfl._internal.renderer.opengl.utils.FillType.None.toString = $estr;
openfl._internal.renderer.opengl.utils.FillType.None.__enum__ = openfl._internal.renderer.opengl.utils.FillType;
openfl._internal.renderer.opengl.utils.FillType.Color = function(color,alpha) { var $x = ["Color",1,color,alpha]; $x.__enum__ = openfl._internal.renderer.opengl.utils.FillType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils.FillType.Texture = function(bitmap,matrix,repeat,smooth) { var $x = ["Texture",2,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl._internal.renderer.opengl.utils.FillType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils.FillType.Gradient = ["Gradient",3];
openfl._internal.renderer.opengl.utils.FillType.Gradient.toString = $estr;
openfl._internal.renderer.opengl.utils.FillType.Gradient.__enum__ = openfl._internal.renderer.opengl.utils.FillType;
openfl._internal.renderer.opengl.utils.FilterManager = function(gl,transparent) {
	this.transparent = transparent;
	this.filterStack = [];
	this.offsetX = 0;
	this.offsetY = 0;
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.FilterManager"] = openfl._internal.renderer.opengl.utils.FilterManager;
openfl._internal.renderer.opengl.utils.FilterManager.__name__ = ["openfl","_internal","renderer","opengl","utils","FilterManager"];
openfl._internal.renderer.opengl.utils.FilterManager.prototype = {
	applyFilterPass: function(filter,filterArea,width,height) {
		var gl = this.gl;
		var shader = filter.shaders[openfl._internal.renderer.opengl.GLRenderer.glContextId];
		if(shader == null) {
			shader = new openfl._internal.renderer.opengl.shaders.DefaultShader(gl);
			shader.fragmentSrc = filter.fragmentSrc;
			shader.uniforms = filter.uniforms;
			shader.init();
			filter.shaders[openfl._internal.renderer.opengl.GLRenderer.glContextId] = shader;
		}
		this.renderSession.shaderManager.setShader(shader);
		gl.uniform2f(shader.projectionVector,width / 2,-height / 2);
		gl.uniform2f(shader.offsetVector,0,0);
		if(filter.uniforms.dimensions != null) {
			filter.uniforms.dimensions.value[0] = this.width + 0.0;
			filter.uniforms.dimensions.value[1] = this.height + 0.0;
			filter.uniforms.dimensions.value[2] = this.vertexArray[0];
			filter.uniforms.dimensions.value[3] = this.vertexArray[5];
		}
		shader.syncUniforms();
		gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
		gl.vertexAttribPointer(shader.aVertexPosition,2,gl.FLOAT,false,0,0);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);
		gl.vertexAttribPointer(shader.aTextureCoord,2,gl.FLOAT,false,0,0);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer);
		gl.vertexAttribPointer(shader.colorAttribute,2,gl.FLOAT,false,0,0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);
		this.renderSession.drawCount++;
	}
	,begin: function(renderSession,buffer) {
		this.renderSession = renderSession;
		this.defaultShader = renderSession.shaderManager.defaultShader;
		var projection = renderSession.projection;
		this.width = projection.x * 2 | 0;
		this.height = -projection.y * 2 | 0;
		this.buffer = buffer;
	}
	,destroy: function() {
		var gl = this.gl;
		this.filterStack = null;
		this.offsetX = 0;
		this.offsetY = 0;
		var _g = 0;
		var _g1 = this.texturePool;
		while(_g < _g1.length) {
			var texture = _g1[_g];
			++_g;
			texture.destroy();
		}
		this.texturePool = null;
		gl.deleteBuffer(this.vertexBuffer);
		gl.deleteBuffer(this.uvBuffer);
		gl.deleteBuffer(this.colorBuffer);
		gl.deleteBuffer(this.indexBuffer);
	}
	,initShaderBuffers: function() {
		var gl = this.gl;
		this.vertexBuffer = gl.createBuffer();
		this.uvBuffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		this.indexBuffer = gl.createBuffer();
		this.vertexArray = new Float32Array([0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.vertexArray,gl.STATIC_DRAW);
		this.uvArray = new Float32Array([0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.uvArray,gl.STATIC_DRAW);
		this.colorArray = new Float32Array([1.0,16777215,1.0,16777215,1.0,16777215,1.0,16777215]);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.colorArray,gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),gl.STATIC_DRAW);
	}
	,popFilter: function() {
		var gl = this.gl;
		var filterBlock = this.filterStack.pop();
		var filterArea = filterBlock._filterArea;
		var texture = filterBlock._glFilterTexture;
		var projection = this.renderSession.projection;
		var offset = this.renderSession.offset;
		if(filterBlock.filterPasses.length > 1) {
			gl.viewport(0,0,filterArea.width | 0,filterArea.height | 0);
			gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
			this.vertexArray[0] = 0;
			this.vertexArray[1] = filterArea.height;
			this.vertexArray[2] = filterArea.width;
			this.vertexArray[3] = filterArea.height;
			this.vertexArray[4] = 0;
			this.vertexArray[5] = 0;
			this.vertexArray[6] = filterArea.width;
			this.vertexArray[7] = 0;
			gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertexArray);
			gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);
			this.uvArray[2] = filterArea.width / this.width;
			this.uvArray[5] = filterArea.height / this.height;
			this.uvArray[6] = filterArea.width / this.width;
			this.uvArray[7] = filterArea.height / this.height;
			gl.bufferSubData(gl.ARRAY_BUFFER,0,this.uvArray);
			var inputTexture = texture;
			var outputTexture = this.texturePool.pop();
			if(outputTexture == null) outputTexture = new openfl._internal.renderer.opengl.utils.FilterTexture(gl,this.width,this.height);
			outputTexture.resize(this.width,this.height);
			gl.bindFramebuffer(gl.FRAMEBUFFER,outputTexture.frameBuffer);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.disable(gl.BLEND);
			var _g1 = 0;
			var _g = filterBlock.filterPasses.length - 1 | 0;
			while(_g1 < _g) {
				var i = _g1++;
				var filterPass = filterBlock.filterPasses[i];
				gl.bindFramebuffer(gl.FRAMEBUFFER,outputTexture.frameBuffer);
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D,inputTexture.texture);
				this.applyFilterPass(filterPass,filterArea,filterArea.width | 0,filterArea.height | 0);
				var temp = inputTexture;
				inputTexture = outputTexture;
				outputTexture = temp;
			}
			gl.enable(gl.BLEND);
			texture = inputTexture;
			this.texturePool.push(outputTexture);
		}
		var filter = filterBlock.filterPasses[filterBlock.filterPasses.length - 1 | 0];
		this.offsetX -= filterArea.x;
		this.offsetY -= filterArea.y;
		var sizeX = this.width;
		var sizeY = this.height;
		var offsetX = 0.0;
		var offsetY = 0.0;
		var buffer = this.buffer;
		if(this.filterStack.length == 0) gl.colorMask(true,true,true,true); else {
			var currentFilter = this.filterStack[this.filterStack.length - 1];
			filterArea = currentFilter._filterArea;
			sizeX = filterArea.width | 0;
			sizeY = filterArea.height | 0;
			offsetX = filterArea.x;
			offsetY = filterArea.y;
			buffer = currentFilter._glFilterTexture.frameBuffer;
		}
		projection.x = sizeX / 2;
		projection.y = -sizeY / 2;
		offset.x = offsetX;
		offset.y = offsetY;
		filterArea = filterBlock._filterArea;
		var x = filterArea.x - offsetX;
		var y = filterArea.y - offsetY;
		gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
		this.vertexArray[0] = x;
		this.vertexArray[1] = y + filterArea.height;
		this.vertexArray[2] = x + filterArea.width;
		this.vertexArray[3] = y + filterArea.height;
		this.vertexArray[4] = x;
		this.vertexArray[5] = y;
		this.vertexArray[6] = x + filterArea.width;
		this.vertexArray[7] = y;
		gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertexArray);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);
		this.uvArray[2] = filterArea.width / this.width;
		this.uvArray[5] = filterArea.height / this.height;
		this.uvArray[6] = filterArea.width / this.width;
		this.uvArray[7] = filterArea.height / this.height;
		gl.bufferSubData(gl.ARRAY_BUFFER,0,this.uvArray);
		gl.viewport(0,0,sizeX,sizeY);
		gl.bindFramebuffer(gl.FRAMEBUFFER,buffer);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D,texture.texture);
		this.applyFilterPass(filter,filterArea,sizeX,sizeY);
		this.renderSession.shaderManager.setShader(this.defaultShader);
		gl.uniform2f(this.defaultShader.projectionVector,sizeX / 2,-sizeY / 2);
		gl.uniform2f(this.defaultShader.offsetVector,-offsetX,-offsetY);
		this.texturePool.push(texture);
		filterBlock._glFilterTexture = null;
	}
	,pushFilter: function(filterBlock) {
		var gl = this.gl;
		var projection = this.renderSession.projection;
		var offset = this.renderSession.offset;
		if(filterBlock.target.filterArea != null) filterBlock._filterArea = filterBlock.target.filterArea; else filterBlock._filterArea = filterBlock.target.getBounds();
		this.filterStack.push(filterBlock);
		var filter = filterBlock.filterPasses[0];
		this.offsetX += filterBlock._filterArea.x;
		this.offsetY += filterBlock._filterArea.y;
		var texture = this.texturePool.pop();
		if(texture == null) texture = new openfl._internal.renderer.opengl.utils.FilterTexture(gl,this.width,this.height); else texture.resize(this.width,this.height);
		gl.bindTexture(gl.TEXTURE_2D,texture.texture);
		var filterArea = filterBlock._filterArea;
		var padding = filter.padding;
		filterArea.x -= padding;
		filterArea.y -= padding;
		filterArea.width += padding * 2;
		filterArea.height += padding * 2;
		if(filterArea.x < 0) filterArea.x = 0;
		if(filterArea.width > this.width) filterArea.width = this.width;
		if(filterArea.y < 0) filterArea.y = 0;
		if(filterArea.height > this.height) filterArea.height = this.height;
		gl.bindFramebuffer(gl.FRAMEBUFFER,texture.frameBuffer);
		gl.viewport(0,0,filterArea.width | 0,filterArea.height | 0);
		projection.x = filterArea.width / 2;
		projection.y = -filterArea.height / 2;
		offset.x = -filterArea.x;
		offset.y = -filterArea.y;
		this.renderSession.shaderManager.setShader(this.defaultShader);
		gl.uniform2f(this.defaultShader.projectionVector,filterArea.width / 2,-filterArea.height / 2);
		gl.uniform2f(this.defaultShader.offsetVector,-filterArea.x,-filterArea.y);
		gl.colorMask(true,true,true,true);
		gl.clearColor(0,0,0,0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		filterBlock._glFilterTexture = texture;
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.texturePool = [];
		this.initShaderBuffers();
	}
	,__class__: openfl._internal.renderer.opengl.utils.FilterManager
};
openfl._internal.renderer.opengl.utils.FilterTexture = function(gl,width,height,smoothing) {
	if(smoothing == null) smoothing = true;
	this.gl = gl;
	this.frameBuffer = gl.createFramebuffer();
	this.texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D,this.texture);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,smoothing?gl.LINEAR:gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,smoothing?gl.LINEAR:gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	gl.bindFramebuffer(gl.FRAMEBUFFER,this.frameBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.texture,0);
	this.renderBuffer = gl.createRenderbuffer();
	gl.bindRenderbuffer(gl.RENDERBUFFER,this.renderBuffer);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_STENCIL_ATTACHMENT,gl.RENDERBUFFER,this.renderBuffer);
	this.resize(width,height);
};
$hxClasses["openfl._internal.renderer.opengl.utils.FilterTexture"] = openfl._internal.renderer.opengl.utils.FilterTexture;
openfl._internal.renderer.opengl.utils.FilterTexture.__name__ = ["openfl","_internal","renderer","opengl","utils","FilterTexture"];
openfl._internal.renderer.opengl.utils.FilterTexture.prototype = {
	clear: function() {
		var gl = this.gl;
		gl.clearColor(0,0,0,0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	,destroy: function() {
		var gl = this.gl;
		gl.deleteFramebuffer(this.frameBuffer);
		gl.deleteTexture(this.texture);
		this.frameBuffer = null;
		this.texture = null;
	}
	,resize: function(width,height) {
		if(this.width == width && this.height == height) return;
		this.width = width;
		this.height = height;
		var gl = this.gl;
		gl.bindTexture(gl.TEXTURE_2D,this.texture);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
		gl.bindRenderbuffer(gl.RENDERBUFFER,this.renderBuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_STENCIL,width,height);
	}
	,__class__: openfl._internal.renderer.opengl.utils.FilterTexture
};
openfl.geom.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["openfl.geom.Rectangle"] = openfl.geom.Rectangle;
openfl.geom.Rectangle.__name__ = ["openfl","geom","Rectangle"];
openfl.geom.Rectangle.prototype = {
	clone: function() {
		return new openfl.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(x,y) {
		return x >= this.x && y >= this.y && x < this.get_right() && y < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,equals: function(toCompare) {
		return toCompare != null && this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,intersection: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return new openfl.geom.Rectangle();
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		if(y1 <= y0) return new openfl.geom.Rectangle();
		return new openfl.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,intersects: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return false;
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		return y1 > y0;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,setTo: function(xa,ya,widtha,heighta) {
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new openfl.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,union: function(toUnion) {
		if(this.width == 0 || this.height == 0) return toUnion.clone(); else if(toUnion.width == 0 || toUnion.height == 0) return this.clone();
		var x0;
		if(this.x > toUnion.x) x0 = toUnion.x; else x0 = this.x;
		var x1;
		if(this.get_right() < toUnion.get_right()) x1 = toUnion.get_right(); else x1 = this.get_right();
		var y0;
		if(this.y > toUnion.y) y0 = toUnion.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() < toUnion.get_bottom()) y1 = toUnion.get_bottom(); else y1 = this.get_bottom();
		return new openfl.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,__contract: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) return;
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x < x) this.x = x;
		if(this.y < y) this.y = y;
		if(this.get_right() > x + width) this.width = x + width - this.x;
		if(this.get_bottom() > y + height) this.height = y + height - this.y;
	}
	,__expand: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return;
		}
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x > x) {
			this.x = x;
			this.width = cacheRight - x;
		}
		if(this.y > y) {
			this.y = y;
			this.height = cacheBottom - y;
		}
		if(cacheRight < x + width) this.width = x + width - this.x;
		if(cacheBottom < y + height) this.height = y + height - this.y;
	}
	,__toLimeRectangle: function() {
		return new lime.math.Rectangle(this.x,this.y,this.width,this.height);
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottomRight: function() {
		return new openfl.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_size: function() {
		return new openfl.geom.Point(this.width,this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_topLeft: function() {
		return new openfl.geom.Point(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,__class__: openfl.geom.Rectangle
	,__properties__: {set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_top:"set_top",get_top:"get_top",set_size:"set_size",get_size:"get_size",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_bottom:"set_bottom",get_bottom:"get_bottom"}
};
openfl.geom.Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["openfl.geom.Point"] = openfl.geom.Point;
openfl.geom.Point.__name__ = ["openfl","geom","Point"];
openfl.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
};
openfl.geom.Point.interpolate = function(pt1,pt2,f) {
	return new openfl.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
};
openfl.geom.Point.polar = function(len,angle) {
	return new openfl.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
};
openfl.geom.Point.prototype = {
	add: function(v) {
		return new openfl.geom.Point(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new openfl.geom.Point(this.x,this.y);
	}
	,copyFrom: function(sourcePoint) {
		this.x = sourcePoint.x;
		this.y = sourcePoint.y;
	}
	,equals: function(toCompare) {
		return toCompare != null && toCompare.x == this.x && toCompare.y == this.y;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,subtract: function(v) {
		return new openfl.geom.Point(this.x - v.x,this.y - v.y);
	}
	,toString: function() {
		return "(x=" + this.x + ", y=" + this.y + ")";
	}
	,__toLimeVector2: function() {
		return new lime.math.Vector2(this.x,this.y);
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: openfl.geom.Point
	,__properties__: {get_length:"get_length"}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.GraphicsRenderer"] = openfl._internal.renderer.opengl.utils.GraphicsRenderer;
openfl._internal.renderer.opengl.utils.GraphicsRenderer.__name__ = ["openfl","_internal","renderer","opengl","utils","GraphicsRenderer"];
openfl._internal.renderer.opengl.utils.GraphicsRenderer.lastVertsBuffer = null;
openfl._internal.renderer.opengl.utils.GraphicsRenderer.lastBucketMode = null;
openfl._internal.renderer.opengl.utils.GraphicsRenderer.lastTexture = null;
openfl._internal.renderer.opengl.utils.GraphicsRenderer.lastTextureRepeat = null;
openfl._internal.renderer.opengl.utils.GraphicsRenderer.lastTextureSmooth = null;
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildCircle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height;
	if(rectData.length == 3) height = width; else height = rectData[3];
	if(path.type == openfl._internal.renderer.opengl.utils.GraphicType.Ellipse) {
		width /= 2;
		height /= 2;
		x += width;
		y += height;
	}
	if(localCoords) {
		x -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
		y -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
	}
	var totalSegs = 40;
	var seg = Math.PI * 2 / totalSegs;
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	if(bucket != null) {
		var verts = bucket.verts;
		var indices = bucket.indices;
		var vertPos = verts.length / 2 | 0;
		indices.push(vertPos);
		var _g1 = 0;
		var _g = totalSegs + 1;
		while(_g1 < _g) {
			var i = _g1++;
			verts.push(x);
			verts.push(y);
			verts.push(x + Math.sin(seg * i) * width);
			verts.push(y + Math.cos(seg * i) * height);
			indices.push(vertPos++);
			indices.push(vertPos++);
		}
		indices.push(vertPos - 1);
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = [];
		var _g11 = 0;
		var _g2 = totalSegs + 1;
		while(_g11 < _g2) {
			var i1 = _g11++;
			path.points.push(x + Math.sin(seg * i1) * width);
			path.points.push(y + Math.cos(seg * i1) * height);
		}
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine(path,bucket.line);
		path.points = tempPoints;
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildComplexPoly = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	if(path.points.length < 6) return;
	var points = path.points.slice();
	if(localCoords) {
		var _g1 = 0;
		var _g = points.length / 2 | 0;
		while(_g1 < _g) {
			var i = _g1++;
			points[i * 2] -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			points[i * 2 + 1] -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
		}
	}
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	bucket.drawMode = glStack.gl.TRIANGLE_FAN;
	bucket.verts = points;
	var indices = bucket.indices;
	var length = points.length / 2 | 0;
	var _g2 = 0;
	while(_g2 < length) {
		var i1 = _g2++;
		indices.push(i1);
	}
	if(path.line.width > 0) openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine(path,bucket.line,localCoords);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine = function(path,bucket,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points;
	if(points.length == 0) return;
	if(localCoords) {
		var _g1 = 0;
		var _g = points.length / 2 | 0;
		while(_g1 < _g) {
			var i = _g1++;
			points[i * 2] -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			points[i * 2 + 1] -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
		}
	}
	if(path.line.width % 2 > 0) {
		var _g11 = 0;
		var _g2 = points.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			points[i1] += 0.5;
		}
	}
	var firstPoint = new openfl.geom.Point(points[0],points[1]);
	var lastPoint = new openfl.geom.Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
	if(firstPoint.x == lastPoint.x && firstPoint.y == lastPoint.y) {
		points = points.slice();
		points.pop();
		points.pop();
		lastPoint = new openfl.geom.Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
		var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5;
		var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5;
		points.unshift(midPointY);
		points.unshift(midPointX);
		points.push(midPointX);
		points.push(midPointY);
	}
	var verts = bucket.verts;
	var indices = bucket.indices;
	var length = points.length / 2 | 0;
	var indexCount = points.length;
	var indexStart = verts.length / 6 | 0;
	var width = path.line.width / 2;
	var color = openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgb(path.line.color);
	var alpha = path.line.alpha;
	var r = color[0] * alpha;
	var g = color[1] * alpha;
	var b = color[2] * alpha;
	var px;
	var py;
	var p1x;
	var p1y;
	var p2x;
	var p2y;
	var p3x;
	var p3y;
	var perpx;
	var perpy;
	var perp2x;
	var perp2y;
	var perp3x;
	var perp3y;
	var a1;
	var b1;
	var c1;
	var a2;
	var b2;
	var c2;
	var denom;
	var pdist;
	var dist;
	p1x = points[0];
	p1y = points[1];
	p2x = points[2];
	p2y = points[3];
	perpx = -(p1y - p2y);
	perpy = p1x - p2x;
	dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
	perpx = perpx / dist;
	perpy = perpy / dist;
	perpx = perpx * width;
	perpy = perpy * width;
	verts.push(p1x - perpx);
	verts.push(p1y - perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	verts.push(p1x + perpx);
	verts.push(p1y + perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	var _g12 = 1;
	var _g3 = length - 1;
	while(_g12 < _g3) {
		var i2 = _g12++;
		p1x = points[(i2 - 1) * 2];
		p1y = points[(i2 - 1) * 2 + 1];
		p2x = points[i2 * 2];
		p2y = points[i2 * 2 + 1];
		p3x = points[(i2 + 1) * 2];
		p3y = points[(i2 + 1) * 2 + 1];
		perpx = -(p1y - p2y);
		perpy = p1x - p2x;
		dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
		perpx = perpx / dist;
		perpy = perpy / dist;
		perpx = perpx * width;
		perpy = perpy * width;
		perp2x = -(p2y - p3y);
		perp2y = p2x - p3x;
		dist = Math.sqrt(Math.abs(perp2x * perp2x + perp2y * perp2y));
		perp2x = perp2x / dist;
		perp2y = perp2y / dist;
		perp2x = perp2x * width;
		perp2y = perp2y * width;
		a1 = -perpy + p1y - (-perpy + p2y);
		b1 = -perpx + p2x - (-perpx + p1x);
		c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
		a2 = -perp2y + p3y - (-perp2y + p2y);
		b2 = -perp2x + p2x - (-perp2x + p3x);
		c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
		denom = a1 * b2 - a2 * b1;
		if(Math.abs(denom) < 0.1) {
			denom += 10.1;
			verts.push(p2x - perpx);
			verts.push(p2y - perpy);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x + perpx);
			verts.push(p2y + perpy);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			continue;
		}
		px = (b1 * c2 - b2 * c1) / denom;
		py = (a2 * c1 - a1 * c2) / denom;
		pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
		if(pdist > 19600) {
			perp3x = perpx - perp2x;
			perp3y = perpy - perp2y;
			dist = Math.sqrt(Math.abs(perp3x * perp3x + perp3y * perp3y));
			perp3x = perp3x / dist;
			perp3y = perp3y / dist;
			perp3x = perp3x * width;
			perp3y = perp3y * width;
			verts.push(p2x - perp3x);
			verts.push(p2y - perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x + perp3x);
			verts.push(p2y + perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x - perp3x);
			verts.push(p2y - perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			indexCount++;
		} else {
			verts.push(px);
			verts.push(py);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x - (px - p2x));
			verts.push(p2y - (py - p2y));
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
		}
	}
	p1x = points[(length - 2) * 2];
	p1y = points[(length - 2) * 2 + 1];
	p2x = points[(length - 1) * 2];
	p2y = points[(length - 1) * 2 + 1];
	perpx = -(p1y - p2y);
	perpy = p1x - p2x;
	dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
	if(!Math.isFinite(dist)) haxe.Log.trace(perpx * perpx + perpy * perpy,{ fileName : "GraphicsRenderer.hx", lineNumber : 372, className : "openfl._internal.renderer.opengl.utils.GraphicsRenderer", methodName : "buildLine"});
	perpx = perpx / dist;
	perpy = perpy / dist;
	perpx = perpx * width;
	perpy = perpy * width;
	verts.push(p2x - perpx);
	verts.push(p2y - perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	verts.push(p2x + perpx);
	verts.push(p2y + perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	indices.push(indexStart);
	var _g4 = 0;
	while(_g4 < indexCount) {
		var i3 = _g4++;
		indices.push(indexStart++);
	}
	indices.push(indexStart - 1);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildPoly = function(path,glStack) {
	if(path.points.length < 6) return;
	var points = path.points;
	var l = points.length;
	var sx = points[0];
	var sy = points[1];
	var ex = points[l - 2];
	var ey = points[l - 1];
	if(sx != ex || sy != ey) {
		points.push(sx);
		points.push(sy);
	}
	var length = points.length / 2 | 0;
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	var verts = bucket.verts;
	var indices = bucket.indices;
	if(bucket != null) {
		var triangles = openfl._internal.renderer.opengl.utils.PolyK.triangulate(points);
		var vertPos = verts.length / 2;
		var i = 0;
		while(i < triangles.length) {
			indices.push(triangles[i] + vertPos | 0);
			indices.push(triangles[i] + vertPos | 0);
			indices.push(triangles[i + 1] + vertPos | 0);
			indices.push(triangles[i + 2] + vertPos | 0);
			indices.push(triangles[i + 2] + vertPos | 0);
			i += 3;
		}
		var _g = 0;
		while(_g < length) {
			var i1 = _g++;
			verts.push(points[i1 * 2]);
			verts.push(points[i1 * 2 + 1]);
		}
	}
	if(path.line.width > 0) openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine(path,bucket.line);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	if(localCoords) {
		x -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
		y -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
	}
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	if(bucket != null) {
		var verts = bucket.verts;
		var indices = bucket.indices;
		var vertPos = verts.length / 2 | 0;
		verts.push(x);
		verts.push(y);
		verts.push(x + width);
		verts.push(y);
		verts.push(x);
		verts.push(y + height);
		verts.push(x + width);
		verts.push(y + height);
		indices.push(vertPos);
		indices.push(vertPos);
		indices.push(vertPos + 1);
		indices.push(vertPos + 2);
		indices.push(vertPos + 3);
		indices.push(vertPos + 3);
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = [x,y,x + width,y,x + width,y + height,x,y + height,x,y];
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine(path,bucket.line);
		path.points = tempPoints;
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildRoundedRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points.slice();
	var x = points[0];
	var y = points[1];
	var width = points[2];
	var height = points[3];
	var radius = points[4];
	if(localCoords) {
		x -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
		y -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
	}
	var recPoints = [];
	recPoints.push(x);
	recPoints.push(y + radius);
	recPoints = recPoints.concat(openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve(x,y + height - radius,x,y + height,x + radius,y + height));
	recPoints = recPoints.concat(openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve(x + width - radius,y + height,x + width,y + height,x + width,y + height - radius));
	recPoints = recPoints.concat(openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve(x + width,y + radius,x + width,y,x + width - radius,y));
	recPoints = recPoints.concat(openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve(x + radius,y,x,y,x,y + radius));
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	if(bucket != null) {
		var verts = bucket.verts;
		var indices = bucket.indices;
		var vecPos = verts.length / 2;
		var triangles = openfl._internal.renderer.opengl.utils.PolyK.triangulate(recPoints);
		var i = 0;
		while(i < triangles.length) {
			indices.push(triangles[i] + vecPos | 0);
			indices.push(triangles[i] + vecPos | 0);
			indices.push(triangles[i + 1] + vecPos | 0);
			indices.push(triangles[i + 2] + vecPos | 0);
			indices.push(triangles[i + 2] + vecPos | 0);
			i += 3;
		}
		i = 0;
		while(i < recPoints.length) {
			verts.push(recPoints[i]);
			verts.push(recPoints[++i]);
			i++;
		}
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = recPoints;
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine(path,bucket.line);
		path.points = tempPoints;
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildDrawTriangles = function(path,object,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var args = path.type.slice(2);
	var vertices = args[0];
	var indices = args[1];
	var uvtData = args[2];
	var culling = args[3];
	var colors = args[4];
	var blendMode = args[5];
	var a;
	var b;
	var c;
	var d;
	var tx;
	var ty;
	if(localCoords) {
		a = 1.0;
		b = 0.0;
		c = 0.0;
		d = 1.0;
		tx = 0.0;
		ty = 0.0;
	} else {
		a = object.__worldTransform.a;
		b = object.__worldTransform.b;
		c = object.__worldTransform.c;
		d = object.__worldTransform.d;
		tx = object.__worldTransform.tx;
		ty = object.__worldTransform.ty;
	}
	var hasColors = colors != null && colors.length > 0;
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	bucket.rawVerts = true;
	bucket.glLength = indices.length;
	bucket.stride = 8;
	var vertsLength = bucket.glLength * bucket.stride;
	var verts;
	if(bucket.glVerts == null || bucket.glVerts.length < vertsLength) {
		verts = new Float32Array(vertsLength);
		bucket.glVerts = verts;
	} else verts = bucket.glVerts;
	var v0 = 0;
	var v1 = 0;
	var v2 = 0;
	var i0 = 0;
	var i1 = 0;
	var i2 = 0;
	var x0 = 0.0;
	var y0 = 0.0;
	var x1 = 0.0;
	var y1 = 0.0;
	var x2 = 0.0;
	var y2 = 0.0;
	var idx = 0;
	var color = [1.,1.,1.,1.];
	var ctmp = color;
	var _g1 = 0;
	var _g = indices.length / 3 | 0;
	while(_g1 < _g) {
		var i = _g1++;
		i0 = indices.data[i * 3];
		i1 = indices.data[i * 3 + 1];
		i2 = indices.data[i * 3 + 2];
		v0 = i0 * 2;
		v1 = i1 * 2;
		v2 = i2 * 2;
		x0 = vertices.data[v0];
		y0 = vertices.data[v0 + 1];
		x1 = vertices.data[v1];
		y1 = vertices.data[v1 + 1];
		x2 = vertices.data[v2];
		y2 = vertices.data[v2 + 1];
		if(localCoords) {
			x0 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			y0 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
			x1 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			y1 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
			x2 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			y2 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
		}
		switch(culling[1]) {
		case 2:
			if(!((x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0) < 0)) continue;
			break;
		case 0:
			if((x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0) < 0) continue;
			break;
		default:
		}
		verts[idx++] = a * x0 + c * y0 + tx;
		verts[idx++] = b * x0 + d * y0 + ty;
		verts[idx++] = uvtData.data[v0];
		verts[idx++] = uvtData.data[v0 + 1];
		if(hasColors) {
			ctmp = openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgba(colors.data[i0]);
			verts[idx++] = ctmp[0];
			verts[idx++] = ctmp[1];
			verts[idx++] = ctmp[2];
			verts[idx++] = ctmp[3];
		} else {
			verts[idx++] = color[0];
			verts[idx++] = color[1];
			verts[idx++] = color[2];
			verts[idx++] = color[3];
		}
		verts[idx++] = a * x1 + c * y1 + tx;
		verts[idx++] = b * x1 + d * y1 + ty;
		verts[idx++] = uvtData.data[v1];
		verts[idx++] = uvtData.data[v1 + 1];
		if(hasColors) {
			ctmp = openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgba(colors.data[i1]);
			verts[idx++] = ctmp[0];
			verts[idx++] = ctmp[1];
			verts[idx++] = ctmp[2];
			verts[idx++] = ctmp[3];
		} else {
			verts[idx++] = color[0];
			verts[idx++] = color[1];
			verts[idx++] = color[2];
			verts[idx++] = color[3];
		}
		verts[idx++] = a * x2 + c * y2 + tx;
		verts[idx++] = b * x2 + d * y2 + ty;
		verts[idx++] = uvtData.data[v2];
		verts[idx++] = uvtData.data[v2 + 1];
		if(hasColors) {
			ctmp = openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgba(colors.data[i2]);
			verts[idx++] = ctmp[0];
			verts[idx++] = ctmp[1];
			verts[idx++] = ctmp[2];
			verts[idx++] = ctmp[3];
		} else {
			verts[idx++] = color[0];
			verts[idx++] = color[1];
			verts[idx++] = color[2];
			verts[idx++] = color[3];
		}
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildDrawTiles = function(path,glStack) {
	openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve = function(fromX,fromY,cpX,cpY,toX,toY) {
	var xa;
	var ya;
	var xb;
	var yb;
	var x;
	var y;
	var n = 20;
	var points = [];
	var getPt = function(n1,n2,perc) {
		var diff = n2 - n1;
		return n1 + diff * perc;
	};
	var j = 0.0;
	var _g1 = 0;
	var _g = n + 1;
	while(_g1 < _g) {
		var i = _g1++;
		j = i / n;
		xa = getPt(fromX,cpX,j);
		ya = getPt(fromY,cpY,j);
		xb = getPt(cpX,toX,j);
		yb = getPt(cpY,toY,j);
		x = getPt(xa,xb,j);
		y = getPt(ya,yb,j);
		points.push(x);
		points.push(y);
	}
	return points;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.render = function(object,renderSession) {
	var graphics = object.__graphics;
	var spritebatch = renderSession.spriteBatch;
	var dirty = graphics.__dirty;
	if(graphics.__commands.length <= 0) return;
	if(dirty) openfl._internal.renderer.opengl.utils.GraphicsRenderer.updateGraphics(object,renderSession.gl,object.cacheAsBitmap);
	if(object.cacheAsBitmap) {
		if(dirty) {
			var gl = renderSession.gl;
			var bounds = graphics.__bounds;
			var texture = graphics.__cachedTexture;
			var w = Math.floor(bounds.width + 0.5);
			var h = Math.floor(bounds.height + 0.5);
			if(texture == null) {
				texture = new openfl._internal.renderer.opengl.utils.FilterTexture(gl,w,h,false);
				graphics.__cachedTexture = texture;
			}
			texture.resize(w,h);
			gl.bindFramebuffer(gl.FRAMEBUFFER,texture.frameBuffer);
			gl.viewport(0,0,w,h);
			texture.clear();
			openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderGraphics(object,renderSession,new openfl.geom.Point(w / 2,-h / 2),true);
			gl.bindFramebuffer(gl.FRAMEBUFFER,null);
			gl.viewport(0,0,renderSession.renderer.width,renderSession.renderer.height);
		}
		if(!spritebatch.drawing) spritebatch.begin(renderSession);
		spritebatch.renderCachedGraphics(object);
	} else openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderGraphics(object,renderSession,renderSession.projection,false);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderGraphics = function(object,renderSession,projection,localCoords) {
	if(localCoords == null) localCoords = false;
	var graphics = object.__graphics;
	var gl = renderSession.gl;
	var offset = renderSession.offset;
	var glStack = graphics.__glStack[openfl._internal.renderer.opengl.GLRenderer.glContextId];
	var bucket;
	var translationMatrix;
	if(localCoords) translationMatrix = openfl.geom.Matrix.__identity; else translationMatrix = object.__worldTransform;
	var batchDrawing = renderSession.spriteBatch.drawing;
	var _g1 = 0;
	var _g = glStack.buckets.length;
	while(_g1 < _g) {
		var i = _g1++;
		batchDrawing = renderSession.spriteBatch.drawing;
		bucket = glStack.buckets[i];
		var _g2 = bucket.mode;
		switch(_g2[1]) {
		case 1:case 2:
			if(batchDrawing && !localCoords) renderSession.spriteBatch.end();
			renderSession.stencilManager.pushBucket(bucket,renderSession,projection,translationMatrix.toArray(true));
			var shader = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareShader(bucket,renderSession,object,projection,translationMatrix.toArray(false));
			openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderFill(bucket,shader,renderSession);
			renderSession.stencilManager.popBucket(object,bucket,renderSession);
			break;
		case 5:
			if(batchDrawing && !localCoords) renderSession.spriteBatch.end();
			var shader1 = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareShader(bucket,renderSession,object,projection,null);
			openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderDrawTriangles(bucket,shader1,renderSession);
			break;
		case 6:
			if(!batchDrawing) renderSession.spriteBatch.begin(renderSession);
			openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderDrawTiles(object,bucket,renderSession);
			break;
		default:
		}
		var _g21 = 0;
		var _g3 = bucket.data;
		while(_g21 < _g3.length) {
			var data = _g3[_g21];
			++_g21;
			if(data.line != null && data.line.verts.length > 0) {
				batchDrawing = renderSession.spriteBatch.drawing;
				if(batchDrawing && !localCoords) renderSession.spriteBatch.end();
				var shader2 = renderSession.shaderManager.primitiveShader;
				renderSession.shaderManager.setShader(shader2);
				gl.uniformMatrix3fv(shader2.translationMatrix,false,translationMatrix.toArray(true));
				gl.uniform2f(shader2.projectionVector,projection.x,-projection.y);
				gl.uniform2f(shader2.offsetVector,-offset.x,-offset.y);
				gl.uniform1f(shader2.alpha,object.__worldAlpha);
				gl.bindBuffer(gl.ARRAY_BUFFER,data.line.vertsBuffer);
				gl.vertexAttribPointer(shader2.aVertexPosition,2,gl.FLOAT,false,24,0);
				gl.vertexAttribPointer(shader2.colorAttribute,4,gl.FLOAT,false,24,8);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,data.line.indexBuffer);
				gl.drawElements(gl.TRIANGLE_STRIP,data.line.indices.length,gl.UNSIGNED_SHORT,0);
			}
		}
		batchDrawing = renderSession.spriteBatch.drawing;
		if(!batchDrawing && !localCoords) renderSession.spriteBatch.begin(renderSession);
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.updateGraphics = function(object,gl,localCoords) {
	if(localCoords == null) localCoords = false;
	var graphics = object.__graphics;
	openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectPosition.setTo(object.get_x(),object.get_y());
	if(graphics.__bounds != null) openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.copyFrom(graphics.__bounds);
	var glStack = null;
	if(graphics.__dirty) glStack = openfl._internal.renderer.opengl.utils.DrawPath.getStack(graphics,gl);
	graphics.__dirty = false;
	var _g = 0;
	var _g1 = glStack.buckets;
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		data.reset();
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.bucketPool.push(data);
	}
	glStack.reset();
	var _g11 = glStack.lastIndex;
	var _g2 = graphics.__drawPaths.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var path = graphics.__drawPaths[i];
		{
			var _g21 = path.type;
			switch(_g21[1]) {
			case 0:
				openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildComplexPoly(path,glStack,localCoords);
				break;
			case 1:
				var rounded = _g21[2];
				if(rounded) openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildRoundedRectangle(path,glStack,localCoords); else openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildRectangle(path,glStack,localCoords);
				break;
			case 2:case 3:
				openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildCircle(path,glStack,localCoords);
				break;
			case 4:
				openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildDrawTriangles(path,object,glStack,localCoords);
				break;
			case 5:
				openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
				break;
			}
		}
		glStack.lastIndex++;
	}
	glStack.upload();
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket = function(path,glStack) {
	var bucket = null;
	{
		var _g = path.fill;
		switch(_g[1]) {
		case 1:
			var a = _g[3];
			var c = _g[2];
			bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl._internal.renderer.opengl.utils.BucketMode.Fill);
			if(c == null) bucket.color = [0,0,0]; else bucket.color = [(c >> 16 & 255) / 255,(c >> 8 & 255) / 255,(c & 255) / 255];
			bucket.alpha = a;
			bucket.uploadTileBuffer = true;
			break;
		case 2:
			var s = _g[5];
			var r = _g[4];
			var m = _g[3];
			var b = _g[2];
			bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl._internal.renderer.opengl.utils.BucketMode.PatternFill);
			bucket.bitmap = b;
			bucket.textureRepeat = r;
			bucket.textureSmooth = s;
			bucket.texture = b.getTexture(glStack.gl);
			bucket.uploadTileBuffer = true;
			var tMatrix = bucket.textureMatrix;
			tMatrix.identity();
			var pMatrix;
			if(m == null) pMatrix = new openfl.geom.Matrix(); else pMatrix = new openfl.geom.Matrix(m.a,m.b,m.c,m.d,m.tx,m.ty);
			pMatrix = pMatrix.invert();
			pMatrix.__translateTransformed(new openfl.geom.Point(-openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectPosition.x,-openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectPosition.y));
			var tx = pMatrix.tx / b.width;
			var ty = pMatrix.ty / b.height;
			tMatrix.concat(pMatrix);
			bucket.textureTL.x = tx;
			bucket.textureTL.y = ty;
			bucket.textureBR.x = tx + 1;
			bucket.textureBR.y = ty + 1;
			tMatrix.scale(1 / b.width,1 / b.height);
			bucket.textureMatrix = tMatrix;
			break;
		default:
			bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl._internal.renderer.opengl.utils.BucketMode.Line);
			bucket.uploadTileBuffer = false;
		}
	}
	{
		var _g1 = path.type;
		switch(_g1[1]) {
		case 4:
			bucket.mode = openfl._internal.renderer.opengl.utils.BucketMode.DrawTriangles;
			bucket.uploadTileBuffer = false;
			break;
		case 5:
			bucket.mode = openfl._internal.renderer.opengl.utils.BucketMode.DrawTiles;
			bucket.uploadTileBuffer = false;
			break;
		default:
		}
	}
	bucket.graphicType = path.type;
	var bucketData = bucket.getData();
	return bucketData;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.getBucket = function(glStack,mode) {
	var b = openfl._internal.renderer.opengl.utils.GraphicsRenderer.bucketPool.pop();
	if(b == null) b = new openfl._internal.renderer.opengl.utils.GLBucket(glStack.gl);
	b.mode = mode;
	glStack.buckets.push(b);
	return b;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.switchBucket = function(fillIndex,glStack,mode) {
	var bucket;
	if(glStack.buckets.length == 0) bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.getBucket(glStack,mode); else {
		bucket = glStack.buckets[glStack.buckets.length - 1];
		if(bucket.fillIndex != fillIndex) bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.getBucket(glStack,mode);
	}
	bucket.dirty = true;
	bucket.fillIndex = fillIndex;
	return bucket;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareShader = function(bucket,renderSession,object,projection,translationMatrix) {
	var gl = renderSession.gl;
	var offset = renderSession.offset;
	var shader = null;
	var _g = bucket.mode;
	switch(_g[1]) {
	case 1:
		shader = renderSession.shaderManager.fillShader;
		break;
	case 2:
		shader = renderSession.shaderManager.patternFillShader;
		break;
	case 5:
		shader = renderSession.shaderManager.drawTrianglesShader;
		break;
	default:
		shader = null;
	}
	if(shader == null) return null;
	var newShader = renderSession.shaderManager.setShader(shader);
	gl.uniform2f(shader.projectionVector,projection.x,-projection.y);
	gl.uniform2f(shader.offsetVector,-offset.x,-offset.y);
	gl.uniform1f(shader.alpha,object.__worldAlpha * bucket.alpha);
	var _g1 = bucket.mode;
	switch(_g1[1]) {
	case 1:
		gl.uniformMatrix3fv(shader.translationMatrix,false,translationMatrix);
		gl.uniform3fv(shader.color,new Float32Array(bucket.color));
		break;
	case 2:
		gl.uniformMatrix3fv(shader.translationMatrix,false,translationMatrix);
		gl.uniform1i(shader.sampler,0);
		gl.uniform2f(shader.patternTL,bucket.textureTL.x,bucket.textureTL.y);
		gl.uniform2f(shader.patternBR,bucket.textureBR.x,bucket.textureBR.y);
		gl.uniformMatrix3fv(shader.patternMatrix,false,bucket.textureMatrix.toArray(false));
		break;
	case 5:
		if(bucket.texture != null) {
			gl.uniform1i(shader.useTexture,1);
			gl.uniform1i(shader.sampler,0);
		} else {
			gl.uniform1i(shader.useTexture,0);
			gl.uniform3fv(shader.color,new Float32Array(bucket.color));
		}
		break;
	default:
	}
	return shader;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderFill = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	if(bucket.mode == openfl._internal.renderer.opengl.utils.BucketMode.PatternFill && bucket.texture != null) openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindTexture(gl,bucket);
	gl.bindBuffer(gl.ARRAY_BUFFER,bucket.tileBuffer);
	gl.vertexAttribPointer(shader.aVertexPosition,4,gl.SHORT,false,0,0);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderDrawTriangles = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	var _g = 0;
	var _g1 = bucket.data;
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		if(data.destroyed) continue;
		if(bucket.texture == null) {
		} else openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindTexture(gl,bucket);
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindDrawTrianglesBuffer(gl,shader,data);
		gl.drawArrays(gl.TRIANGLES,data.glStart,data.glLength);
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderDrawTiles = function(object,bucket,renderSession) {
	var args = bucket.graphicType.slice(2);
	renderSession.spriteBatch.renderTiles(object,args[0],args[1],args[2],args[3],args[4]);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindDrawTrianglesBuffer = function(gl,shader,data) {
	gl.bindBuffer(gl.ARRAY_BUFFER,data.vertsBuffer);
	var stride = data.stride * 4;
	gl.vertexAttribPointer(shader.aVertexPosition,2,gl.FLOAT,false,stride,0);
	gl.vertexAttribPointer(shader.aTextureCoord,2,gl.FLOAT,false,stride,8);
	gl.vertexAttribPointer(shader.colorAttribute,4,gl.FLOAT,false,stride,16);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindTexture = function(gl,bucket) {
	gl.bindTexture(gl.TEXTURE_2D,bucket.texture);
	if(bucket.textureRepeat && bucket.bitmap.__image.get_powerOfTwo()) {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
	} else {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	}
	if(bucket.textureSmooth) {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
	} else {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.isCCW = function(x1,y1,x2,y2,x3,y3) {
	return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgb = function(hex) {
	if(hex == null) return [0,0,0]; else return [(hex >> 16 & 255) / 255,(hex >> 8 & 255) / 255,(hex & 255) / 255];
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgba = function(hex) {
	if(hex == null) return [1,1,1,1]; else return [(hex >> 16 & 255) / 255,(hex >> 8 & 255) / 255,(hex & 255) / 255,(hex >> 24 & 255) / 255];
};
openfl._internal.renderer.opengl.utils.GLStack = function(gl) {
	this.lastIndex = 0;
	this.gl = gl;
	this.buckets = [];
	this.lastIndex = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLStack"] = openfl._internal.renderer.opengl.utils.GLStack;
openfl._internal.renderer.opengl.utils.GLStack.__name__ = ["openfl","_internal","renderer","opengl","utils","GLStack"];
openfl._internal.renderer.opengl.utils.GLStack.prototype = {
	reset: function() {
		this.buckets = [];
		this.lastIndex = 0;
	}
	,upload: function() {
		var _g = 0;
		var _g1 = this.buckets;
		while(_g < _g1.length) {
			var bucket = _g1[_g];
			++_g;
			if(bucket.dirty) bucket.upload();
		}
	}
	,__class__: openfl._internal.renderer.opengl.utils.GLStack
};
openfl._internal.renderer.opengl.utils.GLBucket = function(gl) {
	this.uploadTileBuffer = true;
	this.textureSmooth = true;
	this.textureRepeat = false;
	this.data = [];
	this.fillIndex = 0;
	this.gl = gl;
	this.color = [0,0,0];
	this.lastIndex = 0;
	this.alpha = 1;
	this.dirty = true;
	this.mode = openfl._internal.renderer.opengl.utils.BucketMode.Fill;
	this.textureMatrix = new openfl.geom.Matrix();
	this.textureTL = new openfl.geom.Point();
	this.textureBR = new openfl.geom.Point(1,1);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucket"] = openfl._internal.renderer.opengl.utils.GLBucket;
openfl._internal.renderer.opengl.utils.GLBucket.__name__ = ["openfl","_internal","renderer","opengl","utils","GLBucket"];
openfl._internal.renderer.opengl.utils.GLBucket.prototype = {
	getData: function() {
		var result = null;
		var remove = false;
		var _g = 0;
		var _g1 = this.data;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d.destroyed) {
				result = d;
				remove = true;
				break;
			}
		}
		if(result == null) result = new openfl._internal.renderer.opengl.utils.GLBucketData(this.gl);
		result.destroyed = false;
		result.parent = this;
		if(remove) HxOverrides.remove(this.data,result);
		this.data.push(result);
		return result;
	}
	,reset: function() {
		var _g = 0;
		var _g1 = this.data;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			d.destroy();
		}
		this.fillIndex = 0;
		this.uploadTileBuffer = true;
		this.graphicType = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
	}
	,upload: function() {
		if(this.uploadTileBuffer) {
			if(this.tileBuffer == null) {
				this.tileBuffer = this.gl.createBuffer();
				this.tile = [0,0,0,0,4096,0,1,0,0,4096,0,1,4096,4096,1,1];
				this.glTile = new Int16Array(this.tile);
			}
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tileBuffer);
			this.gl.bufferData(this.gl.ARRAY_BUFFER,this.glTile,this.gl.STATIC_DRAW);
			this.uploadTileBuffer = false;
		}
		var _g = 0;
		var _g1 = this.data;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(!d.destroyed) d.upload();
		}
		this.dirty = false;
	}
	,__class__: openfl._internal.renderer.opengl.utils.GLBucket
};
openfl._internal.renderer.opengl.utils.GLBucketData = function(gl,initLine) {
	if(initLine == null) initLine = true;
	this.destroyed = false;
	this.rawIndices = false;
	this.stride = 0;
	this.rawVerts = false;
	this.lastVertsSize = 0;
	this.glStart = 0;
	this.glLength = 0;
	this.gl = gl;
	this.drawMode = gl.TRIANGLE_STRIP;
	this.verts = [];
	this.vertsBuffer = gl.createBuffer();
	this.indices = [];
	this.indexBuffer = gl.createBuffer();
	if(initLine) this.line = new openfl._internal.renderer.opengl.utils.GLBucketData(gl,false);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucketData"] = openfl._internal.renderer.opengl.utils.GLBucketData;
openfl._internal.renderer.opengl.utils.GLBucketData.__name__ = ["openfl","_internal","renderer","opengl","utils","GLBucketData"];
openfl._internal.renderer.opengl.utils.GLBucketData.prototype = {
	destroy: function() {
		this.destroyed = true;
		this.verts = [];
		this.indices = [];
		this.glLength = 0;
		this.glStart = 0;
		this.stride = 0;
		this.rawVerts = false;
		this.rawIndices = false;
		if(this.line != null) this.line.destroy();
	}
	,upload: function() {
		if(this.rawVerts && this.glVerts != null && this.glVerts.length > 0 || this.verts.length > 0) {
			if(!this.rawVerts) this.glVerts = new Float32Array(this.verts);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertsBuffer);
			if(this.glVerts.length <= this.lastVertsSize) {
				var end = this.glLength * 4 * this.stride;
				if(this.glLength > 0 && this.lastVertsSize > end) {
					var view = this.glVerts.subarray(0,end);
					this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,view);
					view = null;
				} else this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,this.glVerts);
			} else {
				this.gl.bufferData(this.gl.ARRAY_BUFFER,this.glVerts,this.gl.STREAM_DRAW);
				this.lastVertsSize = this.glVerts.length;
			}
		}
		if(this.glLength == 0 && (this.rawIndices && this.glIndices != null && this.glIndices.length > 0 || this.indices.length > 0)) {
			if(!this.rawIndices) this.glIndices = new Uint16Array(this.indices);
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
			this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,this.glIndices,this.gl.STREAM_DRAW);
		}
		if(this.line != null) this.line.upload();
	}
	,__class__: openfl._internal.renderer.opengl.utils.GLBucketData
};
openfl._internal.renderer.opengl.utils.BucketMode = $hxClasses["openfl._internal.renderer.opengl.utils.BucketMode"] = { __ename__ : true, __constructs__ : ["None","Fill","PatternFill","Line","PatternLine","DrawTriangles","DrawTiles"] };
openfl._internal.renderer.opengl.utils.BucketMode.None = ["None",0];
openfl._internal.renderer.opengl.utils.BucketMode.None.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.None.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.Fill = ["Fill",1];
openfl._internal.renderer.opengl.utils.BucketMode.Fill.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.Fill.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.PatternFill = ["PatternFill",2];
openfl._internal.renderer.opengl.utils.BucketMode.PatternFill.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.PatternFill.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.Line = ["Line",3];
openfl._internal.renderer.opengl.utils.BucketMode.Line.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.Line.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.PatternLine = ["PatternLine",4];
openfl._internal.renderer.opengl.utils.BucketMode.PatternLine.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.PatternLine.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.DrawTriangles = ["DrawTriangles",5];
openfl._internal.renderer.opengl.utils.BucketMode.DrawTriangles.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.DrawTriangles.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.DrawTiles = ["DrawTiles",6];
openfl._internal.renderer.opengl.utils.BucketMode.DrawTiles.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.DrawTiles.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.GLGraphicsData = function(gl) {
	this.indices = [];
	this.data = [];
	this.lastIndex = 0;
	this.mode = 0;
	this.dirty = true;
	this.alpha = 1.0;
	this.tint = [1.0,1.0,1.0];
	this.gl = gl;
	this.dataBuffer = gl.createBuffer();
	this.indexBuffer = gl.createBuffer();
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLGraphicsData"] = openfl._internal.renderer.opengl.utils.GLGraphicsData;
openfl._internal.renderer.opengl.utils.GLGraphicsData.__name__ = ["openfl","_internal","renderer","opengl","utils","GLGraphicsData"];
openfl._internal.renderer.opengl.utils.GLGraphicsData.prototype = {
	reset: function() {
		this.data = [];
		this.indices = [];
		this.lastIndex = 0;
	}
	,upload: function() {
		this.glData = new Float32Array(this.data);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.dataBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,this.glData,this.gl.STATIC_DRAW);
		this.glIndices = new Uint16Array(this.indices);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,this.glIndices,this.gl.STATIC_DRAW);
		this.dirty = false;
	}
	,__class__: openfl._internal.renderer.opengl.utils.GLGraphicsData
};
openfl._internal.renderer.opengl.utils.PolyK = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PolyK"] = openfl._internal.renderer.opengl.utils.PolyK;
openfl._internal.renderer.opengl.utils.PolyK.__name__ = ["openfl","_internal","renderer","opengl","utils","PolyK"];
openfl._internal.renderer.opengl.utils.PolyK.triangulate = function(p) {
	var sign = true;
	var n = p.length >> 1;
	if(n < 3) return [];
	var tgs = [];
	var avl;
	var _g = [];
	var _g1 = 0;
	while(_g1 < n) {
		var i = _g1++;
		_g.push(i);
	}
	avl = _g;
	var i1 = 0;
	var al = n;
	var earFound = false;
	while(al > 3) {
		var i0 = avl[i1 % al];
		var i11 = avl[(i1 + 1) % al];
		var i2 = avl[(i1 + 2) % al];
		var ax = p[2 * i0];
		var ay = p[2 * i0 + 1];
		var bx = p[2 * i11];
		var by = p[2 * i11 + 1];
		var cx = p[2 * i2];
		var cy = p[2 * i2 + 1];
		earFound = false;
		if(openfl._internal.renderer.opengl.utils.PolyK._convex(ax,ay,bx,by,cx,cy,sign)) {
			earFound = true;
			var _g11 = 0;
			while(_g11 < al) {
				var j = _g11++;
				var vi = avl[j];
				if(vi == i0 || vi == i11 || vi == i2) continue;
				if(openfl._internal.renderer.opengl.utils.PolyK._PointInTriangle(p[2 * vi],p[2 * vi + 1],ax,ay,bx,by,cx,cy)) {
					earFound = false;
					break;
				}
			}
		}
		if(earFound) {
			tgs.push(i0);
			tgs.push(i11);
			tgs.push(i2);
			avl.splice((i1 + 1) % al,1);
			al--;
			i1 = 0;
		} else if(i1++ > 3 * al) {
			if(sign) {
				tgs = [];
				var _g12 = [];
				var _g2 = 0;
				while(_g2 < n) {
					var k = _g2++;
					_g12.push(k);
				}
				avl = _g12;
				i1 = 0;
				al = n;
				sign = false;
			} else {
				haxe.Log.trace("Warning: shape too complex to fill",{ fileName : "GraphicsRenderer.hx", lineNumber : 1506, className : "openfl._internal.renderer.opengl.utils.PolyK", methodName : "triangulate"});
				return [];
			}
		}
	}
	tgs.push(avl[0]);
	tgs.push(avl[1]);
	tgs.push(avl[2]);
	return tgs;
};
openfl._internal.renderer.opengl.utils.PolyK._PointInTriangle = function(px,py,ax,ay,bx,by,cx,cy) {
	var v0x = cx - ax | 0;
	var v0y = cy - ay | 0;
	var v1x = bx - ax | 0;
	var v1y = by - ay | 0;
	var v2x = px - ax | 0;
	var v2y = py - ay | 0;
	var dot00 = v0x * v0x + v0y * v0y;
	var dot01 = v0x * v1x + v0y * v1y;
	var dot02 = v0x * v2x + v0y * v2y;
	var dot11 = v1x * v1x + v1y * v1y;
	var dot12 = v1x * v2x + v1y * v2y;
	var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
	return u >= 0 && v >= 0 && u + v < 1;
};
openfl._internal.renderer.opengl.utils.PolyK._convex = function(ax,ay,bx,by,cx,cy,sign) {
	return (ay - by) * (cx - bx) + (bx - ax) * (cy - by) >= 0 == sign;
};
openfl._internal.renderer.opengl.utils.GraphicType = $hxClasses["openfl._internal.renderer.opengl.utils.GraphicType"] = { __ename__ : true, __constructs__ : ["Polygon","Rectangle","Circle","Ellipse","DrawTriangles","DrawTiles"] };
openfl._internal.renderer.opengl.utils.GraphicType.Polygon = ["Polygon",0];
openfl._internal.renderer.opengl.utils.GraphicType.Polygon.toString = $estr;
openfl._internal.renderer.opengl.utils.GraphicType.Polygon.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType;
openfl._internal.renderer.opengl.utils.GraphicType.Rectangle = function(rounded) { var $x = ["Rectangle",1,rounded]; $x.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils.GraphicType.Circle = ["Circle",2];
openfl._internal.renderer.opengl.utils.GraphicType.Circle.toString = $estr;
openfl._internal.renderer.opengl.utils.GraphicType.Circle.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType;
openfl._internal.renderer.opengl.utils.GraphicType.Ellipse = ["Ellipse",3];
openfl._internal.renderer.opengl.utils.GraphicType.Ellipse.toString = $estr;
openfl._internal.renderer.opengl.utils.GraphicType.Ellipse.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType;
openfl._internal.renderer.opengl.utils.GraphicType.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",4,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils.GraphicType.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",5,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils._GraphicsRenderer = {};
openfl._internal.renderer.opengl.utils._GraphicsRenderer.RenderMode_Impl_ = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils._GraphicsRenderer.RenderMode_Impl_"] = openfl._internal.renderer.opengl.utils._GraphicsRenderer.RenderMode_Impl_;
openfl._internal.renderer.opengl.utils._GraphicsRenderer.RenderMode_Impl_.__name__ = ["openfl","_internal","renderer","opengl","utils","_GraphicsRenderer","RenderMode_Impl_"];
openfl._internal.renderer.opengl.utils.MaskManager = function(gl) {
	this.maskStack = [];
	this.maskPosition = 0;
	this.setContext(gl);
	this.reverse = false;
	this.count = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.MaskManager"] = openfl._internal.renderer.opengl.utils.MaskManager;
openfl._internal.renderer.opengl.utils.MaskManager.__name__ = ["openfl","_internal","renderer","opengl","utils","MaskManager"];
openfl._internal.renderer.opengl.utils.MaskManager.prototype = {
	destroy: function() {
		this.maskStack = null;
		this.gl = null;
	}
	,popMask: function(maskData,renderSession) {
		var gl = this.gl;
		renderSession.stencilManager.popStencil(maskData,maskData._webGL[openfl._internal.renderer.opengl.GLRenderer.glContextId].data[0],renderSession);
	}
	,pushMask: function(maskData,renderSession) {
		var gl = renderSession.gl;
		if(maskData.dirty) openfl._internal.renderer.opengl.utils.GraphicsRenderer.updateGraphics(maskData,gl);
		if(maskData._webGL[openfl._internal.renderer.opengl.GLRenderer.glContextId].data.length == 0) return;
		renderSession.stencilManager.pushStencil(maskData,maskData._webGL[openfl._internal.renderer.opengl.GLRenderer.glContextId].data[0],renderSession);
	}
	,setContext: function(gl) {
		this.gl = gl;
	}
	,__class__: openfl._internal.renderer.opengl.utils.MaskManager
};
openfl._internal.renderer.opengl.utils.ShaderManager = function(gl) {
	this.maxAttibs = 10;
	this.attribState = [];
	this.tempAttribState = [];
	this.shaderMap = [];
	var _g1 = 0;
	var _g = this.maxAttibs;
	while(_g1 < _g) {
		var i = _g1++;
		this.attribState[i] = false;
	}
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.ShaderManager"] = openfl._internal.renderer.opengl.utils.ShaderManager;
openfl._internal.renderer.opengl.utils.ShaderManager.__name__ = ["openfl","_internal","renderer","opengl","utils","ShaderManager"];
openfl._internal.renderer.opengl.utils.ShaderManager.prototype = {
	destroy: function() {
		this.attribState = null;
		this.tempAttribState = null;
		this.primitiveShader.destroy();
		this.defaultShader.destroy();
		this.fastShader.destroy();
		this.stripShader.destroy();
		this.fillShader.destroy();
		this.patternFillShader.destroy();
		this.drawTrianglesShader.destroy();
		this.gl = null;
	}
	,setAttribs: function(attribs) {
		var _g1 = 0;
		var _g = this.tempAttribState.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.tempAttribState[i] = false;
		}
		var _g11 = 0;
		var _g2 = attribs.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var attribId = attribs[i1];
			this.tempAttribState[attribId] = true;
		}
		var gl = this.gl;
		var _g12 = 0;
		var _g3 = this.attribState.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			if(this.attribState[i2] != this.tempAttribState[i2]) {
				this.attribState[i2] = this.tempAttribState[i2];
				if(this.tempAttribState[i2]) gl.enableVertexAttribArray(i2); else gl.disableVertexAttribArray(i2);
			}
		}
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.primitiveShader = new openfl._internal.renderer.opengl.shaders.PrimitiveShader(gl);
		this.complexPrimitiveShader = new openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader(gl);
		this.defaultShader = new openfl._internal.renderer.opengl.shaders.DefaultShader(gl);
		this.fastShader = new openfl._internal.renderer.opengl.shaders.FastShader(gl);
		this.stripShader = new openfl._internal.renderer.opengl.shaders.StripShader(gl);
		this.fillShader = new openfl._internal.renderer.opengl.shaders.FillShader(gl);
		this.patternFillShader = new openfl._internal.renderer.opengl.shaders.PatternFillShader(gl);
		this.drawTrianglesShader = new openfl._internal.renderer.opengl.shaders.DrawTrianglesShader(gl);
		this.setShader(this.defaultShader);
	}
	,setShader: function(shader) {
		if(this._currentId == shader._UID) return false;
		this._currentId = shader._UID;
		this.currentShader = shader;
		this.gl.useProgram(shader.program);
		this.setAttribs(shader.attributes);
		return true;
	}
	,__class__: openfl._internal.renderer.opengl.utils.ShaderManager
};
openfl._internal.renderer.opengl.utils.SpriteBatch = function(gl) {
	this.states = [];
	this.vertSize = 6;
	this.size = Math.floor(Math.pow(2,16) / this.vertSize);
	var numVerts = this.size * 4 * this.vertSize;
	var numIndices = this.size * 6;
	this.vertices = new Float32Array(numVerts);
	this.indices = new Uint16Array(numIndices);
	this.lastIndexCount = 0;
	var i = 0;
	var j = 0;
	while(i < numIndices) {
		this.indices[i] = j;
		this.indices[i + 1] = j + 1;
		this.indices[i + 2] = j + 2;
		this.indices[i + 3] = j;
		this.indices[i + 4] = j + 2;
		this.indices[i + 5] = j + 3;
		i += 6;
		j += 4;
	}
	this.drawing = false;
	this.currentBatchSize = 0;
	this.currentBaseTexture = null;
	this.setContext(gl);
	this.dirty = true;
	this.currentState = new openfl._internal.renderer.opengl.utils._SpriteBatch.State();
};
$hxClasses["openfl._internal.renderer.opengl.utils.SpriteBatch"] = openfl._internal.renderer.opengl.utils.SpriteBatch;
openfl._internal.renderer.opengl.utils.SpriteBatch.__name__ = ["openfl","_internal","renderer","opengl","utils","SpriteBatch"];
openfl._internal.renderer.opengl.utils.SpriteBatch.prototype = {
	begin: function(renderSession) {
		this.renderSession = renderSession;
		this.shader = renderSession.shaderManager.defaultShader;
		this.drawing = true;
		this.start();
	}
	,destroy: function() {
		this.vertices = null;
		this.indices = null;
		this.gl.deleteBuffer(this.vertexBuffer);
		this.gl.deleteBuffer(this.indexBuffer);
		this.currentBaseTexture = null;
		this.gl = null;
	}
	,end: function() {
		this.flush();
		this.drawing = false;
	}
	,flush: function() {
		if(this.currentBatchSize == 0) return;
		var gl = this.gl;
		this.renderSession.shaderManager.setShader(this.renderSession.shaderManager.defaultShader);
		if(this.dirty) {
			this.dirty = false;
			gl.activeTexture(gl.TEXTURE0);
			gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
			var projection = this.renderSession.projection;
			gl.uniform2f(this.shader.projectionVector,projection.x,projection.y);
			var stride = this.vertSize * 4;
			gl.vertexAttribPointer(this.shader.aVertexPosition,2,gl.FLOAT,false,stride,0);
			gl.vertexAttribPointer(this.shader.aTextureCoord,2,gl.FLOAT,false,stride,8);
			gl.vertexAttribPointer(this.shader.colorAttribute,2,gl.FLOAT,false,stride,16);
		}
		if(this.currentBatchSize > this.size * 0.5) gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertices); else {
			var view = this.vertices.subarray(0,this.currentBatchSize * 4 * this.vertSize);
			gl.bufferSubData(gl.ARRAY_BUFFER,0,view);
		}
		var nextState;
		var batchSize = 0;
		var start = 0;
		this.currentState.texture = null;
		this.currentState.textureSmooth = true;
		this.currentState.blendMode = this.renderSession.blendModeManager.currentBlendMode;
		var j = this.currentBatchSize;
		var _g = 0;
		while(_g < j) {
			var i = _g++;
			nextState = this.states[i];
			if(this.currentState.texture != nextState.texture || this.currentState.blendMode != nextState.blendMode) {
				this.renderBatch(this.currentState,batchSize,start);
				start = i;
				batchSize = 0;
				this.currentState.texture = nextState.texture;
				this.currentState.textureSmooth = nextState.textureSmooth;
				this.currentState.blendMode = nextState.blendMode;
				this.renderSession.blendModeManager.setBlendMode(this.currentState.blendMode);
			}
			batchSize++;
		}
		this.renderBatch(this.currentState,batchSize,start);
		this.currentBatchSize = 0;
	}
	,render: function(sprite) {
		var bitmapData = sprite.bitmapData;
		var texture = bitmapData.getTexture(this.gl);
		if(bitmapData == null) return;
		if(this.currentBatchSize >= this.size) {
			this.flush();
			this.currentState.texture = texture;
		}
		var uvs = bitmapData.__uvData;
		if(uvs == null) return;
		var alpha = sprite.__worldAlpha;
		var tint = 16777215;
		var aX = 0;
		var aY = 0;
		var index = this.currentBatchSize * 4 * this.vertSize;
		this.fillVertices(index,aX,aY,bitmapData.width,bitmapData.height,tint,alpha,uvs,sprite.__worldTransform);
		this.setState(this.currentBatchSize,texture,null,sprite.blendMode);
		this.currentBatchSize++;
	}
	,renderCachedGraphics: function(object) {
		var cachedTexture = object.__graphics.__cachedTexture;
		if(cachedTexture == null) return;
		if(this.currentBatchSize >= this.size) {
			this.flush();
			this.currentBaseTexture = cachedTexture.texture;
		}
		var alpha = object.__worldAlpha;
		var tint = 16777215;
		var aX = 0;
		var aY = 0;
		var uvs = new openfl.display.TextureUvs();
		uvs.x0 = 0;
		uvs.y0 = 1;
		uvs.x1 = 1;
		uvs.y1 = 1;
		uvs.x2 = 1;
		uvs.y2 = 0;
		uvs.x3 = 0;
		uvs.y3 = 0;
		var index = this.currentBatchSize * 4 * this.vertSize;
		var worldTransform = object.__worldTransform.clone();
		worldTransform.__translateTransformed(new openfl.geom.Point(object.__graphics.__bounds.x,object.__graphics.__bounds.y));
		this.fillVertices(index,aX,aY,cachedTexture.width,cachedTexture.height,tint,alpha,uvs,worldTransform);
		this.setState(this.currentBatchSize,cachedTexture.texture,null,object.blendMode);
		this.currentBatchSize++;
	}
	,renderTiles: function(object,sheet,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		var texture = sheet.__bitmap.getTexture(this.gl);
		if(texture == null) return;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		var useRect = (flags & 32) > 0;
		var useOrigin = (flags & 64) > 0;
		var blendMode;
		var _g = flags & 983040;
		switch(_g) {
		case 65536:
			blendMode = openfl.display.BlendMode.ADD;
			break;
		case 131072:
			blendMode = openfl.display.BlendMode.MULTIPLY;
			break;
		case 262144:
			blendMode = openfl.display.BlendMode.SCREEN;
			break;
		default:
			blendMode = openfl.display.BlendMode.NORMAL;
		}
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		if(count >= 0 && totalCount > count) totalCount = count;
		var itemCount = totalCount / numValues | 0;
		var iIndex = 0;
		var tileID = -1;
		var rect = sheet.__rectTile;
		var tileUV = sheet.__rectUV;
		var center = sheet.__point;
		var x = 0.0;
		var y = 0.0;
		var alpha = 1.0;
		var tint = 16777215;
		var scale = 1.0;
		var rotation = 0.0;
		var cosTheta = 1.0;
		var sinTheta = 0.0;
		var a = 0.0;
		var b = 0.0;
		var c = 0.0;
		var d = 0.0;
		var tx = 0.0;
		var ty = 0.0;
		var ox = 0.0;
		var oy = 0.0;
		var matrix = new openfl.geom.Matrix();
		var oMatrix = object.__worldTransform;
		var uvs = new openfl.display.TextureUvs();
		var bIndex = 0;
		while(iIndex < totalCount) {
			if(this.currentBatchSize >= this.size) {
				this.flush();
				this.currentBaseTexture = texture;
			}
			x = tileData[iIndex];
			y = tileData[iIndex + 1];
			if(useRect) {
				tileID = -1;
				rect.x = tileData[iIndex + 2];
				rect.y = tileData[iIndex + 3];
				rect.width = tileData[iIndex + 4];
				rect.height = tileData[iIndex + 5];
				if(useOrigin) {
					center.x = tileData[iIndex + 6];
					center.y = tileData[iIndex + 7];
				} else {
					center.x = 0;
					center.y = 0;
				}
				tileUV.setTo(rect.get_left() / sheet.__bitmap.width,rect.get_top() / sheet.__bitmap.height,rect.get_right() / sheet.__bitmap.width,rect.get_bottom() / sheet.__bitmap.height);
			} else {
				tileID = (tileData[iIndex + 2] == null?0:tileData[iIndex + 2]) | 0;
				rect = sheet.__tileRects[tileID];
				center = sheet.__centerPoints[tileID];
				tileUV = sheet.__tileUVs[tileID];
			}
			if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
				alpha = 1;
				tint = 16777215;
				a = 1;
				b = 0;
				c = 0;
				d = 1;
				tx = 0;
				ty = 0;
				scale = 1.0;
				rotation = 0.0;
				cosTheta = 1.0;
				sinTheta = 0.0;
				matrix.identity();
				if(useAlpha) alpha = tileData[iIndex + alphaIndex];
				if(useRGB) tint = (tileData[iIndex + rgbIndex] * 255 | 0) << 16 | (tileData[iIndex + rgbIndex + 1] * 255 | 0) << 8 | (tileData[iIndex + rgbIndex + 2] * 255 | 0);
				if(useScale) scale = tileData[iIndex + scaleIndex];
				if(useRotation) {
					rotation = tileData[iIndex + rotationIndex];
					cosTheta = Math.cos(rotation);
					sinTheta = Math.sin(rotation);
				}
				if(useTransform) {
					a = tileData[iIndex + transformIndex];
					b = tileData[iIndex + transformIndex + 1];
					c = tileData[iIndex + transformIndex + 2];
					d = tileData[iIndex + transformIndex + 3];
				} else {
					a = scale * cosTheta;
					b = scale * sinTheta;
					c = -b;
					d = a;
				}
				ox = center.x * a + center.y * c;
				oy = center.x * b + center.y * d;
				tx = x - ox;
				ty = y - oy;
				matrix.a = a * oMatrix.a + b * oMatrix.c;
				matrix.b = a * oMatrix.b + b * oMatrix.d;
				matrix.c = c * oMatrix.a + d * oMatrix.c;
				matrix.d = c * oMatrix.b + d * oMatrix.d;
				matrix.tx = tx * oMatrix.a + ty * oMatrix.c;
				matrix.ty = tx * oMatrix.b + ty * oMatrix.d;
				uvs.x0 = tileUV.x;
				uvs.y0 = tileUV.y;
				uvs.x1 = tileUV.width;
				uvs.y1 = tileUV.y;
				uvs.x2 = tileUV.width;
				uvs.y2 = tileUV.height;
				uvs.x3 = tileUV.x;
				uvs.y3 = tileUV.height;
				bIndex = this.currentBatchSize * 4 * this.vertSize;
				this.fillVertices(bIndex,0,0,rect.width,rect.height,tint,alpha,uvs,matrix);
				this.setState(this.currentBatchSize,texture,smooth,blendMode);
				this.currentBatchSize++;
			}
			iIndex += numValues;
		}
	}
	,fillVertices: function(index,aX,aY,width,height,tint,alpha,uvs,matrix) {
		var w0;
		var w1;
		var h0;
		var h1;
		w0 = width * (1 - aX);
		w1 = width * -aX;
		h0 = height * (1 - aY);
		h1 = height * -aY;
		var a = matrix.a;
		var b = matrix.b;
		var c = matrix.c;
		var d = matrix.d;
		var tx = matrix.tx;
		var ty = matrix.ty;
		this.vertices[index++] = a * w1 + c * h1 + tx;
		this.vertices[index++] = d * h1 + b * w1 + ty;
		this.vertices[index++] = uvs.x0;
		this.vertices[index++] = uvs.y0;
		this.vertices[index++] = alpha;
		this.vertices[index++] = tint;
		this.vertices[index++] = a * w0 + c * h1 + tx;
		this.vertices[index++] = d * h1 + b * w0 + ty;
		this.vertices[index++] = uvs.x1;
		this.vertices[index++] = uvs.y1;
		this.vertices[index++] = alpha;
		this.vertices[index++] = tint;
		this.vertices[index++] = a * w0 + c * h0 + tx;
		this.vertices[index++] = d * h0 + b * w0 + ty;
		this.vertices[index++] = uvs.x2;
		this.vertices[index++] = uvs.y2;
		this.vertices[index++] = alpha;
		this.vertices[index++] = tint;
		this.vertices[index++] = a * w1 + c * h0 + tx;
		this.vertices[index++] = d * h0 + b * w1 + ty;
		this.vertices[index++] = uvs.x3;
		this.vertices[index++] = uvs.y3;
		this.vertices[index++] = alpha;
		this.vertices[index++] = tint;
	}
	,setState: function(index,texture,smooth,blendMode) {
		if(smooth == null) smooth = true;
		var state = this.states[this.currentBatchSize];
		if(state == null) state = this.states[this.currentBatchSize] = new openfl._internal.renderer.opengl.utils._SpriteBatch.State();
		state.texture = texture;
		state.textureSmooth = smooth;
		state.blendMode = blendMode;
	}
	,renderBatch: function(state,size,startIndex) {
		if(size == 0) return;
		this.gl.bindTexture(this.gl.TEXTURE_2D,state.texture);
		if(state.textureSmooth) {
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR);
		} else {
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST);
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST);
		}
		this.gl.drawElements(this.gl.TRIANGLES,size * 6,this.gl.UNSIGNED_SHORT,startIndex * 6 * 2);
		this.renderSession.drawCount++;
	}
	,renderTilingSprite: function(tilingSprite) {
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.vertexBuffer = gl.createBuffer();
		this.indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.vertices,gl.DYNAMIC_DRAW);
		this.currentBlendMode = null;
	}
	,start: function() {
		this.dirty = true;
	}
	,stop: function() {
		this.flush();
	}
	,__class__: openfl._internal.renderer.opengl.utils.SpriteBatch
};
openfl._internal.renderer.opengl.utils._SpriteBatch = {};
openfl._internal.renderer.opengl.utils._SpriteBatch.State = function() {
	this.textureSmooth = true;
};
$hxClasses["openfl._internal.renderer.opengl.utils._SpriteBatch.State"] = openfl._internal.renderer.opengl.utils._SpriteBatch.State;
openfl._internal.renderer.opengl.utils._SpriteBatch.State.__name__ = ["openfl","_internal","renderer","opengl","utils","_SpriteBatch","State"];
openfl._internal.renderer.opengl.utils._SpriteBatch.State.prototype = {
	__class__: openfl._internal.renderer.opengl.utils._SpriteBatch.State
};
openfl._internal.renderer.opengl.utils.StencilManager = function(gl) {
	this.stencilStack = [];
	this.bucketStack = [];
	this.setContext(gl);
	this.reverse = true;
	this.count = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.StencilManager"] = openfl._internal.renderer.opengl.utils.StencilManager;
openfl._internal.renderer.opengl.utils.StencilManager.__name__ = ["openfl","_internal","renderer","opengl","utils","StencilManager"];
openfl._internal.renderer.opengl.utils.StencilManager.prototype = {
	prepareGraphics: function(bucketData,renderSession,projection,translationMatrix) {
		var offset = renderSession.offset;
		var shader = renderSession.shaderManager.fillShader;
		renderSession.shaderManager.setShader(shader);
		this.gl.uniformMatrix3fv(shader.translationMatrix,false,translationMatrix);
		this.gl.uniform2f(shader.projectionVector,projection.x,-projection.y);
		this.gl.uniform2f(shader.offsetVector,-offset.x,-offset.y);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,bucketData.vertsBuffer);
		this.gl.vertexAttribPointer(shader.aVertexPosition,2,this.gl.FLOAT,false,8,0);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,bucketData.indexBuffer);
	}
	,pushBucket: function(bucket,renderSession,projection,translationMatrix) {
		if(this.bucketStack.length == 0) {
			this.gl.enable(this.gl.STENCIL_TEST);
			this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
			this.gl.stencilMask(255);
		}
		this.bucketStack.push(bucket);
		this.gl.colorMask(false,false,false,false);
		this.gl.stencilFunc(this.gl.NEVER,1,255);
		this.gl.stencilOp(this.gl.INVERT,this.gl.KEEP,this.gl.KEEP);
		this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
		var _g = 0;
		var _g1 = bucket.data;
		while(_g < _g1.length) {
			var bucketData = _g1[_g];
			++_g;
			if(bucketData.destroyed) continue;
			this.prepareGraphics(bucketData,renderSession,projection,translationMatrix);
			this.gl.drawElements(bucketData.drawMode,bucketData.glIndices.length,this.gl.UNSIGNED_SHORT,0);
		}
		this.gl.colorMask(true,true,true,true);
		this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.KEEP);
		this.gl.stencilFunc(this.gl.EQUAL,255,255);
	}
	,popBucket: function(object,bucket,renderSession) {
		this.bucketStack.pop();
		if(this.bucketStack.length == 0) this.gl.disable(this.gl.STENCIL_TEST);
	}
	,bindGraphics: function(object,glData,renderSession) {
		var graphics = object.__graphics;
		var projection = renderSession.projection;
		var offset = renderSession.offset;
		if(glData.mode == 1) {
			var shader = renderSession.shaderManager.complexPrimitiveShader;
			renderSession.shaderManager.setShader(shader);
			this.gl.uniformMatrix3fv(shader.translationMatrix,false,object.__worldTransform.toArray(true));
			this.gl.uniform2f(shader.projectionVector,projection.x,-projection.y);
			this.gl.uniform2f(shader.offsetVector,-offset.x,-offset.y);
			this.gl.uniform3fv(shader.tintColor,new Float32Array([1.,1.,1.]));
			this.gl.uniform3fv(shader.color,new Float32Array(glData.tint));
			this.gl.uniform1f(shader.alpha,object.__worldAlpha * glData.alpha);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER,glData.dataBuffer);
			this.gl.vertexAttribPointer(shader.aVertexPosition,2,this.gl.FLOAT,false,8,0);
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,glData.indexBuffer);
		} else {
			var shader1 = renderSession.shaderManager.primitiveShader;
			renderSession.shaderManager.setShader(shader1);
			this.gl.uniformMatrix3fv(shader1.translationMatrix,false,object.__worldTransform.toArray(true));
			this.gl.uniform2f(shader1.projectionVector,projection.x,-projection.y);
			this.gl.uniform2f(shader1.offsetVector,-offset.x,-offset.y);
			this.gl.uniform3fv(shader1.tintColor,new Float32Array([1.,1.,1.]));
			this.gl.uniform1f(shader1.alpha,object.__worldAlpha);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER,glData.dataBuffer);
			this.gl.vertexAttribPointer(shader1.aVertexPosition,2,this.gl.FLOAT,false,24,0);
			this.gl.vertexAttribPointer(shader1.colorAttribute,4,this.gl.FLOAT,false,24,8);
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,glData.indexBuffer);
		}
	}
	,destroy: function() {
		this.stencilStack = null;
		this.bucketStack = null;
		this.gl = null;
	}
	,popStencil: function(object,glData,renderSession) {
		this.stencilStack.pop();
		this.count--;
		if(this.stencilStack.length == 0) this.gl.disable(this.gl.STENCIL_TEST); else {
			var level = this.count;
			this.bindGraphics(object,glData,renderSession);
			this.gl.colorMask(false,false,false,false);
			if(glData.mode == 1) {
				this.reverse = !this.reverse;
				if(this.reverse) {
					this.gl.stencilFunc(this.gl.EQUAL,255 - (level + 1),255);
					this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.INCR);
				} else {
					this.gl.stencilFunc(this.gl.EQUAL,level + 1,255);
					this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.DECR);
				}
				this.gl.drawElements(this.gl.TRIANGLE_FAN,4,this.gl.UNSIGNED_SHORT,(glData.indices.length - 4) * 2);
				this.gl.stencilFunc(this.gl.ALWAYS,0,255);
				this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.INVERT);
				this.gl.drawElements(this.gl.TRIANGLE_FAN,glData.indices.length - 4,this.gl.UNSIGNED_SHORT,0);
				if(!this.reverse) this.gl.stencilFunc(this.gl.EQUAL,255 - level,255); else this.gl.stencilFunc(this.gl.EQUAL,level,255);
			} else {
				if(!this.reverse) {
					this.gl.stencilFunc(this.gl.EQUAL,255 - (level + 1),255);
					this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.INCR);
				} else {
					this.gl.stencilFunc(this.gl.EQUAL,level + 1,255);
					this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.DECR);
				}
				this.gl.drawElements(this.gl.TRIANGLE_STRIP,glData.indices.length,this.gl.UNSIGNED_SHORT,0);
				if(!this.reverse) this.gl.stencilFunc(this.gl.EQUAL,255 - level,255); else this.gl.stencilFunc(this.gl.EQUAL,level,255);
			}
			this.gl.colorMask(true,true,true,true);
			this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.KEEP);
		}
	}
	,pushStencil: function(object,glData,renderSession) {
		this.bindGraphics(object,glData,renderSession);
		if(this.stencilStack.length == 0) {
			this.gl.enable(this.gl.STENCIL_TEST);
			this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
			this.reverse = true;
			this.count = 0;
		}
		this.stencilStack.push(glData);
		var level = this.count;
		this.gl.colorMask(false,false,false,false);
		this.gl.stencilFunc(this.gl.ALWAYS,0,255);
		this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.INVERT);
		if(glData.mode == 1) {
			this.gl.drawElements(this.gl.TRIANGLE_FAN,glData.indices.length - 4,this.gl.UNSIGNED_SHORT,0);
			if(this.reverse) {
				this.gl.stencilFunc(this.gl.EQUAL,255 - level,255);
				this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.DECR);
			} else {
				this.gl.stencilFunc(this.gl.EQUAL,level,255);
				this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.INCR);
			}
			this.gl.drawElements(this.gl.TRIANGLE_FAN,4,this.gl.UNSIGNED_SHORT,(glData.indices.length - 4) * 2);
			if(this.reverse) this.gl.stencilFunc(this.gl.EQUAL,255 - (level + 1),255); else this.gl.stencilFunc(this.gl.EQUAL,level + 1,255);
			this.reverse = !this.reverse;
		} else {
			if(!this.reverse) {
				this.gl.stencilFunc(this.gl.EQUAL,255 - level,255);
				this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.DECR);
			} else {
				this.gl.stencilFunc(this.gl.EQUAL,level,255);
				this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.INCR);
			}
			this.gl.drawElements(this.gl.TRIANGLE_STRIP,glData.indices.length,this.gl.UNSIGNED_SHORT,0);
			if(!this.reverse) this.gl.stencilFunc(this.gl.EQUAL,255 - (level + 1),255); else this.gl.stencilFunc(this.gl.EQUAL,level + 1,255);
		}
		this.gl.colorMask(true,true,true,true);
		this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.KEEP);
		this.count++;
	}
	,setContext: function(gl) {
		this.gl = gl;
	}
	,__class__: openfl._internal.renderer.opengl.utils.StencilManager
};
openfl.display.Application = function() {
	this.__mouseOutStack = [];
	lime.app.Application.call(this);
	openfl.Lib.application = this;
};
$hxClasses["openfl.display.Application"] = openfl.display.Application;
openfl.display.Application.__name__ = ["openfl","display","Application"];
openfl.display.Application.__super__ = lime.app.Application;
openfl.display.Application.prototype = $extend(lime.app.Application.prototype,{
	convertKeyCode: function(keyCode) {
		switch(keyCode) {
		case 8:
			return 8;
		case 9:
			return 9;
		case 13:
			return 13;
		case 27:
			return 27;
		case 32:
			return 32;
		case 39:
			return 222;
		case 44:
			return 188;
		case 45:
			return 189;
		case 46:
			return 190;
		case 47:
			return 191;
		case 48:
			return 48;
		case 49:
			return 49;
		case 50:
			return 50;
		case 51:
			return 51;
		case 52:
			return 52;
		case 53:
			return 53;
		case 54:
			return 54;
		case 55:
			return 55;
		case 56:
			return 56;
		case 57:
			return 57;
		case 59:
			return 186;
		case 61:
			return 187;
		case 91:
			return 219;
		case 92:
			return 220;
		case 93:
			return 221;
		case 96:
			return 192;
		case 97:
			return 65;
		case 98:
			return 66;
		case 99:
			return 67;
		case 100:
			return 68;
		case 101:
			return 69;
		case 102:
			return 70;
		case 103:
			return 71;
		case 104:
			return 72;
		case 105:
			return 73;
		case 106:
			return 74;
		case 107:
			return 75;
		case 108:
			return 76;
		case 109:
			return 77;
		case 110:
			return 78;
		case 111:
			return 79;
		case 112:
			return 80;
		case 113:
			return 81;
		case 114:
			return 82;
		case 115:
			return 83;
		case 116:
			return 84;
		case 117:
			return 85;
		case 118:
			return 86;
		case 119:
			return 87;
		case 120:
			return 88;
		case 121:
			return 89;
		case 122:
			return 90;
		case 127:
			return 46;
		case 1073741881:
			return 20;
		case 1073741882:
			return 112;
		case 1073741883:
			return 113;
		case 1073741884:
			return 114;
		case 1073741885:
			return 115;
		case 1073741886:
			return 116;
		case 1073741887:
			return 117;
		case 1073741888:
			return 118;
		case 1073741889:
			return 119;
		case 1073741890:
			return 120;
		case 1073741891:
			return 121;
		case 1073741892:
			return 122;
		case 1073741893:
			return 123;
		case 1073741897:
			return 45;
		case 1073741898:
			return 36;
		case 1073741899:
			return 33;
		case 1073741901:
			return 35;
		case 1073741902:
			return 34;
		case 1073741903:
			return 39;
		case 1073741904:
			return 37;
		case 1073741905:
			return 40;
		case 1073741906:
			return 38;
		case 1073741908:
			return 111;
		case 1073741909:
			return 106;
		case 1073741910:
			return 109;
		case 1073741911:
			return 107;
		case 1073741912:
			return 108;
		case 1073741913:
			return 97;
		case 1073741914:
			return 98;
		case 1073741915:
			return 99;
		case 1073741916:
			return 100;
		case 1073741917:
			return 101;
		case 1073741918:
			return 102;
		case 1073741919:
			return 103;
		case 1073741920:
			return 104;
		case 1073741921:
			return 105;
		case 1073741922:
			return 96;
		case 1073741923:
			return 110;
		case 1073741928:
			return 124;
		case 1073741929:
			return 125;
		case 1073741930:
			return 126;
		case 1073742048:
			return 17;
		case 1073742049:
			return 16;
		case 1073742050:
			return 18;
		case 1073742052:
			return 17;
		case 1073742053:
			return 16;
		case 1073742054:
			return 18;
		default:
			return keyCode;
		}
	}
	,create: function(config) {
		lime.app.Application.prototype.create.call(this,config);
		this.stage = new openfl.display.Stage(this.windows[0].width,this.windows[0].height,config.background);
		this.stage.addChild(openfl.Lib.current);
		this.stage.align = openfl.display.StageAlign.TOP_LEFT;
		this.stage.scaleMode = openfl.display.StageScaleMode.NO_SCALE;
	}
	,onKey: function(event) {
		var stack = new Array();
		if(this.stage.__focus == null) this.stage.__getInteractive(stack); else this.stage.__focus.__getInteractive(stack);
		if(stack.length > 0) {
			stack.reverse();
			this.stage.__fireEvent(event,stack);
		}
	}
	,onKeyDown: function(keyCode,modifier) {
		var keyCode1 = this.convertKeyCode(keyCode);
		var charCode = keyCode1;
		this.onKey(new openfl.events.KeyboardEvent(openfl.events.KeyboardEvent.KEY_DOWN,true,false,charCode,keyCode1,null,lime.ui._KeyModifier.KeyModifier_Impl_.get_ctrlKey(modifier),lime.ui._KeyModifier.KeyModifier_Impl_.get_altKey(modifier),lime.ui._KeyModifier.KeyModifier_Impl_.get_shiftKey(modifier),lime.ui._KeyModifier.KeyModifier_Impl_.get_metaKey(modifier)));
	}
	,onKeyUp: function(keyCode,modifier) {
		var keyCode1 = this.convertKeyCode(keyCode);
		var charCode = keyCode1;
		this.onKey(new openfl.events.KeyboardEvent(openfl.events.KeyboardEvent.KEY_UP,true,false,charCode,keyCode1,null,lime.ui._KeyModifier.KeyModifier_Impl_.get_ctrlKey(modifier),lime.ui._KeyModifier.KeyModifier_Impl_.get_altKey(modifier),lime.ui._KeyModifier.KeyModifier_Impl_.get_shiftKey(modifier),lime.ui._KeyModifier.KeyModifier_Impl_.get_metaKey(modifier)));
	}
	,onMouse: function(type,x,y,button) {
		if(button > 2) return;
		this.stage.__mouseX = x;
		this.stage.__mouseY = y;
		var stack = [];
		var target = null;
		var targetPoint = new openfl.geom.Point(x,y);
		if(this.stage.__hitTest(x,y,false,stack,true)) target = stack[stack.length - 1]; else {
			target = this.stage;
			stack = [this.stage];
		}
		this.stage.__fireEvent(openfl.events.MouseEvent.__create(type,button,target == this.stage?targetPoint:target.globalToLocal(targetPoint),target),stack);
		var clickType;
		switch(type) {
		case openfl.events.MouseEvent.MOUSE_UP:
			clickType = openfl.events.MouseEvent.CLICK;
			break;
		case openfl.events.MouseEvent.MIDDLE_MOUSE_UP:
			clickType = openfl.events.MouseEvent.MIDDLE_CLICK;
			break;
		case openfl.events.MouseEvent.RIGHT_MOUSE_UP:
			clickType = openfl.events.MouseEvent.RIGHT_CLICK;
			break;
		default:
			clickType = null;
		}
		if(clickType != null) {
			this.stage.__fireEvent(openfl.events.MouseEvent.__create(clickType,button,target == this.stage?targetPoint:target.globalToLocal(targetPoint),target),stack);
			if(type == openfl.events.MouseEvent.MOUSE_UP && (js.Boot.__cast(target , openfl.display.InteractiveObject)).doubleClickEnabled) {
				var currentTime = openfl.Lib.getTimer();
				if(currentTime - this.__lastClickTime < 500) {
					this.stage.__fireEvent(openfl.events.MouseEvent.__create(openfl.events.MouseEvent.DOUBLE_CLICK,button,target == this.stage?targetPoint:target.globalToLocal(targetPoint),target),stack);
					this.__lastClickTime = 0;
				} else this.__lastClickTime = currentTime;
			}
		}
		if(js.Boot.__instanceof(target,openfl.display.Sprite)) {
			var targetSprite = target;
			if(targetSprite.buttonMode && targetSprite.useHandCursor) lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.POINTER); else lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.ARROW);
		} else if(js.Boot.__instanceof(target,openfl.display.SimpleButton)) {
			var targetButton = target;
			if(targetButton.useHandCursor) lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.POINTER); else lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.ARROW);
		} else if(js.Boot.__instanceof(target,openfl.text.TextField)) {
			var targetTextField = target;
			if(targetTextField.type == openfl.text.TextFieldType.INPUT) lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.TEXT); else lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.ARROW);
		} else lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.ARROW);
		var _g = 0;
		var _g1 = this.__mouseOutStack;
		while(_g < _g1.length) {
			var target1 = _g1[_g];
			++_g;
			if(HxOverrides.indexOf(stack,target1,0) == -1) {
				HxOverrides.remove(this.__mouseOutStack,target1);
				var localPoint = target1.globalToLocal(targetPoint);
				target1.dispatchEvent(new openfl.events.MouseEvent(openfl.events.MouseEvent.MOUSE_OUT,false,false,localPoint.x,localPoint.y,target1));
			}
		}
		var _g2 = 0;
		while(_g2 < stack.length) {
			var target2 = stack[_g2];
			++_g2;
			if(HxOverrides.indexOf(this.__mouseOutStack,target2,0) == -1) {
				if(target2.hasEventListener(openfl.events.MouseEvent.MOUSE_OVER)) {
					var localPoint1 = target2.globalToLocal(targetPoint);
					target2.dispatchEvent(new openfl.events.MouseEvent(openfl.events.MouseEvent.MOUSE_OVER,false,false,localPoint1.x,localPoint1.y,target2));
				}
				if(target2.hasEventListener(openfl.events.MouseEvent.MOUSE_OUT)) this.__mouseOutStack.push(target2);
			}
		}
		if(this.stage.__dragObject != null) this.stage.__drag(targetPoint);
	}
	,onMouseDown: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl.events.MouseEvent.MIDDLE_MOUSE_DOWN;
			break;
		case 2:
			type = openfl.events.MouseEvent.RIGHT_MOUSE_DOWN;
			break;
		default:
			type = openfl.events.MouseEvent.MOUSE_DOWN;
		}
		this.onMouse(type,x,y,button);
	}
	,onMouseMove: function(x,y,button) {
		this.onMouse(openfl.events.MouseEvent.MOUSE_MOVE,x,y,0);
	}
	,onMouseUp: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl.events.MouseEvent.MIDDLE_MOUSE_UP;
			break;
		case 2:
			type = openfl.events.MouseEvent.RIGHT_MOUSE_UP;
			break;
		default:
			type = openfl.events.MouseEvent.MOUSE_UP;
		}
		this.onMouse(type,x,y,button);
	}
	,onTouch: function(type,x,y,id) {
		var point = new openfl.geom.Point(x,y);
		this.stage.__mouseX = point.x;
		this.stage.__mouseY = point.y;
		var __stack = [];
		var mouseType;
		switch(type) {
		case "touchBegin":
			mouseType = openfl.events.MouseEvent.MOUSE_DOWN;
			break;
		case "touchMove":
			mouseType = openfl.events.MouseEvent.MOUSE_MOVE;
			break;
		case "touchEnd":
			mouseType = openfl.events.MouseEvent.MOUSE_UP;
			break;
		default:
			mouseType = null;
		}
		if(this.stage.__hitTest(x,y,false,__stack,true)) {
			var target = __stack[__stack.length - 1];
			var localPoint = target.globalToLocal(point);
			var touchEvent = openfl.events.TouchEvent.__create(type,null,localPoint,target);
			touchEvent.touchPointID = id;
			touchEvent.isPrimaryTouchPoint = true;
			var mouseEvent = openfl.events.MouseEvent.__create(mouseType,0,localPoint,target);
			mouseEvent.buttonDown = type != "touchEnd";
			this.stage.__fireEvent(touchEvent,__stack);
			this.stage.__fireEvent(mouseEvent,__stack);
		} else {
			var touchEvent1 = openfl.events.TouchEvent.__create(type,null,point,this.stage);
			touchEvent1.touchPointID = id;
			touchEvent1.isPrimaryTouchPoint = true;
			var mouseEvent1 = openfl.events.MouseEvent.__create(mouseType,0,point,this.stage);
			mouseEvent1.buttonDown = type != "touchEnd";
			this.stage.__fireEvent(touchEvent1,[this.stage]);
			this.stage.__fireEvent(mouseEvent1,[this.stage]);
		}
		if(type == "touchMove" && this.stage.__dragObject != null) this.stage.__drag(point);
	}
	,onTouchMove: function(x,y,id) {
		this.onTouch("touchMove",x,y,id);
	}
	,onTouchEnd: function(x,y,id) {
		this.onTouch("touchEnd",x,y,id);
	}
	,onTouchStart: function(x,y,id) {
		this.onTouch("touchBegin",x,y,id);
	}
	,onWindowActivate: function() {
		var event = new openfl.events.Event(openfl.events.Event.ACTIVATE);
		this.stage.__broadcast(event,true);
	}
	,onWindowDeactivate: function() {
		var event = new openfl.events.Event(openfl.events.Event.DEACTIVATE);
		this.stage.__broadcast(event,true);
	}
	,onWindowResize: function(width,height) {
		this.stage.stageWidth = width;
		this.stage.stageHeight = height;
		var event = new openfl.events.Event(openfl.events.Event.RESIZE);
		this.stage.__broadcast(event,false);
	}
	,render: function(context) {
		this.stage.__render(context);
	}
	,__class__: openfl.display.Application
});
openfl.display.Bitmap = function(bitmapData,pixelSnapping,smoothing) {
	if(smoothing == null) smoothing = false;
	openfl.display.DisplayObjectContainer.call(this);
	this.bitmapData = bitmapData;
	this.pixelSnapping = pixelSnapping;
	this.smoothing = smoothing;
	if(pixelSnapping == null) this.pixelSnapping = openfl.display.PixelSnapping.AUTO;
};
$hxClasses["openfl.display.Bitmap"] = openfl.display.Bitmap;
openfl.display.Bitmap.__name__ = ["openfl","display","Bitmap"];
openfl.display.Bitmap.__super__ = openfl.display.DisplayObjectContainer;
openfl.display.Bitmap.prototype = $extend(openfl.display.DisplayObjectContainer.prototype,{
	__getBounds: function(rect,matrix) {
		if(this.bitmapData != null) {
			var bounds = new openfl.geom.Rectangle(0,0,this.bitmapData.width,this.bitmapData.height);
			bounds = bounds.transform(this.__worldTransform);
			rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || this.bitmapData == null) return false;
		var point = this.globalToLocal(new openfl.geom.Point(x,y));
		if(point.x > 0 && point.y > 0 && point.x <= this.bitmapData.width && point.y <= this.bitmapData.height) {
			if(stack != null && !interactiveOnly) stack.push(this);
			return true;
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		openfl._internal.renderer.canvas.CanvasBitmap.render(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		if(this.stage != null && this.__worldVisible && this.__renderable && this.bitmapData != null && this.bitmapData.__isValid) {
			if(this.bitmapData.__image.buffer.__srcImage != null) openfl._internal.renderer.dom.DOMBitmap.renderImage(this,renderSession); else openfl._internal.renderer.dom.DOMBitmap.renderCanvas(this,renderSession);
		} else {
			if(this.__image != null) {
				renderSession.element.removeChild(this.__image);
				this.__image = null;
				this.__style = null;
			}
			if(this.__canvas != null) {
				renderSession.element.removeChild(this.__canvas);
				this.__canvas = null;
				this.__style = null;
			}
		}
	}
	,__renderGL: function(renderSession) {
		openfl._internal.renderer.opengl.GLBitmap.render(this,renderSession);
	}
	,__renderMask: function(renderSession) {
		renderSession.context.rect(0,0,this.get_width(),this.get_height());
	}
	,get_height: function() {
		if(this.bitmapData != null) return this.bitmapData.height * this.get_scaleY();
		return 0;
	}
	,set_height: function(value) {
		if(this.bitmapData != null) {
			if(value != this.bitmapData.height) {
				if(!this.__transformDirty) {
					this.__transformDirty = true;
					openfl.display.DisplayObject.__worldTransformDirty++;
				}
				this.set_scaleY(value / this.bitmapData.height);
			}
			return value;
		}
		return 0;
	}
	,get_width: function() {
		if(this.bitmapData != null) return this.bitmapData.width * this.get_scaleX();
		return 0;
	}
	,set_width: function(value) {
		if(this.bitmapData != null) {
			if(value != this.bitmapData.width) {
				if(!this.__transformDirty) {
					this.__transformDirty = true;
					openfl.display.DisplayObject.__worldTransformDirty++;
				}
				this.set_scaleX(value / this.bitmapData.width);
			}
			return value;
		}
		return 0;
	}
	,__class__: openfl.display.Bitmap
});
openfl.display.BitmapData = function(width,height,transparent,fillColor) {
	if(fillColor == null) fillColor = -1;
	if(transparent == null) transparent = true;
	this.transparent = transparent;
	if(width > 0 && height > 0) {
		this.width = width;
		this.height = height;
		this.rect = new openfl.geom.Rectangle(0,0,width,height);
		if(transparent) {
			if((function($this) {
				var $r;
				var $int = fillColor & -16777216;
				$r = $int < 0?4294967296.0 + $int:$int + 0.0;
				return $r;
			}(this)) == 0) fillColor = 0;
		} else fillColor = -16777216 | fillColor & 16777215;
		this.__image = new lime.graphics.Image(null,0,0,width,height,fillColor);
		this.__image.set_transparent(transparent);
		this.__isValid = true;
	}
	this.__createUVs();
};
$hxClasses["openfl.display.BitmapData"] = openfl.display.BitmapData;
openfl.display.BitmapData.__name__ = ["openfl","display","BitmapData"];
openfl.display.BitmapData.__interfaces__ = [openfl.display.IBitmapDrawable];
openfl.display.BitmapData.fromBase64 = function(base64,type,onload) {
	var bitmapData = new openfl.display.BitmapData(0,0,true);
	bitmapData.__loadFromBase64(base64,type,onload);
	return bitmapData;
};
openfl.display.BitmapData.fromBytes = function(bytes,rawAlpha,onload) {
	var bitmapData = new openfl.display.BitmapData(0,0,true);
	bitmapData.__loadFromBytes(bytes,rawAlpha,onload);
	return bitmapData;
};
openfl.display.BitmapData.fromCanvas = function(canvas,transparent) {
	if(transparent == null) transparent = true;
	var bitmapData = new openfl.display.BitmapData(0,0,transparent);
	bitmapData.__loadFromImage(lime.graphics.Image.fromCanvas(canvas));
	bitmapData.__image.set_transparent(transparent);
	return bitmapData;
};
openfl.display.BitmapData.fromFile = function(path,onload,onerror) {
	var bitmapData = new openfl.display.BitmapData(0,0,true);
	bitmapData.__loadFromFile(path,onload,onerror);
	return bitmapData;
};
openfl.display.BitmapData.fromImage = function(image,transparent) {
	if(transparent == null) transparent = true;
	var bitmapData = new openfl.display.BitmapData(0,0,transparent);
	bitmapData.__loadFromImage(image);
	bitmapData.__image.set_transparent(transparent);
	return bitmapData;
};
openfl.display.BitmapData.__flipPixel = function(pixel) {
	return (pixel & 255) << 24 | (pixel >> 8 & 255) << 16 | (pixel >> 16 & 255) << 8 | pixel >> 24 & 255;
};
openfl.display.BitmapData.__ucompare = function(n1,n2) {
	var tmp1;
	var tmp2;
	tmp1 = n1 >> 24 & 255;
	tmp2 = n2 >> 24 & 255;
	if(tmp1 != tmp2) if(tmp1 > tmp2) return 1; else return -1; else {
		tmp1 = n1 >> 16 & 255;
		tmp2 = n2 >> 16 & 255;
		if(tmp1 != tmp2) if(tmp1 > tmp2) return 1; else return -1; else {
			tmp1 = n1 >> 8 & 255;
			tmp2 = n2 >> 8 & 255;
			if(tmp1 != tmp2) if(tmp1 > tmp2) return 1; else return -1; else {
				tmp1 = n1 & 255;
				tmp2 = n2 & 255;
				if(tmp1 != tmp2) if(tmp1 > tmp2) return 1; else return -1; else return 0;
			}
		}
	}
};
openfl.display.BitmapData.prototype = {
	applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
		if(!this.__isValid || sourceBitmapData == null || !sourceBitmapData.__isValid) return;
		lime.graphics.utils.ImageCanvasUtil.convertToCanvas(this.__image);
		lime.graphics.utils.ImageCanvasUtil.createImageData(this.__image);
		lime.graphics.utils.ImageCanvasUtil.convertToCanvas(sourceBitmapData.__image);
		lime.graphics.utils.ImageCanvasUtil.createImageData(sourceBitmapData.__image);
		filter.__applyFilter(this.__image.buffer.__srcImageData,sourceBitmapData.__image.buffer.__srcImageData,sourceRect,destPoint);
		this.__image.dirty = true;
	}
	,clone: function() {
		if(!this.__isValid) return new openfl.display.BitmapData(this.width,this.height,this.transparent); else return openfl.display.BitmapData.fromImage(this.__image.clone(),this.transparent);
	}
	,colorTransform: function(rect,colorTransform) {
		this.__image.colorTransform(rect.__toLimeRectangle(),colorTransform.__toLimeColorMatrix());
	}
	,copyChannel: function(sourceBitmapData,sourceRect,destPoint,sourceChannel,destChannel) {
		if(!this.__isValid) return;
		var sourceChannel1;
		switch(sourceChannel) {
		case 1:
			sourceChannel1 = lime.graphics.ImageChannel.RED;
			break;
		case 2:
			sourceChannel1 = lime.graphics.ImageChannel.GREEN;
			break;
		case 4:
			sourceChannel1 = lime.graphics.ImageChannel.BLUE;
			break;
		case 8:
			sourceChannel1 = lime.graphics.ImageChannel.ALPHA;
			break;
		default:
			return;
		}
		var destChannel1;
		switch(destChannel) {
		case 1:
			destChannel1 = lime.graphics.ImageChannel.RED;
			break;
		case 2:
			destChannel1 = lime.graphics.ImageChannel.GREEN;
			break;
		case 4:
			destChannel1 = lime.graphics.ImageChannel.BLUE;
			break;
		case 8:
			destChannel1 = lime.graphics.ImageChannel.ALPHA;
			break;
		default:
			return;
		}
		this.__image.copyChannel(sourceBitmapData.__image,sourceRect.__toLimeRectangle(),destPoint.__toLimeVector2(),sourceChannel1,destChannel1);
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(!this.__isValid || sourceBitmapData == null) return;
		this.__image.copyPixels(sourceBitmapData.__image,sourceRect.__toLimeRectangle(),destPoint.__toLimeVector2(),alphaBitmapData != null?alphaBitmapData.__image:null,alphaPoint != null?alphaPoint.__toLimeVector2():null,mergeAlpha);
	}
	,dispose: function() {
		this.__image = null;
		this.width = 0;
		this.height = 0;
		this.rect = null;
		this.__isValid = false;
	}
	,draw: function(source,matrix,colorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		if(!this.__isValid) return;
		var _g = this.__image.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.convertToCanvas(this.__image);
			lime.graphics.utils.ImageCanvasUtil.sync(this.__image);
			var buffer = this.__image.buffer;
			var renderSession = new openfl._internal.renderer.RenderSession();
			renderSession.context = buffer.__srcContext;
			renderSession.roundPixels = true;
			if(!smoothing) {
				buffer.__srcContext.mozImageSmoothingEnabled = false;
				buffer.__srcContext.webkitImageSmoothingEnabled = false;
				buffer.__srcContext.imageSmoothingEnabled = false;
			}
			var matrixCache = source.__worldTransform;
			if(matrix != null) source.__worldTransform = matrix; else source.__worldTransform = new openfl.geom.Matrix();
			source.__updateChildren(false);
			source.__renderCanvas(renderSession);
			source.__worldTransform = matrixCache;
			source.__updateChildren(true);
			if(!smoothing) {
				buffer.__srcContext.mozImageSmoothingEnabled = true;
				buffer.__srcContext.webkitImageSmoothingEnabled = true;
				buffer.__srcContext.imageSmoothingEnabled = true;
			}
			buffer.__srcContext.setTransform(1,0,0,1,0,0);
			break;
		default:
		}
	}
	,encode: function(rect,compressor,byteArray) {
		if(!this.__isValid || rect == null) return byteArray = null;
		if(js.Boot.__instanceof(compressor,openfl.display.PNGEncoderOptions)) return byteArray = this.__image.encode("png"); else if(js.Boot.__instanceof(compressor,openfl.display.JPEGEncoderOptions)) return byteArray = this.__image.encode("jpg",(js.Boot.__cast(compressor , openfl.display.JPEGEncoderOptions)).quality);
		return byteArray = null;
	}
	,fillRect: function(rect,color) {
		if(!this.__isValid || rect == null) return;
		this.__image.fillRect(rect.__toLimeRectangle(),color);
	}
	,floodFill: function(x,y,color) {
		if(!this.__isValid) return;
		this.__image.floodFill(x,y,color);
	}
	,generateFilterRect: function(sourceRect,filter) {
		return sourceRect.clone();
	}
	,getBuffer: function(gl) {
		if(this.__buffer == null) {
			var data = [this.width,this.height,0,1,1,0,this.height,0,0,1,this.width,0,0,1,0,0,0,0,0,0];
			this.__buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER,this.__buffer);
			gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER,null);
		}
		return this.__buffer;
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) findColor = true;
		return this.__image.get_rect().__toFlashRectangle();
	}
	,getPixel: function(x,y) {
		if(!this.__isValid) return 0;
		return this.__image.getPixel(x,y);
	}
	,getPixel32: function(x,y) {
		if(!this.__isValid) return 0;
		return this.__image.getPixel32(x,y);
	}
	,getPixels: function(rect) {
		if(!this.__isValid) return null;
		if(rect == null) rect = this.rect;
		return this.__image.getPixels(rect.__toLimeRectangle());
	}
	,getTexture: function(gl) {
		if(this.__texture == null) {
			this.__texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D,this.__texture);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
			this.__image.dirty = true;
		}
		if(this.__image.dirty) {
			gl.bindTexture(gl.TEXTURE_2D,this.__texture);
			var textureImage = this.__image.clone();
			textureImage.set_premultiplied(true);
			gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,this.width,this.height,0,gl.RGBA,gl.UNSIGNED_BYTE,textureImage.get_data());
			gl.bindTexture(gl.TEXTURE_2D,null);
			this.__image.dirty = false;
		}
		return this.__texture;
	}
	,getVector: function(rect) {
		var pixels = this.getPixels(rect);
		var length = pixels.length / 4 | 0;
		var result;
		var this1;
		this1 = new openfl.VectorData();
		var this2;
		this2 = new Array(length);
		this1.data = this2;
		this1.length = length;
		this1.fixed = true;
		result = this1;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var value = pixels.readUnsignedInt();
			if(!result.fixed) {
				if(i >= result.length) result.length = i + 1;
				if(result.data.length < result.length) {
					var data;
					var this3;
					this3 = new Array(result.data.length + 10);
					data = this3;
					haxe.ds._Vector.Vector_Impl_.blit(result.data,0,data,0,result.data.length);
					result.data = data;
				}
			}
			result.data[i] = value;
		}
		return result;
	}
	,histogram: function(hRect) {
		var rect;
		if(hRect != null) rect = hRect; else rect = new openfl.geom.Rectangle(0,0,this.width,this.height);
		var pixels = this.getPixels(rect);
		var result;
		var _g = [];
		var _g1 = 0;
		while(_g1 < 4) {
			var i = _g1++;
			_g.push((function($this) {
				var $r;
				var _g2 = [];
				{
					var _g3 = 0;
					while(_g3 < 256) {
						var j = _g3++;
						_g2.push(0);
					}
				}
				$r = _g2;
				return $r;
			}(this)));
		}
		result = _g;
		var _g21 = 0;
		var _g11 = pixels.length;
		while(_g21 < _g11) {
			var i1 = _g21++;
			++result[i1 % 4][pixels.readUnsignedByte()];
		}
		return result;
	}
	,hitTest: function(firstPoint,firstAlphaThreshold,secondObject,secondBitmapDataPoint,secondAlphaThreshold) {
		if(secondAlphaThreshold == null) secondAlphaThreshold = 1;
		if(!this.__isValid) return false;
		openfl.Lib.notImplemented("BitmapData.hitTest");
		return false;
	}
	,lock: function() {
	}
	,merge: function(sourceBitmapData,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
		if(!this.__isValid || sourceBitmapData == null || !sourceBitmapData.__isValid || sourceRect == null || destPoint == null) return;
		this.__image.merge(sourceBitmapData.__image,sourceRect.__toLimeRectangle(),destPoint.__toLimeVector2(),redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
	}
	,noise: function(randomSeed,low,high,channelOptions,grayScale) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		if(high == null) high = 255;
		if(low == null) low = 0;
		if(!this.__isValid) return;
		openfl.Lib.notImplemented("BitmapData.noise");
	}
	,paletteMap: function(sourceBitmapData,sourceRect,destPoint,redArray,greenArray,blueArray,alphaArray) {
		var sw = sourceRect.width | 0;
		var sh = sourceRect.height | 0;
		var pixels = this.getPixels(sourceRect);
		pixels.position = 0;
		var pixelValue;
		var r;
		var g;
		var b;
		var a;
		var color;
		var c1;
		var c2;
		var c3;
		var c4;
		var _g1 = 0;
		var _g = sh * sw;
		while(_g1 < _g) {
			var i = _g1++;
			pixelValue = pixels.readUnsignedInt();
			if(alphaArray == null) c1 = pixelValue & -16777216; else c1 = alphaArray[pixelValue >> 24 & 255];
			if(redArray == null) c2 = pixelValue & 16711680; else c2 = redArray[pixelValue >> 16 & 255];
			if(greenArray == null) c3 = pixelValue & 65280; else c3 = greenArray[pixelValue >> 8 & 255];
			if(blueArray == null) c4 = pixelValue & 255; else c4 = blueArray[pixelValue & 255];
			a = (c1 >> 24 & 255) + (c2 >> 24 & 255) + (c3 >> 24 & 255) + (c4 >> 24 & 255);
			if(a > 255) a == 255;
			r = (c1 >> 16 & 255) + (c2 >> 16 & 255) + (c3 >> 16 & 255) + (c4 >> 16 & 255);
			if(r > 255) r == 255;
			g = (c1 >> 8 & 255) + (c2 >> 8 & 255) + (c3 >> 8 & 255) + (c4 >> 8 & 255);
			if(g > 255) g == 255;
			b = (c1 & 255) + (c2 & 255) + (c3 & 255) + (c4 & 255);
			if(b > 255) b == 255;
			color = a << 24 | r << 16 | g << 8 | b;
			pixels.position = i * 4;
			pixels.writeUnsignedInt(color);
		}
		pixels.position = 0;
		var destRect = new openfl.geom.Rectangle(destPoint.x,destPoint.y,sw,sh);
		this.setPixels(destRect,pixels);
	}
	,perlinNoise: function(baseX,baseY,numOctaves,randomSeed,stitch,fractalNoise,channelOptions,grayScale,offsets) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		openfl.Lib.notImplemented("BitmapData.perlinNoise");
	}
	,scroll: function(x,y) {
		openfl.Lib.notImplemented("BitmapData.scroll");
	}
	,setPixel: function(x,y,color) {
		if(!this.__isValid) return;
		this.__image.setPixel(x,y,color);
	}
	,setPixel32: function(x,y,color) {
		if(!this.__isValid) return;
		this.__image.setPixel32(x,y,color);
	}
	,setPixels: function(rect,byteArray) {
		if(!this.__isValid || rect == null) return;
		this.__image.setPixels(rect.__toLimeRectangle(),byteArray);
	}
	,setVector: function(rect,inputVector) {
		var byteArray = new lime.utils.ByteArray();
		byteArray.set_length(inputVector.length * 4);
		var _g = 0;
		while(_g < inputVector.length) {
			var color = inputVector.data[_g];
			++_g;
			byteArray.writeUnsignedInt(color);
		}
		byteArray.position = 0;
		this.setPixels(rect,byteArray);
	}
	,threshold: function(sourceBitmapData,sourceRect,destPoint,operation,threshold,color,mask,copySource) {
		if(copySource == null) copySource = false;
		if(mask == null) mask = -1;
		if(color == null) color = 0;
		if(sourceBitmapData == this && sourceRect.equals(this.rect) && destPoint.x == 0 && destPoint.y == 0) {
			var hits = 0;
			threshold = (threshold & 255) << 24 | (threshold >> 8 & 255) << 16 | (threshold >> 16 & 255) << 8 | threshold >> 24 & 255;
			color = (color & 255) << 24 | (color >> 8 & 255) << 16 | (color >> 16 & 255) << 8 | color >> 24 & 255;
			var memory = new lime.utils.ByteArray();
			memory.set_length(this.width * this.height * 4);
			memory = this.getPixels(this.rect);
			memory.position = 0;
			openfl.Memory.select(memory);
			var thresholdMask = threshold & mask;
			var width_yy;
			var position;
			var pixelMask;
			var pixelValue;
			var i;
			var test;
			var _g1 = 0;
			var _g = this.height;
			while(_g1 < _g) {
				var yy = _g1++;
				width_yy = this.width * yy;
				var _g3 = 0;
				var _g2 = this.width;
				while(_g3 < _g2) {
					var xx = _g3++;
					position = (width_yy + xx) * 4;
					pixelValue = openfl.Memory._setPositionTemporarily(position,function() {
						return openfl.Memory.gcRef.readInt();
					});
					pixelMask = pixelValue & mask;
					i = openfl.display.BitmapData.__ucompare(pixelMask,thresholdMask);
					test = false;
					if(operation == "==") test = i == 0; else if(operation == "<") test = i == -1; else if(operation == ">") test = i == 1; else if(operation == "!=") test = i != 0; else if(operation == "<=") test = i == 0 || i == -1; else if(operation == ">=") test = i == 0 || i == 1;
					if(test) {
						openfl.Memory.setI32(position,color);
						hits++;
					}
				}
			}
			memory.position = 0;
			this.setPixels(this.rect,memory);
			openfl.Memory.select(null);
			return hits;
		} else {
			var sx = sourceRect.x | 0;
			var sy = sourceRect.y | 0;
			var sw = sourceBitmapData.width | 0;
			var sh = sourceBitmapData.height | 0;
			var dx = destPoint.x | 0;
			var dy = destPoint.y | 0;
			var bw = this.width - sw - dx;
			var bh = this.height - sh - dy;
			var dw;
			if(bw < 0) dw = sw + (this.width - sw - dx); else dw = sw;
			var dh;
			if(bw < 0) dh = sh + (this.height - sh - dy); else dh = sh;
			var hits1 = 0;
			threshold = (threshold & 255) << 24 | (threshold >> 8 & 255) << 16 | (threshold >> 16 & 255) << 8 | threshold >> 24 & 255;
			color = (color & 255) << 24 | (color >> 8 & 255) << 16 | (color >> 16 & 255) << 8 | color >> 24 & 255;
			var canvasMemory = sw * sh * 4;
			var sourceMemory = 0;
			if(copySource) sourceMemory = sw * sh * 4;
			var totalMemory = canvasMemory + sourceMemory;
			var memory1 = new lime.utils.ByteArray();
			if(memory1.allocated < totalMemory) memory1.___resizeBuffer(memory1.allocated = Std["int"](Math.max(totalMemory,memory1.allocated * 2))); else if(memory1.allocated > totalMemory) memory1.___resizeBuffer(memory1.allocated = totalMemory);
			memory1.length = totalMemory;
			totalMemory;
			memory1.position = 0;
			var bitmapData = sourceBitmapData.clone();
			var pixels = bitmapData.getPixels(sourceRect);
			memory1.writeBytes(pixels);
			memory1.position = canvasMemory;
			if(copySource) memory1.writeBytes(pixels);
			memory1.position = 0;
			openfl.Memory.select(memory1);
			var thresholdMask1 = threshold & mask;
			var position1;
			var pixelMask1;
			var pixelValue1;
			var i1;
			var test1;
			var _g4 = 0;
			while(_g4 < dh) {
				var yy1 = _g4++;
				var _g11 = 0;
				while(_g11 < dw) {
					var xx1 = _g11++;
					position1 = (xx1 + sx + (yy1 + sy) * sw) * 4;
					pixelValue1 = openfl.Memory._setPositionTemporarily(position1,function() {
						return openfl.Memory.gcRef.readInt();
					});
					pixelMask1 = pixelValue1 & mask;
					i1 = openfl.display.BitmapData.__ucompare(pixelMask1,thresholdMask1);
					test1 = false;
					if(operation == "==") test1 = i1 == 0; else if(operation == "<") test1 = i1 == -1; else if(operation == ">") test1 = i1 == 1; else if(operation == "!=") test1 = i1 != 0; else if(operation == "<=") test1 = i1 == 0 || i1 == -1; else if(operation == ">=") test1 = i1 == 0 || i1 == 1;
					if(test1) {
						openfl.Memory.setI32(position1,color);
						hits1++;
					} else if(copySource) openfl.Memory.setI32(position1,openfl.Memory._setPositionTemporarily(canvasMemory + position1,function() {
						return openfl.Memory.gcRef.readInt();
					}));
				}
			}
			memory1.position = 0;
			bitmapData.setPixels(sourceRect,memory1);
			this.copyPixels(bitmapData,bitmapData.rect,destPoint);
			openfl.Memory.select(null);
			return hits1;
		}
	}
	,unlock: function(changeRect) {
	}
	,__createUVs: function() {
		if(this.__uvData == null) this.__uvData = new openfl.display.TextureUvs();
		this.__uvData.x0 = 0;
		this.__uvData.y0 = 0;
		this.__uvData.x1 = 1;
		this.__uvData.y1 = 0;
		this.__uvData.x2 = 1;
		this.__uvData.y2 = 1;
		this.__uvData.x3 = 0;
		this.__uvData.y3 = 1;
	}
	,__loadFromBase64: function(base64,type,onload) {
		var _g = this;
		lime.graphics.Image.fromBase64(base64,type,function(image) {
			_g.__loadFromImage(image);
			if(onload != null) onload(_g);
		});
	}
	,__loadFromBytes: function(bytes,rawAlpha,onload) {
		var _g = this;
		lime.graphics.Image.fromBytes(bytes,function(image) {
			_g.__loadFromImage(image);
			if(rawAlpha != null) {
				lime.graphics.utils.ImageCanvasUtil.convertToCanvas(_g.__image);
				lime.graphics.utils.ImageCanvasUtil.createImageData(_g.__image);
				var data = _g.__image.buffer.data;
				var _g2 = 0;
				var _g1 = rawAlpha.length;
				while(_g2 < _g1) {
					var i = _g2++;
					data[i * 4 + 3] = rawAlpha.readUnsignedByte();
				}
				_g.__image.dirty = true;
			}
			if(onload != null) onload(_g);
		});
	}
	,__loadFromFile: function(path,onload,onerror) {
		var _g = this;
		lime.graphics.Image.fromFile(path,function(image) {
			_g.__loadFromImage(image);
			if(onload != null) onload(_g);
		},onerror);
	}
	,__loadFromImage: function(image) {
		this.__image = image;
		this.width = image.width;
		this.height = image.height;
		this.rect = new openfl.geom.Rectangle(0,0,image.width,image.height);
		this.__isValid = true;
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__isValid) return;
		lime.graphics.utils.ImageCanvasUtil.sync(this.__image);
		var context = renderSession.context;
		if(this.__worldTransform == null) this.__worldTransform = new openfl.geom.Matrix();
		context.globalAlpha = 1;
		var transform = this.__worldTransform;
		if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		context.drawImage(this.__image.buffer.get_src(),0,0);
	}
	,__renderMask: function(renderSession) {
	}
	,__sync: function() {
		lime.graphics.utils.ImageCanvasUtil.sync(this.__image);
	}
	,__updateChildren: function(transformOnly) {
	}
	,__class__: openfl.display.BitmapData
};
openfl.display.TextureUvs = function() {
	this.y3 = 0;
	this.y2 = 0;
	this.y1 = 0;
	this.y0 = 0;
	this.x3 = 0;
	this.x2 = 0;
	this.x1 = 0;
	this.x0 = 0;
};
$hxClasses["openfl.display.TextureUvs"] = openfl.display.TextureUvs;
openfl.display.TextureUvs.__name__ = ["openfl","display","TextureUvs"];
openfl.display.TextureUvs.prototype = {
	__class__: openfl.display.TextureUvs
};
openfl.display.BlendMode = $hxClasses["openfl.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] };
openfl.display.BlendMode.ADD = ["ADD",0];
openfl.display.BlendMode.ADD.toString = $estr;
openfl.display.BlendMode.ADD.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.ALPHA = ["ALPHA",1];
openfl.display.BlendMode.ALPHA.toString = $estr;
openfl.display.BlendMode.ALPHA.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.DARKEN = ["DARKEN",2];
openfl.display.BlendMode.DARKEN.toString = $estr;
openfl.display.BlendMode.DARKEN.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
openfl.display.BlendMode.DIFFERENCE.toString = $estr;
openfl.display.BlendMode.DIFFERENCE.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.ERASE = ["ERASE",4];
openfl.display.BlendMode.ERASE.toString = $estr;
openfl.display.BlendMode.ERASE.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
openfl.display.BlendMode.HARDLIGHT.toString = $estr;
openfl.display.BlendMode.HARDLIGHT.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.INVERT = ["INVERT",6];
openfl.display.BlendMode.INVERT.toString = $estr;
openfl.display.BlendMode.INVERT.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.LAYER = ["LAYER",7];
openfl.display.BlendMode.LAYER.toString = $estr;
openfl.display.BlendMode.LAYER.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
openfl.display.BlendMode.LIGHTEN.toString = $estr;
openfl.display.BlendMode.LIGHTEN.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
openfl.display.BlendMode.MULTIPLY.toString = $estr;
openfl.display.BlendMode.MULTIPLY.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.NORMAL = ["NORMAL",10];
openfl.display.BlendMode.NORMAL.toString = $estr;
openfl.display.BlendMode.NORMAL.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.OVERLAY = ["OVERLAY",11];
openfl.display.BlendMode.OVERLAY.toString = $estr;
openfl.display.BlendMode.OVERLAY.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.SCREEN = ["SCREEN",12];
openfl.display.BlendMode.SCREEN.toString = $estr;
openfl.display.BlendMode.SCREEN.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
openfl.display.BlendMode.SUBTRACT.toString = $estr;
openfl.display.BlendMode.SUBTRACT.__enum__ = openfl.display.BlendMode;
openfl.display.CapsStyle = $hxClasses["openfl.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] };
openfl.display.CapsStyle.NONE = ["NONE",0];
openfl.display.CapsStyle.NONE.toString = $estr;
openfl.display.CapsStyle.NONE.__enum__ = openfl.display.CapsStyle;
openfl.display.CapsStyle.ROUND = ["ROUND",1];
openfl.display.CapsStyle.ROUND.toString = $estr;
openfl.display.CapsStyle.ROUND.__enum__ = openfl.display.CapsStyle;
openfl.display.CapsStyle.SQUARE = ["SQUARE",2];
openfl.display.CapsStyle.SQUARE.toString = $estr;
openfl.display.CapsStyle.SQUARE.__enum__ = openfl.display.CapsStyle;
openfl.display.DirectRenderer = function(type) {
	if(type == null) type = "DirectRenderer";
	openfl.display.DisplayObject.call(this);
};
$hxClasses["openfl.display.DirectRenderer"] = openfl.display.DirectRenderer;
openfl.display.DirectRenderer.__name__ = ["openfl","display","DirectRenderer"];
openfl.display.DirectRenderer.__super__ = openfl.display.DisplayObject;
openfl.display.DirectRenderer.prototype = $extend(openfl.display.DisplayObject.prototype,{
	get_render: function() {
		return this.__render;
	}
	,set_render: function(value) {
		return this.__render = value;
	}
	,__class__: openfl.display.DirectRenderer
	,__properties__: $extend(openfl.display.DisplayObject.prototype.__properties__,{set_render:"set_render",get_render:"get_render"})
});
openfl.display.FrameLabel = function(name,frame) {
	openfl.events.EventDispatcher.call(this);
	this.__name = name;
	this.__frame = frame;
};
$hxClasses["openfl.display.FrameLabel"] = openfl.display.FrameLabel;
openfl.display.FrameLabel.__name__ = ["openfl","display","FrameLabel"];
openfl.display.FrameLabel.__super__ = openfl.events.EventDispatcher;
openfl.display.FrameLabel.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	get_frame: function() {
		return this.__frame;
	}
	,get_name: function() {
		return this.__name;
	}
	,__class__: openfl.display.FrameLabel
	,__properties__: {get_name:"get_name",get_frame:"get_frame"}
});
openfl.display.GradientType = $hxClasses["openfl.display.GradientType"] = { __ename__ : true, __constructs__ : ["RADIAL","LINEAR"] };
openfl.display.GradientType.RADIAL = ["RADIAL",0];
openfl.display.GradientType.RADIAL.toString = $estr;
openfl.display.GradientType.RADIAL.__enum__ = openfl.display.GradientType;
openfl.display.GradientType.LINEAR = ["LINEAR",1];
openfl.display.GradientType.LINEAR.toString = $estr;
openfl.display.GradientType.LINEAR.__enum__ = openfl.display.GradientType;
openfl.display.Graphics = function() {
	this.__visible = true;
	this.__glStack = [];
	this.__dirty = true;
	this.__commands = [];
	this.__commands = new Array();
	this.__halfStrokeWidth = 0;
	this.__positionX = 0;
	this.__positionY = 0;
};
$hxClasses["openfl.display.Graphics"] = openfl.display.Graphics;
openfl.display.Graphics.__name__ = ["openfl","display","Graphics"];
openfl.display.Graphics.prototype = {
	beginBitmapFill: function(bitmap,matrix,repeat,smooth) {
		if(smooth == null) smooth = false;
		if(repeat == null) repeat = true;
		this.__commands.push(openfl.display.DrawCommand.BeginBitmapFill(bitmap,matrix != null?new openfl.geom.Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty):null,repeat,smooth));
		this.__visible = true;
	}
	,beginFill: function(color,alpha) {
		if(alpha == null) alpha = 1;
		if(color == null) color = 0;
		this.__commands.push(openfl.display.DrawCommand.BeginFill(color & 16777215,alpha));
		if(alpha > 0) this.__visible = true;
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		openfl.Lib.notImplemented("Graphics.beginGradientFill");
	}
	,clear: function() {
		this.__commands = new Array();
		this.__halfStrokeWidth = 0;
		if(this.__bounds != null) {
			this.__dirty = true;
			this.__transformDirty = true;
			this.__bounds = null;
		}
		this.__visible = false;
	}
	,copyFrom: function(sourceGraphics) {
		this.__bounds = sourceGraphics.__bounds.clone();
		this.__commands = sourceGraphics.__commands.slice();
		this.__dirty = true;
		this.__halfStrokeWidth = sourceGraphics.__halfStrokeWidth;
		this.__positionX = sourceGraphics.__positionX;
		this.__positionY = sourceGraphics.__positionY;
		this.__transformDirty = true;
		this.__visible = sourceGraphics.__visible;
	}
	,cubicCurveTo: function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) {
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__inflateBounds(controlX1,controlY1);
		this.__inflateBounds(controlX2,controlY2);
		this.__positionX = anchorX;
		this.__positionY = anchorY;
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.CubicCurveTo(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY));
		this.__dirty = true;
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__inflateBounds(controlX,controlY);
		this.__positionX = anchorX;
		this.__positionY = anchorY;
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.CurveTo(controlX,controlY,anchorX,anchorY));
		this.__dirty = true;
	}
	,drawCircle: function(x,y,radius) {
		if(radius <= 0) return;
		this.__inflateBounds(x - radius - this.__halfStrokeWidth,y - radius - this.__halfStrokeWidth);
		this.__inflateBounds(x + radius + this.__halfStrokeWidth,y + radius + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.DrawCircle(x,y,radius));
		this.__dirty = true;
	}
	,drawEllipse: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.DrawEllipse(x,y,width,height));
		this.__dirty = true;
	}
	,drawGraphicsData: function(graphicsData) {
		openfl.Lib.notImplemented("Graphics.drawGraphicsData");
	}
	,drawPath: function(commands,data,winding) {
		var dataIndex = 0;
		var _g = 0;
		while(_g < commands.length) {
			var command = commands.data[_g];
			++_g;
			switch(command) {
			case 1:
				this.moveTo(data.data[dataIndex],data.data[dataIndex + 1]);
				dataIndex += 2;
				break;
			case 2:
				this.lineTo(data.data[dataIndex],data.data[dataIndex + 1]);
				dataIndex += 2;
				break;
			case 3:
				this.curveTo(data.data[dataIndex],data.data[dataIndex + 1],data.data[dataIndex + 2],data.data[dataIndex + 3]);
				dataIndex += 4;
				break;
			case 6:
				this.cubicCurveTo(data.data[dataIndex],data.data[dataIndex + 1],data.data[dataIndex + 2],data.data[dataIndex + 3],data.data[dataIndex + 4],data.data[dataIndex + 5]);
				dataIndex += 6;
				break;
			default:
			}
		}
	}
	,drawRect: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.DrawRect(x,y,width,height));
		this.__dirty = true;
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.DrawRoundRect(x,y,width,height,rx,ry));
		this.__dirty = true;
	}
	,drawRoundRectComplex: function(x,y,width,height,topLeftRadius,topRightRadius,bottomLeftRadius,bottomRightRadius) {
		openfl.Lib.notImplemented("Graphics.drawRoundRectComplex");
	}
	,drawTiles: function(sheet,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.__inflateBounds(0,0);
		this.__inflateBounds(openfl.Lib.current.stage.stageWidth,openfl.Lib.current.stage.stageHeight);
		this.__commands.push(openfl.display.DrawCommand.DrawTiles(sheet,tileData,smooth,flags,count));
		this.__dirty = true;
		this.__visible = true;
	}
	,drawTriangles: function(vertices,indices,uvtData,culling,colors,blendMode) {
		if(blendMode == null) blendMode = 0;
		var vlen = vertices.length / 2 | 0;
		if(culling == null) culling = openfl.display.TriangleCulling.NONE;
		if(indices == null) {
			if(vlen % 3 != 0) throw new openfl.errors.ArgumentError("Not enough vertices to close a triangle.");
			var this1;
			this1 = new openfl.VectorData();
			var this2;
			this2 = new Array(0);
			this1.data = this2;
			this1.length = 0;
			this1.fixed = false;
			indices = this1;
			var _g = 0;
			while(_g < vlen) {
				var i = _g++;
				if(!indices.fixed) {
					indices.length++;
					if(indices.data.length < indices.length) {
						var data;
						var this3;
						this3 = new Array(indices.data.length + 10);
						data = this3;
						haxe.ds._Vector.Vector_Impl_.blit(indices.data,0,data,0,indices.data.length);
						indices.data = data;
					}
					indices.data[indices.length - 1] = i;
				}
				indices.length;
			}
		}
		this.__inflateBounds(0,0);
		var tmpx = Math.NEGATIVE_INFINITY;
		var tmpy = Math.NEGATIVE_INFINITY;
		var maxX = Math.NEGATIVE_INFINITY;
		var maxY = Math.NEGATIVE_INFINITY;
		var _g1 = 0;
		while(_g1 < vlen) {
			var i1 = _g1++;
			tmpx = vertices.data[i1 * 2];
			tmpy = vertices.data[i1 * 2 + 1];
			if(maxX < tmpx) maxX = tmpx;
			if(maxY < tmpy) maxY = tmpy;
		}
		this.__inflateBounds(maxX,maxY);
		this.__commands.push(openfl.display.DrawCommand.DrawTriangles(vertices,indices,uvtData,culling,colors,blendMode));
		this.__dirty = true;
		this.__visible = true;
	}
	,endFill: function() {
		this.__commands.push(openfl.display.DrawCommand.EndFill);
	}
	,lineBitmapStyle: function(bitmap,matrix,repeat,smooth) {
		if(smooth == null) smooth = false;
		if(repeat == null) repeat = true;
		openfl.Lib.notImplemented("Graphics.lineBitmapStyle");
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		openfl.Lib.notImplemented("Graphics.lineGradientStyle");
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		if(thickness != null) this.__halfStrokeWidth = thickness / 2; else this.__halfStrokeWidth = 0;
		this.__commands.push(openfl.display.DrawCommand.LineStyle(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit));
		if(thickness != null) this.__visible = true;
	}
	,lineTo: function(x,y) {
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__positionX = x;
		this.__positionY = y;
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.LineTo(x,y));
		this.__dirty = true;
	}
	,moveTo: function(x,y) {
		this.__positionX = x;
		this.__positionY = y;
		this.__commands.push(openfl.display.DrawCommand.MoveTo(x,y));
	}
	,__getBounds: function(rect,matrix) {
		if(this.__bounds == null) return;
		var bounds = this.__bounds.clone().transform(matrix);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__hitTest: function(x,y,shapeFlag,matrix) {
		if(this.__bounds == null) return false;
		var bounds = this.__bounds.clone().transform(matrix);
		return x > bounds.x && y > bounds.y && x <= bounds.get_right() && y <= bounds.get_bottom();
	}
	,__inflateBounds: function(x,y) {
		if(this.__bounds == null) {
			this.__bounds = new openfl.geom.Rectangle(x,y,0,0);
			this.__transformDirty = true;
			return;
		}
		if(x < this.__bounds.x) {
			this.__bounds.width += this.__bounds.x - x;
			this.__bounds.x = x;
			this.__transformDirty = true;
		}
		if(y < this.__bounds.y) {
			this.__bounds.height += this.__bounds.y - y;
			this.__bounds.y = y;
			this.__transformDirty = true;
		}
		if(x > this.__bounds.x + this.__bounds.width) this.__bounds.width = x - this.__bounds.x;
		if(y > this.__bounds.y + this.__bounds.height) this.__bounds.height = y - this.__bounds.y;
	}
	,__class__: openfl.display.Graphics
};
openfl.display.DrawCommand = $hxClasses["openfl.display.DrawCommand"] = { __ename__ : true, __constructs__ : ["BeginBitmapFill","BeginFill","CubicCurveTo","CurveTo","DrawCircle","DrawEllipse","DrawRect","DrawRoundRect","DrawTiles","DrawTriangles","EndFill","LineStyle","LineTo","MoveTo"] };
openfl.display.DrawCommand.BeginBitmapFill = function(bitmap,matrix,repeat,smooth) { var $x = ["BeginBitmapFill",0,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.BeginFill = function(color,alpha) { var $x = ["BeginFill",1,color,alpha]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.CubicCurveTo = function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) { var $x = ["CubicCurveTo",2,controlX1,controlY1,controlX2,controlY2,anchorX,anchorY]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.CurveTo = function(controlX,controlY,anchorX,anchorY) { var $x = ["CurveTo",3,controlX,controlY,anchorX,anchorY]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawCircle = function(x,y,radius) { var $x = ["DrawCircle",4,x,y,radius]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawEllipse = function(x,y,width,height) { var $x = ["DrawEllipse",5,x,y,width,height]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawRect = function(x,y,width,height) { var $x = ["DrawRect",6,x,y,width,height]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawRoundRect = function(x,y,width,height,rx,ry) { var $x = ["DrawRoundRect",7,x,y,width,height,rx,ry]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",8,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",9,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.EndFill = ["EndFill",10];
openfl.display.DrawCommand.EndFill.toString = $estr;
openfl.display.DrawCommand.EndFill.__enum__ = openfl.display.DrawCommand;
openfl.display.DrawCommand.LineStyle = function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) { var $x = ["LineStyle",11,thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.LineTo = function(x,y) { var $x = ["LineTo",12,x,y]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.MoveTo = function(x,y) { var $x = ["MoveTo",13,x,y]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.GraphicsPathCommand = function() { };
$hxClasses["openfl.display.GraphicsPathCommand"] = openfl.display.GraphicsPathCommand;
openfl.display.GraphicsPathCommand.__name__ = ["openfl","display","GraphicsPathCommand"];
openfl.display.GraphicsPathWinding = $hxClasses["openfl.display.GraphicsPathWinding"] = { __ename__ : true, __constructs__ : ["EVEN_ODD","NON_ZERO"] };
openfl.display.GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
openfl.display.GraphicsPathWinding.EVEN_ODD.toString = $estr;
openfl.display.GraphicsPathWinding.EVEN_ODD.__enum__ = openfl.display.GraphicsPathWinding;
openfl.display.GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
openfl.display.GraphicsPathWinding.NON_ZERO.toString = $estr;
openfl.display.GraphicsPathWinding.NON_ZERO.__enum__ = openfl.display.GraphicsPathWinding;
openfl.display.IGraphicsData = function() { };
$hxClasses["openfl.display.IGraphicsData"] = openfl.display.IGraphicsData;
openfl.display.IGraphicsData.__name__ = ["openfl","display","IGraphicsData"];
openfl.display.IGraphicsData.prototype = {
	__class__: openfl.display.IGraphicsData
};
openfl.display.GraphicsDataType = $hxClasses["openfl.display.GraphicsDataType"] = { __ename__ : true, __constructs__ : ["STROKE","SOLID","GRADIENT","PATH","BITMAP","END"] };
openfl.display.GraphicsDataType.STROKE = ["STROKE",0];
openfl.display.GraphicsDataType.STROKE.toString = $estr;
openfl.display.GraphicsDataType.STROKE.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.SOLID = ["SOLID",1];
openfl.display.GraphicsDataType.SOLID.toString = $estr;
openfl.display.GraphicsDataType.SOLID.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.GRADIENT = ["GRADIENT",2];
openfl.display.GraphicsDataType.GRADIENT.toString = $estr;
openfl.display.GraphicsDataType.GRADIENT.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.PATH = ["PATH",3];
openfl.display.GraphicsDataType.PATH.toString = $estr;
openfl.display.GraphicsDataType.PATH.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.BITMAP = ["BITMAP",4];
openfl.display.GraphicsDataType.BITMAP.toString = $estr;
openfl.display.GraphicsDataType.BITMAP.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.END = ["END",5];
openfl.display.GraphicsDataType.END.toString = $estr;
openfl.display.GraphicsDataType.END.__enum__ = openfl.display.GraphicsDataType;
openfl.display.InterpolationMethod = $hxClasses["openfl.display.InterpolationMethod"] = { __ename__ : true, __constructs__ : ["RGB","LINEAR_RGB"] };
openfl.display.InterpolationMethod.RGB = ["RGB",0];
openfl.display.InterpolationMethod.RGB.toString = $estr;
openfl.display.InterpolationMethod.RGB.__enum__ = openfl.display.InterpolationMethod;
openfl.display.InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
openfl.display.InterpolationMethod.LINEAR_RGB.toString = $estr;
openfl.display.InterpolationMethod.LINEAR_RGB.__enum__ = openfl.display.InterpolationMethod;
openfl.display.JPEGEncoderOptions = function(quality) {
	if(quality == null) quality = 80;
	this.quality = quality;
};
$hxClasses["openfl.display.JPEGEncoderOptions"] = openfl.display.JPEGEncoderOptions;
openfl.display.JPEGEncoderOptions.__name__ = ["openfl","display","JPEGEncoderOptions"];
openfl.display.JPEGEncoderOptions.prototype = {
	__class__: openfl.display.JPEGEncoderOptions
};
openfl.display.JointStyle = $hxClasses["openfl.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] };
openfl.display.JointStyle.MITER = ["MITER",0];
openfl.display.JointStyle.MITER.toString = $estr;
openfl.display.JointStyle.MITER.__enum__ = openfl.display.JointStyle;
openfl.display.JointStyle.ROUND = ["ROUND",1];
openfl.display.JointStyle.ROUND.toString = $estr;
openfl.display.JointStyle.ROUND.__enum__ = openfl.display.JointStyle;
openfl.display.JointStyle.BEVEL = ["BEVEL",2];
openfl.display.JointStyle.BEVEL.toString = $estr;
openfl.display.JointStyle.BEVEL.__enum__ = openfl.display.JointStyle;
openfl.display.LineScaleMode = $hxClasses["openfl.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] };
openfl.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
openfl.display.LineScaleMode.HORIZONTAL.toString = $estr;
openfl.display.LineScaleMode.HORIZONTAL.__enum__ = openfl.display.LineScaleMode;
openfl.display.LineScaleMode.NONE = ["NONE",1];
openfl.display.LineScaleMode.NONE.toString = $estr;
openfl.display.LineScaleMode.NONE.__enum__ = openfl.display.LineScaleMode;
openfl.display.LineScaleMode.NORMAL = ["NORMAL",2];
openfl.display.LineScaleMode.NORMAL.toString = $estr;
openfl.display.LineScaleMode.NORMAL.__enum__ = openfl.display.LineScaleMode;
openfl.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
openfl.display.LineScaleMode.VERTICAL.toString = $estr;
openfl.display.LineScaleMode.VERTICAL.__enum__ = openfl.display.LineScaleMode;
openfl.display.Loader = function() {
	openfl.display.Sprite.call(this);
	this.contentLoaderInfo = openfl.display.LoaderInfo.create(this);
};
$hxClasses["openfl.display.Loader"] = openfl.display.Loader;
openfl.display.Loader.__name__ = ["openfl","display","Loader"];
openfl.display.Loader.__super__ = openfl.display.Sprite;
openfl.display.Loader.prototype = $extend(openfl.display.Sprite.prototype,{
	close: function() {
		openfl.Lib.notImplemented("Loader.close");
	}
	,load: function(request,context) {
		var extension = "";
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		if(extension.indexOf("?") != -1) extension = extension.split("?")[0];
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		if(request.contentType == null && request.contentType != "") switch(extension) {
		case "swf":
			this.contentLoaderInfo.contentType = "application/x-shockwave-flash";
			break;
		case "jpg":case "jpeg":
			transparent = false;
			this.contentLoaderInfo.contentType = "image/jpeg";
			break;
		case "png":
			this.contentLoaderInfo.contentType = "image/png";
			break;
		case "gif":
			this.contentLoaderInfo.contentType = "image/gif";
			break;
		default:
			this.contentLoaderInfo.contentType = "application/x-www-form-urlencoded";
		} else this.contentLoaderInfo.contentType = request.contentType;
		openfl.display.BitmapData.fromFile(request.url,$bind(this,this.BitmapData_onLoad),$bind(this,this.BitmapData_onError));
	}
	,loadBytes: function(buffer) {
		openfl.display.BitmapData.fromBytes(buffer,null,$bind(this,this.BitmapData_onLoad));
	}
	,unload: function() {
		if(this.get_numChildren() > 0) {
			while(this.get_numChildren() > 0) this.removeChildAt(0);
			this.content = null;
			this.contentLoaderInfo.url = null;
			this.contentLoaderInfo.contentType = null;
			this.contentLoaderInfo.content = null;
			this.contentLoaderInfo.bytesLoaded = 0;
			this.contentLoaderInfo.bytesTotal = 0;
			this.contentLoaderInfo.width = 0;
			this.contentLoaderInfo.height = 0;
			var event = new openfl.events.Event(openfl.events.Event.UNLOAD);
			event.currentTarget = this;
			this.dispatchEvent(event);
		}
	}
	,unloadAndStop: function(gc) {
		if(gc == null) gc = true;
		openfl.Lib.notImplemented("Loader.unloadAndStop");
	}
	,BitmapData_onLoad: function(bitmapData) {
		this.contentLoaderInfo.content = new openfl.display.Bitmap(bitmapData);
		this.content = this.contentLoaderInfo.content;
		this.addChild(this.contentLoaderInfo.content);
		var event = new openfl.events.Event(openfl.events.Event.COMPLETE);
		event.target = this.contentLoaderInfo;
		event.currentTarget = this.contentLoaderInfo;
		this.contentLoaderInfo.dispatchEvent(event);
	}
	,BitmapData_onError: function() {
		var event = new openfl.events.IOErrorEvent(openfl.events.IOErrorEvent.IO_ERROR);
		event.target = this.contentLoaderInfo;
		event.currentTarget = this.contentLoaderInfo;
		this.contentLoaderInfo.dispatchEvent(event);
	}
	,__class__: openfl.display.Loader
});
openfl.display.OpenGLView = function() {
	openfl.display.DirectRenderer.call(this,"OpenGLView");
	if(!this.__added) {
		this.__added = true;
		haxe.Log.trace("Warning: OpenGLView is not available in HTML5 canvas rendering mode",{ fileName : "OpenGLView.hx", lineNumber : 66, className : "openfl.display.OpenGLView", methodName : "new"});
		haxe.Log.trace("Please compile your project using -Ddom or -Dwebgl (beta) to enable",{ fileName : "OpenGLView.hx", lineNumber : 67, className : "openfl.display.OpenGLView", methodName : "new"});
	}
};
$hxClasses["openfl.display.OpenGLView"] = openfl.display.OpenGLView;
openfl.display.OpenGLView.__name__ = ["openfl","display","OpenGLView"];
openfl.display.OpenGLView.__properties__ = {get_isSupported:"get_isSupported"}
openfl.display.OpenGLView.isSupported = null;
openfl.display.OpenGLView.get_isSupported = function() {
	if(!window.WebGLRenderingContext) return false;
	if(lime.graphics.opengl.GL.context != null) return true; else {
		var canvas = window.document.createElement("canvas");
		var context = canvas.getContext("webgl");
		if(context == null) context = canvas.getContext("experimental-webgl");
		return context != null;
	}
	return true;
};
openfl.display.OpenGLView.__super__ = openfl.display.DirectRenderer;
openfl.display.OpenGLView.prototype = $extend(openfl.display.DirectRenderer.prototype,{
	__renderCanvas: function(renderSession) {
	}
	,__renderDOM: function(renderSession) {
		if(this.stage != null && this.__worldVisible && this.__renderable) {
			if(!this.__added) {
				renderSession.element.appendChild(this.__canvas);
				this.__added = true;
				openfl._internal.renderer.dom.DOMRenderer.initializeElement(this,this.__canvas,renderSession);
			}
			if(this.__context != null) {
				var rect = null;
				if(this.get_scrollRect() == null) rect = new openfl.geom.Rectangle(0,0,this.stage.stageWidth,this.stage.stageHeight); else rect = new openfl.geom.Rectangle(this.get_x() + this.get_scrollRect().x,this.get_y() + this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height);
				if(this.__render != null) this.__render(rect);
			}
		} else if(this.__added) {
			renderSession.element.removeChild(this.__canvas);
			this.__added = false;
		}
	}
	,__renderGL: function(renderSession) {
		if(this.stage != null && this.__renderable) {
			var rect = null;
			if(this.get_scrollRect() == null) rect = new openfl.geom.Rectangle(0,0,this.stage.stageWidth,this.stage.stageHeight); else rect = new openfl.geom.Rectangle(this.get_x() + this.get_scrollRect().x,this.get_y() + this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height);
			if(this.__render != null) this.__render(rect);
		}
	}
	,__class__: openfl.display.OpenGLView
});
openfl.display.PNGEncoderOptions = function(fastCompression) {
	if(fastCompression == null) fastCompression = false;
	this.fastCompression = fastCompression;
};
$hxClasses["openfl.display.PNGEncoderOptions"] = openfl.display.PNGEncoderOptions;
openfl.display.PNGEncoderOptions.__name__ = ["openfl","display","PNGEncoderOptions"];
openfl.display.PNGEncoderOptions.prototype = {
	__class__: openfl.display.PNGEncoderOptions
};
openfl.display.PixelSnapping = $hxClasses["openfl.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] };
openfl.display.PixelSnapping.NEVER = ["NEVER",0];
openfl.display.PixelSnapping.NEVER.toString = $estr;
openfl.display.PixelSnapping.NEVER.__enum__ = openfl.display.PixelSnapping;
openfl.display.PixelSnapping.AUTO = ["AUTO",1];
openfl.display.PixelSnapping.AUTO.toString = $estr;
openfl.display.PixelSnapping.AUTO.__enum__ = openfl.display.PixelSnapping;
openfl.display.PixelSnapping.ALWAYS = ["ALWAYS",2];
openfl.display.PixelSnapping.ALWAYS.toString = $estr;
openfl.display.PixelSnapping.ALWAYS.__enum__ = openfl.display.PixelSnapping;
openfl.display.Preloader = function(display) {
	lime.app.Preloader.call(this);
	if(display != null) {
		this.display = display;
		openfl.Lib.current.addChild(display);
		if(js.Boot.__instanceof(display,NMEPreloader)) (js.Boot.__cast(display , NMEPreloader)).onInit();
	}
};
$hxClasses["openfl.display.Preloader"] = openfl.display.Preloader;
openfl.display.Preloader.__name__ = ["openfl","display","Preloader"];
openfl.display.Preloader.__super__ = lime.app.Preloader;
openfl.display.Preloader.prototype = $extend(lime.app.Preloader.prototype,{
	load: function(urls,types) {
		var sounds = [];
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "MUSIC":case "SOUND":
				var sound = haxe.io.Path.withoutExtension(url);
				if(!HxOverrides.remove(sounds,sound)) this.total++;
				sounds.push(sound);
				break;
			default:
			}
		}
		var _g3 = 0;
		while(_g3 < sounds.length) {
			var soundName = sounds[_g3];
			++_g3;
			var sound1 = new openfl.media.Sound();
			sound1.addEventListener(openfl.events.Event.COMPLETE,$bind(this,this.sound_onComplete));
			sound1.addEventListener(openfl.events.IOErrorEvent.IO_ERROR,$bind(this,this.sound_onIOError));
			sound1.load(new openfl.net.URLRequest(soundName + ".ogg"));
		}
		lime.app.Preloader.prototype.load.call(this,urls,types);
	}
	,start: function() {
		if(this.display != null && js.Boot.__instanceof(this.display,NMEPreloader)) {
			this.display.addEventListener(openfl.events.Event.COMPLETE,$bind(this,this.display_onComplete));
			(js.Boot.__cast(this.display , NMEPreloader)).onLoaded();
		} else lime.app.Preloader.prototype.start.call(this);
	}
	,update: function(loaded,total) {
		if(this.display != null && js.Boot.__instanceof(this.display,NMEPreloader)) (js.Boot.__cast(this.display , NMEPreloader)).onUpdate(loaded,total);
	}
	,display_onComplete: function(event) {
		this.display.removeEventListener(openfl.events.Event.COMPLETE,$bind(this,this.display_onComplete));
		openfl.Lib.current.removeChild(this.display);
		openfl.Lib.current.stage.set_focus(null);
		this.display = null;
		lime.app.Preloader.prototype.start.call(this);
	}
	,sound_onComplete: function(event) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,sound_onIOError: function(event) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: openfl.display.Preloader
});
openfl.display.Shape = function() {
	openfl.display.DisplayObject.call(this);
};
$hxClasses["openfl.display.Shape"] = openfl.display.Shape;
openfl.display.Shape.__name__ = ["openfl","display","Shape"];
openfl.display.Shape.__super__ = openfl.display.DisplayObject;
openfl.display.Shape.prototype = $extend(openfl.display.DisplayObject.prototype,{
	__getBounds: function(rect,matrix) {
		if(this.__graphics != null) this.__graphics.__getBounds(rect,this.__worldTransform);
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(this.get_visible() && this.__graphics != null && this.__graphics.__hitTest(x,y,shapeFlag,this.__getTransform())) {
			if(!interactiveOnly) stack.push(this);
			return true;
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		openfl._internal.renderer.canvas.CanvasShape.render(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		openfl._internal.renderer.dom.DOMShape.render(this,renderSession);
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__graphics != null) openfl._internal.renderer.opengl.utils.GraphicsRenderer.render(this,renderSession);
	}
	,__renderMask: function(renderSession) {
		if(this.__graphics != null) openfl._internal.renderer.canvas.CanvasGraphics.renderMask(this.__graphics,renderSession);
	}
	,get_graphics: function() {
		if(this.__graphics == null) this.__graphics = new openfl.display.Graphics();
		return this.__graphics;
	}
	,__class__: openfl.display.Shape
	,__properties__: $extend(openfl.display.DisplayObject.prototype.__properties__,{get_graphics:"get_graphics"})
});
openfl.display.SimpleButton = function(upState,overState,downState,hitTestState) {
	openfl.display.DisplayObjectContainer.call(this);
	this.enabled = true;
	this.trackAsMenu = false;
	this.useHandCursor = true;
	this.mouseChildren = false;
	this.set_upState(upState != null?upState:this.__generateDefaultState());
	this.set_overState(overState != null?overState:this.__generateDefaultState());
	this.set_downState(downState != null?downState:this.__generateDefaultState());
	this.set_hitTestState(hitTestState != null?hitTestState:this.__generateDefaultState());
	this.set___currentState(this.upState);
};
$hxClasses["openfl.display.SimpleButton"] = openfl.display.SimpleButton;
openfl.display.SimpleButton.__name__ = ["openfl","display","SimpleButton"];
openfl.display.SimpleButton.__super__ = openfl.display.DisplayObjectContainer;
openfl.display.SimpleButton.prototype = $extend(openfl.display.DisplayObjectContainer.prototype,{
	switchState: function(state) {
		if(this.__currentState != null && this.__currentState.parent == this) this.removeChild(this.__currentState);
		if(state != null) this.addChild(state);
	}
	,__generateDefaultState: function() {
		return new openfl.display.DisplayObject();
	}
	,set_downState: function(downState) {
		if(this.downState != null && this.__currentState == this.downState) this.set___currentState(downState);
		return this.downState = downState;
	}
	,set_hitTestState: function(hitTestState) {
		if(hitTestState != this.hitTestState) {
			if(this.hitTestState != null && this.hitTestState.parent == this) this.removeChild(this.hitTestState);
			this.removeEventListener(openfl.events.MouseEvent.MOUSE_DOWN,$bind(this,this.__this_onMouseDown));
			this.removeEventListener(openfl.events.MouseEvent.MOUSE_OUT,$bind(this,this.__this_onMouseOut));
			this.removeEventListener(openfl.events.MouseEvent.MOUSE_OVER,$bind(this,this.__this_onMouseOver));
			this.removeEventListener(openfl.events.MouseEvent.MOUSE_UP,$bind(this,this.__this_onMouseUp));
			if(hitTestState != null) {
				this.addEventListener(openfl.events.MouseEvent.MOUSE_DOWN,$bind(this,this.__this_onMouseDown));
				this.addEventListener(openfl.events.MouseEvent.MOUSE_OUT,$bind(this,this.__this_onMouseOut));
				this.addEventListener(openfl.events.MouseEvent.MOUSE_OVER,$bind(this,this.__this_onMouseOver));
				this.addEventListener(openfl.events.MouseEvent.MOUSE_UP,$bind(this,this.__this_onMouseUp));
				hitTestState.set_alpha(0.0);
				this.addChild(hitTestState);
			}
		}
		return this.hitTestState = hitTestState;
	}
	,set_overState: function(overState) {
		if(this.overState != null && this.__currentState == this.overState) this.set___currentState(overState);
		return this.overState = overState;
	}
	,get_soundTransform: function() {
		if(this.__soundTransform == null) this.__soundTransform = new openfl.media.SoundTransform();
		return new openfl.media.SoundTransform(this.__soundTransform.volume,this.__soundTransform.pan);
	}
	,set_soundTransform: function(value) {
		this.__soundTransform = new openfl.media.SoundTransform(value.volume,value.pan);
		return value;
	}
	,set_upState: function(upState) {
		if(this.upState != null && this.__currentState == this.upState) this.set___currentState(upState);
		return this.upState = upState;
	}
	,set___currentState: function(state) {
		if(this.__currentState == state) return state;
		this.switchState(state);
		return this.__currentState = state;
	}
	,__this_onMouseDown: function(event) {
		this.set___currentState(this.downState);
	}
	,__this_onMouseOut: function(event) {
		if(this.upState != this.__currentState) this.set___currentState(this.upState);
	}
	,__this_onMouseOver: function(event) {
		if(this.overState != this.__currentState) this.set___currentState(this.overState);
	}
	,__this_onMouseUp: function(event) {
		this.set___currentState(this.overState);
	}
	,__class__: openfl.display.SimpleButton
	,__properties__: $extend(openfl.display.DisplayObjectContainer.prototype.__properties__,{set___currentState:"set___currentState",set_upState:"set_upState",set_soundTransform:"set_soundTransform",get_soundTransform:"get_soundTransform",set_overState:"set_overState",set_hitTestState:"set_hitTestState",set_downState:"set_downState"})
});
openfl.display.SpreadMethod = $hxClasses["openfl.display.SpreadMethod"] = { __ename__ : true, __constructs__ : ["REPEAT","REFLECT","PAD"] };
openfl.display.SpreadMethod.REPEAT = ["REPEAT",0];
openfl.display.SpreadMethod.REPEAT.toString = $estr;
openfl.display.SpreadMethod.REPEAT.__enum__ = openfl.display.SpreadMethod;
openfl.display.SpreadMethod.REFLECT = ["REFLECT",1];
openfl.display.SpreadMethod.REFLECT.toString = $estr;
openfl.display.SpreadMethod.REFLECT.__enum__ = openfl.display.SpreadMethod;
openfl.display.SpreadMethod.PAD = ["PAD",2];
openfl.display.SpreadMethod.PAD.toString = $estr;
openfl.display.SpreadMethod.PAD.__enum__ = openfl.display.SpreadMethod;
openfl.display.Stage = function(width,height,color) {
	this.__mouseY = 0;
	this.__mouseX = 0;
	openfl.display.Sprite.call(this);
	if(color == null) {
		this.__transparent = true;
		this.set_color(0);
	} else this.set_color(color);
	this.set_name(null);
	this.__mouseX = 0;
	this.__mouseY = 0;
	this.stageWidth = width;
	this.stageHeight = height;
	this.stage = this;
	this.align = openfl.display.StageAlign.TOP_LEFT;
	this.allowsFullScreen = false;
	this.set_displayState(openfl.display.StageDisplayState.NORMAL);
	this.frameRate = 60;
	this.quality = openfl.display.StageQuality.HIGH;
	this.scaleMode = openfl.display.StageScaleMode.NO_SCALE;
	this.stageFocusRect = true;
	this.__clearBeforeRender = true;
	this.__stack = [];
	var this1;
	this1 = new openfl.VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	this.stage3Ds = this1;
	var this3 = this.stage3Ds;
	var x = new openfl.display.Stage3D();
	if(!this3.fixed) {
		this3.length++;
		if(this3.data.length < this3.length) {
			var data;
			var this4;
			this4 = new Array(this3.data.length + 10);
			data = this4;
			haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data,0,this3.data.length);
			this3.data = data;
		}
		this3.data[this3.length - 1] = x;
	}
	this3.length;
};
$hxClasses["openfl.display.Stage"] = openfl.display.Stage;
openfl.display.Stage.__name__ = ["openfl","display","Stage"];
openfl.display.Stage.__super__ = openfl.display.Sprite;
openfl.display.Stage.prototype = $extend(openfl.display.Sprite.prototype,{
	globalToLocal: function(pos) {
		return pos;
	}
	,invalidate: function() {
		this.__invalidated = true;
	}
	,localToGlobal: function(pos) {
		return pos;
	}
	,__drag: function(mouse) {
		var parent = this.__dragObject.parent;
		if(parent != null) mouse = parent.globalToLocal(mouse);
		var x = mouse.x + this.__dragOffsetX;
		var y = mouse.y + this.__dragOffsetY;
		if(this.__dragBounds != null) {
			if(x < this.__dragBounds.x) x = this.__dragBounds.x; else if(x > this.__dragBounds.get_right()) x = this.__dragBounds.get_right();
			if(y < this.__dragBounds.y) y = this.__dragBounds.y; else if(y > this.__dragBounds.get_bottom()) y = this.__dragBounds.get_bottom();
		}
		this.__dragObject.set_x(x);
		this.__dragObject.set_y(y);
	}
	,__fireEvent: function(event,stack) {
		var length = stack.length;
		if(length == 0) {
			event.eventPhase = openfl.events.EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
		} else {
			event.eventPhase = openfl.events.EventPhase.CAPTURING_PHASE;
			event.target = stack[stack.length - 1];
			var _g1 = 0;
			var _g = length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				stack[i].__broadcast(event,false);
				if(event.__isCancelled) return;
			}
			event.eventPhase = openfl.events.EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
			if(event.__isCancelled) return;
			if(event.bubbles) {
				event.eventPhase = openfl.events.EventPhase.BUBBLING_PHASE;
				var i1 = length - 2;
				while(i1 >= 0) {
					stack[i1].__broadcast(event,false);
					if(event.__isCancelled) return;
					i1--;
				}
			}
		}
	}
	,__getInteractive: function(stack) {
		stack.push(this);
	}
	,__render: function(context) {
		this.__broadcast(new openfl.events.Event(openfl.events.Event.ENTER_FRAME),true);
		if(this.__invalidated) {
			this.__invalidated = false;
			this.__broadcast(new openfl.events.Event(openfl.events.Event.RENDER),true);
		}
		this.__renderable = true;
		this.__update(false,true);
		switch(context[1]) {
		case 0:
			var gl = context[2];
			if(this.__renderer == null) this.__renderer = new openfl._internal.renderer.opengl.GLRenderer(this.stageWidth,this.stageHeight,gl);
			this.__renderer.render(this);
			break;
		case 1:
			var context1 = context[2];
			if(this.__renderer == null) this.__renderer = new openfl._internal.renderer.canvas.CanvasRenderer(this.stageWidth,this.stageHeight,context1);
			this.__renderer.render(this);
			break;
		case 2:
			var element = context[2];
			if(this.__renderer == null) this.__renderer = new openfl._internal.renderer.dom.DOMRenderer(this.stageWidth,this.stageHeight,element);
			this.__renderer.render(this);
			break;
		default:
		}
	}
	,__resize: function() {
	}
	,__startDrag: function(sprite,lockCenter,bounds) {
		if(bounds == null) this.__dragBounds = null; else this.__dragBounds = bounds.clone();
		this.__dragObject = sprite;
		if(this.__dragObject != null) {
			if(lockCenter) {
				this.__dragOffsetX = -this.__dragObject.get_width() / 2;
				this.__dragOffsetY = -this.__dragObject.get_height() / 2;
			} else {
				var mouse = new openfl.geom.Point(this.get_mouseX(),this.get_mouseY());
				var parent = this.__dragObject.parent;
				if(parent != null) mouse = parent.globalToLocal(mouse);
				this.__dragOffsetX = this.__dragObject.get_x() - mouse.x;
				this.__dragOffsetY = this.__dragObject.get_y() - mouse.y;
			}
		}
	}
	,__stopDrag: function(sprite) {
		this.__dragBounds = null;
		this.__dragObject = null;
	}
	,__update: function(transformOnly,updateChildren) {
		if(transformOnly) {
			if(openfl.display.DisplayObject.__worldTransformDirty > 0) {
				openfl.display.Sprite.prototype.__update.call(this,true,updateChildren);
				if(updateChildren) {
					openfl.display.DisplayObject.__worldTransformDirty = 0;
					this.__dirty = true;
				}
			}
		} else if(openfl.display.DisplayObject.__worldTransformDirty > 0 || this.__dirty || openfl.display.DisplayObject.__worldRenderDirty > 0) {
			openfl.display.Sprite.prototype.__update.call(this,false,updateChildren);
			if(updateChildren) {
				openfl.display.DisplayObject.__worldTransformDirty = 0;
				openfl.display.DisplayObject.__worldRenderDirty = 0;
				this.__dirty = false;
			}
		}
	}
	,get_mouseX: function() {
		return this.__mouseX;
	}
	,get_mouseY: function() {
		return this.__mouseY;
	}
	,canvas_onContextLost: function(event) {
	}
	,canvas_onContextRestored: function(event) {
	}
	,get_color: function() {
		return this.__color;
	}
	,set_color: function(value) {
		var r = (value & 16711680) >>> 16;
		var g = (value & 65280) >>> 8;
		var b = value & 255;
		this.__colorSplit = [r / 255,g / 255,b / 255];
		this.__colorString = "#" + StringTools.hex(value,6);
		return this.__color = value;
	}
	,get_focus: function() {
		return this.__focus;
	}
	,set_focus: function(value) {
		if(value != this.__focus) {
			if(this.__focus != null) {
				var event = new openfl.events.FocusEvent(openfl.events.FocusEvent.FOCUS_OUT,true,false,value,false,0);
				this.__stack = [];
				this.__focus.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event,this.__stack);
			}
			if(value != null) {
				var event1 = new openfl.events.FocusEvent(openfl.events.FocusEvent.FOCUS_IN,true,false,this.__focus,false,0);
				this.__stack = [];
				value.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event1,this.__stack);
			}
			this.__focus = value;
		}
		return this.__focus;
	}
	,set_displayState: function(value) {
		this.displayState = value;
		return value;
	}
	,__class__: openfl.display.Stage
	,__properties__: $extend(openfl.display.Sprite.prototype.__properties__,{set_focus:"set_focus",get_focus:"get_focus",set_displayState:"set_displayState",set_color:"set_color",get_color:"get_color"})
});
openfl.display.Stage3D = function() {
	openfl.events.EventDispatcher.call(this);
};
$hxClasses["openfl.display.Stage3D"] = openfl.display.Stage3D;
openfl.display.Stage3D.__name__ = ["openfl","display","Stage3D"];
openfl.display.Stage3D.__super__ = openfl.events.EventDispatcher;
openfl.display.Stage3D.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	requestContext3D: function(context3DRenderMode) {
		if(context3DRenderMode == null) context3DRenderMode = "";
		if(openfl.display.OpenGLView.get_isSupported()) {
			this.context3D = new openfl.display3D.Context3D();
			this.dispatchEvent(new openfl.events.Event(openfl.events.Event.CONTEXT3D_CREATE));
		} else this.dispatchEvent(new openfl.events.ErrorEvent(openfl.events.ErrorEvent.ERROR));
	}
	,__class__: openfl.display.Stage3D
});
openfl.display.StageAlign = $hxClasses["openfl.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] };
openfl.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
openfl.display.StageAlign.TOP_RIGHT.toString = $estr;
openfl.display.StageAlign.TOP_RIGHT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
openfl.display.StageAlign.TOP_LEFT.toString = $estr;
openfl.display.StageAlign.TOP_LEFT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.TOP = ["TOP",2];
openfl.display.StageAlign.TOP.toString = $estr;
openfl.display.StageAlign.TOP.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.RIGHT = ["RIGHT",3];
openfl.display.StageAlign.RIGHT.toString = $estr;
openfl.display.StageAlign.RIGHT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.LEFT = ["LEFT",4];
openfl.display.StageAlign.LEFT.toString = $estr;
openfl.display.StageAlign.LEFT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
openfl.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
openfl.display.StageAlign.BOTTOM_RIGHT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
openfl.display.StageAlign.BOTTOM_LEFT.toString = $estr;
openfl.display.StageAlign.BOTTOM_LEFT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.BOTTOM = ["BOTTOM",7];
openfl.display.StageAlign.BOTTOM.toString = $estr;
openfl.display.StageAlign.BOTTOM.__enum__ = openfl.display.StageAlign;
openfl.display.StageDisplayState = $hxClasses["openfl.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] };
openfl.display.StageDisplayState.NORMAL = ["NORMAL",0];
openfl.display.StageDisplayState.NORMAL.toString = $estr;
openfl.display.StageDisplayState.NORMAL.__enum__ = openfl.display.StageDisplayState;
openfl.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
openfl.display.StageDisplayState.FULL_SCREEN.toString = $estr;
openfl.display.StageDisplayState.FULL_SCREEN.__enum__ = openfl.display.StageDisplayState;
openfl.display.StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
openfl.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
openfl.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = openfl.display.StageDisplayState;
openfl.display.StageQuality = $hxClasses["openfl.display.StageQuality"] = { __ename__ : true, __constructs__ : ["BEST","HIGH","MEDIUM","LOW"] };
openfl.display.StageQuality.BEST = ["BEST",0];
openfl.display.StageQuality.BEST.toString = $estr;
openfl.display.StageQuality.BEST.__enum__ = openfl.display.StageQuality;
openfl.display.StageQuality.HIGH = ["HIGH",1];
openfl.display.StageQuality.HIGH.toString = $estr;
openfl.display.StageQuality.HIGH.__enum__ = openfl.display.StageQuality;
openfl.display.StageQuality.MEDIUM = ["MEDIUM",2];
openfl.display.StageQuality.MEDIUM.toString = $estr;
openfl.display.StageQuality.MEDIUM.__enum__ = openfl.display.StageQuality;
openfl.display.StageQuality.LOW = ["LOW",3];
openfl.display.StageQuality.LOW.toString = $estr;
openfl.display.StageQuality.LOW.__enum__ = openfl.display.StageQuality;
openfl.display.StageScaleMode = $hxClasses["openfl.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] };
openfl.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
openfl.display.StageScaleMode.SHOW_ALL.toString = $estr;
openfl.display.StageScaleMode.SHOW_ALL.__enum__ = openfl.display.StageScaleMode;
openfl.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
openfl.display.StageScaleMode.NO_SCALE.toString = $estr;
openfl.display.StageScaleMode.NO_SCALE.__enum__ = openfl.display.StageScaleMode;
openfl.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
openfl.display.StageScaleMode.NO_BORDER.toString = $estr;
openfl.display.StageScaleMode.NO_BORDER.__enum__ = openfl.display.StageScaleMode;
openfl.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
openfl.display.StageScaleMode.EXACT_FIT.toString = $estr;
openfl.display.StageScaleMode.EXACT_FIT.__enum__ = openfl.display.StageScaleMode;
openfl.display.Tilesheet = function(image) {
	this.__bitmap = image;
	this.__centerPoints = new Array();
	this.__tileRects = new Array();
	this.__tileUVs = new Array();
	this.__rectTile = new openfl.geom.Rectangle();
	this.__rectUV = new openfl.geom.Rectangle();
	this.__point = new openfl.geom.Point();
};
$hxClasses["openfl.display.Tilesheet"] = openfl.display.Tilesheet;
openfl.display.Tilesheet.__name__ = ["openfl","display","Tilesheet"];
openfl.display.Tilesheet.prototype = {
	addTileRect: function(rectangle,centerPoint) {
		this.__tileRects.push(rectangle);
		if(centerPoint == null) centerPoint = openfl.display.Tilesheet.__defaultPoint;
		this.__centerPoints.push(centerPoint);
		this.__tileUVs.push(new openfl.geom.Rectangle(rectangle.get_left() / this.__bitmap.width,rectangle.get_top() / this.__bitmap.height,rectangle.get_right() / this.__bitmap.width,rectangle.get_bottom() / this.__bitmap.height));
		return this.__tileRects.length - 1;
	}
	,drawTiles: function(graphics,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		graphics.drawTiles(this,tileData,smooth,flags,count);
	}
	,getTileCenter: function(index) {
		return this.__centerPoints[index];
	}
	,getTileRect: function(index) {
		return this.__tileRects[index];
	}
	,getTileUVs: function(index) {
		return this.__tileUVs[index];
	}
	,__class__: openfl.display.Tilesheet
};
openfl.display.TriangleCulling = $hxClasses["openfl.display.TriangleCulling"] = { __ename__ : true, __constructs__ : ["NEGATIVE","NONE","POSITIVE"] };
openfl.display.TriangleCulling.NEGATIVE = ["NEGATIVE",0];
openfl.display.TriangleCulling.NEGATIVE.toString = $estr;
openfl.display.TriangleCulling.NEGATIVE.__enum__ = openfl.display.TriangleCulling;
openfl.display.TriangleCulling.NONE = ["NONE",1];
openfl.display.TriangleCulling.NONE.toString = $estr;
openfl.display.TriangleCulling.NONE.__enum__ = openfl.display.TriangleCulling;
openfl.display.TriangleCulling.POSITIVE = ["POSITIVE",2];
openfl.display.TriangleCulling.POSITIVE.toString = $estr;
openfl.display.TriangleCulling.POSITIVE.__enum__ = openfl.display.TriangleCulling;
openfl.display3D = {};
openfl.display3D.Context3D = function() {
	this.disposed = false;
	this._yFlip = 1;
	this.vertexBuffersCreated = new Array();
	this.indexBuffersCreated = new Array();
	this.programsCreated = new Array();
	this.texturesCreated = new Array();
	this.samplerParameters = new Array();
	var _g1 = 0;
	var _g = openfl.display3D.Context3D.MAX_SAMPLERS;
	while(_g1 < _g) {
		var i = _g1++;
		this.samplerParameters[i] = new openfl.display3D._Context3D.SamplerState();
		this.samplerParameters[i].wrap = openfl.display3D.Context3DWrapMode.CLAMP;
		this.samplerParameters[i].filter = openfl.display3D.Context3DTextureFilter.LINEAR;
		this.samplerParameters[i].mipfilter = openfl.display3D.Context3DMipFilter.MIPNONE;
	}
	var stage = openfl.Lib.current.stage;
	this.ogl = new openfl.display.OpenGLView();
	this.ogl.set_scrollRect(new openfl.geom.Rectangle(0,0,stage.stageWidth,stage.stageHeight));
	this.scrollRect = this.ogl.get_scrollRect().clone();
	this.ogl.set_width(stage.stageWidth);
	this.ogl.set_height(stage.stageHeight);
	stage.addChildAt(this.ogl,0);
};
$hxClasses["openfl.display3D.Context3D"] = openfl.display3D.Context3D;
openfl.display3D.Context3D.__name__ = ["openfl","display3D","Context3D"];
openfl.display3D.Context3D.prototype = {
	clear: function(red,green,blue,alpha,depth,stencil,mask) {
		if(mask == null) mask = 17664;
		if(stencil == null) stencil = 0;
		if(depth == null) depth = 1;
		if(alpha == null) alpha = 1;
		if(blue == null) blue = 0;
		if(green == null) green = 0;
		if(red == null) red = 0;
		if(!this.drawing) {
			this.__updateBlendStatus();
			this.drawing = true;
		}
		lime.graphics.opengl.GL.context.clearColor(red,green,blue,alpha);
		lime.graphics.opengl.GL.context.clearDepth(depth);
		lime.graphics.opengl.GL.context.clearStencil(stencil);
		lime.graphics.opengl.GL.context.clear(mask);
	}
	,configureBackBuffer: function(width,height,antiAlias,enableDepthAndStencil) {
		if(enableDepthAndStencil == null) enableDepthAndStencil = true;
		if(enableDepthAndStencil) {
			lime.graphics.opengl.GL.context.enable(2929);
			lime.graphics.opengl.GL.context.enable(2960);
		}
		this.ogl.set_scrollRect(new openfl.geom.Rectangle(0,0,width,height));
		this.ogl.set_width(width);
		this.ogl.set_height(height);
		this.scrollRect = this.ogl.get_scrollRect().clone();
		lime.graphics.opengl.GL.context.viewport(this.scrollRect.x | 0,this.scrollRect.y | 0,this.scrollRect.width | 0,this.scrollRect.height | 0);
	}
	,createCubeTexture: function(size,format,optimizeForRenderToTexture,streamingLevels) {
		if(streamingLevels == null) streamingLevels = 0;
		var texture = new openfl.display3D.textures.CubeTexture(lime.graphics.opengl.GL.context.createTexture(),size);
		this.texturesCreated.push(texture);
		return texture;
	}
	,createIndexBuffer: function(numIndices) {
		var indexBuffer = new openfl.display3D.IndexBuffer3D(lime.graphics.opengl.GL.context.createBuffer(),numIndices);
		this.indexBuffersCreated.push(indexBuffer);
		return indexBuffer;
	}
	,createProgram: function() {
		var program = new openfl.display3D.Program3D(lime.graphics.opengl.GL.context.createProgram());
		this.programsCreated.push(program);
		return program;
	}
	,createRectangleTexture: function(width,height,format,optimizeForRenderToTexture) {
		var texture = new openfl.display3D.textures.RectangleTexture(lime.graphics.opengl.GL.context.createTexture(),optimizeForRenderToTexture,width,height);
		this.texturesCreated.push(texture);
		return texture;
	}
	,createTexture: function(width,height,format,optimizeForRenderToTexture,streamingLevels) {
		if(streamingLevels == null) streamingLevels = 0;
		var texture = new openfl.display3D.textures.Texture(lime.graphics.opengl.GL.context.createTexture(),optimizeForRenderToTexture,width,height);
		this.texturesCreated.push(texture);
		return texture;
	}
	,createVertexBuffer: function(numVertices,data32PerVertex) {
		var vertexBuffer = new openfl.display3D.VertexBuffer3D(lime.graphics.opengl.GL.context.createBuffer(),numVertices,data32PerVertex);
		this.vertexBuffersCreated.push(vertexBuffer);
		return vertexBuffer;
	}
	,dispose: function() {
		var _g = 0;
		var _g1 = this.vertexBuffersCreated;
		while(_g < _g1.length) {
			var vertexBuffer = _g1[_g];
			++_g;
			vertexBuffer.dispose();
		}
		this.vertexBuffersCreated = null;
		var _g2 = 0;
		var _g11 = this.indexBuffersCreated;
		while(_g2 < _g11.length) {
			var indexBuffer = _g11[_g2];
			++_g2;
			indexBuffer.dispose();
		}
		this.indexBuffersCreated = null;
		var _g3 = 0;
		var _g12 = this.programsCreated;
		while(_g3 < _g12.length) {
			var program = _g12[_g3];
			++_g3;
			program.dispose();
		}
		this.programsCreated = null;
		this.samplerParameters = null;
		var _g4 = 0;
		var _g13 = this.texturesCreated;
		while(_g4 < _g13.length) {
			var texture = _g13[_g4];
			++_g4;
			texture.dispose();
		}
		this.texturesCreated = null;
		if(this.framebuffer != null) {
			lime.graphics.opengl.GL.context.deleteFramebuffer(this.framebuffer);
			this.framebuffer = null;
		}
		if(this.renderbuffer != null) {
			lime.graphics.opengl.GL.context.deleteRenderbuffer(this.renderbuffer);
			this.renderbuffer = null;
		}
		this.disposed = true;
	}
	,drawToBitmapData: function(destination) {
	}
	,drawTriangles: function(indexBuffer,firstIndex,numTriangles) {
		if(numTriangles == null) numTriangles = -1;
		if(firstIndex == null) firstIndex = 0;
		var location = lime.graphics.opengl.GL.context.getUniformLocation(this.currentProgram.glProgram,"yflip");
		lime.graphics.opengl.GL.context.uniform1f(location,this._yFlip);
		if(!this.drawing) throw new openfl.errors.Error("Need to clear before drawing if the buffer has not been cleared since the last present() call.");
		var numIndices;
		if(numTriangles == -1) numIndices = indexBuffer.numIndices; else numIndices = numTriangles * 3;
		var byteOffset = firstIndex * 2;
		lime.graphics.opengl.GL.context.bindBuffer(34963,indexBuffer.glBuffer);
		lime.graphics.opengl.GL.context.drawElements(4,numIndices,5123,byteOffset);
	}
	,present: function() {
		this.drawing = false;
		lime.graphics.opengl.GL.context.useProgram(null);
		lime.graphics.opengl.GL.context.bindBuffer(34962,null);
		lime.graphics.opengl.GL.context.disable(2884);
		if(this.framebuffer != null) lime.graphics.opengl.GL.context.bindFramebuffer(36160,null);
		if(this.renderbuffer != null) lime.graphics.opengl.GL.context.bindRenderbuffer(36161,null);
	}
	,removeRenderMethod: function(func) {
		this.ogl.set_render(null);
	}
	,setBlendFactors: function(sourceFactor,destinationFactor) {
		this.blendEnabled = true;
		this.blendSourceFactor = sourceFactor;
		this.blendDestinationFactor = destinationFactor;
		this.__updateBlendStatus();
	}
	,setColorMask: function(red,green,blue,alpha) {
		lime.graphics.opengl.GL.context.colorMask(red,green,blue,alpha);
	}
	,setCulling: function(triangleFaceToCull) {
		if(triangleFaceToCull == 0) lime.graphics.opengl.GL.context.disable(2884); else {
			lime.graphics.opengl.GL.context.enable(2884);
			switch(triangleFaceToCull) {
			case 1029:
				lime.graphics.opengl.GL.context.cullFace(1029);
				break;
			case 1028:
				lime.graphics.opengl.GL.context.cullFace(1028);
				break;
			case 1032:
				lime.graphics.opengl.GL.context.cullFace(1032);
				break;
			default:
				throw "Unknown Context3DTriangleFace type.";
			}
		}
		switch(triangleFaceToCull) {
		case 1029:
			this._yFlip = -1;
			break;
		case 1028:
			this._yFlip = 1;
			break;
		case 1032:
			this._yFlip = 1;
			break;
		case 0:
			this._yFlip = 1;
			break;
		default:
			throw "Unknown culling mode " + triangleFaceToCull + ".";
		}
	}
	,setDepthTest: function(depthMask,passCompareMode) {
		lime.graphics.opengl.GL.context.depthFunc(passCompareMode);
		lime.graphics.opengl.GL.context.depthMask(depthMask);
	}
	,setGLSLProgramConstantsFromByteArray: function(locationName,data,byteArrayOffset) {
		if(byteArrayOffset == null) byteArrayOffset = 0;
		data.position = byteArrayOffset;
		var location = lime.graphics.opengl.GL.context.getUniformLocation(this.currentProgram.glProgram,locationName);
		lime.graphics.opengl.GL.uniform4f(location,data.readFloat(),data.readFloat(),data.readFloat(),data.readFloat());
	}
	,setGLSLProgramConstantsFromMatrix: function(locationName,matrix,transposedMatrix) {
		if(transposedMatrix == null) transposedMatrix = false;
		var location = lime.graphics.opengl.GL.context.getUniformLocation(this.currentProgram.glProgram,locationName);
		lime.graphics.opengl.GL.uniformMatrix4fv(location,!transposedMatrix,new Float32Array((function($this) {
			var $r;
			var this1 = matrix.rawData;
			var value = new Array();
			{
				var _g1 = 0;
				var _g = this1.data.length;
				while(_g1 < _g) {
					var i = _g1++;
					value.push(this1.data[i]);
				}
			}
			$r = value;
			return $r;
		}(this))));
	}
	,setGLSLProgramConstantsFromVector4: function(locationName,data,startIndex) {
		if(startIndex == null) startIndex = 0;
		var location = lime.graphics.opengl.GL.context.getUniformLocation(this.currentProgram.glProgram,locationName);
		lime.graphics.opengl.GL.context.uniform4f(location,data[startIndex],data[startIndex + 1],data[startIndex + 2],data[startIndex + 3]);
	}
	,setGLSLTextureAt: function(locationName,texture,textureIndex) {
		switch(textureIndex) {
		case 0:
			lime.graphics.opengl.GL.context.activeTexture(33984);
			break;
		case 1:
			lime.graphics.opengl.GL.context.activeTexture(33985);
			break;
		case 2:
			lime.graphics.opengl.GL.context.activeTexture(33986);
			break;
		case 3:
			lime.graphics.opengl.GL.context.activeTexture(33987);
			break;
		case 4:
			lime.graphics.opengl.GL.context.activeTexture(33988);
			break;
		case 5:
			lime.graphics.opengl.GL.context.activeTexture(33989);
			break;
		case 6:
			lime.graphics.opengl.GL.context.activeTexture(33990);
			break;
		case 7:
			lime.graphics.opengl.GL.context.activeTexture(33991);
			break;
		default:
			throw "Does not support texture8 or more";
		}
		if(texture == null) {
			lime.graphics.opengl.GL.context.bindTexture(3553,null);
			lime.graphics.opengl.GL.context.bindTexture(34067,null);
			return;
		}
		var location = lime.graphics.opengl.GL.context.getUniformLocation(this.currentProgram.glProgram,locationName);
		if(js.Boot.__instanceof(texture,openfl.display3D.textures.Texture)) {
			lime.graphics.opengl.GL.context.bindTexture(3553,(js.Boot.__cast(texture , openfl.display3D.textures.Texture)).glTexture);
			lime.graphics.opengl.GL.context.uniform1i(location,textureIndex);
		} else if(js.Boot.__instanceof(texture,openfl.display3D.textures.RectangleTexture)) {
			lime.graphics.opengl.GL.context.bindTexture(3553,(js.Boot.__cast(texture , openfl.display3D.textures.RectangleTexture)).glTexture);
			lime.graphics.opengl.GL.context.uniform1i(location,textureIndex);
		} else if(js.Boot.__instanceof(texture,openfl.display3D.textures.CubeTexture)) {
			lime.graphics.opengl.GL.context.bindTexture(34067,(js.Boot.__cast(texture , openfl.display3D.textures.CubeTexture)).glTexture);
			lime.graphics.opengl.GL.context.uniform1i(location,textureIndex);
		} else throw "Texture of type " + Type.getClassName(Type.getClass(texture)) + " not supported yet";
		var parameters = this.samplerParameters[textureIndex];
		if(parameters != null) this.setTextureParameters(texture,parameters.wrap,parameters.filter,parameters.mipfilter); else this.setTextureParameters(texture,openfl.display3D.Context3DWrapMode.CLAMP,openfl.display3D.Context3DTextureFilter.NEAREST,openfl.display3D.Context3DMipFilter.MIPNONE);
	}
	,setGLSLVertexBufferAt: function(locationName,buffer,bufferOffset,format) {
		if(bufferOffset == null) bufferOffset = 0;
		var location;
		if(this.currentProgram != null && this.currentProgram.glProgram != null) location = lime.graphics.opengl.GL.context.getAttribLocation(this.currentProgram.glProgram,locationName); else location = -1;
		if(buffer == null) {
			if(location > -1) lime.graphics.opengl.GL.context.disableVertexAttribArray(location);
			return;
		}
		lime.graphics.opengl.GL.context.bindBuffer(34962,buffer.glBuffer);
		var dimension = 4;
		var type = 5126;
		var numBytes = 4;
		if(format == openfl.display3D.Context3DVertexBufferFormat.BYTES_4) {
			dimension = 4;
			type = 5126;
			numBytes = 4;
		} else if(format == openfl.display3D.Context3DVertexBufferFormat.FLOAT_1) {
			dimension = 1;
			type = 5126;
			numBytes = 4;
		} else if(format == openfl.display3D.Context3DVertexBufferFormat.FLOAT_2) {
			dimension = 2;
			type = 5126;
			numBytes = 4;
		} else if(format == openfl.display3D.Context3DVertexBufferFormat.FLOAT_3) {
			dimension = 3;
			type = 5126;
			numBytes = 4;
		} else if(format == openfl.display3D.Context3DVertexBufferFormat.FLOAT_4) {
			dimension = 4;
			type = 5126;
			numBytes = 4;
		} else throw "Buffer format " + Std.string(format) + " is not supported";
		lime.graphics.opengl.GL.context.enableVertexAttribArray(location);
		lime.graphics.opengl.GL.context.vertexAttribPointer(location,dimension,type,false,buffer.data32PerVertex * numBytes,bufferOffset * numBytes);
	}
	,setProgram: function(program3D) {
		var glProgram = null;
		if(program3D != null) glProgram = program3D.glProgram;
		lime.graphics.opengl.GL.context.useProgram(glProgram);
		this.currentProgram = program3D;
	}
	,setProgramConstantsFromByteArray: function(programType,firstRegister,numRegisters,data,byteArrayOffset) {
		data.position = byteArrayOffset;
		var _g = 0;
		while(_g < numRegisters) {
			var i = _g++;
			var locationName = this.__getUniformLocationNameFromAgalRegisterIndex(programType,firstRegister + i);
			this.setGLSLProgramConstantsFromByteArray(locationName,data);
		}
	}
	,setProgramConstantsFromMatrix: function(programType,firstRegister,matrix,transposedMatrix) {
		if(transposedMatrix == null) transposedMatrix = false;
		var d = matrix.rawData;
		if(transposedMatrix) {
			this.setProgramConstantsFromVector(programType,firstRegister,[d.data[0],d.data[4],d.data[8],d.data[12]],1);
			this.setProgramConstantsFromVector(programType,firstRegister + 1,[d.data[1],d.data[5],d.data[9],d.data[13]],1);
			this.setProgramConstantsFromVector(programType,firstRegister + 2,[d.data[2],d.data[6],d.data[10],d.data[14]],1);
			this.setProgramConstantsFromVector(programType,firstRegister + 3,[d.data[3],d.data[7],d.data[11],d.data[15]],1);
		} else {
			this.setProgramConstantsFromVector(programType,firstRegister,[d.data[0],d.data[1],d.data[2],d.data[3]],1);
			this.setProgramConstantsFromVector(programType,firstRegister + 1,[d.data[4],d.data[5],d.data[6],d.data[7]],1);
			this.setProgramConstantsFromVector(programType,firstRegister + 2,[d.data[8],d.data[9],d.data[10],d.data[11]],1);
			this.setProgramConstantsFromVector(programType,firstRegister + 3,[d.data[12],d.data[13],d.data[14],d.data[15]],1);
		}
	}
	,setProgramConstantsFromVector: function(programType,firstRegister,data,numRegisters) {
		if(numRegisters == null) numRegisters = 1;
		var _g = 0;
		while(_g < numRegisters) {
			var i = _g++;
			var currentIndex = i * 4;
			var locationName = this.__getUniformLocationNameFromAgalRegisterIndex(programType,firstRegister + i);
			this.setGLSLProgramConstantsFromVector4(locationName,data,currentIndex);
		}
	}
	,setRenderMethod: function(func) {
		this.ogl.set_render(function(rect) {
			func(null);
		});
	}
	,setRenderToBackBuffer: function() {
		lime.graphics.opengl.GL.context.disable(2929);
		lime.graphics.opengl.GL.context.disable(2960);
		lime.graphics.opengl.GL.context.disable(3089);
		if(this.framebuffer != null) lime.graphics.opengl.GL.context.bindFramebuffer(36160,null);
		if(this.renderbuffer != null) lime.graphics.opengl.GL.context.bindRenderbuffer(36161,null);
	}
	,setRenderToTexture: function(texture,enableDepthAndStencil,antiAlias,surfaceSelector) {
		if(surfaceSelector == null) surfaceSelector = 0;
		if(antiAlias == null) antiAlias = 0;
		if(enableDepthAndStencil == null) enableDepthAndStencil = false;
		if(this.framebuffer == null) this.framebuffer = lime.graphics.opengl.GL.context.createFramebuffer();
		lime.graphics.opengl.GL.context.bindFramebuffer(36160,this.framebuffer);
		if(this.renderbuffer == null) this.renderbuffer = lime.graphics.opengl.GL.context.createRenderbuffer();
		lime.graphics.opengl.GL.context.bindRenderbuffer(36161,this.renderbuffer);
		lime.graphics.opengl.GL.context.renderbufferStorage(36161,6408,texture.width,texture.height);
		lime.graphics.opengl.GL.context.framebufferTexture2D(36160,36064,3553,texture.glTexture,0);
		lime.graphics.opengl.GL.context.renderbufferStorage(36161,34041,texture.width,texture.height);
		lime.graphics.opengl.GL.context.framebufferRenderbuffer(36160,33306,36161,this.renderbuffer);
		if(enableDepthAndStencil) {
			lime.graphics.opengl.GL.context.enable(2929);
			lime.graphics.opengl.GL.context.enable(2960);
		}
		lime.graphics.opengl.GL.context.bindTexture(3553,texture.glTexture);
		lime.graphics.opengl.GL.context.texImage2D(3553,0,6408,texture.width,texture.height,0,6408,5121,null);
		lime.graphics.opengl.GL.context.texParameteri(3553,10240,9729);
		lime.graphics.opengl.GL.context.texParameteri(3553,10241,9985);
		lime.graphics.opengl.GL.context.viewport(0,0,texture.width,texture.height);
	}
	,setSamplerStateAt: function(sampler,wrap,filter,mipfilter) {
		if(0 <= sampler && sampler < openfl.display3D.Context3D.MAX_SAMPLERS) {
			this.samplerParameters[sampler].wrap = wrap;
			this.samplerParameters[sampler].filter = filter;
			this.samplerParameters[sampler].mipfilter = mipfilter;
		} else throw "Sampler is out of bounds.";
	}
	,setScissorRectangle: function(rectangle) {
		if(rectangle == null) {
			lime.graphics.opengl.GL.context.disable(3089);
			return;
		}
		lime.graphics.opengl.GL.context.enable(3089);
		lime.graphics.opengl.GL.context.scissor(rectangle.x | 0,rectangle.y | 0,rectangle.width | 0,rectangle.height | 0);
	}
	,setStencilActions: function(triangleFace,compareMode,actionOnBothPass,actionOnDepthFail,actionOnDepthPassStencilFail) {
		this.stencilCompareMode = compareMode;
		lime.graphics.opengl.GL.context.stencilOp(actionOnBothPass,actionOnDepthFail,actionOnDepthPassStencilFail);
		lime.graphics.opengl.GL.context.stencilFunc(this.stencilCompareMode,this.stencilRef,this.stencilReadMask);
	}
	,setStencilReferenceValue: function(referenceValue,readMask,writeMask) {
		if(writeMask == null) writeMask = 255;
		if(readMask == null) readMask = 255;
		this.stencilReadMask = readMask;
		this.stencilRef = referenceValue;
		lime.graphics.opengl.GL.context.stencilFunc(this.stencilCompareMode,this.stencilRef,this.stencilReadMask);
		lime.graphics.opengl.GL.context.stencilMask(writeMask);
	}
	,setTextureAt: function(sampler,texture) {
		var locationName = "fs" + sampler;
		this.setGLSLTextureAt(locationName,texture,sampler);
	}
	,setTextureParameters: function(texture,wrap,filter,mipfilter) {
		if(!openfl.display3D.Context3D.anisotropySupportTested) {
			var ext = lime.graphics.opengl.GL.context.getExtension("EXT_texture_filter_anisotropic");
			if(ext == null) ext = lime.graphics.opengl.GL.context.getExtension("MOZ_EXT_texture_filter_anisotropic");
			if(ext == null) ext = lime.graphics.opengl.GL.context.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
			openfl.display3D.Context3D.supportsAnisotropy = ext != null;
			openfl.display3D.Context3D.anisotropySupportTested = true;
			lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
				var $r;
				var $int = openfl.display3D.Context3D.maxSupportedAnisotropy;
				$r = $int < 0?4294967296.0 + $int:$int + 0.0;
				return $r;
			}(this)));
			openfl.display3D.Context3D.maxSupportedAnisotropy = lime.graphics.opengl.GL.context.getTexParameter(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT);
		}
		if(js.Boot.__instanceof(texture,openfl.display3D.textures.Texture)) {
			switch(wrap[1]) {
			case 0:
				lime.graphics.opengl.GL.context.texParameteri(3553,10242,33071);
				lime.graphics.opengl.GL.context.texParameteri(3553,10243,33071);
				break;
			case 1:
				lime.graphics.opengl.GL.context.texParameteri(3553,10242,10497);
				lime.graphics.opengl.GL.context.texParameteri(3553,10243,10497);
				break;
			}
			switch(filter[1]) {
			case 4:
				lime.graphics.opengl.GL.context.texParameteri(3553,10240,9729);
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,1);
				break;
			case 5:
				lime.graphics.opengl.GL.context.texParameteri(3553,10240,9728);
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,1);
				break;
			case 0:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg = 2 < 0;
						var bNeg = a < 0;
						$r = aNeg != bNeg?aNeg:2 > a;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int1 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
					return $r;
				}(this)):2);
				break;
			case 1:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a1 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg1 = 4 < 0;
						var bNeg1 = a1 < 0;
						$r = aNeg1 != bNeg1?aNeg1:4 > a1;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int2 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
					return $r;
				}(this)):4);
				break;
			case 2:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a2 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg2 = 8 < 0;
						var bNeg2 = a2 < 0;
						$r = aNeg2 != bNeg2?aNeg2:8 > a2;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int3 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int3 < 0?4294967296.0 + int3:int3 + 0.0;
					return $r;
				}(this)):8);
				break;
			case 3:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a3 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg3 = 16 < 0;
						var bNeg3 = a3 < 0;
						$r = aNeg3 != bNeg3?aNeg3:16 > a3;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int4 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int4 < 0?4294967296.0 + int4:int4 + 0.0;
					return $r;
				}(this)):16);
				break;
			}
			switch(mipfilter[1]) {
			case 0:
				lime.graphics.opengl.GL.context.generateMipmap(3553);
				lime.graphics.opengl.GL.context.texParameteri(3553,10241,9987);
				break;
			case 1:
				lime.graphics.opengl.GL.context.generateMipmap(3553);
				lime.graphics.opengl.GL.context.texParameteri(3553,10241,9984);
				break;
			case 2:
				lime.graphics.opengl.GL.context.texParameteri(3553,10241,9729);
				break;
			}
		} else if(js.Boot.__instanceof(texture,openfl.display3D.textures.RectangleTexture)) {
			lime.graphics.opengl.GL.context.texParameteri(3553,10242,33071);
			lime.graphics.opengl.GL.context.texParameteri(3553,10243,33071);
			switch(filter[1]) {
			case 4:
				lime.graphics.opengl.GL.context.texParameteri(3553,10240,9729);
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,1);
				break;
			case 5:
				lime.graphics.opengl.GL.context.texParameteri(3553,10240,9728);
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,1);
				break;
			case 0:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a4 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg4 = 2 < 0;
						var bNeg4 = a4 < 0;
						$r = aNeg4 != bNeg4?aNeg4:2 > a4;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int5 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int5 < 0?4294967296.0 + int5:int5 + 0.0;
					return $r;
				}(this)):2);
				break;
			case 1:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a5 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg5 = 4 < 0;
						var bNeg5 = a5 < 0;
						$r = aNeg5 != bNeg5?aNeg5:4 > a5;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int6 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int6 < 0?4294967296.0 + int6:int6 + 0.0;
					return $r;
				}(this)):4);
				break;
			case 2:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a6 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg6 = 8 < 0;
						var bNeg6 = a6 < 0;
						$r = aNeg6 != bNeg6?aNeg6:8 > a6;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int7 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int7 < 0?4294967296.0 + int7:int7 + 0.0;
					return $r;
				}(this)):8);
				break;
			case 3:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(3553,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a7 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg7 = 16 < 0;
						var bNeg7 = a7 < 0;
						$r = aNeg7 != bNeg7?aNeg7:16 > a7;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int8 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int8 < 0?4294967296.0 + int8:int8 + 0.0;
					return $r;
				}(this)):16);
				break;
			}
			lime.graphics.opengl.GL.context.texParameteri(3553,10241,9729);
		} else if(js.Boot.__instanceof(texture,openfl.display3D.textures.CubeTexture)) {
			switch(wrap[1]) {
			case 0:
				lime.graphics.opengl.GL.context.texParameteri(34067,10242,33071);
				lime.graphics.opengl.GL.context.texParameteri(34067,10243,33071);
				break;
			case 1:
				lime.graphics.opengl.GL.context.texParameteri(34067,10242,10497);
				lime.graphics.opengl.GL.context.texParameteri(34067,10243,10497);
				break;
			}
			switch(filter[1]) {
			case 4:
				lime.graphics.opengl.GL.context.texParameteri(34067,10240,9729);
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(34067,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,1);
				break;
			case 5:
				lime.graphics.opengl.GL.context.texParameteri(34067,10240,9728);
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(34067,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,1);
				break;
			case 0:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(34067,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a8 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg8 = 2 < 0;
						var bNeg8 = a8 < 0;
						$r = aNeg8 != bNeg8?aNeg8:2 > a8;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int9 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int9 < 0?4294967296.0 + int9:int9 + 0.0;
					return $r;
				}(this)):2);
				break;
			case 1:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(34067,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a9 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg9 = 4 < 0;
						var bNeg9 = a9 < 0;
						$r = aNeg9 != bNeg9?aNeg9:4 > a9;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int10 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int10 < 0?4294967296.0 + int10:int10 + 0.0;
					return $r;
				}(this)):4);
				break;
			case 2:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(34067,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a10 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg10 = 8 < 0;
						var bNeg10 = a10 < 0;
						$r = aNeg10 != bNeg10?aNeg10:8 > a10;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int11 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int11 < 0?4294967296.0 + int11:int11 + 0.0;
					return $r;
				}(this)):8);
				break;
			case 3:
				if(openfl.display3D.Context3D.supportsAnisotropy) lime.graphics.opengl.GL.context.texParameterf(34067,openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT,(function($this) {
					var $r;
					var a11 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = (function($this) {
						var $r;
						var aNeg11 = 16 < 0;
						var bNeg11 = a11 < 0;
						$r = aNeg11 != bNeg11?aNeg11:16 > a11;
						return $r;
					}($this));
					return $r;
				}(this))?(function($this) {
					var $r;
					var int12 = openfl.display3D.Context3D.maxSupportedAnisotropy;
					$r = int12 < 0?4294967296.0 + int12:int12 + 0.0;
					return $r;
				}(this)):16);
				break;
			}
			switch(mipfilter[1]) {
			case 0:
				lime.graphics.opengl.GL.context.texParameteri(34067,10241,9987);
				break;
			case 1:
				lime.graphics.opengl.GL.context.texParameteri(34067,10241,9984);
				break;
			case 2:
				lime.graphics.opengl.GL.context.texParameteri(34067,10241,9729);
				break;
			}
		} else throw "Texture of type " + Type.getClassName(Type.getClass(texture)) + " not supported yet";
	}
	,setVertexBufferAt: function(index,buffer,bufferOffset,format) {
		if(bufferOffset == null) bufferOffset = 0;
		var locationName = "va" + index;
		this.setGLSLVertexBufferAt(locationName,buffer,bufferOffset,format);
	}
	,__getUniformLocationNameFromAgalRegisterIndex: function(programType,firstRegister) {
		if(programType == openfl.display3D.Context3DProgramType.VERTEX) return "vc" + firstRegister; else if(programType == openfl.display3D.Context3DProgramType.FRAGMENT) return "fc" + firstRegister;
		throw "Program Type " + Std.string(programType) + " not supported";
	}
	,__updateBlendStatus: function() {
		if(this.blendEnabled) {
			lime.graphics.opengl.GL.context.enable(3042);
			lime.graphics.opengl.GL.context.blendEquation(32774);
			lime.graphics.opengl.GL.context.blendFunc(this.blendSourceFactor,this.blendDestinationFactor);
		} else lime.graphics.opengl.GL.context.disable(3042);
	}
	,__class__: openfl.display3D.Context3D
};
openfl.display3D._Context3D = {};
openfl.display3D._Context3D.SamplerState = function() {
};
$hxClasses["openfl.display3D._Context3D.SamplerState"] = openfl.display3D._Context3D.SamplerState;
openfl.display3D._Context3D.SamplerState.__name__ = ["openfl","display3D","_Context3D","SamplerState"];
openfl.display3D._Context3D.SamplerState.prototype = {
	__class__: openfl.display3D._Context3D.SamplerState
};
openfl.display3D.Context3DClearMask = function() { };
$hxClasses["openfl.display3D.Context3DClearMask"] = openfl.display3D.Context3DClearMask;
openfl.display3D.Context3DClearMask.__name__ = ["openfl","display3D","Context3DClearMask"];
openfl.display3D.Context3DMipFilter = $hxClasses["openfl.display3D.Context3DMipFilter"] = { __ename__ : true, __constructs__ : ["MIPLINEAR","MIPNEAREST","MIPNONE"] };
openfl.display3D.Context3DMipFilter.MIPLINEAR = ["MIPLINEAR",0];
openfl.display3D.Context3DMipFilter.MIPLINEAR.toString = $estr;
openfl.display3D.Context3DMipFilter.MIPLINEAR.__enum__ = openfl.display3D.Context3DMipFilter;
openfl.display3D.Context3DMipFilter.MIPNEAREST = ["MIPNEAREST",1];
openfl.display3D.Context3DMipFilter.MIPNEAREST.toString = $estr;
openfl.display3D.Context3DMipFilter.MIPNEAREST.__enum__ = openfl.display3D.Context3DMipFilter;
openfl.display3D.Context3DMipFilter.MIPNONE = ["MIPNONE",2];
openfl.display3D.Context3DMipFilter.MIPNONE.toString = $estr;
openfl.display3D.Context3DMipFilter.MIPNONE.__enum__ = openfl.display3D.Context3DMipFilter;
openfl.display3D.Context3DProgramType = $hxClasses["openfl.display3D.Context3DProgramType"] = { __ename__ : true, __constructs__ : ["VERTEX","FRAGMENT"] };
openfl.display3D.Context3DProgramType.VERTEX = ["VERTEX",0];
openfl.display3D.Context3DProgramType.VERTEX.toString = $estr;
openfl.display3D.Context3DProgramType.VERTEX.__enum__ = openfl.display3D.Context3DProgramType;
openfl.display3D.Context3DProgramType.FRAGMENT = ["FRAGMENT",1];
openfl.display3D.Context3DProgramType.FRAGMENT.toString = $estr;
openfl.display3D.Context3DProgramType.FRAGMENT.__enum__ = openfl.display3D.Context3DProgramType;
openfl.display3D.Context3DTextureFilter = $hxClasses["openfl.display3D.Context3DTextureFilter"] = { __ename__ : true, __constructs__ : ["ANISOTROPIC2X","ANISOTROPIC4X","ANISOTROPIC8X","ANISOTROPIC16X","LINEAR","NEAREST"] };
openfl.display3D.Context3DTextureFilter.ANISOTROPIC2X = ["ANISOTROPIC2X",0];
openfl.display3D.Context3DTextureFilter.ANISOTROPIC2X.toString = $estr;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC2X.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC4X = ["ANISOTROPIC4X",1];
openfl.display3D.Context3DTextureFilter.ANISOTROPIC4X.toString = $estr;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC4X.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC8X = ["ANISOTROPIC8X",2];
openfl.display3D.Context3DTextureFilter.ANISOTROPIC8X.toString = $estr;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC8X.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC16X = ["ANISOTROPIC16X",3];
openfl.display3D.Context3DTextureFilter.ANISOTROPIC16X.toString = $estr;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC16X.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.LINEAR = ["LINEAR",4];
openfl.display3D.Context3DTextureFilter.LINEAR.toString = $estr;
openfl.display3D.Context3DTextureFilter.LINEAR.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.NEAREST = ["NEAREST",5];
openfl.display3D.Context3DTextureFilter.NEAREST.toString = $estr;
openfl.display3D.Context3DTextureFilter.NEAREST.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFormat = $hxClasses["openfl.display3D.Context3DTextureFormat"] = { __ename__ : true, __constructs__ : ["BGRA","COMPRESSED","COMPRESSED_ALPHA"] };
openfl.display3D.Context3DTextureFormat.BGRA = ["BGRA",0];
openfl.display3D.Context3DTextureFormat.BGRA.toString = $estr;
openfl.display3D.Context3DTextureFormat.BGRA.__enum__ = openfl.display3D.Context3DTextureFormat;
openfl.display3D.Context3DTextureFormat.COMPRESSED = ["COMPRESSED",1];
openfl.display3D.Context3DTextureFormat.COMPRESSED.toString = $estr;
openfl.display3D.Context3DTextureFormat.COMPRESSED.__enum__ = openfl.display3D.Context3DTextureFormat;
openfl.display3D.Context3DTextureFormat.COMPRESSED_ALPHA = ["COMPRESSED_ALPHA",2];
openfl.display3D.Context3DTextureFormat.COMPRESSED_ALPHA.toString = $estr;
openfl.display3D.Context3DTextureFormat.COMPRESSED_ALPHA.__enum__ = openfl.display3D.Context3DTextureFormat;
openfl.display3D._Context3DTriangleFace = {};
openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_ = function() { };
$hxClasses["openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_"] = openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_;
openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_.__name__ = ["openfl","display3D","_Context3DTriangleFace","Context3DTriangleFace_Impl_"];
openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_._new = function(a) {
	return a;
};
openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_.fromInt = function(s) {
	return s;
};
openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_.toInt = function(this1) {
	return this1;
};
openfl.display3D.Context3DVertexBufferFormat = $hxClasses["openfl.display3D.Context3DVertexBufferFormat"] = { __ename__ : true, __constructs__ : ["BYTES_4","FLOAT_1","FLOAT_2","FLOAT_3","FLOAT_4"] };
openfl.display3D.Context3DVertexBufferFormat.BYTES_4 = ["BYTES_4",0];
openfl.display3D.Context3DVertexBufferFormat.BYTES_4.toString = $estr;
openfl.display3D.Context3DVertexBufferFormat.BYTES_4.__enum__ = openfl.display3D.Context3DVertexBufferFormat;
openfl.display3D.Context3DVertexBufferFormat.FLOAT_1 = ["FLOAT_1",1];
openfl.display3D.Context3DVertexBufferFormat.FLOAT_1.toString = $estr;
openfl.display3D.Context3DVertexBufferFormat.FLOAT_1.__enum__ = openfl.display3D.Context3DVertexBufferFormat;
openfl.display3D.Context3DVertexBufferFormat.FLOAT_2 = ["FLOAT_2",2];
openfl.display3D.Context3DVertexBufferFormat.FLOAT_2.toString = $estr;
openfl.display3D.Context3DVertexBufferFormat.FLOAT_2.__enum__ = openfl.display3D.Context3DVertexBufferFormat;
openfl.display3D.Context3DVertexBufferFormat.FLOAT_3 = ["FLOAT_3",3];
openfl.display3D.Context3DVertexBufferFormat.FLOAT_3.toString = $estr;
openfl.display3D.Context3DVertexBufferFormat.FLOAT_3.__enum__ = openfl.display3D.Context3DVertexBufferFormat;
openfl.display3D.Context3DVertexBufferFormat.FLOAT_4 = ["FLOAT_4",4];
openfl.display3D.Context3DVertexBufferFormat.FLOAT_4.toString = $estr;
openfl.display3D.Context3DVertexBufferFormat.FLOAT_4.__enum__ = openfl.display3D.Context3DVertexBufferFormat;
openfl.display3D.Context3DWrapMode = $hxClasses["openfl.display3D.Context3DWrapMode"] = { __ename__ : true, __constructs__ : ["CLAMP","REPEAT"] };
openfl.display3D.Context3DWrapMode.CLAMP = ["CLAMP",0];
openfl.display3D.Context3DWrapMode.CLAMP.toString = $estr;
openfl.display3D.Context3DWrapMode.CLAMP.__enum__ = openfl.display3D.Context3DWrapMode;
openfl.display3D.Context3DWrapMode.REPEAT = ["REPEAT",1];
openfl.display3D.Context3DWrapMode.REPEAT.toString = $estr;
openfl.display3D.Context3DWrapMode.REPEAT.__enum__ = openfl.display3D.Context3DWrapMode;
openfl.display3D.IndexBuffer3D = function(glBuffer,numIndices) {
	this.glBuffer = glBuffer;
	this.numIndices = numIndices;
};
$hxClasses["openfl.display3D.IndexBuffer3D"] = openfl.display3D.IndexBuffer3D;
openfl.display3D.IndexBuffer3D.__name__ = ["openfl","display3D","IndexBuffer3D"];
openfl.display3D.IndexBuffer3D.prototype = {
	dispose: function() {
		lime.graphics.opengl.GL.context.deleteBuffer(this.glBuffer);
	}
	,uploadFromByteArray: function(byteArray,byteArrayOffset,startOffset,count) {
		var bytesPerIndex = 2;
		lime.graphics.opengl.GL.context.bindBuffer(34963,this.glBuffer);
		var length = count * bytesPerIndex;
		var offset = byteArrayOffset + startOffset * bytesPerIndex;
		var indices;
		indices = new Int16Array(length);
		byteArray.position = offset;
		var i = 0;
		while(byteArray.position < length + offset) {
			indices[i] = byteArray.readUnsignedByte();
			i++;
		}
		lime.graphics.opengl.GL.context.bufferData(34963,indices,35044);
	}
	,uploadFromVector: function(data,startOffset,count) {
		lime.graphics.opengl.GL.context.bindBuffer(34963,this.glBuffer);
		var indices;
		indices = new Int16Array(count);
		var _g1 = startOffset;
		var _g = startOffset + count;
		while(_g1 < _g) {
			var i = _g1++;
			indices[i] = data.data[i];
		}
		lime.graphics.opengl.GL.context.bufferData(34963,indices,35044);
	}
	,__class__: openfl.display3D.IndexBuffer3D
};
openfl.display3D.Program3D = function(program) {
	this.glProgram = program;
};
$hxClasses["openfl.display3D.Program3D"] = openfl.display3D.Program3D;
openfl.display3D.Program3D.__name__ = ["openfl","display3D","Program3D"];
openfl.display3D.Program3D.prototype = {
	dispose: function() {
		lime.graphics.opengl.GL.context.deleteProgram(this.glProgram);
	}
	,upload: function(vertexShader,fragmentShader) {
		lime.graphics.opengl.GL.context.attachShader(this.glProgram,vertexShader);
		lime.graphics.opengl.GL.context.attachShader(this.glProgram,fragmentShader);
		lime.graphics.opengl.GL.context.linkProgram(this.glProgram);
		if(lime.graphics.opengl.GL.context.getProgramParameter(this.glProgram,35714) == 0) {
			var result = lime.graphics.opengl.GL.context.getProgramInfoLog(this.glProgram);
			if(result != "") throw result;
		}
	}
	,__class__: openfl.display3D.Program3D
};
openfl.display3D.VertexBuffer3D = function(glBuffer,numVertices,data32PerVertex) {
	this.glBuffer = glBuffer;
	this.numVertices = numVertices;
	this.data32PerVertex = data32PerVertex;
};
$hxClasses["openfl.display3D.VertexBuffer3D"] = openfl.display3D.VertexBuffer3D;
openfl.display3D.VertexBuffer3D.__name__ = ["openfl","display3D","VertexBuffer3D"];
openfl.display3D.VertexBuffer3D.prototype = {
	dispose: function() {
		lime.graphics.opengl.GL.context.deleteBuffer(this.glBuffer);
	}
	,uploadFromByteArray: function(byteArray,byteArrayOffset,startOffset,count) {
		var bytesPerVertex = this.data32PerVertex * 4;
		lime.graphics.opengl.GL.context.bindBuffer(34962,this.glBuffer);
		var length = count * bytesPerVertex;
		var offset = byteArrayOffset + startOffset * bytesPerVertex;
		var float32Array;
		float32Array = new Float32Array(length);
		byteArray.position = offset;
		var i = 0;
		while(byteArray.position < length + offset) {
			float32Array[i] = byteArray.readUnsignedByte();
			i++;
		}
		lime.graphics.opengl.GL.context.bufferData(34962,float32Array,35044);
	}
	,uploadFromFloat32Array: function(data,startVertex,numVertices) {
		lime.graphics.opengl.GL.context.bindBuffer(34962,this.glBuffer);
		lime.graphics.opengl.GL.context.bufferData(34962,data,35044);
	}
	,uploadFromVector: function(data,startVertex,numVertices) {
		var bytesPerVertex = this.data32PerVertex * 4;
		lime.graphics.opengl.GL.context.bindBuffer(34962,this.glBuffer);
		var length = numVertices * this.data32PerVertex;
		var offset = startVertex;
		var float32Array;
		float32Array = new Float32Array(length);
		var _g1 = startVertex;
		var _g = startVertex + length;
		while(_g1 < _g) {
			var i = _g1++;
			float32Array[i] = data.data[i];
		}
		lime.graphics.opengl.GL.context.bufferData(34962,float32Array,35044);
		float32Array = null;
	}
	,__class__: openfl.display3D.VertexBuffer3D
};
openfl.display3D.textures = {};
openfl.display3D.textures.TextureBase = function(glTexture,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	openfl.events.EventDispatcher.call(this);
	this.width = width;
	this.height = height;
	this.glTexture = glTexture;
};
$hxClasses["openfl.display3D.textures.TextureBase"] = openfl.display3D.textures.TextureBase;
openfl.display3D.textures.TextureBase.__name__ = ["openfl","display3D","textures","TextureBase"];
openfl.display3D.textures.TextureBase.__super__ = openfl.events.EventDispatcher;
openfl.display3D.textures.TextureBase.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	dispose: function() {
		lime.graphics.opengl.GL.context.deleteTexture(this.glTexture);
	}
	,__class__: openfl.display3D.textures.TextureBase
});
openfl.display3D.textures.CubeTexture = function(glTexture,size) {
	openfl.display3D.textures.TextureBase.call(this,glTexture,size,size);
	this.size = size;
	this._textures = [];
	var _g = 0;
	while(_g < 6) {
		var i = _g++;
		this._textures[i] = lime.graphics.opengl.GL.context.createTexture();
	}
};
$hxClasses["openfl.display3D.textures.CubeTexture"] = openfl.display3D.textures.CubeTexture;
openfl.display3D.textures.CubeTexture.__name__ = ["openfl","display3D","textures","CubeTexture"];
openfl.display3D.textures.CubeTexture.__super__ = openfl.display3D.textures.TextureBase;
openfl.display3D.textures.CubeTexture.prototype = $extend(openfl.display3D.textures.TextureBase.prototype,{
	glTextureAt: function(index) {
		return this._textures[index];
	}
	,uploadCompressedTextureFromByteArray: function(data,byteArrayOffset,async) {
		if(async == null) async = false;
	}
	,uploadFromBitmapData: function(bitmapData,side,miplevel) {
		if(miplevel == null) miplevel = 0;
		var source = bitmapData.__image.get_data();
		lime.graphics.opengl.GL.context.bindTexture(34067,this.glTexture);
		switch(side) {
		case 0:
			lime.graphics.opengl.GL.context.texImage2D(34069,miplevel,6408,bitmapData.width,bitmapData.height,0,6408,5121,source);
			break;
		case 1:
			lime.graphics.opengl.GL.context.texImage2D(34070,miplevel,6408,bitmapData.width,bitmapData.height,0,6408,5121,source);
			break;
		case 2:
			lime.graphics.opengl.GL.context.texImage2D(34071,miplevel,6408,bitmapData.width,bitmapData.height,0,6408,5121,source);
			break;
		case 3:
			lime.graphics.opengl.GL.context.texImage2D(34072,miplevel,6408,bitmapData.width,bitmapData.height,0,6408,5121,source);
			break;
		case 4:
			lime.graphics.opengl.GL.context.texImage2D(34073,miplevel,6408,bitmapData.width,bitmapData.height,0,6408,5121,source);
			break;
		case 5:
			lime.graphics.opengl.GL.context.texImage2D(34074,miplevel,6408,bitmapData.width,bitmapData.height,0,6408,5121,source);
			break;
		default:
			throw "unknown side type";
		}
		lime.graphics.opengl.GL.context.bindTexture(34067,null);
	}
	,uploadFromByteArray: function(data,byteArrayOffset,side,miplevel) {
		if(miplevel == null) miplevel = 0;
	}
	,__class__: openfl.display3D.textures.CubeTexture
});
openfl.display3D.textures.RectangleTexture = function(glTexture,optimize,width,height) {
	this.optimizeForRenderToTexture = optimize;
	if(this.optimizeForRenderToTexture == null) this.optimizeForRenderToTexture = false;
	openfl.display3D.textures.TextureBase.call(this,glTexture,width,height);
};
$hxClasses["openfl.display3D.textures.RectangleTexture"] = openfl.display3D.textures.RectangleTexture;
openfl.display3D.textures.RectangleTexture.__name__ = ["openfl","display3D","textures","RectangleTexture"];
openfl.display3D.textures.RectangleTexture.__super__ = openfl.display3D.textures.TextureBase;
openfl.display3D.textures.RectangleTexture.prototype = $extend(openfl.display3D.textures.TextureBase.prototype,{
	uploadFromBitmapData: function(bitmapData,miplevel) {
		if(miplevel == null) miplevel = 0;
		var p = lime.utils.ByteArray.__ofBuffer(bitmapData.__image.get_data().buffer);
		this.width = bitmapData.width;
		this.height = bitmapData.height;
		this.uploadFromByteArray(p,0);
	}
	,uploadFromByteArray: function(data,byteArrayOffset) {
		lime.graphics.opengl.GL.context.bindTexture(3553,this.glTexture);
		if(this.optimizeForRenderToTexture) lime.graphics.opengl.GL.context.pixelStorei(37440,1);
		lime.graphics.opengl.GL.context.texParameteri(3553,10240,9728);
		lime.graphics.opengl.GL.context.texParameteri(3553,10241,9728);
		lime.graphics.opengl.GL.context.texParameteri(3553,10242,33071);
		lime.graphics.opengl.GL.context.texParameteri(3553,10243,33071);
		var source = new Uint8Array(data.length);
		data.position = byteArrayOffset;
		var i = 0;
		while(data.position < data.length) {
			source[i] = data.readUnsignedByte();
			i++;
		}
		lime.graphics.opengl.GL.context.texImage2D(3553,0,6408,this.width,this.height,0,6408,5121,source);
		lime.graphics.opengl.GL.context.bindTexture(3553,null);
	}
	,__class__: openfl.display3D.textures.RectangleTexture
});
openfl.display3D.textures.Texture = function(glTexture,optimize,width,height) {
	this.optimizeForRenderToTexture = optimize;
	if(this.optimizeForRenderToTexture == null) this.optimizeForRenderToTexture = false;
	openfl.display3D.textures.TextureBase.call(this,glTexture,width,height);
};
$hxClasses["openfl.display3D.textures.Texture"] = openfl.display3D.textures.Texture;
openfl.display3D.textures.Texture.__name__ = ["openfl","display3D","textures","Texture"];
openfl.display3D.textures.Texture.__super__ = openfl.display3D.textures.TextureBase;
openfl.display3D.textures.Texture.prototype = $extend(openfl.display3D.textures.TextureBase.prototype,{
	uploadCompressedTextureFromByteArray: function(data,byteArrayOffset,async) {
		if(async == null) async = false;
	}
	,uploadFromBitmapData: function(bitmapData,miplevel) {
		if(miplevel == null) miplevel = 0;
		var p = lime.utils.ByteArray.__ofBuffer(bitmapData.__image.get_data().buffer);
		this.width = bitmapData.width;
		this.height = bitmapData.height;
		this.uploadFromByteArray(p,0,miplevel);
	}
	,uploadFromByteArray: function(data,byteArrayOffset,miplevel) {
		if(miplevel == null) miplevel = 0;
		lime.graphics.opengl.GL.context.bindTexture(3553,this.glTexture);
		if(this.optimizeForRenderToTexture) {
			lime.graphics.opengl.GL.context.pixelStorei(37440,1);
			lime.graphics.opengl.GL.context.texParameteri(3553,10240,9728);
			lime.graphics.opengl.GL.context.texParameteri(3553,10241,9728);
			lime.graphics.opengl.GL.context.texParameteri(3553,10242,33071);
			lime.graphics.opengl.GL.context.texParameteri(3553,10243,33071);
		}
		var source = new Uint8Array(data.length);
		data.position = byteArrayOffset;
		var i = 0;
		while(data.position < data.length) {
			source[i] = data.readUnsignedByte();
			i++;
		}
		lime.graphics.opengl.GL.context.texImage2D(3553,miplevel,6408,this.width,this.height,0,6408,5121,source);
		lime.graphics.opengl.GL.context.bindTexture(3553,null);
	}
	,__class__: openfl.display3D.textures.Texture
});
openfl.errors = {};
openfl.errors.Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
	this.name = "Error";
};
$hxClasses["openfl.errors.Error"] = openfl.errors.Error;
openfl.errors.Error.__name__ = ["openfl","errors","Error"];
openfl.errors.Error.prototype = {
	getStackTrace: function() {
		return haxe.CallStack.toString(haxe.CallStack.exceptionStack());
	}
	,toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,__class__: openfl.errors.Error
};
openfl.errors.ArgumentError = function(inMessage) {
	if(inMessage == null) inMessage = "";
	openfl.errors.Error.call(this,inMessage);
};
$hxClasses["openfl.errors.ArgumentError"] = openfl.errors.ArgumentError;
openfl.errors.ArgumentError.__name__ = ["openfl","errors","ArgumentError"];
openfl.errors.ArgumentError.__super__ = openfl.errors.Error;
openfl.errors.ArgumentError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: openfl.errors.ArgumentError
});
openfl.errors.IOError = function(message) {
	if(message == null) message = "";
	openfl.errors.Error.call(this,message);
};
$hxClasses["openfl.errors.IOError"] = openfl.errors.IOError;
openfl.errors.IOError.__name__ = ["openfl","errors","IOError"];
openfl.errors.IOError.__super__ = openfl.errors.Error;
openfl.errors.IOError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: openfl.errors.IOError
});
openfl.errors.RangeError = function(inMessage) {
	if(inMessage == null) inMessage = "";
	openfl.errors.Error.call(this,inMessage,0);
};
$hxClasses["openfl.errors.RangeError"] = openfl.errors.RangeError;
openfl.errors.RangeError.__name__ = ["openfl","errors","RangeError"];
openfl.errors.RangeError.__super__ = openfl.errors.Error;
openfl.errors.RangeError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: openfl.errors.RangeError
});
openfl.errors.TypeError = function(inMessage) {
	if(inMessage == null) inMessage = "";
	openfl.errors.Error.call(this,inMessage,0);
};
$hxClasses["openfl.errors.TypeError"] = openfl.errors.TypeError;
openfl.errors.TypeError.__name__ = ["openfl","errors","TypeError"];
openfl.errors.TypeError.__super__ = openfl.errors.Error;
openfl.errors.TypeError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: openfl.errors.TypeError
});
openfl.events.Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
	this.eventPhase = openfl.events.EventPhase.AT_TARGET;
};
$hxClasses["openfl.events.Event"] = openfl.events.Event;
openfl.events.Event.__name__ = ["openfl","events","Event"];
openfl.events.Event.prototype = {
	clone: function() {
		var event = new openfl.events.Event(this.type,this.bubbles,this.cancelable);
		event.eventPhase = this.eventPhase;
		event.target = this.target;
		event.currentTarget = this.currentTarget;
		return event;
	}
	,isDefaultPrevented: function() {
		return this.__isCancelled || this.__isCancelledNow;
	}
	,stopImmediatePropagation: function() {
		this.__isCancelled = true;
		this.__isCancelledNow = true;
	}
	,stopPropagation: function() {
		this.__isCancelled = true;
	}
	,toString: function() {
		return "[Event type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + "]";
	}
	,__class__: openfl.events.Event
};
openfl.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.TextEvent"] = openfl.events.TextEvent;
openfl.events.TextEvent.__name__ = ["openfl","events","TextEvent"];
openfl.events.TextEvent.__super__ = openfl.events.Event;
openfl.events.TextEvent.prototype = $extend(openfl.events.Event.prototype,{
	clone: function() {
		return new openfl.events.TextEvent(this.type,this.bubbles,this.cancelable,this.text);
	}
	,toString: function() {
		return "[TextEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + "]";
	}
	,__class__: openfl.events.TextEvent
});
openfl.events.ErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.TextEvent.call(this,type,bubbles,cancelable,text);
	this.errorID = id;
};
$hxClasses["openfl.events.ErrorEvent"] = openfl.events.ErrorEvent;
openfl.events.ErrorEvent.__name__ = ["openfl","events","ErrorEvent"];
openfl.events.ErrorEvent.__super__ = openfl.events.TextEvent;
openfl.events.ErrorEvent.prototype = $extend(openfl.events.TextEvent.prototype,{
	clone: function() {
		return new openfl.events.ErrorEvent(this.type,this.bubbles,this.cancelable,this.text,this.errorID);
	}
	,toString: function() {
		return "[ErrorEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: openfl.events.ErrorEvent
});
openfl.events._EventDispatcher = {};
openfl.events._EventDispatcher.Listener = function(callback,useCapture,priority) {
	this.callback = callback;
	this.useCapture = useCapture;
	this.priority = priority;
};
$hxClasses["openfl.events._EventDispatcher.Listener"] = openfl.events._EventDispatcher.Listener;
openfl.events._EventDispatcher.Listener.__name__ = ["openfl","events","_EventDispatcher","Listener"];
openfl.events._EventDispatcher.Listener.prototype = {
	match: function(callback,useCapture) {
		return Reflect.compareMethods(this.callback,callback) && this.useCapture == useCapture;
	}
	,__class__: openfl.events._EventDispatcher.Listener
};
openfl.events.EventPhase = $hxClasses["openfl.events.EventPhase"] = { __ename__ : true, __constructs__ : ["CAPTURING_PHASE","AT_TARGET","BUBBLING_PHASE"] };
openfl.events.EventPhase.CAPTURING_PHASE = ["CAPTURING_PHASE",0];
openfl.events.EventPhase.CAPTURING_PHASE.toString = $estr;
openfl.events.EventPhase.CAPTURING_PHASE.__enum__ = openfl.events.EventPhase;
openfl.events.EventPhase.AT_TARGET = ["AT_TARGET",1];
openfl.events.EventPhase.AT_TARGET.toString = $estr;
openfl.events.EventPhase.AT_TARGET.__enum__ = openfl.events.EventPhase;
openfl.events.EventPhase.BUBBLING_PHASE = ["BUBBLING_PHASE",2];
openfl.events.EventPhase.BUBBLING_PHASE.toString = $estr;
openfl.events.EventPhase.BUBBLING_PHASE.__enum__ = openfl.events.EventPhase;
openfl.events.FocusEvent = function(type,bubbles,cancelable,relatedObject,shiftKey,keyCode) {
	if(keyCode == null) keyCode = 0;
	if(shiftKey == null) shiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = keyCode;
	this.shiftKey = shiftKey;
	this.relatedObject = relatedObject;
};
$hxClasses["openfl.events.FocusEvent"] = openfl.events.FocusEvent;
openfl.events.FocusEvent.__name__ = ["openfl","events","FocusEvent"];
openfl.events.FocusEvent.__super__ = openfl.events.Event;
openfl.events.FocusEvent.prototype = $extend(openfl.events.Event.prototype,{
	clone: function() {
		var event = new openfl.events.FocusEvent(this.type,this.bubbles,this.cancelable,this.relatedObject,this.shiftKey,this.keyCode);
		event.target = this.target;
		event.currentTarget = this.currentTarget;
		event.eventPhase = this.eventPhase;
		return event;
	}
	,toString: function() {
		return "[FocusEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " relatedObject=" + Std.string(this.relatedObject) + " shiftKey=" + Std.string(this.shiftKey) + " keyCode=" + this.keyCode + "]";
	}
	,__class__: openfl.events.FocusEvent
});
openfl.events.IOErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl.events.ErrorEvent.call(this,type,bubbles,cancelable,text,id);
};
$hxClasses["openfl.events.IOErrorEvent"] = openfl.events.IOErrorEvent;
openfl.events.IOErrorEvent.__name__ = ["openfl","events","IOErrorEvent"];
openfl.events.IOErrorEvent.__super__ = openfl.events.ErrorEvent;
openfl.events.IOErrorEvent.prototype = $extend(openfl.events.ErrorEvent.prototype,{
	clone: function() {
		return new openfl.events.IOErrorEvent(this.type,this.bubbles,this.cancelable,this.text,this.errorID);
	}
	,toString: function() {
		return "[IOErrorEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: openfl.events.IOErrorEvent
});
openfl.events.KeyboardEvent = function(type,bubbles,cancelable,charCodeValue,keyCodeValue,keyLocationValue,ctrlKeyValue,altKeyValue,shiftKeyValue,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(shiftKeyValue == null) shiftKeyValue = false;
	if(altKeyValue == null) altKeyValue = false;
	if(ctrlKeyValue == null) ctrlKeyValue = false;
	if(keyCodeValue == null) keyCodeValue = 0;
	if(charCodeValue == null) charCodeValue = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.charCode = charCodeValue;
	this.keyCode = keyCodeValue;
	if(keyLocationValue != null) this.keyLocation = keyLocationValue; else this.keyLocation = 0;
	this.ctrlKey = ctrlKeyValue;
	this.altKey = altKeyValue;
	this.shiftKey = shiftKeyValue;
	this.controlKey = controlKeyValue;
	this.commandKey = commandKeyValue;
};
$hxClasses["openfl.events.KeyboardEvent"] = openfl.events.KeyboardEvent;
openfl.events.KeyboardEvent.__name__ = ["openfl","events","KeyboardEvent"];
openfl.events.KeyboardEvent.__super__ = openfl.events.Event;
openfl.events.KeyboardEvent.prototype = $extend(openfl.events.Event.prototype,{
	clone: function() {
		return new openfl.events.KeyboardEvent(this.type,this.bubbles,this.cancelable,this.charCode,this.keyCode,this.keyLocation,this.ctrlKey,this.altKey,this.shiftKey,this.controlKey,this.commandKey);
	}
	,toString: function() {
		return "[KeyboardEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " charCode=" + this.charCode + " keyCode=" + this.keyCode + " keyLocation=" + Std.string(this.keyLocation) + " ctrlKey=" + Std.string(this.ctrlKey) + " altKey=" + Std.string(this.altKey) + " shiftKey=" + Std.string(this.shiftKey) + "]";
	}
	,__class__: openfl.events.KeyboardEvent
});
openfl.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["openfl.events.MouseEvent"] = openfl.events.MouseEvent;
openfl.events.MouseEvent.__name__ = ["openfl","events","MouseEvent"];
openfl.events.MouseEvent.__create = function(type,button,local,target) {
	var delta = 2;
	switch(type) {
	case openfl.events.MouseEvent.MOUSE_DOWN:case openfl.events.MouseEvent.MIDDLE_MOUSE_DOWN:case openfl.events.MouseEvent.RIGHT_MOUSE_DOWN:
		openfl.events.MouseEvent.__buttonDown[button] = true;
		break;
	case openfl.events.MouseEvent.MOUSE_UP:case openfl.events.MouseEvent.MIDDLE_MOUSE_UP:case openfl.events.MouseEvent.RIGHT_MOUSE_UP:
		openfl.events.MouseEvent.__buttonDown[button] = false;
		break;
	}
	var pseudoEvent = new openfl.events.MouseEvent(type,true,false,local.x,local.y,null,false,false,false,openfl.events.MouseEvent.__buttonDown[button],delta);
	pseudoEvent.stageX = openfl.Lib.current.stage.get_mouseX();
	pseudoEvent.stageY = openfl.Lib.current.stage.get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
};
openfl.events.MouseEvent.__super__ = openfl.events.Event;
openfl.events.MouseEvent.prototype = $extend(openfl.events.Event.prototype,{
	clone: function() {
		return new openfl.events.MouseEvent(this.type,this.bubbles,this.cancelable,this.localX,this.localY,this.relatedObject,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
	}
	,toString: function() {
		return "[MouseEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " localX=" + this.localX + " localY=" + this.localY + " relatedObject=" + Std.string(this.relatedObject) + " ctrlKey=" + Std.string(this.ctrlKey) + " altKey=" + Std.string(this.altKey) + " shiftKey=" + Std.string(this.shiftKey) + " buttonDown=" + Std.string(this.buttonDown) + " delta=" + this.delta + "]";
	}
	,updateAfterEvent: function() {
	}
	,__class__: openfl.events.MouseEvent
});
openfl.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,sizeX,sizeY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(sizeY == null) sizeY = 1;
	if(sizeX == null) sizeX = 1;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.pressure = 1;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["openfl.events.TouchEvent"] = openfl.events.TouchEvent;
openfl.events.TouchEvent.__name__ = ["openfl","events","TouchEvent"];
openfl.events.TouchEvent.__create = function(type,touch,local,target) {
	var evt = new openfl.events.TouchEvent(type,true,false,local.x,local.y,null,null,null,false,false,false,false,0,null,0);
	evt.stageX = openfl.Lib.current.stage.get_mouseX();
	evt.stageY = openfl.Lib.current.stage.get_mouseY();
	evt.target = target;
	return evt;
};
openfl.events.TouchEvent.__super__ = openfl.events.Event;
openfl.events.TouchEvent.prototype = $extend(openfl.events.Event.prototype,{
	updateAfterEvent: function() {
	}
	,__class__: openfl.events.TouchEvent
});
openfl.filters = {};
openfl.filters.BitmapFilter = function() {
};
$hxClasses["openfl.filters.BitmapFilter"] = openfl.filters.BitmapFilter;
openfl.filters.BitmapFilter.__name__ = ["openfl","filters","BitmapFilter"];
openfl.filters.BitmapFilter.prototype = {
	clone: function() {
		return new openfl.filters.BitmapFilter();
	}
	,__applyFilter: function(sourceData,targetData,sourceRect,destPoint) {
	}
	,__class__: openfl.filters.BitmapFilter
};
openfl.geom.ColorTransform = function(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier,redOffset,greenOffset,blueOffset,alphaOffset) {
	if(alphaOffset == null) alphaOffset = 0;
	if(blueOffset == null) blueOffset = 0;
	if(greenOffset == null) greenOffset = 0;
	if(redOffset == null) redOffset = 0;
	if(alphaMultiplier == null) alphaMultiplier = 1;
	if(blueMultiplier == null) blueMultiplier = 1;
	if(greenMultiplier == null) greenMultiplier = 1;
	if(redMultiplier == null) redMultiplier = 1;
	this.redMultiplier = redMultiplier;
	this.greenMultiplier = greenMultiplier;
	this.blueMultiplier = blueMultiplier;
	this.alphaMultiplier = alphaMultiplier;
	this.redOffset = redOffset;
	this.greenOffset = greenOffset;
	this.blueOffset = blueOffset;
	this.alphaOffset = alphaOffset;
};
$hxClasses["openfl.geom.ColorTransform"] = openfl.geom.ColorTransform;
openfl.geom.ColorTransform.__name__ = ["openfl","geom","ColorTransform"];
openfl.geom.ColorTransform.prototype = {
	concat: function(second) {
		this.redMultiplier += second.redMultiplier;
		this.greenMultiplier += second.greenMultiplier;
		this.blueMultiplier += second.blueMultiplier;
		this.alphaMultiplier += second.alphaMultiplier;
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.get_color();
	}
	,__toLimeColorMatrix: function() {
		return new Float32Array([this.redMultiplier,0,0,0,this.redOffset / 255,0,this.greenMultiplier,0,0,this.greenOffset / 255,0,0,this.blueMultiplier,0,this.blueOffset / 255,0,0,0,this.alphaMultiplier,this.alphaOffset / 255]);
	}
	,__class__: openfl.geom.ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
};
openfl.geom.Matrix3D = function(v) {
	if(v != null && v.length == 16) this.rawData = v; else {
		var value = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
		var vectorData = new openfl.VectorData();
		vectorData.length = value.length;
		vectorData.fixed = true;
		var vec;
		var this1;
		this1 = new Array(value.length);
		vec = this1;
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			vec[i] = value[i];
		}
		vectorData.data = vec;
		this.rawData = vectorData;
	}
};
$hxClasses["openfl.geom.Matrix3D"] = openfl.geom.Matrix3D;
openfl.geom.Matrix3D.__name__ = ["openfl","geom","Matrix3D"];
openfl.geom.Matrix3D.create2D = function(x,y,scale,rotation) {
	if(rotation == null) rotation = 0;
	if(scale == null) scale = 1;
	var theta = rotation * Math.PI / 180.0;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	return new openfl.geom.Matrix3D((function($this) {
		var $r;
		var value = [c * scale,-s * scale,0,0,s * scale,c * scale,0,0,0,0,1,0,x,y,0,1];
		var vectorData = new openfl.VectorData();
		vectorData.length = value.length;
		vectorData.fixed = true;
		{
			var vec;
			var this1;
			this1 = new Array(value.length);
			vec = this1;
			var _g1 = 0;
			var _g = value.length;
			while(_g1 < _g) {
				var i = _g1++;
				vec[i] = value[i];
			}
			vectorData.data = vec;
		}
		$r = vectorData;
		return $r;
	}(this)));
};
openfl.geom.Matrix3D.createABCD = function(a,b,c,d,tx,ty) {
	return new openfl.geom.Matrix3D((function($this) {
		var $r;
		var value = [a,b,0,0,c,d,0,0,0,0,1,0,tx,ty,0,1];
		var vectorData = new openfl.VectorData();
		vectorData.length = value.length;
		vectorData.fixed = true;
		{
			var vec;
			var this1;
			this1 = new Array(value.length);
			vec = this1;
			var _g1 = 0;
			var _g = value.length;
			while(_g1 < _g) {
				var i = _g1++;
				vec[i] = value[i];
			}
			vectorData.data = vec;
		}
		$r = vectorData;
		return $r;
	}(this)));
};
openfl.geom.Matrix3D.createOrtho = function(x0,x1,y0,y1,zNear,zFar) {
	var sx = 1.0 / (x1 - x0);
	var sy = 1.0 / (y1 - y0);
	var sz = 1.0 / (zFar - zNear);
	return new openfl.geom.Matrix3D((function($this) {
		var $r;
		var value = [2.0 * sx,0,0,0,0,2.0 * sy,0,0,0,0,-2. * sz,0,-(x0 + x1) * sx,-(y0 + y1) * sy,-(zNear + zFar) * sz,1];
		var vectorData = new openfl.VectorData();
		vectorData.length = value.length;
		vectorData.fixed = true;
		{
			var vec;
			var this1;
			this1 = new Array(value.length);
			vec = this1;
			var _g1 = 0;
			var _g = value.length;
			while(_g1 < _g) {
				var i = _g1++;
				vec[i] = value[i];
			}
			vectorData.data = vec;
		}
		$r = vectorData;
		return $r;
	}(this)));
};
openfl.geom.Matrix3D.interpolate = function(thisMat,toMat,percent) {
	var m = new openfl.geom.Matrix3D();
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		var this1 = m.rawData;
		if(!this1.fixed) {
			if(i >= this1.length) this1.length = i + 1;
			if(this1.data.length < this1.length) {
				var data;
				var this2;
				this2 = new Array(this1.data.length + 10);
				data = this2;
				haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
				this1.data = data;
			}
		}
		this1.data[i] = thisMat.rawData.data[i] + (toMat.rawData.data[i] - thisMat.rawData.data[i]) * percent;
	}
	return m;
};
openfl.geom.Matrix3D.getAxisRotation = function(x,y,z,degrees) {
	var m = new openfl.geom.Matrix3D();
	var a1 = new openfl.geom.Vector3D(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	var this1 = m.rawData;
	if(!this1.fixed) {
		if(0 >= this1.length) this1.length = 1;
		if(this1.data.length < this1.length) {
			var data;
			var this2;
			this2 = new Array(this1.data.length + 10);
			data = this2;
			haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
			this1.data = data;
		}
	}
	this1.data[0] = c + a1.x * a1.x * t;
	var this3 = m.rawData;
	if(!this3.fixed) {
		if(5 >= this3.length) this3.length = 6;
		if(this3.data.length < this3.length) {
			var data1;
			var this4;
			this4 = new Array(this3.data.length + 10);
			data1 = this4;
			haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
			this3.data = data1;
		}
	}
	this3.data[5] = c + a1.y * a1.y * t;
	var this5 = m.rawData;
	if(!this5.fixed) {
		if(10 >= this5.length) this5.length = 11;
		if(this5.data.length < this5.length) {
			var data2;
			var this6;
			this6 = new Array(this5.data.length + 10);
			data2 = this6;
			haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
			this5.data = data2;
		}
	}
	this5.data[10] = c + a1.z * a1.z * t;
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	var this7 = m.rawData;
	if(!this7.fixed) {
		if(4 >= this7.length) this7.length = 5;
		if(this7.data.length < this7.length) {
			var data3;
			var this8;
			this8 = new Array(this7.data.length + 10);
			data3 = this8;
			haxe.ds._Vector.Vector_Impl_.blit(this7.data,0,data3,0,this7.data.length);
			this7.data = data3;
		}
	}
	this7.data[4] = tmp1 + tmp2;
	var this9 = m.rawData;
	if(!this9.fixed) {
		if(1 >= this9.length) this9.length = 2;
		if(this9.data.length < this9.length) {
			var data4;
			var this10;
			this10 = new Array(this9.data.length + 10);
			data4 = this10;
			haxe.ds._Vector.Vector_Impl_.blit(this9.data,0,data4,0,this9.data.length);
			this9.data = data4;
		}
	}
	this9.data[1] = tmp1 - tmp2;
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	var this11 = m.rawData;
	if(!this11.fixed) {
		if(8 >= this11.length) this11.length = 9;
		if(this11.data.length < this11.length) {
			var data5;
			var this12;
			this12 = new Array(this11.data.length + 10);
			data5 = this12;
			haxe.ds._Vector.Vector_Impl_.blit(this11.data,0,data5,0,this11.data.length);
			this11.data = data5;
		}
	}
	this11.data[8] = tmp1 - tmp2;
	var this13 = m.rawData;
	if(!this13.fixed) {
		if(2 >= this13.length) this13.length = 3;
		if(this13.data.length < this13.length) {
			var data6;
			var this14;
			this14 = new Array(this13.data.length + 10);
			data6 = this14;
			haxe.ds._Vector.Vector_Impl_.blit(this13.data,0,data6,0,this13.data.length);
			this13.data = data6;
		}
	}
	this13.data[2] = tmp1 + tmp2;
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	var this15 = m.rawData;
	if(!this15.fixed) {
		if(9 >= this15.length) this15.length = 10;
		if(this15.data.length < this15.length) {
			var data7;
			var this16;
			this16 = new Array(this15.data.length + 10);
			data7 = this16;
			haxe.ds._Vector.Vector_Impl_.blit(this15.data,0,data7,0,this15.data.length);
			this15.data = data7;
		}
	}
	this15.data[9] = tmp1 + tmp2;
	var this17 = m.rawData;
	if(!this17.fixed) {
		if(6 >= this17.length) this17.length = 7;
		if(this17.data.length < this17.length) {
			var data8;
			var this18;
			this18 = new Array(this17.data.length + 10);
			data8 = this18;
			haxe.ds._Vector.Vector_Impl_.blit(this17.data,0,data8,0,this17.data.length);
			this17.data = data8;
		}
	}
	this17.data[6] = tmp1 - tmp2;
	return m;
};
openfl.geom.Matrix3D.prototype = {
	append: function(lhs) {
		var m111 = this.rawData.data[0];
		var m121 = this.rawData.data[4];
		var m131 = this.rawData.data[8];
		var m141 = this.rawData.data[12];
		var m112 = this.rawData.data[1];
		var m122 = this.rawData.data[5];
		var m132 = this.rawData.data[9];
		var m142 = this.rawData.data[13];
		var m113 = this.rawData.data[2];
		var m123 = this.rawData.data[6];
		var m133 = this.rawData.data[10];
		var m143 = this.rawData.data[14];
		var m114 = this.rawData.data[3];
		var m124 = this.rawData.data[7];
		var m134 = this.rawData.data[11];
		var m144 = this.rawData.data[15];
		var m211 = lhs.rawData.data[0];
		var m221 = lhs.rawData.data[4];
		var m231 = lhs.rawData.data[8];
		var m241 = lhs.rawData.data[12];
		var m212 = lhs.rawData.data[1];
		var m222 = lhs.rawData.data[5];
		var m232 = lhs.rawData.data[9];
		var m242 = lhs.rawData.data[13];
		var m213 = lhs.rawData.data[2];
		var m223 = lhs.rawData.data[6];
		var m233 = lhs.rawData.data[10];
		var m243 = lhs.rawData.data[14];
		var m214 = lhs.rawData.data[3];
		var m224 = lhs.rawData.data[7];
		var m234 = lhs.rawData.data[11];
		var m244 = lhs.rawData.data[15];
		var this1 = this.rawData;
		if(!this1.fixed) {
			if(0 >= this1.length) this1.length = 1;
			if(this1.data.length < this1.length) {
				var data;
				var this2;
				this2 = new Array(this1.data.length + 10);
				data = this2;
				haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
				this1.data = data;
			}
		}
		this1.data[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		var this3 = this.rawData;
		if(!this3.fixed) {
			if(1 >= this3.length) this3.length = 2;
			if(this3.data.length < this3.length) {
				var data1;
				var this4;
				this4 = new Array(this3.data.length + 10);
				data1 = this4;
				haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
				this3.data = data1;
			}
		}
		this3.data[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		var this5 = this.rawData;
		if(!this5.fixed) {
			if(2 >= this5.length) this5.length = 3;
			if(this5.data.length < this5.length) {
				var data2;
				var this6;
				this6 = new Array(this5.data.length + 10);
				data2 = this6;
				haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
				this5.data = data2;
			}
		}
		this5.data[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		var this7 = this.rawData;
		if(!this7.fixed) {
			if(3 >= this7.length) this7.length = 4;
			if(this7.data.length < this7.length) {
				var data3;
				var this8;
				this8 = new Array(this7.data.length + 10);
				data3 = this8;
				haxe.ds._Vector.Vector_Impl_.blit(this7.data,0,data3,0,this7.data.length);
				this7.data = data3;
			}
		}
		this7.data[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		var this9 = this.rawData;
		if(!this9.fixed) {
			if(4 >= this9.length) this9.length = 5;
			if(this9.data.length < this9.length) {
				var data4;
				var this10;
				this10 = new Array(this9.data.length + 10);
				data4 = this10;
				haxe.ds._Vector.Vector_Impl_.blit(this9.data,0,data4,0,this9.data.length);
				this9.data = data4;
			}
		}
		this9.data[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		var this11 = this.rawData;
		if(!this11.fixed) {
			if(5 >= this11.length) this11.length = 6;
			if(this11.data.length < this11.length) {
				var data5;
				var this12;
				this12 = new Array(this11.data.length + 10);
				data5 = this12;
				haxe.ds._Vector.Vector_Impl_.blit(this11.data,0,data5,0,this11.data.length);
				this11.data = data5;
			}
		}
		this11.data[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		var this13 = this.rawData;
		if(!this13.fixed) {
			if(6 >= this13.length) this13.length = 7;
			if(this13.data.length < this13.length) {
				var data6;
				var this14;
				this14 = new Array(this13.data.length + 10);
				data6 = this14;
				haxe.ds._Vector.Vector_Impl_.blit(this13.data,0,data6,0,this13.data.length);
				this13.data = data6;
			}
		}
		this13.data[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		var this15 = this.rawData;
		if(!this15.fixed) {
			if(7 >= this15.length) this15.length = 8;
			if(this15.data.length < this15.length) {
				var data7;
				var this16;
				this16 = new Array(this15.data.length + 10);
				data7 = this16;
				haxe.ds._Vector.Vector_Impl_.blit(this15.data,0,data7,0,this15.data.length);
				this15.data = data7;
			}
		}
		this15.data[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		var this17 = this.rawData;
		if(!this17.fixed) {
			if(8 >= this17.length) this17.length = 9;
			if(this17.data.length < this17.length) {
				var data8;
				var this18;
				this18 = new Array(this17.data.length + 10);
				data8 = this18;
				haxe.ds._Vector.Vector_Impl_.blit(this17.data,0,data8,0,this17.data.length);
				this17.data = data8;
			}
		}
		this17.data[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		var this19 = this.rawData;
		if(!this19.fixed) {
			if(9 >= this19.length) this19.length = 10;
			if(this19.data.length < this19.length) {
				var data9;
				var this20;
				this20 = new Array(this19.data.length + 10);
				data9 = this20;
				haxe.ds._Vector.Vector_Impl_.blit(this19.data,0,data9,0,this19.data.length);
				this19.data = data9;
			}
		}
		this19.data[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		var this21 = this.rawData;
		if(!this21.fixed) {
			if(10 >= this21.length) this21.length = 11;
			if(this21.data.length < this21.length) {
				var data10;
				var this22;
				this22 = new Array(this21.data.length + 10);
				data10 = this22;
				haxe.ds._Vector.Vector_Impl_.blit(this21.data,0,data10,0,this21.data.length);
				this21.data = data10;
			}
		}
		this21.data[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		var this23 = this.rawData;
		if(!this23.fixed) {
			if(11 >= this23.length) this23.length = 12;
			if(this23.data.length < this23.length) {
				var data11;
				var this24;
				this24 = new Array(this23.data.length + 10);
				data11 = this24;
				haxe.ds._Vector.Vector_Impl_.blit(this23.data,0,data11,0,this23.data.length);
				this23.data = data11;
			}
		}
		this23.data[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		var this25 = this.rawData;
		if(!this25.fixed) {
			if(12 >= this25.length) this25.length = 13;
			if(this25.data.length < this25.length) {
				var data12;
				var this26;
				this26 = new Array(this25.data.length + 10);
				data12 = this26;
				haxe.ds._Vector.Vector_Impl_.blit(this25.data,0,data12,0,this25.data.length);
				this25.data = data12;
			}
		}
		this25.data[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		var this27 = this.rawData;
		if(!this27.fixed) {
			if(13 >= this27.length) this27.length = 14;
			if(this27.data.length < this27.length) {
				var data13;
				var this28;
				this28 = new Array(this27.data.length + 10);
				data13 = this28;
				haxe.ds._Vector.Vector_Impl_.blit(this27.data,0,data13,0,this27.data.length);
				this27.data = data13;
			}
		}
		this27.data[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		var this29 = this.rawData;
		if(!this29.fixed) {
			if(14 >= this29.length) this29.length = 15;
			if(this29.data.length < this29.length) {
				var data14;
				var this30;
				this30 = new Array(this29.data.length + 10);
				data14 = this30;
				haxe.ds._Vector.Vector_Impl_.blit(this29.data,0,data14,0,this29.data.length);
				this29.data = data14;
			}
		}
		this29.data[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		var this31 = this.rawData;
		if(!this31.fixed) {
			if(15 >= this31.length) this31.length = 16;
			if(this31.data.length < this31.length) {
				var data15;
				var this32;
				this32 = new Array(this31.data.length + 10);
				data15 = this32;
				haxe.ds._Vector.Vector_Impl_.blit(this31.data,0,data15,0,this31.data.length);
				this31.data = data15;
			}
		}
		this31.data[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,appendRotation: function(degrees,axis,pivotPoint) {
		var m = openfl.geom.Matrix3D.getAxisRotation(axis.x,axis.y,axis.z,degrees);
		if(pivotPoint != null) {
			var p = pivotPoint;
			m.appendTranslation(p.x,p.y,p.z);
		}
		this.append(m);
	}
	,appendScale: function(xScale,yScale,zScale) {
		this.append(new openfl.geom.Matrix3D((function($this) {
			var $r;
			var value = [xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0];
			var vectorData = new openfl.VectorData();
			vectorData.length = value.length;
			vectorData.fixed = true;
			{
				var vec;
				var this1;
				this1 = new Array(value.length);
				vec = this1;
				var _g1 = 0;
				var _g = value.length;
				while(_g1 < _g) {
					var i = _g1++;
					vec[i] = value[i];
				}
				vectorData.data = vec;
			}
			$r = vectorData;
			return $r;
		}(this))));
	}
	,appendTranslation: function(x,y,z) {
		var this1 = this.rawData;
		if(!this1.fixed) {
			if(12 >= this1.length) this1.length = 13;
			if(this1.data.length < this1.length) {
				var data;
				var this2;
				this2 = new Array(this1.data.length + 10);
				data = this2;
				haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
				this1.data = data;
			}
		}
		this1.data[12] = this.rawData.data[12] + x;
		var this3 = this.rawData;
		if(!this3.fixed) {
			if(13 >= this3.length) this3.length = 14;
			if(this3.data.length < this3.length) {
				var data1;
				var this4;
				this4 = new Array(this3.data.length + 10);
				data1 = this4;
				haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
				this3.data = data1;
			}
		}
		this3.data[13] = this.rawData.data[13] + y;
		var this5 = this.rawData;
		if(!this5.fixed) {
			if(14 >= this5.length) this5.length = 15;
			if(this5.data.length < this5.length) {
				var data2;
				var this6;
				this6 = new Array(this5.data.length + 10);
				data2 = this6;
				haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
				this5.data = data2;
			}
		}
		this5.data[14] = this.rawData.data[14] + z;
	}
	,clone: function() {
		return new openfl.geom.Matrix3D((function($this) {
			var $r;
			var this1 = $this.rawData;
			var vectorData = new openfl.VectorData();
			vectorData.length = this1.length;
			vectorData.fixed = this1.fixed;
			{
				var this2;
				this2 = new Array(this1.length);
				vectorData.data = this2;
			}
			haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,vectorData.data,0,this1.length);
			$r = vectorData;
			return $r;
		}(this)));
	}
	,copyColumnFrom: function(column,vector3D) {
		switch(column) {
		case 0:
			var this1 = this.rawData;
			if(!this1.fixed) {
				if(0 >= this1.length) this1.length = 1;
				if(this1.data.length < this1.length) {
					var data;
					var this2;
					this2 = new Array(this1.data.length + 10);
					data = this2;
					haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
					this1.data = data;
				}
			}
			this1.data[0] = vector3D.x;
			var this3 = this.rawData;
			if(!this3.fixed) {
				if(1 >= this3.length) this3.length = 2;
				if(this3.data.length < this3.length) {
					var data1;
					var this4;
					this4 = new Array(this3.data.length + 10);
					data1 = this4;
					haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
					this3.data = data1;
				}
			}
			this3.data[1] = vector3D.y;
			var this5 = this.rawData;
			if(!this5.fixed) {
				if(2 >= this5.length) this5.length = 3;
				if(this5.data.length < this5.length) {
					var data2;
					var this6;
					this6 = new Array(this5.data.length + 10);
					data2 = this6;
					haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
					this5.data = data2;
				}
			}
			this5.data[2] = vector3D.z;
			var this7 = this.rawData;
			if(!this7.fixed) {
				if(3 >= this7.length) this7.length = 4;
				if(this7.data.length < this7.length) {
					var data3;
					var this8;
					this8 = new Array(this7.data.length + 10);
					data3 = this8;
					haxe.ds._Vector.Vector_Impl_.blit(this7.data,0,data3,0,this7.data.length);
					this7.data = data3;
				}
			}
			this7.data[3] = vector3D.w;
			break;
		case 1:
			var this9 = this.rawData;
			if(!this9.fixed) {
				if(4 >= this9.length) this9.length = 5;
				if(this9.data.length < this9.length) {
					var data4;
					var this10;
					this10 = new Array(this9.data.length + 10);
					data4 = this10;
					haxe.ds._Vector.Vector_Impl_.blit(this9.data,0,data4,0,this9.data.length);
					this9.data = data4;
				}
			}
			this9.data[4] = vector3D.x;
			var this11 = this.rawData;
			if(!this11.fixed) {
				if(5 >= this11.length) this11.length = 6;
				if(this11.data.length < this11.length) {
					var data5;
					var this12;
					this12 = new Array(this11.data.length + 10);
					data5 = this12;
					haxe.ds._Vector.Vector_Impl_.blit(this11.data,0,data5,0,this11.data.length);
					this11.data = data5;
				}
			}
			this11.data[5] = vector3D.y;
			var this13 = this.rawData;
			if(!this13.fixed) {
				if(6 >= this13.length) this13.length = 7;
				if(this13.data.length < this13.length) {
					var data6;
					var this14;
					this14 = new Array(this13.data.length + 10);
					data6 = this14;
					haxe.ds._Vector.Vector_Impl_.blit(this13.data,0,data6,0,this13.data.length);
					this13.data = data6;
				}
			}
			this13.data[6] = vector3D.z;
			var this15 = this.rawData;
			if(!this15.fixed) {
				if(7 >= this15.length) this15.length = 8;
				if(this15.data.length < this15.length) {
					var data7;
					var this16;
					this16 = new Array(this15.data.length + 10);
					data7 = this16;
					haxe.ds._Vector.Vector_Impl_.blit(this15.data,0,data7,0,this15.data.length);
					this15.data = data7;
				}
			}
			this15.data[7] = vector3D.w;
			break;
		case 2:
			var this17 = this.rawData;
			if(!this17.fixed) {
				if(8 >= this17.length) this17.length = 9;
				if(this17.data.length < this17.length) {
					var data8;
					var this18;
					this18 = new Array(this17.data.length + 10);
					data8 = this18;
					haxe.ds._Vector.Vector_Impl_.blit(this17.data,0,data8,0,this17.data.length);
					this17.data = data8;
				}
			}
			this17.data[8] = vector3D.x;
			var this19 = this.rawData;
			if(!this19.fixed) {
				if(9 >= this19.length) this19.length = 10;
				if(this19.data.length < this19.length) {
					var data9;
					var this20;
					this20 = new Array(this19.data.length + 10);
					data9 = this20;
					haxe.ds._Vector.Vector_Impl_.blit(this19.data,0,data9,0,this19.data.length);
					this19.data = data9;
				}
			}
			this19.data[9] = vector3D.y;
			var this21 = this.rawData;
			if(!this21.fixed) {
				if(10 >= this21.length) this21.length = 11;
				if(this21.data.length < this21.length) {
					var data10;
					var this22;
					this22 = new Array(this21.data.length + 10);
					data10 = this22;
					haxe.ds._Vector.Vector_Impl_.blit(this21.data,0,data10,0,this21.data.length);
					this21.data = data10;
				}
			}
			this21.data[10] = vector3D.z;
			var this23 = this.rawData;
			if(!this23.fixed) {
				if(11 >= this23.length) this23.length = 12;
				if(this23.data.length < this23.length) {
					var data11;
					var this24;
					this24 = new Array(this23.data.length + 10);
					data11 = this24;
					haxe.ds._Vector.Vector_Impl_.blit(this23.data,0,data11,0,this23.data.length);
					this23.data = data11;
				}
			}
			this23.data[11] = vector3D.w;
			break;
		case 3:
			var this25 = this.rawData;
			if(!this25.fixed) {
				if(12 >= this25.length) this25.length = 13;
				if(this25.data.length < this25.length) {
					var data12;
					var this26;
					this26 = new Array(this25.data.length + 10);
					data12 = this26;
					haxe.ds._Vector.Vector_Impl_.blit(this25.data,0,data12,0,this25.data.length);
					this25.data = data12;
				}
			}
			this25.data[12] = vector3D.x;
			var this27 = this.rawData;
			if(!this27.fixed) {
				if(13 >= this27.length) this27.length = 14;
				if(this27.data.length < this27.length) {
					var data13;
					var this28;
					this28 = new Array(this27.data.length + 10);
					data13 = this28;
					haxe.ds._Vector.Vector_Impl_.blit(this27.data,0,data13,0,this27.data.length);
					this27.data = data13;
				}
			}
			this27.data[13] = vector3D.y;
			var this29 = this.rawData;
			if(!this29.fixed) {
				if(14 >= this29.length) this29.length = 15;
				if(this29.data.length < this29.length) {
					var data14;
					var this30;
					this30 = new Array(this29.data.length + 10);
					data14 = this30;
					haxe.ds._Vector.Vector_Impl_.blit(this29.data,0,data14,0,this29.data.length);
					this29.data = data14;
				}
			}
			this29.data[14] = vector3D.z;
			var this31 = this.rawData;
			if(!this31.fixed) {
				if(15 >= this31.length) this31.length = 16;
				if(this31.data.length < this31.length) {
					var data15;
					var this32;
					this32 = new Array(this31.data.length + 10);
					data15 = this32;
					haxe.ds._Vector.Vector_Impl_.blit(this31.data,0,data15,0,this31.data.length);
					this31.data = data15;
				}
			}
			this31.data[15] = vector3D.w;
			break;
		default:
			throw new openfl.errors.Error("Error, Column " + column + " out of bounds [0, ..., 3]");
		}
	}
	,copyColumnTo: function(column,vector3D) {
		switch(column) {
		case 0:
			vector3D.x = this.rawData.data[0];
			vector3D.y = this.rawData.data[1];
			vector3D.z = this.rawData.data[2];
			vector3D.w = this.rawData.data[3];
			break;
		case 1:
			vector3D.x = this.rawData.data[4];
			vector3D.y = this.rawData.data[5];
			vector3D.z = this.rawData.data[6];
			vector3D.w = this.rawData.data[7];
			break;
		case 2:
			vector3D.x = this.rawData.data[8];
			vector3D.y = this.rawData.data[9];
			vector3D.z = this.rawData.data[10];
			vector3D.w = this.rawData.data[11];
			break;
		case 3:
			vector3D.x = this.rawData.data[12];
			vector3D.y = this.rawData.data[13];
			vector3D.z = this.rawData.data[14];
			vector3D.w = this.rawData.data[15];
			break;
		default:
			throw new openfl.errors.Error("Error, Column " + column + " out of bounds [0, ..., 3]");
		}
	}
	,copyFrom: function(other) {
		var this1 = other.rawData;
		var vectorData = new openfl.VectorData();
		vectorData.length = this1.length;
		vectorData.fixed = this1.fixed;
		var this2;
		this2 = new Array(this1.length);
		vectorData.data = this2;
		haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,vectorData.data,0,this1.length);
		this.rawData = vectorData;
	}
	,copyRawDataFrom: function(vector,index,transpose) {
		if(transpose == null) transpose = false;
		if(index == null) index = 0;
		if(transpose) this.transpose();
		var l = vector.length - index;
		var _g = 0;
		while(_g < l) {
			var c = _g++;
			var this1 = this.rawData;
			if(!this1.fixed) {
				if(c >= this1.length) this1.length = c + 1;
				if(this1.data.length < this1.length) {
					var data;
					var this2;
					this2 = new Array(this1.data.length + 10);
					data = this2;
					haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
					this1.data = data;
				}
			}
			this1.data[c] = vector.data[c + index];
		}
		if(transpose) this.transpose();
	}
	,copyRawDataTo: function(vector,index,transpose) {
		if(transpose == null) transpose = false;
		if(index == null) index = 0;
		if(transpose) this.transpose();
		var l = this.rawData.length;
		var _g = 0;
		while(_g < l) {
			var c = _g++;
			var key = c + index;
			if(!vector.fixed) {
				if(key >= vector.length) vector.length = key + 1;
				if(vector.data.length < vector.length) {
					var data;
					var this1;
					this1 = new Array(vector.data.length + 10);
					data = this1;
					haxe.ds._Vector.Vector_Impl_.blit(vector.data,0,data,0,vector.data.length);
					vector.data = data;
				}
			}
			vector.data[key] = this.rawData.data[c];
		}
		if(transpose) this.transpose();
	}
	,copyRowFrom: function(row,vector3D) {
		switch(row) {
		case 0:
			var this1 = this.rawData;
			if(!this1.fixed) {
				if(0 >= this1.length) this1.length = 1;
				if(this1.data.length < this1.length) {
					var data;
					var this2;
					this2 = new Array(this1.data.length + 10);
					data = this2;
					haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
					this1.data = data;
				}
			}
			this1.data[0] = vector3D.x;
			var this3 = this.rawData;
			if(!this3.fixed) {
				if(4 >= this3.length) this3.length = 5;
				if(this3.data.length < this3.length) {
					var data1;
					var this4;
					this4 = new Array(this3.data.length + 10);
					data1 = this4;
					haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
					this3.data = data1;
				}
			}
			this3.data[4] = vector3D.y;
			var this5 = this.rawData;
			if(!this5.fixed) {
				if(8 >= this5.length) this5.length = 9;
				if(this5.data.length < this5.length) {
					var data2;
					var this6;
					this6 = new Array(this5.data.length + 10);
					data2 = this6;
					haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
					this5.data = data2;
				}
			}
			this5.data[8] = vector3D.z;
			var this7 = this.rawData;
			if(!this7.fixed) {
				if(12 >= this7.length) this7.length = 13;
				if(this7.data.length < this7.length) {
					var data3;
					var this8;
					this8 = new Array(this7.data.length + 10);
					data3 = this8;
					haxe.ds._Vector.Vector_Impl_.blit(this7.data,0,data3,0,this7.data.length);
					this7.data = data3;
				}
			}
			this7.data[12] = vector3D.w;
			break;
		case 1:
			var this9 = this.rawData;
			if(!this9.fixed) {
				if(1 >= this9.length) this9.length = 2;
				if(this9.data.length < this9.length) {
					var data4;
					var this10;
					this10 = new Array(this9.data.length + 10);
					data4 = this10;
					haxe.ds._Vector.Vector_Impl_.blit(this9.data,0,data4,0,this9.data.length);
					this9.data = data4;
				}
			}
			this9.data[1] = vector3D.x;
			var this11 = this.rawData;
			if(!this11.fixed) {
				if(5 >= this11.length) this11.length = 6;
				if(this11.data.length < this11.length) {
					var data5;
					var this12;
					this12 = new Array(this11.data.length + 10);
					data5 = this12;
					haxe.ds._Vector.Vector_Impl_.blit(this11.data,0,data5,0,this11.data.length);
					this11.data = data5;
				}
			}
			this11.data[5] = vector3D.y;
			var this13 = this.rawData;
			if(!this13.fixed) {
				if(9 >= this13.length) this13.length = 10;
				if(this13.data.length < this13.length) {
					var data6;
					var this14;
					this14 = new Array(this13.data.length + 10);
					data6 = this14;
					haxe.ds._Vector.Vector_Impl_.blit(this13.data,0,data6,0,this13.data.length);
					this13.data = data6;
				}
			}
			this13.data[9] = vector3D.z;
			var this15 = this.rawData;
			if(!this15.fixed) {
				if(13 >= this15.length) this15.length = 14;
				if(this15.data.length < this15.length) {
					var data7;
					var this16;
					this16 = new Array(this15.data.length + 10);
					data7 = this16;
					haxe.ds._Vector.Vector_Impl_.blit(this15.data,0,data7,0,this15.data.length);
					this15.data = data7;
				}
			}
			this15.data[13] = vector3D.w;
			break;
		case 2:
			var this17 = this.rawData;
			if(!this17.fixed) {
				if(2 >= this17.length) this17.length = 3;
				if(this17.data.length < this17.length) {
					var data8;
					var this18;
					this18 = new Array(this17.data.length + 10);
					data8 = this18;
					haxe.ds._Vector.Vector_Impl_.blit(this17.data,0,data8,0,this17.data.length);
					this17.data = data8;
				}
			}
			this17.data[2] = vector3D.x;
			var this19 = this.rawData;
			if(!this19.fixed) {
				if(6 >= this19.length) this19.length = 7;
				if(this19.data.length < this19.length) {
					var data9;
					var this20;
					this20 = new Array(this19.data.length + 10);
					data9 = this20;
					haxe.ds._Vector.Vector_Impl_.blit(this19.data,0,data9,0,this19.data.length);
					this19.data = data9;
				}
			}
			this19.data[6] = vector3D.y;
			var this21 = this.rawData;
			if(!this21.fixed) {
				if(10 >= this21.length) this21.length = 11;
				if(this21.data.length < this21.length) {
					var data10;
					var this22;
					this22 = new Array(this21.data.length + 10);
					data10 = this22;
					haxe.ds._Vector.Vector_Impl_.blit(this21.data,0,data10,0,this21.data.length);
					this21.data = data10;
				}
			}
			this21.data[10] = vector3D.z;
			var this23 = this.rawData;
			if(!this23.fixed) {
				if(14 >= this23.length) this23.length = 15;
				if(this23.data.length < this23.length) {
					var data11;
					var this24;
					this24 = new Array(this23.data.length + 10);
					data11 = this24;
					haxe.ds._Vector.Vector_Impl_.blit(this23.data,0,data11,0,this23.data.length);
					this23.data = data11;
				}
			}
			this23.data[14] = vector3D.w;
			break;
		case 3:
			var this25 = this.rawData;
			if(!this25.fixed) {
				if(3 >= this25.length) this25.length = 4;
				if(this25.data.length < this25.length) {
					var data12;
					var this26;
					this26 = new Array(this25.data.length + 10);
					data12 = this26;
					haxe.ds._Vector.Vector_Impl_.blit(this25.data,0,data12,0,this25.data.length);
					this25.data = data12;
				}
			}
			this25.data[3] = vector3D.x;
			var this27 = this.rawData;
			if(!this27.fixed) {
				if(7 >= this27.length) this27.length = 8;
				if(this27.data.length < this27.length) {
					var data13;
					var this28;
					this28 = new Array(this27.data.length + 10);
					data13 = this28;
					haxe.ds._Vector.Vector_Impl_.blit(this27.data,0,data13,0,this27.data.length);
					this27.data = data13;
				}
			}
			this27.data[7] = vector3D.y;
			var this29 = this.rawData;
			if(!this29.fixed) {
				if(11 >= this29.length) this29.length = 12;
				if(this29.data.length < this29.length) {
					var data14;
					var this30;
					this30 = new Array(this29.data.length + 10);
					data14 = this30;
					haxe.ds._Vector.Vector_Impl_.blit(this29.data,0,data14,0,this29.data.length);
					this29.data = data14;
				}
			}
			this29.data[11] = vector3D.z;
			var this31 = this.rawData;
			if(!this31.fixed) {
				if(15 >= this31.length) this31.length = 16;
				if(this31.data.length < this31.length) {
					var data15;
					var this32;
					this32 = new Array(this31.data.length + 10);
					data15 = this32;
					haxe.ds._Vector.Vector_Impl_.blit(this31.data,0,data15,0,this31.data.length);
					this31.data = data15;
				}
			}
			this31.data[15] = vector3D.w;
			break;
		default:
			throw new openfl.errors.Error("Error, Row " + Std.string((function($this) {
				var $r;
				var $int = row;
				$r = $int < 0?4294967296.0 + $int:$int + 0.0;
				return $r;
			}(this))) + " out of bounds [0, ..., 3]");
		}
	}
	,copyRowTo: function(row,vector3D) {
		switch(row) {
		case 0:
			vector3D.x = this.rawData.data[0];
			vector3D.y = this.rawData.data[4];
			vector3D.z = this.rawData.data[8];
			vector3D.w = this.rawData.data[12];
			break;
		case 1:
			vector3D.x = this.rawData.data[1];
			vector3D.y = this.rawData.data[5];
			vector3D.z = this.rawData.data[9];
			vector3D.w = this.rawData.data[13];
			break;
		case 2:
			vector3D.x = this.rawData.data[2];
			vector3D.y = this.rawData.data[6];
			vector3D.z = this.rawData.data[10];
			vector3D.w = this.rawData.data[14];
			break;
		case 3:
			vector3D.x = this.rawData.data[3];
			vector3D.y = this.rawData.data[7];
			vector3D.z = this.rawData.data[11];
			vector3D.w = this.rawData.data[15];
			break;
		default:
			throw new openfl.errors.Error("Error, Row " + row + " out of bounds [0, ..., 3]");
		}
	}
	,copyToMatrix3D: function(other) {
		var this1 = this.rawData;
		var vectorData = new openfl.VectorData();
		vectorData.length = this1.length;
		vectorData.fixed = this1.fixed;
		var this2;
		this2 = new Array(this1.length);
		vectorData.data = this2;
		haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,vectorData.data,0,this1.length);
		other.rawData = vectorData;
	}
	,decompose: function(orientationStyle) {
		if(orientationStyle == null) orientationStyle = openfl.geom.Orientation3D.EULER_ANGLES;
		var vec;
		var this1;
		this1 = new openfl.VectorData();
		var this2;
		this2 = new Array(0);
		this1.data = this2;
		this1.length = 0;
		this1.fixed = false;
		vec = this1;
		var m = this.clone();
		var mr;
		var this3 = m.rawData;
		var vectorData = new openfl.VectorData();
		vectorData.length = this3.length;
		vectorData.fixed = this3.fixed;
		var this4;
		this4 = new Array(this3.length);
		vectorData.data = this4;
		haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,vectorData.data,0,this3.length);
		mr = vectorData;
		var pos = new openfl.geom.Vector3D(mr.data[12],mr.data[13],mr.data[14]);
		if(!mr.fixed) {
			if(12 >= mr.length) mr.length = 13;
			if(mr.data.length < mr.length) {
				var data;
				var this5;
				this5 = new Array(mr.data.length + 10);
				data = this5;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data,0,mr.data.length);
				mr.data = data;
			}
		}
		mr.data[12] = 0;
		if(!mr.fixed) {
			if(13 >= mr.length) mr.length = 14;
			if(mr.data.length < mr.length) {
				var data1;
				var this6;
				this6 = new Array(mr.data.length + 10);
				data1 = this6;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data1,0,mr.data.length);
				mr.data = data1;
			}
		}
		mr.data[13] = 0;
		if(!mr.fixed) {
			if(14 >= mr.length) mr.length = 15;
			if(mr.data.length < mr.length) {
				var data2;
				var this7;
				this7 = new Array(mr.data.length + 10);
				data2 = this7;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data2,0,mr.data.length);
				mr.data = data2;
			}
		}
		mr.data[14] = 0;
		var scale = new openfl.geom.Vector3D();
		scale.x = Math.sqrt(mr.data[0] * mr.data[0] + mr.data[1] * mr.data[1] + mr.data[2] * mr.data[2]);
		scale.y = Math.sqrt(mr.data[4] * mr.data[4] + mr.data[5] * mr.data[5] + mr.data[6] * mr.data[6]);
		scale.z = Math.sqrt(mr.data[8] * mr.data[8] + mr.data[9] * mr.data[9] + mr.data[10] * mr.data[10]);
		if(mr.data[0] * (mr.data[5] * mr.data[10] - mr.data[6] * mr.data[9]) - mr.data[1] * (mr.data[4] * mr.data[10] - mr.data[6] * mr.data[8]) + mr.data[2] * (mr.data[4] * mr.data[9] - mr.data[5] * mr.data[8]) < 0) scale.z = -scale.z;
		if(!mr.fixed) {
			if(0 >= mr.length) mr.length = 1;
			if(mr.data.length < mr.length) {
				var data3;
				var this8;
				this8 = new Array(mr.data.length + 10);
				data3 = this8;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data3,0,mr.data.length);
				mr.data = data3;
			}
		}
		mr.data[0] = mr.data[0] / scale.x;
		if(!mr.fixed) {
			if(1 >= mr.length) mr.length = 2;
			if(mr.data.length < mr.length) {
				var data4;
				var this9;
				this9 = new Array(mr.data.length + 10);
				data4 = this9;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data4,0,mr.data.length);
				mr.data = data4;
			}
		}
		mr.data[1] = mr.data[1] / scale.x;
		if(!mr.fixed) {
			if(2 >= mr.length) mr.length = 3;
			if(mr.data.length < mr.length) {
				var data5;
				var this10;
				this10 = new Array(mr.data.length + 10);
				data5 = this10;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data5,0,mr.data.length);
				mr.data = data5;
			}
		}
		mr.data[2] = mr.data[2] / scale.x;
		if(!mr.fixed) {
			if(4 >= mr.length) mr.length = 5;
			if(mr.data.length < mr.length) {
				var data6;
				var this11;
				this11 = new Array(mr.data.length + 10);
				data6 = this11;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data6,0,mr.data.length);
				mr.data = data6;
			}
		}
		mr.data[4] = mr.data[4] / scale.y;
		if(!mr.fixed) {
			if(5 >= mr.length) mr.length = 6;
			if(mr.data.length < mr.length) {
				var data7;
				var this12;
				this12 = new Array(mr.data.length + 10);
				data7 = this12;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data7,0,mr.data.length);
				mr.data = data7;
			}
		}
		mr.data[5] = mr.data[5] / scale.y;
		if(!mr.fixed) {
			if(6 >= mr.length) mr.length = 7;
			if(mr.data.length < mr.length) {
				var data8;
				var this13;
				this13 = new Array(mr.data.length + 10);
				data8 = this13;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data8,0,mr.data.length);
				mr.data = data8;
			}
		}
		mr.data[6] = mr.data[6] / scale.y;
		if(!mr.fixed) {
			if(8 >= mr.length) mr.length = 9;
			if(mr.data.length < mr.length) {
				var data9;
				var this14;
				this14 = new Array(mr.data.length + 10);
				data9 = this14;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data9,0,mr.data.length);
				mr.data = data9;
			}
		}
		mr.data[8] = mr.data[8] / scale.z;
		if(!mr.fixed) {
			if(9 >= mr.length) mr.length = 10;
			if(mr.data.length < mr.length) {
				var data10;
				var this15;
				this15 = new Array(mr.data.length + 10);
				data10 = this15;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data10,0,mr.data.length);
				mr.data = data10;
			}
		}
		mr.data[9] = mr.data[9] / scale.z;
		if(!mr.fixed) {
			if(10 >= mr.length) mr.length = 11;
			if(mr.data.length < mr.length) {
				var data11;
				var this16;
				this16 = new Array(mr.data.length + 10);
				data11 = this16;
				haxe.ds._Vector.Vector_Impl_.blit(mr.data,0,data11,0,mr.data.length);
				mr.data = data11;
			}
		}
		mr.data[10] = mr.data[10] / scale.z;
		var rot = new openfl.geom.Vector3D();
		switch(orientationStyle[1]) {
		case 0:
			rot.w = Math.acos((mr.data[0] + mr.data[5] + mr.data[10] - 1) / 2);
			var len = Math.sqrt((mr.data[6] - mr.data[9]) * (mr.data[6] - mr.data[9]) + (mr.data[8] - mr.data[2]) * (mr.data[8] - mr.data[2]) + (mr.data[1] - mr.data[4]) * (mr.data[1] - mr.data[4]));
			if(len != 0) {
				rot.x = (mr.data[6] - mr.data[9]) / len;
				rot.y = (mr.data[8] - mr.data[2]) / len;
				rot.z = (mr.data[1] - mr.data[4]) / len;
			} else rot.x = rot.y = rot.z = 0;
			break;
		case 2:
			var tr = mr.data[0] + mr.data[5] + mr.data[10];
			if(tr > 0) {
				rot.w = Math.sqrt(1 + tr) / 2;
				rot.x = (mr.data[6] - mr.data[9]) / (4 * rot.w);
				rot.y = (mr.data[8] - mr.data[2]) / (4 * rot.w);
				rot.z = (mr.data[1] - mr.data[4]) / (4 * rot.w);
			} else if(mr.data[0] > mr.data[5] && mr.data[0] > mr.data[10]) {
				rot.x = Math.sqrt(1 + mr.data[0] - mr.data[5] - mr.data[10]) / 2;
				rot.w = (mr.data[6] - mr.data[9]) / (4 * rot.x);
				rot.y = (mr.data[1] + mr.data[4]) / (4 * rot.x);
				rot.z = (mr.data[8] + mr.data[2]) / (4 * rot.x);
			} else if(mr.data[5] > mr.data[10]) {
				rot.y = Math.sqrt(1 + mr.data[5] - mr.data[0] - mr.data[10]) / 2;
				rot.x = (mr.data[1] + mr.data[4]) / (4 * rot.y);
				rot.w = (mr.data[8] - mr.data[2]) / (4 * rot.y);
				rot.z = (mr.data[6] + mr.data[9]) / (4 * rot.y);
			} else {
				rot.z = Math.sqrt(1 + mr.data[10] - mr.data[0] - mr.data[5]) / 2;
				rot.x = (mr.data[8] + mr.data[2]) / (4 * rot.z);
				rot.y = (mr.data[6] + mr.data[9]) / (4 * rot.z);
				rot.w = (mr.data[1] - mr.data[4]) / (4 * rot.z);
			}
			break;
		case 1:
			rot.y = Math.asin(-mr.data[2]);
			if(mr.data[2] != 1 && mr.data[2] != -1) {
				rot.x = Math.atan2(mr.data[6],mr.data[10]);
				rot.z = Math.atan2(mr.data[1],mr.data[0]);
			} else {
				rot.z = 0;
				rot.x = Math.atan2(mr.data[4],mr.data[5]);
			}
			break;
		}
		if(!vec.fixed) {
			vec.length++;
			if(vec.data.length < vec.length) {
				var data12;
				var this17;
				this17 = new Array(vec.data.length + 10);
				data12 = this17;
				haxe.ds._Vector.Vector_Impl_.blit(vec.data,0,data12,0,vec.data.length);
				vec.data = data12;
			}
			vec.data[vec.length - 1] = pos;
		}
		vec.length;
		if(!vec.fixed) {
			vec.length++;
			if(vec.data.length < vec.length) {
				var data13;
				var this18;
				this18 = new Array(vec.data.length + 10);
				data13 = this18;
				haxe.ds._Vector.Vector_Impl_.blit(vec.data,0,data13,0,vec.data.length);
				vec.data = data13;
			}
			vec.data[vec.length - 1] = rot;
		}
		vec.length;
		if(!vec.fixed) {
			vec.length++;
			if(vec.data.length < vec.length) {
				var data14;
				var this19;
				this19 = new Array(vec.data.length + 10);
				data14 = this19;
				haxe.ds._Vector.Vector_Impl_.blit(vec.data,0,data14,0,vec.data.length);
				vec.data = data14;
			}
			vec.data[vec.length - 1] = scale;
		}
		vec.length;
		return vec;
	}
	,deltaTransformVector: function(v) {
		var x = v.x;
		var y = v.y;
		var z = v.z;
		return new openfl.geom.Vector3D(x * this.rawData.data[0] + y * this.rawData.data[4] + z * this.rawData.data[8] + this.rawData.data[3],x * this.rawData.data[1] + y * this.rawData.data[5] + z * this.rawData.data[9] + this.rawData.data[7],x * this.rawData.data[2] + y * this.rawData.data[6] + z * this.rawData.data[10] + this.rawData.data[11],0);
	}
	,identity: function() {
		var value = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
		var vectorData = new openfl.VectorData();
		vectorData.length = value.length;
		vectorData.fixed = true;
		var vec;
		var this1;
		this1 = new Array(value.length);
		vec = this1;
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			vec[i] = value[i];
		}
		vectorData.data = vec;
		this.rawData = vectorData;
	}
	,interpolateTo: function(toMat,percent) {
		var _g = 0;
		while(_g < 16) {
			var i = _g++;
			var this1 = this.rawData;
			if(!this1.fixed) {
				if(i >= this1.length) this1.length = i + 1;
				if(this1.data.length < this1.length) {
					var data;
					var this2;
					this2 = new Array(this1.data.length + 10);
					data = this2;
					haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
					this1.data = data;
				}
			}
			this1.data[i] = this.rawData.data[i] + (toMat.rawData.data[i] - this.rawData.data[i]) * percent;
		}
	}
	,invert: function() {
		var d = (this.rawData.data[0] * this.rawData.data[5] - this.rawData.data[4] * this.rawData.data[1]) * (this.rawData.data[10] * this.rawData.data[15] - this.rawData.data[14] * this.rawData.data[11]) - (this.rawData.data[0] * this.rawData.data[9] - this.rawData.data[8] * this.rawData.data[1]) * (this.rawData.data[6] * this.rawData.data[15] - this.rawData.data[14] * this.rawData.data[7]) + (this.rawData.data[0] * this.rawData.data[13] - this.rawData.data[12] * this.rawData.data[1]) * (this.rawData.data[6] * this.rawData.data[11] - this.rawData.data[10] * this.rawData.data[7]) + (this.rawData.data[4] * this.rawData.data[9] - this.rawData.data[8] * this.rawData.data[5]) * (this.rawData.data[2] * this.rawData.data[15] - this.rawData.data[14] * this.rawData.data[3]) - (this.rawData.data[4] * this.rawData.data[13] - this.rawData.data[12] * this.rawData.data[5]) * (this.rawData.data[2] * this.rawData.data[11] - this.rawData.data[10] * this.rawData.data[3]) + (this.rawData.data[8] * this.rawData.data[13] - this.rawData.data[12] * this.rawData.data[9]) * (this.rawData.data[2] * this.rawData.data[7] - this.rawData.data[6] * this.rawData.data[3]);
		var invertable = Math.abs(d) > 0.00000000001;
		if(invertable) {
			d = 1 / d;
			var m11 = this.rawData.data[0];
			var m21 = this.rawData.data[4];
			var m31 = this.rawData.data[8];
			var m41 = this.rawData.data[12];
			var m12 = this.rawData.data[1];
			var m22 = this.rawData.data[5];
			var m32 = this.rawData.data[9];
			var m42 = this.rawData.data[13];
			var m13 = this.rawData.data[2];
			var m23 = this.rawData.data[6];
			var m33 = this.rawData.data[10];
			var m43 = this.rawData.data[14];
			var m14 = this.rawData.data[3];
			var m24 = this.rawData.data[7];
			var m34 = this.rawData.data[11];
			var m44 = this.rawData.data[15];
			var this1 = this.rawData;
			if(!this1.fixed) {
				if(0 >= this1.length) this1.length = 1;
				if(this1.data.length < this1.length) {
					var data;
					var this2;
					this2 = new Array(this1.data.length + 10);
					data = this2;
					haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
					this1.data = data;
				}
			}
			this1.data[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
			var this3 = this.rawData;
			if(!this3.fixed) {
				if(1 >= this3.length) this3.length = 2;
				if(this3.data.length < this3.length) {
					var data1;
					var this4;
					this4 = new Array(this3.data.length + 10);
					data1 = this4;
					haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
					this3.data = data1;
				}
			}
			this3.data[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
			var this5 = this.rawData;
			if(!this5.fixed) {
				if(2 >= this5.length) this5.length = 3;
				if(this5.data.length < this5.length) {
					var data2;
					var this6;
					this6 = new Array(this5.data.length + 10);
					data2 = this6;
					haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
					this5.data = data2;
				}
			}
			this5.data[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
			var this7 = this.rawData;
			if(!this7.fixed) {
				if(3 >= this7.length) this7.length = 4;
				if(this7.data.length < this7.length) {
					var data3;
					var this8;
					this8 = new Array(this7.data.length + 10);
					data3 = this8;
					haxe.ds._Vector.Vector_Impl_.blit(this7.data,0,data3,0,this7.data.length);
					this7.data = data3;
				}
			}
			this7.data[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
			var this9 = this.rawData;
			if(!this9.fixed) {
				if(4 >= this9.length) this9.length = 5;
				if(this9.data.length < this9.length) {
					var data4;
					var this10;
					this10 = new Array(this9.data.length + 10);
					data4 = this10;
					haxe.ds._Vector.Vector_Impl_.blit(this9.data,0,data4,0,this9.data.length);
					this9.data = data4;
				}
			}
			this9.data[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
			var this11 = this.rawData;
			if(!this11.fixed) {
				if(5 >= this11.length) this11.length = 6;
				if(this11.data.length < this11.length) {
					var data5;
					var this12;
					this12 = new Array(this11.data.length + 10);
					data5 = this12;
					haxe.ds._Vector.Vector_Impl_.blit(this11.data,0,data5,0,this11.data.length);
					this11.data = data5;
				}
			}
			this11.data[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
			var this13 = this.rawData;
			if(!this13.fixed) {
				if(6 >= this13.length) this13.length = 7;
				if(this13.data.length < this13.length) {
					var data6;
					var this14;
					this14 = new Array(this13.data.length + 10);
					data6 = this14;
					haxe.ds._Vector.Vector_Impl_.blit(this13.data,0,data6,0,this13.data.length);
					this13.data = data6;
				}
			}
			this13.data[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
			var this15 = this.rawData;
			if(!this15.fixed) {
				if(7 >= this15.length) this15.length = 8;
				if(this15.data.length < this15.length) {
					var data7;
					var this16;
					this16 = new Array(this15.data.length + 10);
					data7 = this16;
					haxe.ds._Vector.Vector_Impl_.blit(this15.data,0,data7,0,this15.data.length);
					this15.data = data7;
				}
			}
			this15.data[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
			var this17 = this.rawData;
			if(!this17.fixed) {
				if(8 >= this17.length) this17.length = 9;
				if(this17.data.length < this17.length) {
					var data8;
					var this18;
					this18 = new Array(this17.data.length + 10);
					data8 = this18;
					haxe.ds._Vector.Vector_Impl_.blit(this17.data,0,data8,0,this17.data.length);
					this17.data = data8;
				}
			}
			this17.data[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
			var this19 = this.rawData;
			if(!this19.fixed) {
				if(9 >= this19.length) this19.length = 10;
				if(this19.data.length < this19.length) {
					var data9;
					var this20;
					this20 = new Array(this19.data.length + 10);
					data9 = this20;
					haxe.ds._Vector.Vector_Impl_.blit(this19.data,0,data9,0,this19.data.length);
					this19.data = data9;
				}
			}
			this19.data[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
			var this21 = this.rawData;
			if(!this21.fixed) {
				if(10 >= this21.length) this21.length = 11;
				if(this21.data.length < this21.length) {
					var data10;
					var this22;
					this22 = new Array(this21.data.length + 10);
					data10 = this22;
					haxe.ds._Vector.Vector_Impl_.blit(this21.data,0,data10,0,this21.data.length);
					this21.data = data10;
				}
			}
			this21.data[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
			var this23 = this.rawData;
			if(!this23.fixed) {
				if(11 >= this23.length) this23.length = 12;
				if(this23.data.length < this23.length) {
					var data11;
					var this24;
					this24 = new Array(this23.data.length + 10);
					data11 = this24;
					haxe.ds._Vector.Vector_Impl_.blit(this23.data,0,data11,0,this23.data.length);
					this23.data = data11;
				}
			}
			this23.data[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
			var this25 = this.rawData;
			if(!this25.fixed) {
				if(12 >= this25.length) this25.length = 13;
				if(this25.data.length < this25.length) {
					var data12;
					var this26;
					this26 = new Array(this25.data.length + 10);
					data12 = this26;
					haxe.ds._Vector.Vector_Impl_.blit(this25.data,0,data12,0,this25.data.length);
					this25.data = data12;
				}
			}
			this25.data[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
			var this27 = this.rawData;
			if(!this27.fixed) {
				if(13 >= this27.length) this27.length = 14;
				if(this27.data.length < this27.length) {
					var data13;
					var this28;
					this28 = new Array(this27.data.length + 10);
					data13 = this28;
					haxe.ds._Vector.Vector_Impl_.blit(this27.data,0,data13,0,this27.data.length);
					this27.data = data13;
				}
			}
			this27.data[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
			var this29 = this.rawData;
			if(!this29.fixed) {
				if(14 >= this29.length) this29.length = 15;
				if(this29.data.length < this29.length) {
					var data14;
					var this30;
					this30 = new Array(this29.data.length + 10);
					data14 = this30;
					haxe.ds._Vector.Vector_Impl_.blit(this29.data,0,data14,0,this29.data.length);
					this29.data = data14;
				}
			}
			this29.data[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
			var this31 = this.rawData;
			if(!this31.fixed) {
				if(15 >= this31.length) this31.length = 16;
				if(this31.data.length < this31.length) {
					var data15;
					var this32;
					this32 = new Array(this31.data.length + 10);
					data15 = this32;
					haxe.ds._Vector.Vector_Impl_.blit(this31.data,0,data15,0,this31.data.length);
					this31.data = data15;
				}
			}
			this31.data[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
		}
		return invertable;
	}
	,pointAt: function(pos,at,up) {
		if(at == null) at = new openfl.geom.Vector3D(0,0,-1);
		if(up == null) up = new openfl.geom.Vector3D(0,-1,0);
		var dir = new openfl.geom.Vector3D(at.x - pos.x,at.y - pos.y,at.z - pos.z);
		var vup = new openfl.geom.Vector3D(up.x,up.y,up.z,up.w);
		var right;
		dir.normalize();
		vup.normalize();
		var dir2 = new openfl.geom.Vector3D(dir.x,dir.y,dir.z,dir.w);
		dir2.scaleBy(vup.x * dir.x + vup.y * dir.y + vup.z * dir.z);
		vup = new openfl.geom.Vector3D(vup.x - dir2.x,vup.y - dir2.y,vup.z - dir2.z);
		if(Math.sqrt(vup.x * vup.x + vup.y * vup.y + vup.z * vup.z) > 0) vup.normalize(); else if(dir.x != 0) vup = new openfl.geom.Vector3D(-dir.y,dir.x,0); else vup = new openfl.geom.Vector3D(1,0,0);
		right = new openfl.geom.Vector3D(vup.y * dir.z - vup.z * dir.y,vup.z * dir.x - vup.x * dir.z,vup.x * dir.y - vup.y * dir.x,1);
		right.normalize();
		var this1 = this.rawData;
		if(!this1.fixed) {
			if(0 >= this1.length) this1.length = 1;
			if(this1.data.length < this1.length) {
				var data;
				var this2;
				this2 = new Array(this1.data.length + 10);
				data = this2;
				haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
				this1.data = data;
			}
		}
		this1.data[0] = right.x;
		var this3 = this.rawData;
		if(!this3.fixed) {
			if(4 >= this3.length) this3.length = 5;
			if(this3.data.length < this3.length) {
				var data1;
				var this4;
				this4 = new Array(this3.data.length + 10);
				data1 = this4;
				haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
				this3.data = data1;
			}
		}
		this3.data[4] = right.y;
		var this5 = this.rawData;
		if(!this5.fixed) {
			if(8 >= this5.length) this5.length = 9;
			if(this5.data.length < this5.length) {
				var data2;
				var this6;
				this6 = new Array(this5.data.length + 10);
				data2 = this6;
				haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
				this5.data = data2;
			}
		}
		this5.data[8] = right.z;
		var this7 = this.rawData;
		if(!this7.fixed) {
			if(12 >= this7.length) this7.length = 13;
			if(this7.data.length < this7.length) {
				var data3;
				var this8;
				this8 = new Array(this7.data.length + 10);
				data3 = this8;
				haxe.ds._Vector.Vector_Impl_.blit(this7.data,0,data3,0,this7.data.length);
				this7.data = data3;
			}
		}
		this7.data[12] = 0.0;
		var this9 = this.rawData;
		if(!this9.fixed) {
			if(1 >= this9.length) this9.length = 2;
			if(this9.data.length < this9.length) {
				var data4;
				var this10;
				this10 = new Array(this9.data.length + 10);
				data4 = this10;
				haxe.ds._Vector.Vector_Impl_.blit(this9.data,0,data4,0,this9.data.length);
				this9.data = data4;
			}
		}
		this9.data[1] = vup.x;
		var this11 = this.rawData;
		if(!this11.fixed) {
			if(5 >= this11.length) this11.length = 6;
			if(this11.data.length < this11.length) {
				var data5;
				var this12;
				this12 = new Array(this11.data.length + 10);
				data5 = this12;
				haxe.ds._Vector.Vector_Impl_.blit(this11.data,0,data5,0,this11.data.length);
				this11.data = data5;
			}
		}
		this11.data[5] = vup.y;
		var this13 = this.rawData;
		if(!this13.fixed) {
			if(9 >= this13.length) this13.length = 10;
			if(this13.data.length < this13.length) {
				var data6;
				var this14;
				this14 = new Array(this13.data.length + 10);
				data6 = this14;
				haxe.ds._Vector.Vector_Impl_.blit(this13.data,0,data6,0,this13.data.length);
				this13.data = data6;
			}
		}
		this13.data[9] = vup.z;
		var this15 = this.rawData;
		if(!this15.fixed) {
			if(13 >= this15.length) this15.length = 14;
			if(this15.data.length < this15.length) {
				var data7;
				var this16;
				this16 = new Array(this15.data.length + 10);
				data7 = this16;
				haxe.ds._Vector.Vector_Impl_.blit(this15.data,0,data7,0,this15.data.length);
				this15.data = data7;
			}
		}
		this15.data[13] = 0.0;
		var this17 = this.rawData;
		if(!this17.fixed) {
			if(2 >= this17.length) this17.length = 3;
			if(this17.data.length < this17.length) {
				var data8;
				var this18;
				this18 = new Array(this17.data.length + 10);
				data8 = this18;
				haxe.ds._Vector.Vector_Impl_.blit(this17.data,0,data8,0,this17.data.length);
				this17.data = data8;
			}
		}
		this17.data[2] = dir.x;
		var this19 = this.rawData;
		if(!this19.fixed) {
			if(6 >= this19.length) this19.length = 7;
			if(this19.data.length < this19.length) {
				var data9;
				var this20;
				this20 = new Array(this19.data.length + 10);
				data9 = this20;
				haxe.ds._Vector.Vector_Impl_.blit(this19.data,0,data9,0,this19.data.length);
				this19.data = data9;
			}
		}
		this19.data[6] = dir.y;
		var this21 = this.rawData;
		if(!this21.fixed) {
			if(10 >= this21.length) this21.length = 11;
			if(this21.data.length < this21.length) {
				var data10;
				var this22;
				this22 = new Array(this21.data.length + 10);
				data10 = this22;
				haxe.ds._Vector.Vector_Impl_.blit(this21.data,0,data10,0,this21.data.length);
				this21.data = data10;
			}
		}
		this21.data[10] = dir.z;
		var this23 = this.rawData;
		if(!this23.fixed) {
			if(14 >= this23.length) this23.length = 15;
			if(this23.data.length < this23.length) {
				var data11;
				var this24;
				this24 = new Array(this23.data.length + 10);
				data11 = this24;
				haxe.ds._Vector.Vector_Impl_.blit(this23.data,0,data11,0,this23.data.length);
				this23.data = data11;
			}
		}
		this23.data[14] = 0.0;
		var this25 = this.rawData;
		if(!this25.fixed) {
			if(3 >= this25.length) this25.length = 4;
			if(this25.data.length < this25.length) {
				var data12;
				var this26;
				this26 = new Array(this25.data.length + 10);
				data12 = this26;
				haxe.ds._Vector.Vector_Impl_.blit(this25.data,0,data12,0,this25.data.length);
				this25.data = data12;
			}
		}
		this25.data[3] = pos.x;
		var this27 = this.rawData;
		if(!this27.fixed) {
			if(7 >= this27.length) this27.length = 8;
			if(this27.data.length < this27.length) {
				var data13;
				var this28;
				this28 = new Array(this27.data.length + 10);
				data13 = this28;
				haxe.ds._Vector.Vector_Impl_.blit(this27.data,0,data13,0,this27.data.length);
				this27.data = data13;
			}
		}
		this27.data[7] = pos.y;
		var this29 = this.rawData;
		if(!this29.fixed) {
			if(11 >= this29.length) this29.length = 12;
			if(this29.data.length < this29.length) {
				var data14;
				var this30;
				this30 = new Array(this29.data.length + 10);
				data14 = this30;
				haxe.ds._Vector.Vector_Impl_.blit(this29.data,0,data14,0,this29.data.length);
				this29.data = data14;
			}
		}
		this29.data[11] = pos.z;
		var this31 = this.rawData;
		if(!this31.fixed) {
			if(15 >= this31.length) this31.length = 16;
			if(this31.data.length < this31.length) {
				var data15;
				var this32;
				this32 = new Array(this31.data.length + 10);
				data15 = this32;
				haxe.ds._Vector.Vector_Impl_.blit(this31.data,0,data15,0,this31.data.length);
				this31.data = data15;
			}
		}
		this31.data[15] = 1.0;
	}
	,prepend: function(rhs) {
		var m111 = rhs.rawData.data[0];
		var m121 = rhs.rawData.data[4];
		var m131 = rhs.rawData.data[8];
		var m141 = rhs.rawData.data[12];
		var m112 = rhs.rawData.data[1];
		var m122 = rhs.rawData.data[5];
		var m132 = rhs.rawData.data[9];
		var m142 = rhs.rawData.data[13];
		var m113 = rhs.rawData.data[2];
		var m123 = rhs.rawData.data[6];
		var m133 = rhs.rawData.data[10];
		var m143 = rhs.rawData.data[14];
		var m114 = rhs.rawData.data[3];
		var m124 = rhs.rawData.data[7];
		var m134 = rhs.rawData.data[11];
		var m144 = rhs.rawData.data[15];
		var m211 = this.rawData.data[0];
		var m221 = this.rawData.data[4];
		var m231 = this.rawData.data[8];
		var m241 = this.rawData.data[12];
		var m212 = this.rawData.data[1];
		var m222 = this.rawData.data[5];
		var m232 = this.rawData.data[9];
		var m242 = this.rawData.data[13];
		var m213 = this.rawData.data[2];
		var m223 = this.rawData.data[6];
		var m233 = this.rawData.data[10];
		var m243 = this.rawData.data[14];
		var m214 = this.rawData.data[3];
		var m224 = this.rawData.data[7];
		var m234 = this.rawData.data[11];
		var m244 = this.rawData.data[15];
		var this1 = this.rawData;
		if(!this1.fixed) {
			if(0 >= this1.length) this1.length = 1;
			if(this1.data.length < this1.length) {
				var data;
				var this2;
				this2 = new Array(this1.data.length + 10);
				data = this2;
				haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
				this1.data = data;
			}
		}
		this1.data[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		var this3 = this.rawData;
		if(!this3.fixed) {
			if(1 >= this3.length) this3.length = 2;
			if(this3.data.length < this3.length) {
				var data1;
				var this4;
				this4 = new Array(this3.data.length + 10);
				data1 = this4;
				haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
				this3.data = data1;
			}
		}
		this3.data[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		var this5 = this.rawData;
		if(!this5.fixed) {
			if(2 >= this5.length) this5.length = 3;
			if(this5.data.length < this5.length) {
				var data2;
				var this6;
				this6 = new Array(this5.data.length + 10);
				data2 = this6;
				haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
				this5.data = data2;
			}
		}
		this5.data[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		var this7 = this.rawData;
		if(!this7.fixed) {
			if(3 >= this7.length) this7.length = 4;
			if(this7.data.length < this7.length) {
				var data3;
				var this8;
				this8 = new Array(this7.data.length + 10);
				data3 = this8;
				haxe.ds._Vector.Vector_Impl_.blit(this7.data,0,data3,0,this7.data.length);
				this7.data = data3;
			}
		}
		this7.data[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		var this9 = this.rawData;
		if(!this9.fixed) {
			if(4 >= this9.length) this9.length = 5;
			if(this9.data.length < this9.length) {
				var data4;
				var this10;
				this10 = new Array(this9.data.length + 10);
				data4 = this10;
				haxe.ds._Vector.Vector_Impl_.blit(this9.data,0,data4,0,this9.data.length);
				this9.data = data4;
			}
		}
		this9.data[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		var this11 = this.rawData;
		if(!this11.fixed) {
			if(5 >= this11.length) this11.length = 6;
			if(this11.data.length < this11.length) {
				var data5;
				var this12;
				this12 = new Array(this11.data.length + 10);
				data5 = this12;
				haxe.ds._Vector.Vector_Impl_.blit(this11.data,0,data5,0,this11.data.length);
				this11.data = data5;
			}
		}
		this11.data[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		var this13 = this.rawData;
		if(!this13.fixed) {
			if(6 >= this13.length) this13.length = 7;
			if(this13.data.length < this13.length) {
				var data6;
				var this14;
				this14 = new Array(this13.data.length + 10);
				data6 = this14;
				haxe.ds._Vector.Vector_Impl_.blit(this13.data,0,data6,0,this13.data.length);
				this13.data = data6;
			}
		}
		this13.data[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		var this15 = this.rawData;
		if(!this15.fixed) {
			if(7 >= this15.length) this15.length = 8;
			if(this15.data.length < this15.length) {
				var data7;
				var this16;
				this16 = new Array(this15.data.length + 10);
				data7 = this16;
				haxe.ds._Vector.Vector_Impl_.blit(this15.data,0,data7,0,this15.data.length);
				this15.data = data7;
			}
		}
		this15.data[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		var this17 = this.rawData;
		if(!this17.fixed) {
			if(8 >= this17.length) this17.length = 9;
			if(this17.data.length < this17.length) {
				var data8;
				var this18;
				this18 = new Array(this17.data.length + 10);
				data8 = this18;
				haxe.ds._Vector.Vector_Impl_.blit(this17.data,0,data8,0,this17.data.length);
				this17.data = data8;
			}
		}
		this17.data[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		var this19 = this.rawData;
		if(!this19.fixed) {
			if(9 >= this19.length) this19.length = 10;
			if(this19.data.length < this19.length) {
				var data9;
				var this20;
				this20 = new Array(this19.data.length + 10);
				data9 = this20;
				haxe.ds._Vector.Vector_Impl_.blit(this19.data,0,data9,0,this19.data.length);
				this19.data = data9;
			}
		}
		this19.data[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		var this21 = this.rawData;
		if(!this21.fixed) {
			if(10 >= this21.length) this21.length = 11;
			if(this21.data.length < this21.length) {
				var data10;
				var this22;
				this22 = new Array(this21.data.length + 10);
				data10 = this22;
				haxe.ds._Vector.Vector_Impl_.blit(this21.data,0,data10,0,this21.data.length);
				this21.data = data10;
			}
		}
		this21.data[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		var this23 = this.rawData;
		if(!this23.fixed) {
			if(11 >= this23.length) this23.length = 12;
			if(this23.data.length < this23.length) {
				var data11;
				var this24;
				this24 = new Array(this23.data.length + 10);
				data11 = this24;
				haxe.ds._Vector.Vector_Impl_.blit(this23.data,0,data11,0,this23.data.length);
				this23.data = data11;
			}
		}
		this23.data[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		var this25 = this.rawData;
		if(!this25.fixed) {
			if(12 >= this25.length) this25.length = 13;
			if(this25.data.length < this25.length) {
				var data12;
				var this26;
				this26 = new Array(this25.data.length + 10);
				data12 = this26;
				haxe.ds._Vector.Vector_Impl_.blit(this25.data,0,data12,0,this25.data.length);
				this25.data = data12;
			}
		}
		this25.data[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		var this27 = this.rawData;
		if(!this27.fixed) {
			if(13 >= this27.length) this27.length = 14;
			if(this27.data.length < this27.length) {
				var data13;
				var this28;
				this28 = new Array(this27.data.length + 10);
				data13 = this28;
				haxe.ds._Vector.Vector_Impl_.blit(this27.data,0,data13,0,this27.data.length);
				this27.data = data13;
			}
		}
		this27.data[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		var this29 = this.rawData;
		if(!this29.fixed) {
			if(14 >= this29.length) this29.length = 15;
			if(this29.data.length < this29.length) {
				var data14;
				var this30;
				this30 = new Array(this29.data.length + 10);
				data14 = this30;
				haxe.ds._Vector.Vector_Impl_.blit(this29.data,0,data14,0,this29.data.length);
				this29.data = data14;
			}
		}
		this29.data[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		var this31 = this.rawData;
		if(!this31.fixed) {
			if(15 >= this31.length) this31.length = 16;
			if(this31.data.length < this31.length) {
				var data15;
				var this32;
				this32 = new Array(this31.data.length + 10);
				data15 = this32;
				haxe.ds._Vector.Vector_Impl_.blit(this31.data,0,data15,0,this31.data.length);
				this31.data = data15;
			}
		}
		this31.data[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,prependRotation: function(degrees,axis,pivotPoint) {
		var m = openfl.geom.Matrix3D.getAxisRotation(axis.x,axis.y,axis.z,degrees);
		if(pivotPoint != null) {
			var p = pivotPoint;
			m.appendTranslation(p.x,p.y,p.z);
		}
		this.prepend(m);
	}
	,prependScale: function(xScale,yScale,zScale) {
		this.prepend(new openfl.geom.Matrix3D((function($this) {
			var $r;
			var value = [xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0];
			var vectorData = new openfl.VectorData();
			vectorData.length = value.length;
			vectorData.fixed = true;
			{
				var vec;
				var this1;
				this1 = new Array(value.length);
				vec = this1;
				var _g1 = 0;
				var _g = value.length;
				while(_g1 < _g) {
					var i = _g1++;
					vec[i] = value[i];
				}
				vectorData.data = vec;
			}
			$r = vectorData;
			return $r;
		}(this))));
	}
	,prependTranslation: function(x,y,z) {
		var m = new openfl.geom.Matrix3D();
		m.set_position(new openfl.geom.Vector3D(x,y,z));
		this.prepend(m);
	}
	,recompose: function(components,orientationStyle) {
		if(components.length < 3 || components.data[2].x == 0 || components.data[2].y == 0 || components.data[2].z == 0) return false;
		if(orientationStyle == null) orientationStyle = openfl.geom.Orientation3D.EULER_ANGLES;
		this.identity();
		var scale = [];
		scale[0] = scale[1] = scale[2] = components.data[2].x;
		scale[4] = scale[5] = scale[6] = components.data[2].y;
		scale[8] = scale[9] = scale[10] = components.data[2].z;
		switch(orientationStyle[1]) {
		case 1:
			var cx = Math.cos(components.data[1].x);
			var cy = Math.cos(components.data[1].y);
			var cz = Math.cos(components.data[1].z);
			var sx = Math.sin(components.data[1].x);
			var sy = Math.sin(components.data[1].y);
			var sz = Math.sin(components.data[1].z);
			var this1 = this.rawData;
			if(!this1.fixed) {
				if(0 >= this1.length) this1.length = 1;
				if(this1.data.length < this1.length) {
					var data;
					var this2;
					this2 = new Array(this1.data.length + 10);
					data = this2;
					haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
					this1.data = data;
				}
			}
			this1.data[0] = cy * cz * scale[0];
			var this3 = this.rawData;
			if(!this3.fixed) {
				if(1 >= this3.length) this3.length = 2;
				if(this3.data.length < this3.length) {
					var data1;
					var this4;
					this4 = new Array(this3.data.length + 10);
					data1 = this4;
					haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
					this3.data = data1;
				}
			}
			this3.data[1] = cy * sz * scale[1];
			var this5 = this.rawData;
			if(!this5.fixed) {
				if(2 >= this5.length) this5.length = 3;
				if(this5.data.length < this5.length) {
					var data2;
					var this6;
					this6 = new Array(this5.data.length + 10);
					data2 = this6;
					haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
					this5.data = data2;
				}
			}
			this5.data[2] = -sy * scale[2];
			var this7 = this.rawData;
			if(!this7.fixed) {
				if(3 >= this7.length) this7.length = 4;
				if(this7.data.length < this7.length) {
					var data3;
					var this8;
					this8 = new Array(this7.data.length + 10);
					data3 = this8;
					haxe.ds._Vector.Vector_Impl_.blit(this7.data,0,data3,0,this7.data.length);
					this7.data = data3;
				}
			}
			this7.data[3] = 0;
			var this9 = this.rawData;
			if(!this9.fixed) {
				if(4 >= this9.length) this9.length = 5;
				if(this9.data.length < this9.length) {
					var data4;
					var this10;
					this10 = new Array(this9.data.length + 10);
					data4 = this10;
					haxe.ds._Vector.Vector_Impl_.blit(this9.data,0,data4,0,this9.data.length);
					this9.data = data4;
				}
			}
			this9.data[4] = (sx * sy * cz - cx * sz) * scale[4];
			var this11 = this.rawData;
			if(!this11.fixed) {
				if(5 >= this11.length) this11.length = 6;
				if(this11.data.length < this11.length) {
					var data5;
					var this12;
					this12 = new Array(this11.data.length + 10);
					data5 = this12;
					haxe.ds._Vector.Vector_Impl_.blit(this11.data,0,data5,0,this11.data.length);
					this11.data = data5;
				}
			}
			this11.data[5] = (sx * sy * sz + cx * cz) * scale[5];
			var this13 = this.rawData;
			if(!this13.fixed) {
				if(6 >= this13.length) this13.length = 7;
				if(this13.data.length < this13.length) {
					var data6;
					var this14;
					this14 = new Array(this13.data.length + 10);
					data6 = this14;
					haxe.ds._Vector.Vector_Impl_.blit(this13.data,0,data6,0,this13.data.length);
					this13.data = data6;
				}
			}
			this13.data[6] = sx * cy * scale[6];
			var this15 = this.rawData;
			if(!this15.fixed) {
				if(7 >= this15.length) this15.length = 8;
				if(this15.data.length < this15.length) {
					var data7;
					var this16;
					this16 = new Array(this15.data.length + 10);
					data7 = this16;
					haxe.ds._Vector.Vector_Impl_.blit(this15.data,0,data7,0,this15.data.length);
					this15.data = data7;
				}
			}
			this15.data[7] = 0;
			var this17 = this.rawData;
			if(!this17.fixed) {
				if(8 >= this17.length) this17.length = 9;
				if(this17.data.length < this17.length) {
					var data8;
					var this18;
					this18 = new Array(this17.data.length + 10);
					data8 = this18;
					haxe.ds._Vector.Vector_Impl_.blit(this17.data,0,data8,0,this17.data.length);
					this17.data = data8;
				}
			}
			this17.data[8] = (cx * sy * cz + sx * sz) * scale[8];
			var this19 = this.rawData;
			if(!this19.fixed) {
				if(9 >= this19.length) this19.length = 10;
				if(this19.data.length < this19.length) {
					var data9;
					var this20;
					this20 = new Array(this19.data.length + 10);
					data9 = this20;
					haxe.ds._Vector.Vector_Impl_.blit(this19.data,0,data9,0,this19.data.length);
					this19.data = data9;
				}
			}
			this19.data[9] = (cx * sy * sz - sx * cz) * scale[9];
			var this21 = this.rawData;
			if(!this21.fixed) {
				if(10 >= this21.length) this21.length = 11;
				if(this21.data.length < this21.length) {
					var data10;
					var this22;
					this22 = new Array(this21.data.length + 10);
					data10 = this22;
					haxe.ds._Vector.Vector_Impl_.blit(this21.data,0,data10,0,this21.data.length);
					this21.data = data10;
				}
			}
			this21.data[10] = cx * cy * scale[10];
			var this23 = this.rawData;
			if(!this23.fixed) {
				if(11 >= this23.length) this23.length = 12;
				if(this23.data.length < this23.length) {
					var data11;
					var this24;
					this24 = new Array(this23.data.length + 10);
					data11 = this24;
					haxe.ds._Vector.Vector_Impl_.blit(this23.data,0,data11,0,this23.data.length);
					this23.data = data11;
				}
			}
			this23.data[11] = 0;
			var this25 = this.rawData;
			if(!this25.fixed) {
				if(12 >= this25.length) this25.length = 13;
				if(this25.data.length < this25.length) {
					var data12;
					var this26;
					this26 = new Array(this25.data.length + 10);
					data12 = this26;
					haxe.ds._Vector.Vector_Impl_.blit(this25.data,0,data12,0,this25.data.length);
					this25.data = data12;
				}
			}
			this25.data[12] = components.data[0].x;
			var this27 = this.rawData;
			if(!this27.fixed) {
				if(13 >= this27.length) this27.length = 14;
				if(this27.data.length < this27.length) {
					var data13;
					var this28;
					this28 = new Array(this27.data.length + 10);
					data13 = this28;
					haxe.ds._Vector.Vector_Impl_.blit(this27.data,0,data13,0,this27.data.length);
					this27.data = data13;
				}
			}
			this27.data[13] = components.data[0].y;
			var this29 = this.rawData;
			if(!this29.fixed) {
				if(14 >= this29.length) this29.length = 15;
				if(this29.data.length < this29.length) {
					var data14;
					var this30;
					this30 = new Array(this29.data.length + 10);
					data14 = this30;
					haxe.ds._Vector.Vector_Impl_.blit(this29.data,0,data14,0,this29.data.length);
					this29.data = data14;
				}
			}
			this29.data[14] = components.data[0].z;
			var this31 = this.rawData;
			if(!this31.fixed) {
				if(15 >= this31.length) this31.length = 16;
				if(this31.data.length < this31.length) {
					var data15;
					var this32;
					this32 = new Array(this31.data.length + 10);
					data15 = this32;
					haxe.ds._Vector.Vector_Impl_.blit(this31.data,0,data15,0,this31.data.length);
					this31.data = data15;
				}
			}
			this31.data[15] = 1;
			break;
		default:
			var x = components.data[1].x;
			var y = components.data[1].y;
			var z = components.data[1].z;
			var w = components.data[1].w;
			if(Type.enumEq(orientationStyle,openfl.geom.Orientation3D.AXIS_ANGLE)) {
				x *= Math.sin(w / 2);
				y *= Math.sin(w / 2);
				z *= Math.sin(w / 2);
				w = Math.cos(w / 2);
			}
			var this33 = this.rawData;
			if(!this33.fixed) {
				if(0 >= this33.length) this33.length = 1;
				if(this33.data.length < this33.length) {
					var data16;
					var this34;
					this34 = new Array(this33.data.length + 10);
					data16 = this34;
					haxe.ds._Vector.Vector_Impl_.blit(this33.data,0,data16,0,this33.data.length);
					this33.data = data16;
				}
			}
			this33.data[0] = (1 - 2 * y * y - 2 * z * z) * scale[0];
			var this35 = this.rawData;
			if(!this35.fixed) {
				if(1 >= this35.length) this35.length = 2;
				if(this35.data.length < this35.length) {
					var data17;
					var this36;
					this36 = new Array(this35.data.length + 10);
					data17 = this36;
					haxe.ds._Vector.Vector_Impl_.blit(this35.data,0,data17,0,this35.data.length);
					this35.data = data17;
				}
			}
			this35.data[1] = (2 * x * y + 2 * w * z) * scale[1];
			var this37 = this.rawData;
			if(!this37.fixed) {
				if(2 >= this37.length) this37.length = 3;
				if(this37.data.length < this37.length) {
					var data18;
					var this38;
					this38 = new Array(this37.data.length + 10);
					data18 = this38;
					haxe.ds._Vector.Vector_Impl_.blit(this37.data,0,data18,0,this37.data.length);
					this37.data = data18;
				}
			}
			this37.data[2] = (2 * x * z - 2 * w * y) * scale[2];
			var this39 = this.rawData;
			if(!this39.fixed) {
				if(3 >= this39.length) this39.length = 4;
				if(this39.data.length < this39.length) {
					var data19;
					var this40;
					this40 = new Array(this39.data.length + 10);
					data19 = this40;
					haxe.ds._Vector.Vector_Impl_.blit(this39.data,0,data19,0,this39.data.length);
					this39.data = data19;
				}
			}
			this39.data[3] = 0;
			var this41 = this.rawData;
			if(!this41.fixed) {
				if(4 >= this41.length) this41.length = 5;
				if(this41.data.length < this41.length) {
					var data20;
					var this42;
					this42 = new Array(this41.data.length + 10);
					data20 = this42;
					haxe.ds._Vector.Vector_Impl_.blit(this41.data,0,data20,0,this41.data.length);
					this41.data = data20;
				}
			}
			this41.data[4] = (2 * x * y - 2 * w * z) * scale[4];
			var this43 = this.rawData;
			if(!this43.fixed) {
				if(5 >= this43.length) this43.length = 6;
				if(this43.data.length < this43.length) {
					var data21;
					var this44;
					this44 = new Array(this43.data.length + 10);
					data21 = this44;
					haxe.ds._Vector.Vector_Impl_.blit(this43.data,0,data21,0,this43.data.length);
					this43.data = data21;
				}
			}
			this43.data[5] = (1 - 2 * x * x - 2 * z * z) * scale[5];
			var this45 = this.rawData;
			if(!this45.fixed) {
				if(6 >= this45.length) this45.length = 7;
				if(this45.data.length < this45.length) {
					var data22;
					var this46;
					this46 = new Array(this45.data.length + 10);
					data22 = this46;
					haxe.ds._Vector.Vector_Impl_.blit(this45.data,0,data22,0,this45.data.length);
					this45.data = data22;
				}
			}
			this45.data[6] = (2 * y * z + 2 * w * x) * scale[6];
			var this47 = this.rawData;
			if(!this47.fixed) {
				if(7 >= this47.length) this47.length = 8;
				if(this47.data.length < this47.length) {
					var data23;
					var this48;
					this48 = new Array(this47.data.length + 10);
					data23 = this48;
					haxe.ds._Vector.Vector_Impl_.blit(this47.data,0,data23,0,this47.data.length);
					this47.data = data23;
				}
			}
			this47.data[7] = 0;
			var this49 = this.rawData;
			if(!this49.fixed) {
				if(8 >= this49.length) this49.length = 9;
				if(this49.data.length < this49.length) {
					var data24;
					var this50;
					this50 = new Array(this49.data.length + 10);
					data24 = this50;
					haxe.ds._Vector.Vector_Impl_.blit(this49.data,0,data24,0,this49.data.length);
					this49.data = data24;
				}
			}
			this49.data[8] = (2 * x * z + 2 * w * y) * scale[8];
			var this51 = this.rawData;
			if(!this51.fixed) {
				if(9 >= this51.length) this51.length = 10;
				if(this51.data.length < this51.length) {
					var data25;
					var this52;
					this52 = new Array(this51.data.length + 10);
					data25 = this52;
					haxe.ds._Vector.Vector_Impl_.blit(this51.data,0,data25,0,this51.data.length);
					this51.data = data25;
				}
			}
			this51.data[9] = (2 * y * z - 2 * w * x) * scale[9];
			var this53 = this.rawData;
			if(!this53.fixed) {
				if(10 >= this53.length) this53.length = 11;
				if(this53.data.length < this53.length) {
					var data26;
					var this54;
					this54 = new Array(this53.data.length + 10);
					data26 = this54;
					haxe.ds._Vector.Vector_Impl_.blit(this53.data,0,data26,0,this53.data.length);
					this53.data = data26;
				}
			}
			this53.data[10] = (1 - 2 * x * x - 2 * y * y) * scale[10];
			var this55 = this.rawData;
			if(!this55.fixed) {
				if(11 >= this55.length) this55.length = 12;
				if(this55.data.length < this55.length) {
					var data27;
					var this56;
					this56 = new Array(this55.data.length + 10);
					data27 = this56;
					haxe.ds._Vector.Vector_Impl_.blit(this55.data,0,data27,0,this55.data.length);
					this55.data = data27;
				}
			}
			this55.data[11] = 0;
			var this57 = this.rawData;
			if(!this57.fixed) {
				if(12 >= this57.length) this57.length = 13;
				if(this57.data.length < this57.length) {
					var data28;
					var this58;
					this58 = new Array(this57.data.length + 10);
					data28 = this58;
					haxe.ds._Vector.Vector_Impl_.blit(this57.data,0,data28,0,this57.data.length);
					this57.data = data28;
				}
			}
			this57.data[12] = components.data[0].x;
			var this59 = this.rawData;
			if(!this59.fixed) {
				if(13 >= this59.length) this59.length = 14;
				if(this59.data.length < this59.length) {
					var data29;
					var this60;
					this60 = new Array(this59.data.length + 10);
					data29 = this60;
					haxe.ds._Vector.Vector_Impl_.blit(this59.data,0,data29,0,this59.data.length);
					this59.data = data29;
				}
			}
			this59.data[13] = components.data[0].y;
			var this61 = this.rawData;
			if(!this61.fixed) {
				if(14 >= this61.length) this61.length = 15;
				if(this61.data.length < this61.length) {
					var data30;
					var this62;
					this62 = new Array(this61.data.length + 10);
					data30 = this62;
					haxe.ds._Vector.Vector_Impl_.blit(this61.data,0,data30,0,this61.data.length);
					this61.data = data30;
				}
			}
			this61.data[14] = components.data[0].z;
			var this63 = this.rawData;
			if(!this63.fixed) {
				if(15 >= this63.length) this63.length = 16;
				if(this63.data.length < this63.length) {
					var data31;
					var this64;
					this64 = new Array(this63.data.length + 10);
					data31 = this64;
					haxe.ds._Vector.Vector_Impl_.blit(this63.data,0,data31,0,this63.data.length);
					this63.data = data31;
				}
			}
			this63.data[15] = 1;
		}
		if(components.data[2].x == 0) {
			var this65 = this.rawData;
			if(!this65.fixed) {
				if(0 >= this65.length) this65.length = 1;
				if(this65.data.length < this65.length) {
					var data32;
					var this66;
					this66 = new Array(this65.data.length + 10);
					data32 = this66;
					haxe.ds._Vector.Vector_Impl_.blit(this65.data,0,data32,0,this65.data.length);
					this65.data = data32;
				}
			}
			this65.data[0] = 1e-15;
		}
		if(components.data[2].y == 0) {
			var this67 = this.rawData;
			if(!this67.fixed) {
				if(5 >= this67.length) this67.length = 6;
				if(this67.data.length < this67.length) {
					var data33;
					var this68;
					this68 = new Array(this67.data.length + 10);
					data33 = this68;
					haxe.ds._Vector.Vector_Impl_.blit(this67.data,0,data33,0,this67.data.length);
					this67.data = data33;
				}
			}
			this67.data[5] = 1e-15;
		}
		if(components.data[2].z == 0) {
			var this69 = this.rawData;
			if(!this69.fixed) {
				if(10 >= this69.length) this69.length = 11;
				if(this69.data.length < this69.length) {
					var data34;
					var this70;
					this70 = new Array(this69.data.length + 10);
					data34 = this70;
					haxe.ds._Vector.Vector_Impl_.blit(this69.data,0,data34,0,this69.data.length);
					this69.data = data34;
				}
			}
			this69.data[10] = 1e-15;
		}
		return !(components.data[2].x == 0 || components.data[2].y == 0 || components.data[2].y == 0);
	}
	,transformVector: function(v) {
		var x = v.x;
		var y = v.y;
		var z = v.z;
		return new openfl.geom.Vector3D(x * this.rawData.data[0] + y * this.rawData.data[4] + z * this.rawData.data[8] + this.rawData.data[12],x * this.rawData.data[1] + y * this.rawData.data[5] + z * this.rawData.data[9] + this.rawData.data[13],x * this.rawData.data[2] + y * this.rawData.data[6] + z * this.rawData.data[10] + this.rawData.data[14],x * this.rawData.data[3] + y * this.rawData.data[7] + z * this.rawData.data[11] + this.rawData.data[15]);
	}
	,transformVectors: function(vin,vout) {
		var i = 0;
		while(i + 3 <= vin.length) {
			var x = vin.data[i];
			var y = vin.data[i + 1];
			var z = vin.data[i + 2];
			if(!vout.fixed) {
				if(i >= vout.length) vout.length = i + 1;
				if(vout.data.length < vout.length) {
					var data;
					var this1;
					this1 = new Array(vout.data.length + 10);
					data = this1;
					haxe.ds._Vector.Vector_Impl_.blit(vout.data,0,data,0,vout.data.length);
					vout.data = data;
				}
			}
			vout.data[i] = x * this.rawData.data[0] + y * this.rawData.data[4] + z * this.rawData.data[8] + this.rawData.data[12];
			var key = i + 1;
			if(!vout.fixed) {
				if(key >= vout.length) vout.length = key + 1;
				if(vout.data.length < vout.length) {
					var data1;
					var this2;
					this2 = new Array(vout.data.length + 10);
					data1 = this2;
					haxe.ds._Vector.Vector_Impl_.blit(vout.data,0,data1,0,vout.data.length);
					vout.data = data1;
				}
			}
			vout.data[key] = x * this.rawData.data[1] + y * this.rawData.data[5] + z * this.rawData.data[9] + this.rawData.data[13];
			var key1 = i + 2;
			if(!vout.fixed) {
				if(key1 >= vout.length) vout.length = key1 + 1;
				if(vout.data.length < vout.length) {
					var data2;
					var this3;
					this3 = new Array(vout.data.length + 10);
					data2 = this3;
					haxe.ds._Vector.Vector_Impl_.blit(vout.data,0,data2,0,vout.data.length);
					vout.data = data2;
				}
			}
			vout.data[key1] = x * this.rawData.data[2] + y * this.rawData.data[6] + z * this.rawData.data[10] + this.rawData.data[14];
			i += 3;
		}
	}
	,transpose: function() {
		var oRawData;
		var this1 = this.rawData;
		var vectorData = new openfl.VectorData();
		vectorData.length = this1.length;
		vectorData.fixed = this1.fixed;
		var this2;
		this2 = new Array(this1.length);
		vectorData.data = this2;
		haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,vectorData.data,0,this1.length);
		oRawData = vectorData;
		var this3 = this.rawData;
		if(!this3.fixed) {
			if(1 >= this3.length) this3.length = 2;
			if(this3.data.length < this3.length) {
				var data;
				var this4;
				this4 = new Array(this3.data.length + 10);
				data = this4;
				haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data,0,this3.data.length);
				this3.data = data;
			}
		}
		this3.data[1] = oRawData.data[4];
		var this5 = this.rawData;
		if(!this5.fixed) {
			if(2 >= this5.length) this5.length = 3;
			if(this5.data.length < this5.length) {
				var data1;
				var this6;
				this6 = new Array(this5.data.length + 10);
				data1 = this6;
				haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data1,0,this5.data.length);
				this5.data = data1;
			}
		}
		this5.data[2] = oRawData.data[8];
		var this7 = this.rawData;
		if(!this7.fixed) {
			if(3 >= this7.length) this7.length = 4;
			if(this7.data.length < this7.length) {
				var data2;
				var this8;
				this8 = new Array(this7.data.length + 10);
				data2 = this8;
				haxe.ds._Vector.Vector_Impl_.blit(this7.data,0,data2,0,this7.data.length);
				this7.data = data2;
			}
		}
		this7.data[3] = oRawData.data[12];
		var this9 = this.rawData;
		if(!this9.fixed) {
			if(4 >= this9.length) this9.length = 5;
			if(this9.data.length < this9.length) {
				var data3;
				var this10;
				this10 = new Array(this9.data.length + 10);
				data3 = this10;
				haxe.ds._Vector.Vector_Impl_.blit(this9.data,0,data3,0,this9.data.length);
				this9.data = data3;
			}
		}
		this9.data[4] = oRawData.data[1];
		var this11 = this.rawData;
		if(!this11.fixed) {
			if(6 >= this11.length) this11.length = 7;
			if(this11.data.length < this11.length) {
				var data4;
				var this12;
				this12 = new Array(this11.data.length + 10);
				data4 = this12;
				haxe.ds._Vector.Vector_Impl_.blit(this11.data,0,data4,0,this11.data.length);
				this11.data = data4;
			}
		}
		this11.data[6] = oRawData.data[9];
		var this13 = this.rawData;
		if(!this13.fixed) {
			if(7 >= this13.length) this13.length = 8;
			if(this13.data.length < this13.length) {
				var data5;
				var this14;
				this14 = new Array(this13.data.length + 10);
				data5 = this14;
				haxe.ds._Vector.Vector_Impl_.blit(this13.data,0,data5,0,this13.data.length);
				this13.data = data5;
			}
		}
		this13.data[7] = oRawData.data[13];
		var this15 = this.rawData;
		if(!this15.fixed) {
			if(8 >= this15.length) this15.length = 9;
			if(this15.data.length < this15.length) {
				var data6;
				var this16;
				this16 = new Array(this15.data.length + 10);
				data6 = this16;
				haxe.ds._Vector.Vector_Impl_.blit(this15.data,0,data6,0,this15.data.length);
				this15.data = data6;
			}
		}
		this15.data[8] = oRawData.data[2];
		var this17 = this.rawData;
		if(!this17.fixed) {
			if(9 >= this17.length) this17.length = 10;
			if(this17.data.length < this17.length) {
				var data7;
				var this18;
				this18 = new Array(this17.data.length + 10);
				data7 = this18;
				haxe.ds._Vector.Vector_Impl_.blit(this17.data,0,data7,0,this17.data.length);
				this17.data = data7;
			}
		}
		this17.data[9] = oRawData.data[6];
		var this19 = this.rawData;
		if(!this19.fixed) {
			if(11 >= this19.length) this19.length = 12;
			if(this19.data.length < this19.length) {
				var data8;
				var this20;
				this20 = new Array(this19.data.length + 10);
				data8 = this20;
				haxe.ds._Vector.Vector_Impl_.blit(this19.data,0,data8,0,this19.data.length);
				this19.data = data8;
			}
		}
		this19.data[11] = oRawData.data[14];
		var this21 = this.rawData;
		if(!this21.fixed) {
			if(12 >= this21.length) this21.length = 13;
			if(this21.data.length < this21.length) {
				var data9;
				var this22;
				this22 = new Array(this21.data.length + 10);
				data9 = this22;
				haxe.ds._Vector.Vector_Impl_.blit(this21.data,0,data9,0,this21.data.length);
				this21.data = data9;
			}
		}
		this21.data[12] = oRawData.data[3];
		var this23 = this.rawData;
		if(!this23.fixed) {
			if(13 >= this23.length) this23.length = 14;
			if(this23.data.length < this23.length) {
				var data10;
				var this24;
				this24 = new Array(this23.data.length + 10);
				data10 = this24;
				haxe.ds._Vector.Vector_Impl_.blit(this23.data,0,data10,0,this23.data.length);
				this23.data = data10;
			}
		}
		this23.data[13] = oRawData.data[7];
		var this25 = this.rawData;
		if(!this25.fixed) {
			if(14 >= this25.length) this25.length = 15;
			if(this25.data.length < this25.length) {
				var data11;
				var this26;
				this26 = new Array(this25.data.length + 10);
				data11 = this26;
				haxe.ds._Vector.Vector_Impl_.blit(this25.data,0,data11,0,this25.data.length);
				this25.data = data11;
			}
		}
		this25.data[14] = oRawData.data[11];
	}
	,get_determinant: function() {
		return (this.rawData.data[0] * this.rawData.data[5] - this.rawData.data[4] * this.rawData.data[1]) * (this.rawData.data[10] * this.rawData.data[15] - this.rawData.data[14] * this.rawData.data[11]) - (this.rawData.data[0] * this.rawData.data[9] - this.rawData.data[8] * this.rawData.data[1]) * (this.rawData.data[6] * this.rawData.data[15] - this.rawData.data[14] * this.rawData.data[7]) + (this.rawData.data[0] * this.rawData.data[13] - this.rawData.data[12] * this.rawData.data[1]) * (this.rawData.data[6] * this.rawData.data[11] - this.rawData.data[10] * this.rawData.data[7]) + (this.rawData.data[4] * this.rawData.data[9] - this.rawData.data[8] * this.rawData.data[5]) * (this.rawData.data[2] * this.rawData.data[15] - this.rawData.data[14] * this.rawData.data[3]) - (this.rawData.data[4] * this.rawData.data[13] - this.rawData.data[12] * this.rawData.data[5]) * (this.rawData.data[2] * this.rawData.data[11] - this.rawData.data[10] * this.rawData.data[3]) + (this.rawData.data[8] * this.rawData.data[13] - this.rawData.data[12] * this.rawData.data[9]) * (this.rawData.data[2] * this.rawData.data[7] - this.rawData.data[6] * this.rawData.data[3]);
	}
	,get_position: function() {
		return new openfl.geom.Vector3D(this.rawData.data[12],this.rawData.data[13],this.rawData.data[14]);
	}
	,set_position: function(val) {
		var this1 = this.rawData;
		if(!this1.fixed) {
			if(12 >= this1.length) this1.length = 13;
			if(this1.data.length < this1.length) {
				var data;
				var this2;
				this2 = new Array(this1.data.length + 10);
				data = this2;
				haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
				this1.data = data;
			}
		}
		this1.data[12] = val.x;
		var this3 = this.rawData;
		if(!this3.fixed) {
			if(13 >= this3.length) this3.length = 14;
			if(this3.data.length < this3.length) {
				var data1;
				var this4;
				this4 = new Array(this3.data.length + 10);
				data1 = this4;
				haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data1,0,this3.data.length);
				this3.data = data1;
			}
		}
		this3.data[13] = val.y;
		var this5 = this.rawData;
		if(!this5.fixed) {
			if(14 >= this5.length) this5.length = 15;
			if(this5.data.length < this5.length) {
				var data2;
				var this6;
				this6 = new Array(this5.data.length + 10);
				data2 = this6;
				haxe.ds._Vector.Vector_Impl_.blit(this5.data,0,data2,0,this5.data.length);
				this5.data = data2;
			}
		}
		this5.data[14] = val.z;
		return val;
	}
	,__class__: openfl.geom.Matrix3D
	,__properties__: {set_position:"set_position",get_position:"get_position",get_determinant:"get_determinant"}
};
openfl.geom.Orientation3D = $hxClasses["openfl.geom.Orientation3D"] = { __ename__ : true, __constructs__ : ["AXIS_ANGLE","EULER_ANGLES","QUATERNION"] };
openfl.geom.Orientation3D.AXIS_ANGLE = ["AXIS_ANGLE",0];
openfl.geom.Orientation3D.AXIS_ANGLE.toString = $estr;
openfl.geom.Orientation3D.AXIS_ANGLE.__enum__ = openfl.geom.Orientation3D;
openfl.geom.Orientation3D.EULER_ANGLES = ["EULER_ANGLES",1];
openfl.geom.Orientation3D.EULER_ANGLES.toString = $estr;
openfl.geom.Orientation3D.EULER_ANGLES.__enum__ = openfl.geom.Orientation3D;
openfl.geom.Orientation3D.QUATERNION = ["QUATERNION",2];
openfl.geom.Orientation3D.QUATERNION.toString = $estr;
openfl.geom.Orientation3D.QUATERNION.__enum__ = openfl.geom.Orientation3D;
openfl.geom.Transform = function(displayObject) {
	this.__colorTransform = new openfl.geom.ColorTransform();
	this.concatenatedColorTransform = new openfl.geom.ColorTransform();
	this.concatenatedMatrix = new openfl.geom.Matrix();
	this.pixelBounds = new openfl.geom.Rectangle();
	this.__displayObject = displayObject;
	this.__hasMatrix = true;
};
$hxClasses["openfl.geom.Transform"] = openfl.geom.Transform;
openfl.geom.Transform.__name__ = ["openfl","geom","Transform"];
openfl.geom.Transform.prototype = {
	get_colorTransform: function() {
		return this.__colorTransform;
	}
	,set_colorTransform: function(value) {
		this.__colorTransform = value;
		if(value != null) this.__displayObject.set_alpha(value.alphaMultiplier);
		return this.__colorTransform;
	}
	,get_matrix: function() {
		if(this.__hasMatrix) {
			var matrix = new openfl.geom.Matrix();
			matrix.scale(this.__displayObject.get_scaleX(),this.__displayObject.get_scaleY());
			matrix.rotate(this.__displayObject.get_rotation() * (Math.PI / 180));
			matrix.translate(this.__displayObject.get_x(),this.__displayObject.get_y());
			return matrix;
		}
		return null;
	}
	,set_matrix: function(value) {
		if(value == null) {
			this.__hasMatrix = false;
			return null;
		}
		this.__hasMatrix = true;
		this.__hasMatrix3D = false;
		if(this.__displayObject != null) {
			this.__displayObject.set_x(value.tx);
			this.__displayObject.set_y(value.ty);
			this.__displayObject.set_scaleX(Math.sqrt(value.a * value.a + value.b * value.b));
			this.__displayObject.set_scaleY(Math.sqrt(value.c * value.c + value.d * value.d));
			this.__displayObject.set_rotation(Math.atan2(value.b,value.a) * (180 / Math.PI));
		}
		return value;
	}
	,get_matrix3D: function() {
		if(this.__hasMatrix3D) {
			var matrix = new openfl.geom.Matrix();
			matrix.scale(this.__displayObject.get_scaleX(),this.__displayObject.get_scaleY());
			matrix.rotate(this.__displayObject.get_rotation() * (Math.PI / 180));
			matrix.translate(this.__displayObject.get_x(),this.__displayObject.get_y());
			return new openfl.geom.Matrix3D((function($this) {
				var $r;
				var value = [matrix.a,matrix.b,0.0,0.0,matrix.c,matrix.d,0.0,0.0,0.0,0.0,1.0,0.0,matrix.tx,matrix.ty,0.0,1.0];
				var vectorData = new openfl.VectorData();
				vectorData.length = value.length;
				vectorData.fixed = true;
				{
					var vec;
					var this1;
					this1 = new Array(value.length);
					vec = this1;
					var _g1 = 0;
					var _g = value.length;
					while(_g1 < _g) {
						var i = _g1++;
						vec[i] = value[i];
					}
					vectorData.data = vec;
				}
				$r = vectorData;
				return $r;
			}(this)));
		}
		return null;
	}
	,set_matrix3D: function(value) {
		if(value == null) {
			this.__hasMatrix3D = false;
			return null;
		}
		this.__hasMatrix = false;
		this.__hasMatrix3D = true;
		if(this.__displayObject != null) {
			this.__displayObject.set_x(value.rawData.data[12]);
			this.__displayObject.set_y(value.rawData.data[13]);
			this.__displayObject.set_scaleX(Math.sqrt(value.rawData.data[0] * value.rawData.data[0] + value.rawData.data[1] * value.rawData.data[1]));
			this.__displayObject.set_scaleY(Math.sqrt(value.rawData.data[4] * value.rawData.data[4] + value.rawData.data[5] * value.rawData.data[5]));
			this.__displayObject.set_rotation(Math.atan2(value.rawData.data[1],value.rawData.data[0]) * (180 / Math.PI));
		}
		return value;
	}
	,__class__: openfl.geom.Transform
	,__properties__: {set_matrix3D:"set_matrix3D",get_matrix3D:"get_matrix3D",set_matrix:"set_matrix",get_matrix:"get_matrix",set_colorTransform:"set_colorTransform",get_colorTransform:"get_colorTransform"}
};
openfl.geom.Vector3D = function(x,y,z,w) {
	if(w == null) w = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["openfl.geom.Vector3D"] = openfl.geom.Vector3D;
openfl.geom.Vector3D.__name__ = ["openfl","geom","Vector3D"];
openfl.geom.Vector3D.__properties__ = {get_Z_AXIS:"get_Z_AXIS",get_Y_AXIS:"get_Y_AXIS",get_X_AXIS:"get_X_AXIS"}
openfl.geom.Vector3D.X_AXIS = null;
openfl.geom.Vector3D.Y_AXIS = null;
openfl.geom.Vector3D.Z_AXIS = null;
openfl.geom.Vector3D.angleBetween = function(a,b) {
	var a0 = new openfl.geom.Vector3D(a.x,a.y,a.z,a.w);
	a0.normalize();
	var b0 = new openfl.geom.Vector3D(b.x,b.y,b.z,b.w);
	b0.normalize();
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
};
openfl.geom.Vector3D.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
};
openfl.geom.Vector3D.get_X_AXIS = function() {
	return new openfl.geom.Vector3D(1,0,0);
};
openfl.geom.Vector3D.get_Y_AXIS = function() {
	return new openfl.geom.Vector3D(0,1,0);
};
openfl.geom.Vector3D.get_Z_AXIS = function() {
	return new openfl.geom.Vector3D(0,0,1);
};
openfl.geom.Vector3D.prototype = {
	add: function(a) {
		return new openfl.geom.Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new openfl.geom.Vector3D(this.x,this.y,this.z,this.w);
	}
	,copyFrom: function(sourceVector3D) {
		this.x = sourceVector3D.x;
		this.y = sourceVector3D.y;
		this.z = sourceVector3D.z;
	}
	,crossProduct: function(a) {
		return new openfl.geom.Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,decrementBy: function(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,equals: function(toCompare,allFour) {
		if(allFour == null) allFour = false;
		return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
	}
	,incrementBy: function(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
	}
	,nearEquals: function(toCompare,tolerance,allFour) {
		if(allFour == null) allFour = false;
		return Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance && (!allFour || Math.abs(this.w - toCompare.w) < tolerance);
	}
	,negate: function() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
	}
	,normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,project: function() {
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
	}
	,scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,setTo: function(xa,ya,za) {
		this.x = xa;
		this.y = ya;
		this.z = za;
	}
	,subtract: function(a) {
		return new openfl.geom.Vector3D(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	,toString: function() {
		return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,__class__: openfl.geom.Vector3D
	,__properties__: {get_lengthSquared:"get_lengthSquared",get_length:"get_length"}
};
openfl.media = {};
openfl.media.ID3Info = function() {
};
$hxClasses["openfl.media.ID3Info"] = openfl.media.ID3Info;
openfl.media.ID3Info.__name__ = ["openfl","media","ID3Info"];
openfl.media.ID3Info.prototype = {
	__class__: openfl.media.ID3Info
};
openfl.media.Sound = function(stream,context) {
	openfl.events.EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	if(stream != null) this.load(stream,context);
};
$hxClasses["openfl.media.Sound"] = openfl.media.Sound;
openfl.media.Sound.__name__ = ["openfl","media","Sound"];
openfl.media.Sound.fromAudioBuffer = function(buffer) {
	var sound = new openfl.media.Sound();
	sound.__buffer = buffer;
	return sound;
};
openfl.media.Sound.__super__ = openfl.events.EventDispatcher;
openfl.media.Sound.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	close: function() {
		if(openfl.media.Sound.__registeredSounds.exists(this.__soundID)) createjs.Sound.removeSound(this.__soundID);
	}
	,load: function(stream,context) {
		this.url = stream.url;
		this.__soundID = haxe.io.Path.withoutExtension(stream.url);
		if(!openfl.media.Sound.__registeredSounds.exists(this.__soundID)) {
			openfl.media.Sound.__registeredSounds.set(this.__soundID,true);
			createjs.Sound.addEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.addEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			createjs.Sound.registerSound(this.url,this.__soundID);
		} else this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
	}
	,loadCompressedDataFromByteArray: function(bytes,bytesLength,forcePlayAsMusic) {
		if(forcePlayAsMusic == null) forcePlayAsMusic = false;
		openfl.Lib.notImplemented("Sound.loadCompressedDataFromByteArray");
	}
	,loadPCMFromByteArray: function(bytes,samples,format,stereo,sampleRate) {
		if(sampleRate == null) sampleRate = 44100;
		if(stereo == null) stereo = true;
		openfl.Lib.notImplemented("Sound.loadPCMFromByteArray");
	}
	,play: function(startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0.0;
		if(sndTransform == null) sndTransform = new openfl.media.SoundTransform(1,0);
		var instance = createjs.Sound.play(this.__soundID,"any",0,startTime | 0,loops,sndTransform.volume,sndTransform.pan);
		return new openfl.media.SoundChannel(instance);
	}
	,get_id3: function() {
		return new openfl.media.ID3Info();
	}
	,AudioBuffer_onURLLoad: function(buffer) {
		this.__buffer = buffer;
		this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
	}
	,SoundJS_onFileLoad: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
		}
	}
	,SoundJS_onFileError: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl.events.IOErrorEvent(openfl.events.IOErrorEvent.IO_ERROR));
		}
	}
	,__class__: openfl.media.Sound
	,__properties__: {get_id3:"get_id3"}
});
openfl.media.SoundChannel = function(soundInstance) {
	openfl.events.EventDispatcher.call(this,this);
	if(soundInstance != null) {
		this.__soundInstance = soundInstance;
		this.__soundInstance.addEventListener("complete",$bind(this,this.source_onComplete));
		this.__isValid = true;
	}
};
$hxClasses["openfl.media.SoundChannel"] = openfl.media.SoundChannel;
openfl.media.SoundChannel.__name__ = ["openfl","media","SoundChannel"];
openfl.media.SoundChannel.__super__ = openfl.events.EventDispatcher;
openfl.media.SoundChannel.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	stop: function() {
		if(!this.__isValid) return;
		this.__soundInstance.stop();
	}
	,__dispose: function() {
		if(!this.__isValid) return;
		this.__soundInstance.stop();
		this.__soundInstance = null;
	}
	,get_position: function() {
		if(!this.__isValid) return 0;
		return this.__soundInstance.getPosition();
	}
	,set_position: function(value) {
		if(!this.__isValid) return 0;
		this.__soundInstance.setPosition(value | 0);
		return this.__soundInstance.getPosition();
	}
	,get_soundTransform: function() {
		if(!this.__isValid) return new openfl.media.SoundTransform();
		return new openfl.media.SoundTransform(this.__soundInstance.getVolume(),this.__soundInstance.getPan());
	}
	,set_soundTransform: function(value) {
		if(!this.__isValid) return value;
		this.__soundInstance.setVolume(value.volume);
		this.__soundInstance.setPan(value.pan);
		return value;
	}
	,soundInstance_onComplete: function(_) {
		this.dispatchEvent(new openfl.events.Event(openfl.events.Event.SOUND_COMPLETE));
	}
	,source_onComplete: function() {
		this.dispatchEvent(new openfl.events.Event(openfl.events.Event.SOUND_COMPLETE));
	}
	,__class__: openfl.media.SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform",get_soundTransform:"get_soundTransform",set_position:"set_position",get_position:"get_position"}
});
openfl.media.SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["openfl.media.SoundLoaderContext"] = openfl.media.SoundLoaderContext;
openfl.media.SoundLoaderContext.__name__ = ["openfl","media","SoundLoaderContext"];
openfl.media.SoundLoaderContext.prototype = {
	__class__: openfl.media.SoundLoaderContext
};
openfl.media.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
	this.leftToLeft = 0;
	this.leftToRight = 0;
	this.rightToLeft = 0;
	this.rightToRight = 0;
};
$hxClasses["openfl.media.SoundTransform"] = openfl.media.SoundTransform;
openfl.media.SoundTransform.__name__ = ["openfl","media","SoundTransform"];
openfl.media.SoundTransform.prototype = {
	clone: function() {
		return new openfl.media.SoundTransform(this.volume,this.pan);
	}
	,__class__: openfl.media.SoundTransform
};
openfl.net = {};
openfl.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = openfl.net.URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["openfl.net.URLRequest"] = openfl.net.URLRequest;
openfl.net.URLRequest.__name__ = ["openfl","net","URLRequest"];
openfl.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == openfl.net.URLRequestMethod.GET || this.data == null) return res;
		if(typeof(this.data) == "string" || js.Boot.__instanceof(this.data,lime.utils.ByteArray)) {
			res = res.slice();
			res.push(new openfl.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: openfl.net.URLRequest
};
openfl.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["openfl.net.URLRequestHeader"] = openfl.net.URLRequestHeader;
openfl.net.URLRequestHeader.__name__ = ["openfl","net","URLRequestHeader"];
openfl.net.URLRequestHeader.prototype = {
	__class__: openfl.net.URLRequestHeader
};
openfl.net.URLRequestMethod = function() { };
$hxClasses["openfl.net.URLRequestMethod"] = openfl.net.URLRequestMethod;
openfl.net.URLRequestMethod.__name__ = ["openfl","net","URLRequestMethod"];
openfl.system.LoaderContext = function(checkPolicyFile,applicationDomain,securityDomain) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	this.checkPolicyFile = checkPolicyFile;
	this.securityDomain = securityDomain;
	this.applicationDomain = applicationDomain;
	this.allowCodeImport = true;
	this.allowLoadBytesCodeExecution = true;
};
$hxClasses["openfl.system.LoaderContext"] = openfl.system.LoaderContext;
openfl.system.LoaderContext.__name__ = ["openfl","system","LoaderContext"];
openfl.system.LoaderContext.prototype = {
	__class__: openfl.system.LoaderContext
};
openfl.system.SecurityDomain = function() {
};
$hxClasses["openfl.system.SecurityDomain"] = openfl.system.SecurityDomain;
openfl.system.SecurityDomain.__name__ = ["openfl","system","SecurityDomain"];
openfl.system.SecurityDomain.prototype = {
	__class__: openfl.system.SecurityDomain
};
openfl.text = {};
openfl.text.AntiAliasType = $hxClasses["openfl.text.AntiAliasType"] = { __ename__ : true, __constructs__ : ["ADVANCED","NORMAL"] };
openfl.text.AntiAliasType.ADVANCED = ["ADVANCED",0];
openfl.text.AntiAliasType.ADVANCED.toString = $estr;
openfl.text.AntiAliasType.ADVANCED.__enum__ = openfl.text.AntiAliasType;
openfl.text.AntiAliasType.NORMAL = ["NORMAL",1];
openfl.text.AntiAliasType.NORMAL.toString = $estr;
openfl.text.AntiAliasType.NORMAL.__enum__ = openfl.text.AntiAliasType;
openfl.text.Font = function(name) {
	lime.graphics.Font.call(this,name);
};
$hxClasses["openfl.text.Font"] = openfl.text.Font;
openfl.text.Font.__name__ = ["openfl","text","Font"];
openfl.text.Font.enumerateFonts = function(enumerateDeviceFonts) {
	if(enumerateDeviceFonts == null) enumerateDeviceFonts = false;
	return [];
};
openfl.text.Font.fromBytes = function(bytes) {
	var font = new openfl.text.Font();
	return font;
};
openfl.text.Font.fromFile = function(path) {
	var font = new openfl.text.Font();
	font.__fromFile(path);
	return font;
};
openfl.text.Font.registerFont = function(font) {
	var instance;
	instance = js.Boot.__cast(Type.createInstance(font,[]) , openfl.text.Font);
	if(instance != null) openfl.text.Font.__registeredFonts.push(instance);
};
openfl.text.Font.__super__ = lime.graphics.Font;
openfl.text.Font.prototype = $extend(lime.graphics.Font.prototype,{
	__class__: openfl.text.Font
});
openfl.text.FontStyle = $hxClasses["openfl.text.FontStyle"] = { __ename__ : true, __constructs__ : ["REGULAR","ITALIC","BOLD_ITALIC","BOLD"] };
openfl.text.FontStyle.REGULAR = ["REGULAR",0];
openfl.text.FontStyle.REGULAR.toString = $estr;
openfl.text.FontStyle.REGULAR.__enum__ = openfl.text.FontStyle;
openfl.text.FontStyle.ITALIC = ["ITALIC",1];
openfl.text.FontStyle.ITALIC.toString = $estr;
openfl.text.FontStyle.ITALIC.__enum__ = openfl.text.FontStyle;
openfl.text.FontStyle.BOLD_ITALIC = ["BOLD_ITALIC",2];
openfl.text.FontStyle.BOLD_ITALIC.toString = $estr;
openfl.text.FontStyle.BOLD_ITALIC.__enum__ = openfl.text.FontStyle;
openfl.text.FontStyle.BOLD = ["BOLD",3];
openfl.text.FontStyle.BOLD.toString = $estr;
openfl.text.FontStyle.BOLD.__enum__ = openfl.text.FontStyle;
openfl.text.FontType = $hxClasses["openfl.text.FontType"] = { __ename__ : true, __constructs__ : ["DEVICE","EMBEDDED","EMBEDDED_CFF"] };
openfl.text.FontType.DEVICE = ["DEVICE",0];
openfl.text.FontType.DEVICE.toString = $estr;
openfl.text.FontType.DEVICE.__enum__ = openfl.text.FontType;
openfl.text.FontType.EMBEDDED = ["EMBEDDED",1];
openfl.text.FontType.EMBEDDED.toString = $estr;
openfl.text.FontType.EMBEDDED.__enum__ = openfl.text.FontType;
openfl.text.FontType.EMBEDDED_CFF = ["EMBEDDED_CFF",2];
openfl.text.FontType.EMBEDDED_CFF.toString = $estr;
openfl.text.FontType.EMBEDDED_CFF.__enum__ = openfl.text.FontType;
openfl.text.GridFitType = $hxClasses["openfl.text.GridFitType"] = { __ename__ : true, __constructs__ : ["NONE","PIXEL","SUBPIXEL"] };
openfl.text.GridFitType.NONE = ["NONE",0];
openfl.text.GridFitType.NONE.toString = $estr;
openfl.text.GridFitType.NONE.__enum__ = openfl.text.GridFitType;
openfl.text.GridFitType.PIXEL = ["PIXEL",1];
openfl.text.GridFitType.PIXEL.toString = $estr;
openfl.text.GridFitType.PIXEL.__enum__ = openfl.text.GridFitType;
openfl.text.GridFitType.SUBPIXEL = ["SUBPIXEL",2];
openfl.text.GridFitType.SUBPIXEL.toString = $estr;
openfl.text.GridFitType.SUBPIXEL.__enum__ = openfl.text.GridFitType;
openfl.text.TextField = function() {
	openfl.display.InteractiveObject.call(this);
	this.__width = 100;
	this.__height = 100;
	this.__text = "";
	this.set_type(openfl.text.TextFieldType.DYNAMIC);
	this.set_autoSize(openfl.text.TextFieldAutoSize.NONE);
	this.displayAsPassword = false;
	this.embedFonts = false;
	this.selectable = true;
	this.set_borderColor(0);
	this.set_border(false);
	this.set_backgroundColor(16777215);
	this.set_background(false);
	this.gridFitType = openfl.text.GridFitType.PIXEL;
	this.maxChars = 0;
	this.multiline = false;
	this.sharpness = 0;
	this.scrollH = 0;
	this.scrollV = 1;
	this.set_wordWrap(false);
	if(openfl.text.TextField.__defaultTextFormat == null) {
		openfl.text.TextField.__defaultTextFormat = new openfl.text.TextFormat("Times New Roman",12,0,false,false,false,"","",openfl.text.TextFormatAlign.LEFT,0,0,0,0);
		openfl.text.TextField.__defaultTextFormat.blockIndent = 0;
		openfl.text.TextField.__defaultTextFormat.bullet = false;
		openfl.text.TextField.__defaultTextFormat.letterSpacing = 0;
		openfl.text.TextField.__defaultTextFormat.kerning = false;
	}
	this.__textFormat = openfl.text.TextField.__defaultTextFormat.clone();
};
$hxClasses["openfl.text.TextField"] = openfl.text.TextField;
openfl.text.TextField.__name__ = ["openfl","text","TextField"];
openfl.text.TextField.__defaultTextFormat = null;
openfl.text.TextField.__super__ = openfl.display.InteractiveObject;
openfl.text.TextField.prototype = $extend(openfl.display.InteractiveObject.prototype,{
	appendText: function(text) {
		var _g = this;
		_g.set_text(_g.get_text() + text);
	}
	,getCharBoundaries: function(a) {
		openfl.Lib.notImplemented("TextField.getCharBoundaries");
		return null;
	}
	,getCharIndexAtPoint: function(x,y) {
		openfl.Lib.notImplemented("TextField.getCharIndexAtPoint");
		return 0;
	}
	,getLineIndexAtPoint: function(x,y) {
		openfl.Lib.notImplemented("TextField.getLineIndexAtPoint");
		return 0;
	}
	,getLineMetrics: function(lineIndex) {
		openfl.Lib.notImplemented("TextField.getLineMetrics");
		return new openfl.text.TextLineMetrics(0,0,0,0,0,0);
	}
	,getLineOffset: function(lineIndex) {
		openfl.Lib.notImplemented("TextField.getLineOffset");
		return 0;
	}
	,getLineText: function(lineIndex) {
		openfl.Lib.notImplemented("TextField.getLineText");
		return "";
	}
	,getTextFormat: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		return this.__textFormat.clone();
	}
	,setSelection: function(beginIndex,endIndex) {
		openfl.Lib.notImplemented("TextField.setSelection");
	}
	,setTextFormat: function(format,beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		if(format.font != null) this.__textFormat.font = format.font;
		if(format.size != null) this.__textFormat.size = format.size;
		if(format.color != null) this.__textFormat.color = format.color;
		if(format.bold != null) this.__textFormat.bold = format.bold;
		if(format.italic != null) this.__textFormat.italic = format.italic;
		if(format.underline != null) this.__textFormat.underline = format.underline;
		if(format.url != null) this.__textFormat.url = format.url;
		if(format.target != null) this.__textFormat.target = format.target;
		if(format.align != null) this.__textFormat.align = format.align;
		if(format.leftMargin != null) this.__textFormat.leftMargin = format.leftMargin;
		if(format.rightMargin != null) this.__textFormat.rightMargin = format.rightMargin;
		if(format.indent != null) this.__textFormat.indent = format.indent;
		if(format.leading != null) this.__textFormat.leading = format.leading;
		if(format.blockIndent != null) this.__textFormat.blockIndent = format.blockIndent;
		if(format.bullet != null) this.__textFormat.bullet = format.bullet;
		if(format.kerning != null) this.__textFormat.kerning = format.kerning;
		if(format.letterSpacing != null) this.__textFormat.letterSpacing = format.letterSpacing;
		if(format.tabStops != null) this.__textFormat.tabStops = format.tabStops;
		this.__dirty = true;
	}
	,__clipText: function(value) {
		var textWidth = this.__getTextWidth(value);
		var fillPer = textWidth / this.__width;
		this.set_text(fillPer > 1?(function($this) {
			var $r;
			var _this = $this.get_text();
			var pos = -1 * Math.floor($this.get_text().length / fillPer);
			$r = HxOverrides.substr(_this,pos,null);
			return $r;
		}(this)):this.get_text());
		return this.get_text() + "";
	}
	,__disableInputMode: function() {
		this.this_onRemovedFromStage(null);
	}
	,__enableInputMode: function() {
		this.__cursorPosition = -1;
		if(this.__hiddenInput == null) {
			this.__hiddenInput = window.document.createElement("input");
			this.__hiddenInput.type = "text";
			this.__hiddenInput.style.position = "absolute";
			this.__hiddenInput.style.opacity = "0";
			this.__hiddenInput.style.pointerEvents = "none";
			this.__hiddenInput.style.left = this.get_x() + (this.__canvas != null?this.__canvas.offsetLeft:0) + "px";
			this.__hiddenInput.style.top = this.get_y() + (this.__canvas != null?this.__canvas.offsetTop:0) + "px";
			this.__hiddenInput.style.width = this.__width + "px";
			this.__hiddenInput.style.height = this.__height + "px";
			this.__hiddenInput.style.zIndex = "0";
			if(this.maxChars > 0) this.__hiddenInput.maxLength = this.maxChars;
			window.document.body.appendChild(this.__hiddenInput);
			this.__hiddenInput.value = this.__text;
		}
		if(this.stage != null) this.this_onAddedToStage(null); else {
			this.addEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.this_onAddedToStage));
			this.addEventListener(openfl.events.Event.REMOVED_FROM_STAGE,$bind(this,this.this_onRemovedFromStage));
		}
	}
	,__getBounds: function(rect,matrix) {
		var bounds = new openfl.geom.Rectangle(0,0,this.__width,this.__height);
		bounds.transform(this.__worldTransform);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__getFont: function(format) {
		var font;
		if(format.italic) font = "italic "; else font = "normal ";
		font += "normal ";
		if(format.bold) font += "bold "; else font += "normal ";
		font += format.size + "px";
		font += "/" + (format.size + format.leading + 4) + "px ";
		font += "'" + (function($this) {
			var $r;
			var _g = format.font;
			$r = (function($this) {
				var $r;
				switch(_g) {
				case "_sans":
					$r = "sans-serif";
					break;
				case "_serif":
					$r = "serif";
					break;
				case "_typewriter":
					$r = "monospace";
					break;
				default:
					$r = format.font;
				}
				return $r;
			}($this));
			return $r;
		}(this));
		font += "'";
		return font;
	}
	,__getPosition: function(x,y) {
		var value = this.get_text();
		var text = value;
		var totalW = 0;
		var pos = text.length;
		if(x < this.__getTextWidth(text)) {
			var _g1 = 0;
			var _g = text.length;
			while(_g1 < _g) {
				var i = _g1++;
				totalW += this.__getTextWidth(text.charAt(i));
				if(totalW >= x) {
					pos = i;
					break;
				}
			}
		}
		return pos;
	}
	,__getTextWidth: function(text) {
		if(this.__context == null) {
			this.__canvas = window.document.createElement("canvas");
			this.__context = this.__canvas.getContext("2d");
		}
		this.__context.font = this.__getFont(this.__textFormat);
		this.__context.textAlign = "left";
		return this.__context.measureText(text).width;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var point = this.globalToLocal(new openfl.geom.Point(x,y));
		if(point.x > 0 && point.y > 0 && point.x <= this.__width && point.y <= this.__height) {
			if(stack != null) stack.push(this);
			return true;
		}
		return false;
	}
	,__measureText: function() {
		if(this.__ranges == null) {
			this.__context.font = this.__getFont(this.__textFormat);
			return [this.__context.measureText(this.__text).width];
		} else {
			var measurements = [];
			var _g = 0;
			var _g1 = this.__ranges;
			while(_g < _g1.length) {
				var range = _g1[_g];
				++_g;
				this.__context.font = this.__getFont(range.format);
				measurements.push(this.__context.measureText(this.get_text().substring(range.start,range.end)).width);
			}
			return measurements;
		}
	}
	,__measureTextWithDOM: function() {
		var div = this.__div;
		if(this.__div == null) {
			div = window.document.createElement("div");
			div.innerHTML = new EReg("\n","g").replace(this.__text,"<br>");
			div.style.setProperty("font",this.__getFont(this.__textFormat),null);
			div.style.position = "absolute";
			div.style.top = "110%";
			window.document.body.appendChild(div);
		}
		this.__measuredWidth = div.clientWidth;
		if(this.__div == null) div.style.width = Std.string(this.__width) + "px";
		this.__measuredHeight = div.clientHeight;
		if(this.__div == null) window.document.body.removeChild(div);
	}
	,__renderCanvas: function(renderSession) {
		openfl._internal.renderer.canvas.CanvasTextField.render(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		openfl._internal.renderer.dom.DOMTextField.render(this,renderSession);
	}
	,__renderGL: function(renderSession) {
		openfl._internal.renderer.opengl.GLTextField.render(this,renderSession);
	}
	,__startCursorTimer: function() {
		this.__cursorTimer = haxe.Timer.delay($bind(this,this.__startCursorTimer),500);
		this.__showCursor = !this.__showCursor;
		this.__dirty = true;
	}
	,__stopCursorTimer: function() {
		if(this.__cursorTimer != null) this.__cursorTimer.stop();
	}
	,input_onKeyUp: function(event) {
		this.__isKeyDown = false;
		if(event == null) event == window.event;
		this.__text = this.__hiddenInput.value;
		this.__ranges = null;
		this.__isHTML = false;
		this.__cursorPosition = this.__hiddenInput.selectionStart;
		this.__selectionStart = this.__cursorPosition;
		this.__dirty = true;
		this.dispatchEvent(new openfl.events.Event(openfl.events.Event.CHANGE,true));
	}
	,input_onKeyDown: function(event) {
		this.__isKeyDown = true;
		if(event == null) event == window.event;
		var keyCode = event.which;
		var isShift = event.shiftKey;
		if(keyCode == 65 && (event.ctrlKey || event.metaKey)) {
			this.__hiddenInput.selectionStart = 0;
			this.__hiddenInput.selectionEnd = this.get_text().length;
			event.preventDefault();
			this.__dirty = true;
			return;
		}
		if(keyCode == 17 || event.metaKey || event.ctrlKey) return;
		this.__text = this.__hiddenInput.value;
		this.__ranges = null;
		this.__isHTML = false;
		this.__selectionStart = this.__hiddenInput.selectionStart;
		this.__dirty = true;
	}
	,stage_onFocusOut: function(event) {
		this.__cursorPosition = -1;
		this.__hasFocus = false;
		this.__stopCursorTimer();
		this.__hiddenInput.blur();
		this.__dirty = true;
	}
	,stage_onMouseMove: function(event) {
		if(this.__hasFocus && this.__selectionStart >= 0) {
			this.__cursorPosition = this.__getPosition(event.localX,event.localY);
			this.__dirty = true;
		}
	}
	,stage_onMouseUp: function(event) {
		var upPos = this.__getPosition(event.localX,event.localY);
		var leftPos;
		var rightPos;
		leftPos = Std["int"](Math.min(this.__selectionStart,upPos));
		rightPos = Std["int"](Math.max(this.__selectionStart,upPos));
		this.__selectionStart = leftPos;
		this.__cursorPosition = rightPos;
		this.stage.removeEventListener(openfl.events.MouseEvent.MOUSE_MOVE,$bind(this,this.stage_onMouseMove));
		this.stage.addEventListener(openfl.events.MouseEvent.MOUSE_UP,$bind(this,this.stage_onMouseUp));
		this.stage.set_focus(this);
		if(this.__cursorPosition < 0) {
			this.__cursorPosition = this.__text.length;
			this.__selectionStart = this.__cursorPosition;
		}
		this.__hiddenInput.focus();
		this.__hiddenInput.selectionStart = this.__selectionStart;
		this.__hiddenInput.selectionEnd = this.__cursorPosition;
		this.__stopCursorTimer();
		this.__startCursorTimer();
		this.__hasFocus = true;
		this.__dirty = true;
	}
	,this_onAddedToStage: function(event) {
		this.stage.addEventListener(openfl.events.FocusEvent.FOCUS_OUT,$bind(this,this.stage_onFocusOut));
		this.__hiddenInput.addEventListener("keydown",$bind(this,this.input_onKeyDown));
		this.__hiddenInput.addEventListener("keyup",$bind(this,this.input_onKeyUp));
		this.__hiddenInput.addEventListener("input",$bind(this,this.input_onKeyUp));
		this.addEventListener(openfl.events.MouseEvent.MOUSE_DOWN,$bind(this,this.this_onMouseDown));
	}
	,this_onMouseDown: function(event) {
		this.__selectionStart = this.__getPosition(event.localX,event.localY);
		this.stage.addEventListener(openfl.events.MouseEvent.MOUSE_MOVE,$bind(this,this.stage_onMouseMove));
		this.stage.addEventListener(openfl.events.MouseEvent.MOUSE_UP,$bind(this,this.stage_onMouseUp));
	}
	,this_onRemovedFromStage: function(event) {
		if(this.stage != null) this.stage.removeEventListener(openfl.events.FocusEvent.FOCUS_OUT,$bind(this,this.stage_onFocusOut));
		if(this.__hiddenInput != null) this.__hiddenInput.removeEventListener("keydown",$bind(this,this.input_onKeyDown));
		if(this.__hiddenInput != null) this.__hiddenInput.removeEventListener("keyup",$bind(this,this.input_onKeyUp));
		if(this.__hiddenInput != null) this.__hiddenInput.removeEventListener("input",$bind(this,this.input_onKeyUp));
		this.removeEventListener(openfl.events.MouseEvent.MOUSE_DOWN,$bind(this,this.this_onMouseDown));
		if(this.stage != null) this.stage.removeEventListener(openfl.events.MouseEvent.MOUSE_MOVE,$bind(this,this.stage_onMouseMove));
		if(this.stage != null) this.stage.removeEventListener(openfl.events.MouseEvent.MOUSE_UP,$bind(this,this.stage_onMouseUp));
	}
	,set_autoSize: function(value) {
		if(value != this.autoSize) this.__dirty = true;
		return this.autoSize = value;
	}
	,set_background: function(value) {
		if(value != this.background) this.__dirty = true;
		return this.background = value;
	}
	,set_backgroundColor: function(value) {
		if(value != this.backgroundColor) this.__dirty = true;
		return this.backgroundColor = value;
	}
	,set_border: function(value) {
		if(value != this.border) this.__dirty = true;
		return this.border = value;
	}
	,set_borderColor: function(value) {
		if(value != this.borderColor) this.__dirty = true;
		return this.borderColor = value;
	}
	,get_bottomScrollV: function() {
		return this.get_numLines();
	}
	,get_caretPos: function() {
		return 0;
	}
	,get_defaultTextFormat: function() {
		return this.__textFormat.clone();
	}
	,set_defaultTextFormat: function(value) {
		this.__textFormat.__merge(value);
		return value;
	}
	,get_height: function() {
		return this.__height * this.get_scaleY();
	}
	,set_height: function(value) {
		if(this.get_scaleY() != 1 || value != this.__height) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			this.__dirty = true;
		}
		this.set_scaleY(1);
		return this.__height = value;
	}
	,get_htmlText: function() {
		return this.__text;
	}
	,set_htmlText: function(value) {
		if(!this.__isHTML || this.__text != value) this.__dirty = true;
		this.__ranges = null;
		this.__isHTML = true;
		if(this.__div == null) {
			value = new EReg("<br>","g").replace(value,"\n");
			value = new EReg("<br/>","g").replace(value,"\n");
			var segments = value.split("<font");
			if(segments.length == 1) {
				value = new EReg("<.*?>","g").replace(value,"");
				if(this.__hiddenInput != null) this.__hiddenInput.value = value;
				return this.__text = value;
			} else {
				value = "";
				this.__ranges = [];
				var _g = 0;
				while(_g < segments.length) {
					var segment = segments[_g];
					++_g;
					if(segment == "") continue;
					var closeFontIndex = segment.indexOf("</font>");
					if(closeFontIndex > -1) {
						var start = segment.indexOf(">") + 1;
						var end = closeFontIndex;
						var format = this.__textFormat.clone();
						var faceIndex = segment.indexOf("face=");
						var colorIndex = segment.indexOf("color=");
						var sizeIndex = segment.indexOf("size=");
						if(faceIndex > -1 && faceIndex < start) {
							var len = segment.indexOf("\"",faceIndex);
							format.font = HxOverrides.substr(segment,faceIndex + 6,len);
						}
						if(colorIndex > -1 && colorIndex < start) format.color = Std.parseInt("0x" + HxOverrides.substr(segment,colorIndex + 8,6));
						if(sizeIndex > -1 && sizeIndex < start) format.size = Std.parseInt((function($this) {
							var $r;
							var len1 = segment.indexOf("\"",sizeIndex);
							$r = HxOverrides.substr(segment,sizeIndex + 6,len1);
							return $r;
						}(this)));
						var sub = segment.substring(start,end);
						sub = new EReg("<.*?>","g").replace(sub,"");
						this.__ranges.push(new openfl.text.TextFormatRange(format,value.length,value.length + sub.length));
						value += sub;
						if(closeFontIndex + 7 < segment.length) {
							sub = HxOverrides.substr(segment,closeFontIndex + 7,null);
							this.__ranges.push(new openfl.text.TextFormatRange(this.__textFormat,value.length,value.length + sub.length));
							value += sub;
						}
					} else {
						this.__ranges.push(new openfl.text.TextFormatRange(this.__textFormat,value.length,value.length + segment.length));
						value += segment;
					}
				}
			}
		}
		if(this.__hiddenInput != null) this.__hiddenInput.value = value;
		return this.__text = value;
	}
	,get_maxScrollH: function() {
		return 0;
	}
	,get_maxScrollV: function() {
		return 1;
	}
	,get_numLines: function() {
		if(this.get_text() != "" && this.get_text() != null) {
			var count = this.get_text().split("\n").length;
			if(this.__isHTML) count += this.get_text().split("<br>").length - 1;
			return count;
		}
		return 1;
	}
	,get_text: function() {
		if(this.__isHTML) {
		}
		return this.__text;
	}
	,set_text: function(value) {
		if(this.__text != value && this.__hiddenInput != null) this.__hiddenInput.value = value;
		if(this.__isHTML || this.__text != value) this.__dirty = true;
		this.__ranges = null;
		this.__isHTML = false;
		return this.__text = value;
	}
	,get_textColor: function() {
		return this.__textFormat.color;
	}
	,set_textColor: function(value) {
		if(value != this.__textFormat.color) this.__dirty = true;
		if(this.__ranges != null) {
			var _g = 0;
			var _g1 = this.__ranges;
			while(_g < _g1.length) {
				var range = _g1[_g];
				++_g;
				range.format.color = value;
			}
		}
		return this.__textFormat.color = value;
	}
	,get_textWidth: function() {
		if(this.__canvas != null) {
			var sizes = this.__measureText();
			var total = 0;
			var _g = 0;
			while(_g < sizes.length) {
				var size = sizes[_g];
				++_g;
				total += size;
			}
			return total;
		} else if(this.__div != null) return this.__div.clientWidth; else {
			this.__measureTextWithDOM();
			return this.__measuredWidth;
		}
	}
	,get_textHeight: function() {
		if(this.__canvas != null) return this.__textFormat.size * 1.185; else if(this.__div != null) return this.__div.clientHeight; else {
			this.__measureTextWithDOM();
			return this.__measuredHeight + this.__textFormat.size * 0.185;
		}
	}
	,set_type: function(value) {
		if(value != this.type) {
			if(value == openfl.text.TextFieldType.INPUT) this.__enableInputMode(); else this.__disableInputMode();
			this.__dirty = true;
		}
		return this.type = value;
	}
	,get_width: function() {
		if(this.autoSize == openfl.text.TextFieldAutoSize.LEFT) return (this.get_textWidth() + 4) * this.get_scaleX(); else return this.__width * this.get_scaleX();
	}
	,set_width: function(value) {
		if(this.get_scaleX() != 1 || this.__width != value) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			this.__dirty = true;
		}
		this.set_scaleX(1);
		return this.__width = value;
	}
	,get_wordWrap: function() {
		return this.wordWrap;
	}
	,set_wordWrap: function(value) {
		return this.wordWrap = value;
	}
	,__class__: openfl.text.TextField
	,__properties__: $extend(openfl.display.InteractiveObject.prototype.__properties__,{set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_type:"set_type",get_textWidth:"get_textWidth",get_textHeight:"get_textHeight",set_textColor:"set_textColor",get_textColor:"get_textColor",set_text:"set_text",get_text:"get_text",get_numLines:"get_numLines",get_maxScrollV:"get_maxScrollV",get_maxScrollH:"get_maxScrollH",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",set_defaultTextFormat:"set_defaultTextFormat",get_defaultTextFormat:"get_defaultTextFormat",get_caretPos:"get_caretPos",get_bottomScrollV:"get_bottomScrollV",set_borderColor:"set_borderColor",set_border:"set_border",set_backgroundColor:"set_backgroundColor",set_background:"set_background",set_autoSize:"set_autoSize"})
});
openfl.text.TextFormatRange = function(format,start,end) {
	this.format = format;
	this.start = start;
	this.end = end;
};
$hxClasses["openfl.text.TextFormatRange"] = openfl.text.TextFormatRange;
openfl.text.TextFormatRange.__name__ = ["openfl","text","TextFormatRange"];
openfl.text.TextFormatRange.prototype = {
	__class__: openfl.text.TextFormatRange
};
openfl.text.TextFieldAutoSize = $hxClasses["openfl.text.TextFieldAutoSize"] = { __ename__ : true, __constructs__ : ["CENTER","LEFT","NONE","RIGHT"] };
openfl.text.TextFieldAutoSize.CENTER = ["CENTER",0];
openfl.text.TextFieldAutoSize.CENTER.toString = $estr;
openfl.text.TextFieldAutoSize.CENTER.__enum__ = openfl.text.TextFieldAutoSize;
openfl.text.TextFieldAutoSize.LEFT = ["LEFT",1];
openfl.text.TextFieldAutoSize.LEFT.toString = $estr;
openfl.text.TextFieldAutoSize.LEFT.__enum__ = openfl.text.TextFieldAutoSize;
openfl.text.TextFieldAutoSize.NONE = ["NONE",2];
openfl.text.TextFieldAutoSize.NONE.toString = $estr;
openfl.text.TextFieldAutoSize.NONE.__enum__ = openfl.text.TextFieldAutoSize;
openfl.text.TextFieldAutoSize.RIGHT = ["RIGHT",3];
openfl.text.TextFieldAutoSize.RIGHT.toString = $estr;
openfl.text.TextFieldAutoSize.RIGHT.__enum__ = openfl.text.TextFieldAutoSize;
openfl.text.TextFieldType = $hxClasses["openfl.text.TextFieldType"] = { __ename__ : true, __constructs__ : ["DYNAMIC","INPUT"] };
openfl.text.TextFieldType.DYNAMIC = ["DYNAMIC",0];
openfl.text.TextFieldType.DYNAMIC.toString = $estr;
openfl.text.TextFieldType.DYNAMIC.__enum__ = openfl.text.TextFieldType;
openfl.text.TextFieldType.INPUT = ["INPUT",1];
openfl.text.TextFieldType.INPUT.toString = $estr;
openfl.text.TextFieldType.INPUT.__enum__ = openfl.text.TextFieldType;
openfl.text.TextFormat = function(font,size,color,bold,italic,underline,url,target,align,leftMargin,rightMargin,indent,leading) {
	this.font = font;
	this.size = size;
	this.color = color;
	this.bold = bold;
	this.italic = italic;
	this.underline = underline;
	this.url = url;
	this.target = target;
	this.align = align;
	this.leftMargin = leftMargin;
	this.rightMargin = rightMargin;
	this.indent = indent;
	this.leading = leading;
};
$hxClasses["openfl.text.TextFormat"] = openfl.text.TextFormat;
openfl.text.TextFormat.__name__ = ["openfl","text","TextFormat"];
openfl.text.TextFormat.prototype = {
	clone: function() {
		var newFormat = new openfl.text.TextFormat(this.font,this.size,this.color,this.bold,this.italic,this.underline,this.url,this.target);
		newFormat.align = this.align;
		newFormat.leftMargin = this.leftMargin;
		newFormat.rightMargin = this.rightMargin;
		newFormat.indent = this.indent;
		newFormat.leading = this.leading;
		newFormat.blockIndent = this.blockIndent;
		newFormat.bullet = this.bullet;
		newFormat.kerning = this.kerning;
		newFormat.letterSpacing = this.letterSpacing;
		newFormat.tabStops = this.tabStops;
		return newFormat;
	}
	,__merge: function(format) {
		if(format.font != null) this.font = format.font;
		if(format.size != null) this.size = format.size;
		if(format.color != null) this.color = format.color;
		if(format.bold != null) this.bold = format.bold;
		if(format.italic != null) this.italic = format.italic;
		if(format.underline != null) this.underline = format.underline;
		if(format.url != null) this.url = format.url;
		if(format.target != null) this.target = format.target;
		if(format.align != null) this.align = format.align;
		if(format.leftMargin != null) this.leftMargin = format.leftMargin;
		if(format.rightMargin != null) this.rightMargin = format.rightMargin;
		if(format.indent != null) this.indent = format.indent;
		if(format.leading != null) this.leading = format.leading;
		if(format.blockIndent != null) this.blockIndent = format.blockIndent;
		if(format.bullet != null) this.bullet = format.bullet;
		if(format.kerning != null) this.kerning = format.kerning;
		if(format.letterSpacing != null) this.letterSpacing = format.letterSpacing;
		if(format.tabStops != null) this.tabStops = format.tabStops;
	}
	,__class__: openfl.text.TextFormat
};
openfl.text.TextFormatAlign = $hxClasses["openfl.text.TextFormatAlign"] = { __ename__ : true, __constructs__ : ["LEFT","RIGHT","JUSTIFY","CENTER"] };
openfl.text.TextFormatAlign.LEFT = ["LEFT",0];
openfl.text.TextFormatAlign.LEFT.toString = $estr;
openfl.text.TextFormatAlign.LEFT.__enum__ = openfl.text.TextFormatAlign;
openfl.text.TextFormatAlign.RIGHT = ["RIGHT",1];
openfl.text.TextFormatAlign.RIGHT.toString = $estr;
openfl.text.TextFormatAlign.RIGHT.__enum__ = openfl.text.TextFormatAlign;
openfl.text.TextFormatAlign.JUSTIFY = ["JUSTIFY",2];
openfl.text.TextFormatAlign.JUSTIFY.toString = $estr;
openfl.text.TextFormatAlign.JUSTIFY.__enum__ = openfl.text.TextFormatAlign;
openfl.text.TextFormatAlign.CENTER = ["CENTER",3];
openfl.text.TextFormatAlign.CENTER.toString = $estr;
openfl.text.TextFormatAlign.CENTER.__enum__ = openfl.text.TextFormatAlign;
openfl.text.TextLineMetrics = function(x,width,height,ascent,descent,leading) {
	this.x = x;
	this.width = width;
	this.height = height;
	this.ascent = ascent;
	this.descent = descent;
	this.leading = leading;
};
$hxClasses["openfl.text.TextLineMetrics"] = openfl.text.TextLineMetrics;
openfl.text.TextLineMetrics.__name__ = ["openfl","text","TextLineMetrics"];
openfl.text.TextLineMetrics.prototype = {
	__class__: openfl.text.TextLineMetrics
};
openfl.ui = {};
openfl.ui._KeyLocation = {};
openfl.ui._KeyLocation.KeyLocation_Impl_ = function() { };
$hxClasses["openfl.ui._KeyLocation.KeyLocation_Impl_"] = openfl.ui._KeyLocation.KeyLocation_Impl_;
openfl.ui._KeyLocation.KeyLocation_Impl_.__name__ = ["openfl","ui","_KeyLocation","KeyLocation_Impl_"];
openfl.ui.Keyboard = function() { };
$hxClasses["openfl.ui.Keyboard"] = openfl.ui.Keyboard;
openfl.ui.Keyboard.__name__ = ["openfl","ui","Keyboard"];
openfl.ui.Keyboard.capsLock = null;
openfl.ui.Keyboard.numLock = null;
openfl.ui.Keyboard.isAccessible = function() {
	return false;
};
openfl.ui.Keyboard.__convertMozillaCode = function(code) {
	switch(code) {
	case 8:
		return 8;
	case 9:
		return 9;
	case 13:
		return 13;
	case 14:
		return 13;
	case 16:
		return 16;
	case 17:
		return 17;
	case 20:
		return 20;
	case 27:
		return 27;
	case 32:
		return 32;
	case 33:
		return 33;
	case 34:
		return 34;
	case 35:
		return 35;
	case 36:
		return 36;
	case 37:
		return 37;
	case 39:
		return 39;
	case 38:
		return 38;
	case 40:
		return 40;
	case 45:
		return 45;
	case 46:
		return 46;
	case 144:
		return 144;
	default:
		return code;
	}
};
openfl.ui.Keyboard.__convertWebkitCode = function(code) {
	var _g = code.toLowerCase();
	switch(_g) {
	case "backspace":
		return 8;
	case "tab":
		return 9;
	case "enter":
		return 13;
	case "shift":
		return 16;
	case "control":
		return 17;
	case "capslock":
		return 20;
	case "escape":
		return 27;
	case "space":
		return 32;
	case "pageup":
		return 33;
	case "pagedown":
		return 34;
	case "end":
		return 35;
	case "home":
		return 36;
	case "left":
		return 37;
	case "right":
		return 39;
	case "up":
		return 38;
	case "down":
		return 40;
	case "insert":
		return 45;
	case "delete":
		return 46;
	case "numlock":
		return 144;
	case "break":
		return 19;
	}
	if(code.indexOf("U+") == 0) return Std.parseInt("0x" + HxOverrides.substr(code,3,null));
	throw "Unrecognized key code: " + code;
	return 0;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var this1;
this1 = new Array(256);
lime.graphics.utils.ImageDataUtil.__alpha16 = this1;
var _g = 0;
while(_g < 256) {
	var i = _g++;
	lime.graphics.utils.ImageDataUtil.__alpha16[i] = i * 65536 / 255 | 0;
}
var this2;
this2 = new Array(510);
lime.graphics.utils.ImageDataUtil.__clamp = this2;
var _g1 = 0;
while(_g1 < 255) {
	var i1 = _g1++;
	lime.graphics.utils.ImageDataUtil.__clamp[i1] = i1;
}
var _g11 = 255;
var _g2 = 511;
while(_g11 < _g2) {
	var i2 = _g11++;
	lime.graphics.utils.ImageDataUtil.__clamp[i2] = 255;
}
if(window.createjs != null) createjs.Sound.alternateExtensions = ["ogg","mp3","wav"];
openfl.display.DisplayObject.__instanceCount = 0;
openfl.display.DisplayObject.__worldRenderDirty = 0;
openfl.display.DisplayObject.__worldTransformDirty = 0;
js.Boot.__toStr = {}.toString;
lets.Go.version = "0.0.5-a";
lets.Go._tweens = new Array();
lets.Go.id = -1;
lets.Go.DEBUG = false;
lime.Assets.cache = new lime.AssetCache();
lime.Assets.libraries = new haxe.ds.StringMap();
lime.Assets.initialized = false;
lime._Assets.AssetType_Impl_.BINARY = "BINARY";
lime._Assets.AssetType_Impl_.FONT = "FONT";
lime._Assets.AssetType_Impl_.IMAGE = "IMAGE";
lime._Assets.AssetType_Impl_.MUSIC = "MUSIC";
lime._Assets.AssetType_Impl_.SOUND = "SOUND";
lime._Assets.AssetType_Impl_.TEMPLATE = "TEMPLATE";
lime._Assets.AssetType_Impl_.TEXT = "TEXT";
lime.app.Preloader.images = new haxe.ds.StringMap();
lime.app.Preloader.loaders = new haxe.ds.StringMap();
lime.audio.openal.AL.NONE = 0;
lime.audio.openal.AL.FALSE = 0;
lime.audio.openal.AL.TRUE = 1;
lime.audio.openal.AL.SOURCE_RELATIVE = 514;
lime.audio.openal.AL.CONE_INNER_ANGLE = 4097;
lime.audio.openal.AL.CONE_OUTER_ANGLE = 4098;
lime.audio.openal.AL.PITCH = 4099;
lime.audio.openal.AL.POSITION = 4100;
lime.audio.openal.AL.DIRECTION = 4101;
lime.audio.openal.AL.VELOCITY = 4102;
lime.audio.openal.AL.LOOPING = 4103;
lime.audio.openal.AL.BUFFER = 4105;
lime.audio.openal.AL.GAIN = 4106;
lime.audio.openal.AL.MIN_GAIN = 4109;
lime.audio.openal.AL.MAX_GAIN = 4110;
lime.audio.openal.AL.ORIENTATION = 4111;
lime.audio.openal.AL.SOURCE_STATE = 4112;
lime.audio.openal.AL.INITIAL = 4113;
lime.audio.openal.AL.PLAYING = 4114;
lime.audio.openal.AL.PAUSED = 4115;
lime.audio.openal.AL.STOPPED = 4116;
lime.audio.openal.AL.BUFFERS_QUEUED = 4117;
lime.audio.openal.AL.BUFFERS_PROCESSED = 4118;
lime.audio.openal.AL.REFERENCE_DISTANCE = 4128;
lime.audio.openal.AL.ROLLOFF_FACTOR = 4129;
lime.audio.openal.AL.CONE_OUTER_GAIN = 4130;
lime.audio.openal.AL.MAX_DISTANCE = 4131;
lime.audio.openal.AL.SEC_OFFSET = 4132;
lime.audio.openal.AL.SAMPLE_OFFSET = 4133;
lime.audio.openal.AL.BYTE_OFFSET = 4134;
lime.audio.openal.AL.SOURCE_TYPE = 4135;
lime.audio.openal.AL.STATIC = 4136;
lime.audio.openal.AL.STREAMING = 4137;
lime.audio.openal.AL.UNDETERMINED = 4144;
lime.audio.openal.AL.FORMAT_MONO8 = 4352;
lime.audio.openal.AL.FORMAT_MONO16 = 4353;
lime.audio.openal.AL.FORMAT_STEREO8 = 4354;
lime.audio.openal.AL.FORMAT_STEREO16 = 4355;
lime.audio.openal.AL.FREQUENCY = 8193;
lime.audio.openal.AL.BITS = 8194;
lime.audio.openal.AL.CHANNELS = 8195;
lime.audio.openal.AL.SIZE = 8196;
lime.audio.openal.AL.NO_ERROR = 0;
lime.audio.openal.AL.INVALID_NAME = 40961;
lime.audio.openal.AL.INVALID_ENUM = 40962;
lime.audio.openal.AL.INVALID_VALUE = 40963;
lime.audio.openal.AL.INVALID_OPERATION = 40964;
lime.audio.openal.AL.OUT_OF_MEMORY = 40965;
lime.audio.openal.AL.VENDOR = 45057;
lime.audio.openal.AL.VERSION = 45058;
lime.audio.openal.AL.RENDERER = 45059;
lime.audio.openal.AL.EXTENSIONS = 45060;
lime.audio.openal.AL.DOPPLER_FACTOR = 49152;
lime.audio.openal.AL.SPEED_OF_SOUND = 49155;
lime.audio.openal.AL.DOPPLER_VELOCITY = 49153;
lime.audio.openal.AL.DISTANCE_MODEL = 53248;
lime.audio.openal.AL.INVERSE_DISTANCE = 53249;
lime.audio.openal.AL.INVERSE_DISTANCE_CLAMPED = 53250;
lime.audio.openal.AL.LINEAR_DISTANCE = 53251;
lime.audio.openal.AL.LINEAR_DISTANCE_CLAMPED = 53252;
lime.audio.openal.AL.EXPONENT_DISTANCE = 53253;
lime.audio.openal.AL.EXPONENT_DISTANCE_CLAMPED = 53254;
lime.audio.openal.ALC.FALSE = 0;
lime.audio.openal.ALC.TRUE = 1;
lime.audio.openal.ALC.FREQUENCY = 4103;
lime.audio.openal.ALC.REFRESH = 4104;
lime.audio.openal.ALC.SYNC = 4105;
lime.audio.openal.ALC.MONO_SOURCES = 4112;
lime.audio.openal.ALC.STEREO_SOURCES = 4113;
lime.audio.openal.ALC.NO_ERROR = 0;
lime.audio.openal.ALC.INVALID_DEVICE = 40961;
lime.audio.openal.ALC.INVALID_CONTEXT = 40962;
lime.audio.openal.ALC.INVALID_ENUM = 40963;
lime.audio.openal.ALC.INVALID_VALUE = 40964;
lime.audio.openal.ALC.OUT_OF_MEMORY = 40965;
lime.audio.openal.ALC.ATTRIBUTES_SIZE = 4098;
lime.audio.openal.ALC.ALL_ATTRIBUTES = 4099;
lime.audio.openal.ALC.DEFAULT_DEVICE_SPECIFIER = 4100;
lime.audio.openal.ALC.DEVICE_SPECIFIER = 4101;
lime.audio.openal.ALC.EXTENSIONS = 4102;
lime.audio.openal.ALC.ENUMERATE_ALL_EXT = 1;
lime.audio.openal.ALC.DEFAULT_ALL_DEVICES_SPECIFIER = 4114;
lime.audio.openal.ALC.ALL_DEVICES_SPECIFIER = 4115;
lime.graphics.Image.__base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
lime.graphics.opengl.GL.DEPTH_BUFFER_BIT = 256;
lime.graphics.opengl.GL.STENCIL_BUFFER_BIT = 1024;
lime.graphics.opengl.GL.COLOR_BUFFER_BIT = 16384;
lime.graphics.opengl.GL.POINTS = 0;
lime.graphics.opengl.GL.LINES = 1;
lime.graphics.opengl.GL.LINE_LOOP = 2;
lime.graphics.opengl.GL.LINE_STRIP = 3;
lime.graphics.opengl.GL.TRIANGLES = 4;
lime.graphics.opengl.GL.TRIANGLE_STRIP = 5;
lime.graphics.opengl.GL.TRIANGLE_FAN = 6;
lime.graphics.opengl.GL.ZERO = 0;
lime.graphics.opengl.GL.ONE = 1;
lime.graphics.opengl.GL.SRC_COLOR = 768;
lime.graphics.opengl.GL.ONE_MINUS_SRC_COLOR = 769;
lime.graphics.opengl.GL.SRC_ALPHA = 770;
lime.graphics.opengl.GL.ONE_MINUS_SRC_ALPHA = 771;
lime.graphics.opengl.GL.DST_ALPHA = 772;
lime.graphics.opengl.GL.ONE_MINUS_DST_ALPHA = 773;
lime.graphics.opengl.GL.DST_COLOR = 774;
lime.graphics.opengl.GL.ONE_MINUS_DST_COLOR = 775;
lime.graphics.opengl.GL.SRC_ALPHA_SATURATE = 776;
lime.graphics.opengl.GL.FUNC_ADD = 32774;
lime.graphics.opengl.GL.BLEND_EQUATION = 32777;
lime.graphics.opengl.GL.BLEND_EQUATION_RGB = 32777;
lime.graphics.opengl.GL.BLEND_EQUATION_ALPHA = 34877;
lime.graphics.opengl.GL.FUNC_SUBTRACT = 32778;
lime.graphics.opengl.GL.FUNC_REVERSE_SUBTRACT = 32779;
lime.graphics.opengl.GL.BLEND_DST_RGB = 32968;
lime.graphics.opengl.GL.BLEND_SRC_RGB = 32969;
lime.graphics.opengl.GL.BLEND_DST_ALPHA = 32970;
lime.graphics.opengl.GL.BLEND_SRC_ALPHA = 32971;
lime.graphics.opengl.GL.CONSTANT_COLOR = 32769;
lime.graphics.opengl.GL.ONE_MINUS_CONSTANT_COLOR = 32770;
lime.graphics.opengl.GL.CONSTANT_ALPHA = 32771;
lime.graphics.opengl.GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
lime.graphics.opengl.GL.BLEND_COLOR = 32773;
lime.graphics.opengl.GL.ARRAY_BUFFER = 34962;
lime.graphics.opengl.GL.ELEMENT_ARRAY_BUFFER = 34963;
lime.graphics.opengl.GL.ARRAY_BUFFER_BINDING = 34964;
lime.graphics.opengl.GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
lime.graphics.opengl.GL.STREAM_DRAW = 35040;
lime.graphics.opengl.GL.STATIC_DRAW = 35044;
lime.graphics.opengl.GL.DYNAMIC_DRAW = 35048;
lime.graphics.opengl.GL.BUFFER_SIZE = 34660;
lime.graphics.opengl.GL.BUFFER_USAGE = 34661;
lime.graphics.opengl.GL.CURRENT_VERTEX_ATTRIB = 34342;
lime.graphics.opengl.GL.FRONT = 1028;
lime.graphics.opengl.GL.BACK = 1029;
lime.graphics.opengl.GL.FRONT_AND_BACK = 1032;
lime.graphics.opengl.GL.CULL_FACE = 2884;
lime.graphics.opengl.GL.BLEND = 3042;
lime.graphics.opengl.GL.DITHER = 3024;
lime.graphics.opengl.GL.STENCIL_TEST = 2960;
lime.graphics.opengl.GL.DEPTH_TEST = 2929;
lime.graphics.opengl.GL.SCISSOR_TEST = 3089;
lime.graphics.opengl.GL.POLYGON_OFFSET_FILL = 32823;
lime.graphics.opengl.GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
lime.graphics.opengl.GL.SAMPLE_COVERAGE = 32928;
lime.graphics.opengl.GL.NO_ERROR = 0;
lime.graphics.opengl.GL.INVALID_ENUM = 1280;
lime.graphics.opengl.GL.INVALID_VALUE = 1281;
lime.graphics.opengl.GL.INVALID_OPERATION = 1282;
lime.graphics.opengl.GL.OUT_OF_MEMORY = 1285;
lime.graphics.opengl.GL.CW = 2304;
lime.graphics.opengl.GL.CCW = 2305;
lime.graphics.opengl.GL.LINE_WIDTH = 2849;
lime.graphics.opengl.GL.ALIASED_POINT_SIZE_RANGE = 33901;
lime.graphics.opengl.GL.ALIASED_LINE_WIDTH_RANGE = 33902;
lime.graphics.opengl.GL.CULL_FACE_MODE = 2885;
lime.graphics.opengl.GL.FRONT_FACE = 2886;
lime.graphics.opengl.GL.DEPTH_RANGE = 2928;
lime.graphics.opengl.GL.DEPTH_WRITEMASK = 2930;
lime.graphics.opengl.GL.DEPTH_CLEAR_VALUE = 2931;
lime.graphics.opengl.GL.DEPTH_FUNC = 2932;
lime.graphics.opengl.GL.STENCIL_CLEAR_VALUE = 2961;
lime.graphics.opengl.GL.STENCIL_FUNC = 2962;
lime.graphics.opengl.GL.STENCIL_FAIL = 2964;
lime.graphics.opengl.GL.STENCIL_PASS_DEPTH_FAIL = 2965;
lime.graphics.opengl.GL.STENCIL_PASS_DEPTH_PASS = 2966;
lime.graphics.opengl.GL.STENCIL_REF = 2967;
lime.graphics.opengl.GL.STENCIL_VALUE_MASK = 2963;
lime.graphics.opengl.GL.STENCIL_WRITEMASK = 2968;
lime.graphics.opengl.GL.STENCIL_BACK_FUNC = 34816;
lime.graphics.opengl.GL.STENCIL_BACK_FAIL = 34817;
lime.graphics.opengl.GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
lime.graphics.opengl.GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
lime.graphics.opengl.GL.STENCIL_BACK_REF = 36003;
lime.graphics.opengl.GL.STENCIL_BACK_VALUE_MASK = 36004;
lime.graphics.opengl.GL.STENCIL_BACK_WRITEMASK = 36005;
lime.graphics.opengl.GL.VIEWPORT = 2978;
lime.graphics.opengl.GL.SCISSOR_BOX = 3088;
lime.graphics.opengl.GL.COLOR_CLEAR_VALUE = 3106;
lime.graphics.opengl.GL.COLOR_WRITEMASK = 3107;
lime.graphics.opengl.GL.UNPACK_ALIGNMENT = 3317;
lime.graphics.opengl.GL.PACK_ALIGNMENT = 3333;
lime.graphics.opengl.GL.MAX_TEXTURE_SIZE = 3379;
lime.graphics.opengl.GL.MAX_VIEWPORT_DIMS = 3386;
lime.graphics.opengl.GL.SUBPIXEL_BITS = 3408;
lime.graphics.opengl.GL.RED_BITS = 3410;
lime.graphics.opengl.GL.GREEN_BITS = 3411;
lime.graphics.opengl.GL.BLUE_BITS = 3412;
lime.graphics.opengl.GL.ALPHA_BITS = 3413;
lime.graphics.opengl.GL.DEPTH_BITS = 3414;
lime.graphics.opengl.GL.STENCIL_BITS = 3415;
lime.graphics.opengl.GL.POLYGON_OFFSET_UNITS = 10752;
lime.graphics.opengl.GL.POLYGON_OFFSET_FACTOR = 32824;
lime.graphics.opengl.GL.TEXTURE_BINDING_2D = 32873;
lime.graphics.opengl.GL.SAMPLE_BUFFERS = 32936;
lime.graphics.opengl.GL.SAMPLES = 32937;
lime.graphics.opengl.GL.SAMPLE_COVERAGE_VALUE = 32938;
lime.graphics.opengl.GL.SAMPLE_COVERAGE_INVERT = 32939;
lime.graphics.opengl.GL.COMPRESSED_TEXTURE_FORMATS = 34467;
lime.graphics.opengl.GL.DONT_CARE = 4352;
lime.graphics.opengl.GL.FASTEST = 4353;
lime.graphics.opengl.GL.NICEST = 4354;
lime.graphics.opengl.GL.GENERATE_MIPMAP_HINT = 33170;
lime.graphics.opengl.GL.BYTE = 5120;
lime.graphics.opengl.GL.UNSIGNED_BYTE = 5121;
lime.graphics.opengl.GL.SHORT = 5122;
lime.graphics.opengl.GL.UNSIGNED_SHORT = 5123;
lime.graphics.opengl.GL.INT = 5124;
lime.graphics.opengl.GL.UNSIGNED_INT = 5125;
lime.graphics.opengl.GL.FLOAT = 5126;
lime.graphics.opengl.GL.DEPTH_COMPONENT = 6402;
lime.graphics.opengl.GL.ALPHA = 6406;
lime.graphics.opengl.GL.RGB = 6407;
lime.graphics.opengl.GL.RGBA = 6408;
lime.graphics.opengl.GL.LUMINANCE = 6409;
lime.graphics.opengl.GL.LUMINANCE_ALPHA = 6410;
lime.graphics.opengl.GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
lime.graphics.opengl.GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
lime.graphics.opengl.GL.UNSIGNED_SHORT_5_6_5 = 33635;
lime.graphics.opengl.GL.FRAGMENT_SHADER = 35632;
lime.graphics.opengl.GL.VERTEX_SHADER = 35633;
lime.graphics.opengl.GL.MAX_VERTEX_ATTRIBS = 34921;
lime.graphics.opengl.GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
lime.graphics.opengl.GL.MAX_VARYING_VECTORS = 36348;
lime.graphics.opengl.GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
lime.graphics.opengl.GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
lime.graphics.opengl.GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
lime.graphics.opengl.GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
lime.graphics.opengl.GL.SHADER_TYPE = 35663;
lime.graphics.opengl.GL.DELETE_STATUS = 35712;
lime.graphics.opengl.GL.LINK_STATUS = 35714;
lime.graphics.opengl.GL.VALIDATE_STATUS = 35715;
lime.graphics.opengl.GL.ATTACHED_SHADERS = 35717;
lime.graphics.opengl.GL.ACTIVE_UNIFORMS = 35718;
lime.graphics.opengl.GL.ACTIVE_ATTRIBUTES = 35721;
lime.graphics.opengl.GL.SHADING_LANGUAGE_VERSION = 35724;
lime.graphics.opengl.GL.CURRENT_PROGRAM = 35725;
lime.graphics.opengl.GL.NEVER = 512;
lime.graphics.opengl.GL.LESS = 513;
lime.graphics.opengl.GL.EQUAL = 514;
lime.graphics.opengl.GL.LEQUAL = 515;
lime.graphics.opengl.GL.GREATER = 516;
lime.graphics.opengl.GL.NOTEQUAL = 517;
lime.graphics.opengl.GL.GEQUAL = 518;
lime.graphics.opengl.GL.ALWAYS = 519;
lime.graphics.opengl.GL.KEEP = 7680;
lime.graphics.opengl.GL.REPLACE = 7681;
lime.graphics.opengl.GL.INCR = 7682;
lime.graphics.opengl.GL.DECR = 7683;
lime.graphics.opengl.GL.INVERT = 5386;
lime.graphics.opengl.GL.INCR_WRAP = 34055;
lime.graphics.opengl.GL.DECR_WRAP = 34056;
lime.graphics.opengl.GL.VENDOR = 7936;
lime.graphics.opengl.GL.RENDERER = 7937;
lime.graphics.opengl.GL.VERSION = 7938;
lime.graphics.opengl.GL.NEAREST = 9728;
lime.graphics.opengl.GL.LINEAR = 9729;
lime.graphics.opengl.GL.NEAREST_MIPMAP_NEAREST = 9984;
lime.graphics.opengl.GL.LINEAR_MIPMAP_NEAREST = 9985;
lime.graphics.opengl.GL.NEAREST_MIPMAP_LINEAR = 9986;
lime.graphics.opengl.GL.LINEAR_MIPMAP_LINEAR = 9987;
lime.graphics.opengl.GL.TEXTURE_MAG_FILTER = 10240;
lime.graphics.opengl.GL.TEXTURE_MIN_FILTER = 10241;
lime.graphics.opengl.GL.TEXTURE_WRAP_S = 10242;
lime.graphics.opengl.GL.TEXTURE_WRAP_T = 10243;
lime.graphics.opengl.GL.TEXTURE_2D = 3553;
lime.graphics.opengl.GL.TEXTURE = 5890;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP = 34067;
lime.graphics.opengl.GL.TEXTURE_BINDING_CUBE_MAP = 34068;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
lime.graphics.opengl.GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
lime.graphics.opengl.GL.TEXTURE0 = 33984;
lime.graphics.opengl.GL.TEXTURE1 = 33985;
lime.graphics.opengl.GL.TEXTURE2 = 33986;
lime.graphics.opengl.GL.TEXTURE3 = 33987;
lime.graphics.opengl.GL.TEXTURE4 = 33988;
lime.graphics.opengl.GL.TEXTURE5 = 33989;
lime.graphics.opengl.GL.TEXTURE6 = 33990;
lime.graphics.opengl.GL.TEXTURE7 = 33991;
lime.graphics.opengl.GL.TEXTURE8 = 33992;
lime.graphics.opengl.GL.TEXTURE9 = 33993;
lime.graphics.opengl.GL.TEXTURE10 = 33994;
lime.graphics.opengl.GL.TEXTURE11 = 33995;
lime.graphics.opengl.GL.TEXTURE12 = 33996;
lime.graphics.opengl.GL.TEXTURE13 = 33997;
lime.graphics.opengl.GL.TEXTURE14 = 33998;
lime.graphics.opengl.GL.TEXTURE15 = 33999;
lime.graphics.opengl.GL.TEXTURE16 = 34000;
lime.graphics.opengl.GL.TEXTURE17 = 34001;
lime.graphics.opengl.GL.TEXTURE18 = 34002;
lime.graphics.opengl.GL.TEXTURE19 = 34003;
lime.graphics.opengl.GL.TEXTURE20 = 34004;
lime.graphics.opengl.GL.TEXTURE21 = 34005;
lime.graphics.opengl.GL.TEXTURE22 = 34006;
lime.graphics.opengl.GL.TEXTURE23 = 34007;
lime.graphics.opengl.GL.TEXTURE24 = 34008;
lime.graphics.opengl.GL.TEXTURE25 = 34009;
lime.graphics.opengl.GL.TEXTURE26 = 34010;
lime.graphics.opengl.GL.TEXTURE27 = 34011;
lime.graphics.opengl.GL.TEXTURE28 = 34012;
lime.graphics.opengl.GL.TEXTURE29 = 34013;
lime.graphics.opengl.GL.TEXTURE30 = 34014;
lime.graphics.opengl.GL.TEXTURE31 = 34015;
lime.graphics.opengl.GL.ACTIVE_TEXTURE = 34016;
lime.graphics.opengl.GL.REPEAT = 10497;
lime.graphics.opengl.GL.CLAMP_TO_EDGE = 33071;
lime.graphics.opengl.GL.MIRRORED_REPEAT = 33648;
lime.graphics.opengl.GL.FLOAT_VEC2 = 35664;
lime.graphics.opengl.GL.FLOAT_VEC3 = 35665;
lime.graphics.opengl.GL.FLOAT_VEC4 = 35666;
lime.graphics.opengl.GL.INT_VEC2 = 35667;
lime.graphics.opengl.GL.INT_VEC3 = 35668;
lime.graphics.opengl.GL.INT_VEC4 = 35669;
lime.graphics.opengl.GL.BOOL = 35670;
lime.graphics.opengl.GL.BOOL_VEC2 = 35671;
lime.graphics.opengl.GL.BOOL_VEC3 = 35672;
lime.graphics.opengl.GL.BOOL_VEC4 = 35673;
lime.graphics.opengl.GL.FLOAT_MAT2 = 35674;
lime.graphics.opengl.GL.FLOAT_MAT3 = 35675;
lime.graphics.opengl.GL.FLOAT_MAT4 = 35676;
lime.graphics.opengl.GL.SAMPLER_2D = 35678;
lime.graphics.opengl.GL.SAMPLER_CUBE = 35680;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
lime.graphics.opengl.GL.VERTEX_PROGRAM_POINT_SIZE = 34370;
lime.graphics.opengl.GL.POINT_SPRITE = 34913;
lime.graphics.opengl.GL.COMPILE_STATUS = 35713;
lime.graphics.opengl.GL.LOW_FLOAT = 36336;
lime.graphics.opengl.GL.MEDIUM_FLOAT = 36337;
lime.graphics.opengl.GL.HIGH_FLOAT = 36338;
lime.graphics.opengl.GL.LOW_INT = 36339;
lime.graphics.opengl.GL.MEDIUM_INT = 36340;
lime.graphics.opengl.GL.HIGH_INT = 36341;
lime.graphics.opengl.GL.FRAMEBUFFER = 36160;
lime.graphics.opengl.GL.RENDERBUFFER = 36161;
lime.graphics.opengl.GL.RGBA4 = 32854;
lime.graphics.opengl.GL.RGB5_A1 = 32855;
lime.graphics.opengl.GL.RGB565 = 36194;
lime.graphics.opengl.GL.DEPTH_COMPONENT16 = 33189;
lime.graphics.opengl.GL.STENCIL_INDEX = 6401;
lime.graphics.opengl.GL.STENCIL_INDEX8 = 36168;
lime.graphics.opengl.GL.DEPTH_STENCIL = 34041;
lime.graphics.opengl.GL.RENDERBUFFER_WIDTH = 36162;
lime.graphics.opengl.GL.RENDERBUFFER_HEIGHT = 36163;
lime.graphics.opengl.GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
lime.graphics.opengl.GL.RENDERBUFFER_RED_SIZE = 36176;
lime.graphics.opengl.GL.RENDERBUFFER_GREEN_SIZE = 36177;
lime.graphics.opengl.GL.RENDERBUFFER_BLUE_SIZE = 36178;
lime.graphics.opengl.GL.RENDERBUFFER_ALPHA_SIZE = 36179;
lime.graphics.opengl.GL.RENDERBUFFER_DEPTH_SIZE = 36180;
lime.graphics.opengl.GL.RENDERBUFFER_STENCIL_SIZE = 36181;
lime.graphics.opengl.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
lime.graphics.opengl.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
lime.graphics.opengl.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
lime.graphics.opengl.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
lime.graphics.opengl.GL.COLOR_ATTACHMENT0 = 36064;
lime.graphics.opengl.GL.DEPTH_ATTACHMENT = 36096;
lime.graphics.opengl.GL.STENCIL_ATTACHMENT = 36128;
lime.graphics.opengl.GL.DEPTH_STENCIL_ATTACHMENT = 33306;
lime.graphics.opengl.GL.NONE = 0;
lime.graphics.opengl.GL.FRAMEBUFFER_COMPLETE = 36053;
lime.graphics.opengl.GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
lime.graphics.opengl.GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
lime.graphics.opengl.GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
lime.graphics.opengl.GL.FRAMEBUFFER_UNSUPPORTED = 36061;
lime.graphics.opengl.GL.FRAMEBUFFER_BINDING = 36006;
lime.graphics.opengl.GL.RENDERBUFFER_BINDING = 36007;
lime.graphics.opengl.GL.MAX_RENDERBUFFER_SIZE = 34024;
lime.graphics.opengl.GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
lime.graphics.opengl.GL.UNPACK_FLIP_Y_WEBGL = 37440;
lime.graphics.opengl.GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
lime.graphics.opengl.GL.CONTEXT_LOST_WEBGL = 37442;
lime.graphics.opengl.GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
lime.graphics.opengl.GL.BROWSER_DEFAULT_WEBGL = 37444;
lime.math._ColorMatrix.ColorMatrix_Impl_.__identity = [1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0];
lime.math.Matrix3.__identity = new lime.math.Matrix3();
lime.math._Matrix4.Matrix4_Impl_.__identity = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
lime.net._URLRequestMethod.URLRequestMethod_Impl_.DELETE = "DELETE";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.GET = "GET";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.HEAD = "HEAD";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.OPTIONS = "OPTIONS";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.POST = "POST";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.PUT = "PUT";
lime.system.System.__moduleNames = null;
lime.system.System.__startTime = haxe.Timer.stamp();
lime.ui._KeyCode.KeyCode_Impl_.UNKNOWN = 0;
lime.ui._KeyCode.KeyCode_Impl_.BACKSPACE = 8;
lime.ui._KeyCode.KeyCode_Impl_.TAB = 9;
lime.ui._KeyCode.KeyCode_Impl_.RETURN = 13;
lime.ui._KeyCode.KeyCode_Impl_.ESCAPE = 27;
lime.ui._KeyCode.KeyCode_Impl_.SPACE = 32;
lime.ui._KeyCode.KeyCode_Impl_.EXCLAMATION = 33;
lime.ui._KeyCode.KeyCode_Impl_.QUOTE = 34;
lime.ui._KeyCode.KeyCode_Impl_.HASH = 35;
lime.ui._KeyCode.KeyCode_Impl_.DOLLAR = 36;
lime.ui._KeyCode.KeyCode_Impl_.PERCENT = 37;
lime.ui._KeyCode.KeyCode_Impl_.AMPERSAND = 38;
lime.ui._KeyCode.KeyCode_Impl_.SINGLE_QUOTE = 39;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_PARENTHESIS = 40;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_PARENTHESIS = 41;
lime.ui._KeyCode.KeyCode_Impl_.ASTERISK = 42;
lime.ui._KeyCode.KeyCode_Impl_.PLUS = 43;
lime.ui._KeyCode.KeyCode_Impl_.COMMA = 44;
lime.ui._KeyCode.KeyCode_Impl_.MINUS = 45;
lime.ui._KeyCode.KeyCode_Impl_.PERIOD = 46;
lime.ui._KeyCode.KeyCode_Impl_.SLASH = 47;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_0 = 48;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_1 = 49;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_2 = 50;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_3 = 51;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_4 = 52;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_5 = 53;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_6 = 54;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_7 = 55;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_8 = 56;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_9 = 57;
lime.ui._KeyCode.KeyCode_Impl_.COLON = 58;
lime.ui._KeyCode.KeyCode_Impl_.SEMICOLON = 59;
lime.ui._KeyCode.KeyCode_Impl_.LESS_THAN = 60;
lime.ui._KeyCode.KeyCode_Impl_.EQUALS = 61;
lime.ui._KeyCode.KeyCode_Impl_.GREATER_THAN = 62;
lime.ui._KeyCode.KeyCode_Impl_.QUESTION = 63;
lime.ui._KeyCode.KeyCode_Impl_.AT = 64;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_BRACKET = 91;
lime.ui._KeyCode.KeyCode_Impl_.BACKSLASH = 92;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_BRACKET = 93;
lime.ui._KeyCode.KeyCode_Impl_.CARET = 94;
lime.ui._KeyCode.KeyCode_Impl_.UNDERSCORE = 95;
lime.ui._KeyCode.KeyCode_Impl_.GRAVE = 96;
lime.ui._KeyCode.KeyCode_Impl_.A = 97;
lime.ui._KeyCode.KeyCode_Impl_.B = 98;
lime.ui._KeyCode.KeyCode_Impl_.C = 99;
lime.ui._KeyCode.KeyCode_Impl_.D = 100;
lime.ui._KeyCode.KeyCode_Impl_.E = 101;
lime.ui._KeyCode.KeyCode_Impl_.F = 102;
lime.ui._KeyCode.KeyCode_Impl_.G = 103;
lime.ui._KeyCode.KeyCode_Impl_.H = 104;
lime.ui._KeyCode.KeyCode_Impl_.I = 105;
lime.ui._KeyCode.KeyCode_Impl_.J = 106;
lime.ui._KeyCode.KeyCode_Impl_.K = 107;
lime.ui._KeyCode.KeyCode_Impl_.L = 108;
lime.ui._KeyCode.KeyCode_Impl_.M = 109;
lime.ui._KeyCode.KeyCode_Impl_.N = 110;
lime.ui._KeyCode.KeyCode_Impl_.O = 111;
lime.ui._KeyCode.KeyCode_Impl_.P = 112;
lime.ui._KeyCode.KeyCode_Impl_.Q = 113;
lime.ui._KeyCode.KeyCode_Impl_.R = 114;
lime.ui._KeyCode.KeyCode_Impl_.S = 115;
lime.ui._KeyCode.KeyCode_Impl_.T = 116;
lime.ui._KeyCode.KeyCode_Impl_.U = 117;
lime.ui._KeyCode.KeyCode_Impl_.V = 118;
lime.ui._KeyCode.KeyCode_Impl_.W = 119;
lime.ui._KeyCode.KeyCode_Impl_.X = 120;
lime.ui._KeyCode.KeyCode_Impl_.Y = 121;
lime.ui._KeyCode.KeyCode_Impl_.Z = 122;
lime.ui._KeyCode.KeyCode_Impl_.DELETE = 127;
lime.ui._KeyCode.KeyCode_Impl_.CAPS_LOCK = 1073741881;
lime.ui._KeyCode.KeyCode_Impl_.F1 = 1073741882;
lime.ui._KeyCode.KeyCode_Impl_.F2 = 1073741883;
lime.ui._KeyCode.KeyCode_Impl_.F3 = 1073741884;
lime.ui._KeyCode.KeyCode_Impl_.F4 = 1073741885;
lime.ui._KeyCode.KeyCode_Impl_.F5 = 1073741886;
lime.ui._KeyCode.KeyCode_Impl_.F6 = 1073741887;
lime.ui._KeyCode.KeyCode_Impl_.F7 = 1073741888;
lime.ui._KeyCode.KeyCode_Impl_.F8 = 1073741889;
lime.ui._KeyCode.KeyCode_Impl_.F9 = 1073741890;
lime.ui._KeyCode.KeyCode_Impl_.F10 = 1073741891;
lime.ui._KeyCode.KeyCode_Impl_.F11 = 1073741892;
lime.ui._KeyCode.KeyCode_Impl_.F12 = 1073741893;
lime.ui._KeyCode.KeyCode_Impl_.PRINT_SCREEN = 1073741894;
lime.ui._KeyCode.KeyCode_Impl_.SCROLL_LOCK = 1073741895;
lime.ui._KeyCode.KeyCode_Impl_.PAUSE = 1073741896;
lime.ui._KeyCode.KeyCode_Impl_.INSERT = 1073741897;
lime.ui._KeyCode.KeyCode_Impl_.HOME = 1073741898;
lime.ui._KeyCode.KeyCode_Impl_.PAGE_UP = 1073741899;
lime.ui._KeyCode.KeyCode_Impl_.END = 1073741901;
lime.ui._KeyCode.KeyCode_Impl_.PAGE_DOWN = 1073741902;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT = 1073741903;
lime.ui._KeyCode.KeyCode_Impl_.LEFT = 1073741904;
lime.ui._KeyCode.KeyCode_Impl_.DOWN = 1073741905;
lime.ui._KeyCode.KeyCode_Impl_.UP = 1073741906;
lime.ui._KeyCode.KeyCode_Impl_.NUM_LOCK = 1073741907;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_DIVIDE = 1073741908;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MULTIPLY = 1073741909;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MINUS = 1073741910;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_PLUS = 1073741911;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_ENTER = 1073741912;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_1 = 1073741913;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_2 = 1073741914;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_3 = 1073741915;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_4 = 1073741916;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_5 = 1073741917;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_6 = 1073741918;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_7 = 1073741919;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_8 = 1073741920;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_9 = 1073741921;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_0 = 1073741922;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_PERIOD = 1073741923;
lime.ui._KeyCode.KeyCode_Impl_.APPLICATION = 1073741925;
lime.ui._KeyCode.KeyCode_Impl_.POWER = 1073741926;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_EQUALS = 1073741927;
lime.ui._KeyCode.KeyCode_Impl_.F13 = 1073741928;
lime.ui._KeyCode.KeyCode_Impl_.F14 = 1073741929;
lime.ui._KeyCode.KeyCode_Impl_.F15 = 1073741930;
lime.ui._KeyCode.KeyCode_Impl_.F16 = 1073741931;
lime.ui._KeyCode.KeyCode_Impl_.F17 = 1073741932;
lime.ui._KeyCode.KeyCode_Impl_.F18 = 1073741933;
lime.ui._KeyCode.KeyCode_Impl_.F19 = 1073741934;
lime.ui._KeyCode.KeyCode_Impl_.F20 = 1073741935;
lime.ui._KeyCode.KeyCode_Impl_.F21 = 1073741936;
lime.ui._KeyCode.KeyCode_Impl_.F22 = 1073741937;
lime.ui._KeyCode.KeyCode_Impl_.F23 = 1073741938;
lime.ui._KeyCode.KeyCode_Impl_.F24 = 1073741939;
lime.ui._KeyCode.KeyCode_Impl_.EXECUTE = 1073741940;
lime.ui._KeyCode.KeyCode_Impl_.HELP = 1073741941;
lime.ui._KeyCode.KeyCode_Impl_.MENU = 1073741942;
lime.ui._KeyCode.KeyCode_Impl_.SELECT = 1073741943;
lime.ui._KeyCode.KeyCode_Impl_.STOP = 1073741944;
lime.ui._KeyCode.KeyCode_Impl_.AGAIN = 1073741945;
lime.ui._KeyCode.KeyCode_Impl_.UNDO = 1073741946;
lime.ui._KeyCode.KeyCode_Impl_.CUT = 1073741947;
lime.ui._KeyCode.KeyCode_Impl_.COPY = 1073741948;
lime.ui._KeyCode.KeyCode_Impl_.PASTE = 1073741949;
lime.ui._KeyCode.KeyCode_Impl_.FIND = 1073741950;
lime.ui._KeyCode.KeyCode_Impl_.MUTE = 1073741951;
lime.ui._KeyCode.KeyCode_Impl_.VOLUME_UP = 1073741952;
lime.ui._KeyCode.KeyCode_Impl_.VOLUME_DOWN = 1073741953;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_COMMA = 1073741957;
lime.ui._KeyCode.KeyCode_Impl_.ALT_ERASE = 1073741977;
lime.ui._KeyCode.KeyCode_Impl_.SYSTEM_REQUEST = 1073741978;
lime.ui._KeyCode.KeyCode_Impl_.CANCEL = 1073741979;
lime.ui._KeyCode.KeyCode_Impl_.CLEAR = 1073741980;
lime.ui._KeyCode.KeyCode_Impl_.PRIOR = 1073741981;
lime.ui._KeyCode.KeyCode_Impl_.RETURN2 = 1073741982;
lime.ui._KeyCode.KeyCode_Impl_.SEPARATOR = 1073741983;
lime.ui._KeyCode.KeyCode_Impl_.OUT = 1073741984;
lime.ui._KeyCode.KeyCode_Impl_.OPER = 1073741985;
lime.ui._KeyCode.KeyCode_Impl_.CLEAR_AGAIN = 1073741986;
lime.ui._KeyCode.KeyCode_Impl_.CRSEL = 1073741987;
lime.ui._KeyCode.KeyCode_Impl_.EXSEL = 1073741988;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_00 = 1073742000;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_000 = 1073742001;
lime.ui._KeyCode.KeyCode_Impl_.THOUSAND_SEPARATOR = 1073742002;
lime.ui._KeyCode.KeyCode_Impl_.DECIMAL_SEPARATOR = 1073742003;
lime.ui._KeyCode.KeyCode_Impl_.CURRENCY_UNIT = 1073742004;
lime.ui._KeyCode.KeyCode_Impl_.CURRENCY_SUBUNIT = 1073742005;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_LEFT_PARENTHESIS = 1073742006;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_RIGHT_PARENTHESIS = 1073742007;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_LEFT_BRACE = 1073742008;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_RIGHT_BRACE = 1073742009;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_TAB = 1073742010;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_BACKSPACE = 1073742011;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_A = 1073742012;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_B = 1073742013;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_C = 1073742014;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_D = 1073742015;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_E = 1073742016;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_F = 1073742017;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_XOR = 1073742018;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_POWER = 1073742019;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_PERCENT = 1073742020;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_LESS_THAN = 1073742021;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_GREATER_THAN = 1073742022;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_AMPERSAND = 1073742023;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_DOUBLE_AMPERSAND = 1073742024;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_VERTICAL_BAR = 1073742025;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_DOUBLE_VERTICAL_BAR = 1073742026;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_COLON = 1073742027;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_HASH = 1073742028;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_SPACE = 1073742029;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_AT = 1073742030;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_EXCLAMATION = 1073742031;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_STORE = 1073742032;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_RECALL = 1073742033;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_CLEAR = 1073742034;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_ADD = 1073742035;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_SUBTRACT = 1073742036;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_MULTIPLY = 1073742037;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_DIVIDE = 1073742038;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_PLUS_MINUS = 1073742039;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_CLEAR = 1073742040;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_CLEAR_ENTRY = 1073742041;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_BINARY = 1073742042;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_OCTAL = 1073742043;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_DECIMAL = 1073742044;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_HEXADECIMAL = 1073742045;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_CTRL = 1073742048;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_SHIFT = 1073742049;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_ALT = 1073742050;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_META = 1073742051;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_CTRL = 1073742052;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_SHIFT = 1073742053;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_ALT = 1073742054;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_META = 1073742055;
lime.ui._KeyCode.KeyCode_Impl_.MODE = 1073742081;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_NEXT = 1073742082;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_PREVIOUS = 1073742083;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_STOP = 1073742084;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_PLAY = 1073742085;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_MUTE = 1073742086;
lime.ui._KeyCode.KeyCode_Impl_.MEDIA_SELECT = 1073742087;
lime.ui._KeyCode.KeyCode_Impl_.WWW = 1073742088;
lime.ui._KeyCode.KeyCode_Impl_.MAIL = 1073742089;
lime.ui._KeyCode.KeyCode_Impl_.CALCULATOR = 1073742090;
lime.ui._KeyCode.KeyCode_Impl_.COMPUTER = 1073742091;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_SEARCH = 1073742092;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_HOME = 1073742093;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_BACK = 1073742094;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_FORWARD = 1073742095;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_STOP = 1073742096;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_REFRESH = 1073742097;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_BOOKMARKS = 1073742098;
lime.ui._KeyCode.KeyCode_Impl_.BRIGHTNESS_DOWN = 1073742099;
lime.ui._KeyCode.KeyCode_Impl_.BRIGHTNESS_UP = 1073742100;
lime.ui._KeyCode.KeyCode_Impl_.DISPLAY_SWITCH = 1073742101;
lime.ui._KeyCode.KeyCode_Impl_.BACKLIGHT_TOGGLE = 1073742102;
lime.ui._KeyCode.KeyCode_Impl_.BACKLIGHT_DOWN = 1073742103;
lime.ui._KeyCode.KeyCode_Impl_.BACKLIGHT_UP = 1073742104;
lime.ui._KeyCode.KeyCode_Impl_.EJECT = 1073742105;
lime.ui._KeyCode.KeyCode_Impl_.SLEEP = 1073742106;
lime.ui._KeyModifier.KeyModifier_Impl_.NONE = 0;
lime.ui._KeyModifier.KeyModifier_Impl_.LEFT_SHIFT = 1;
lime.ui._KeyModifier.KeyModifier_Impl_.RIGHT_SHIFT = 2;
lime.ui._KeyModifier.KeyModifier_Impl_.LEFT_CTRL = 64;
lime.ui._KeyModifier.KeyModifier_Impl_.RIGHT_CTRL = 128;
lime.ui._KeyModifier.KeyModifier_Impl_.LEFT_ALT = 256;
lime.ui._KeyModifier.KeyModifier_Impl_.RIGHT_ALT = 512;
lime.ui._KeyModifier.KeyModifier_Impl_.LEFT_META = 1024;
lime.ui._KeyModifier.KeyModifier_Impl_.RIGHT_META = 2048;
lime.ui._KeyModifier.KeyModifier_Impl_.NUM_LOCK = 4096;
lime.ui._KeyModifier.KeyModifier_Impl_.CAPS_LOCK = 8192;
lime.ui._KeyModifier.KeyModifier_Impl_.MODE = 16384;
lime.ui._KeyModifier.KeyModifier_Impl_.CTRL = 192;
lime.ui._KeyModifier.KeyModifier_Impl_.SHIFT = 3;
lime.ui._KeyModifier.KeyModifier_Impl_.ALT = 768;
lime.ui._KeyModifier.KeyModifier_Impl_.META = 3072;
lime.utils.ByteArray.lime_byte_array_overwrite_file = lime.system.System.load("lime","lime_byte_array_overwrite_file",2);
lime.utils.ByteArray.lime_byte_array_read_file = lime.system.System.load("lime","lime_byte_array_read_file",1);
lime.utils.ByteArray.lime_lzma_decode = lime.system.System.load("lime","lime_lzma_decode",1);
lime.utils.ByteArray.lime_lzma_encode = lime.system.System.load("lime","lime_lzma_encode",1);
openfl.display.LoaderInfo.__rootURL = window.document.URL;
openfl.system.ApplicationDomain.currentDomain = new openfl.system.ApplicationDomain(null);
openfl.geom.Matrix.__identity = new openfl.geom.Matrix();
openfl.Lib.current = new openfl.display.MovieClip();
openfl.Lib.__sentWarnings = new haxe.ds.StringMap();
openfl._internal.renderer.canvas.CanvasGraphics.SIN45 = 0.70710678118654752440084436210485;
openfl._internal.renderer.canvas.CanvasGraphics.TAN22 = 0.4142135623730950488016887242097;
openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL = null;
openfl._internal.renderer.opengl.GLRenderer.glContextId = 0;
openfl._internal.renderer.opengl.GLRenderer.glContexts = [];
openfl._internal.renderer.opengl.shaders.AbstractShader.__UID = 0;
openfl._internal.renderer.opengl.shaders.DefaultShader.defaultVertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec2 aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying vec4 vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;","   vColor = vec4(color * aColor.x, aColor.x);","}"];
openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex = 0;
openfl._internal.renderer.opengl.utils.GraphicsRenderer.graphicsDataPool = [];
openfl._internal.renderer.opengl.utils.GraphicsRenderer.bucketPool = [];
openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectPosition = new openfl.geom.Point();
openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds = new openfl.geom.Rectangle();
openfl._internal.renderer.opengl.utils._GraphicsRenderer.RenderMode_Impl_.DEFAULT = 0;
openfl._internal.renderer.opengl.utils._GraphicsRenderer.RenderMode_Impl_.STENCIL = 1;
openfl.display.Graphics.TILE_SCALE = 1;
openfl.display.Graphics.TILE_ROTATION = 2;
openfl.display.Graphics.TILE_RGB = 4;
openfl.display.Graphics.TILE_ALPHA = 8;
openfl.display.Graphics.TILE_TRANS_2x2 = 16;
openfl.display.Graphics.TILE_RECT = 32;
openfl.display.Graphics.TILE_ORIGIN = 64;
openfl.display.Graphics.TILE_BLEND_NORMAL = 0;
openfl.display.Graphics.TILE_BLEND_ADD = 65536;
openfl.display.GraphicsPathCommand.LINE_TO = 2;
openfl.display.GraphicsPathCommand.MOVE_TO = 1;
openfl.display.GraphicsPathCommand.CURVE_TO = 3;
openfl.display.GraphicsPathCommand.WIDE_LINE_TO = 5;
openfl.display.GraphicsPathCommand.WIDE_MOVE_TO = 4;
openfl.display.GraphicsPathCommand.NO_OP = 0;
openfl.display.GraphicsPathCommand.CUBIC_CURVE_TO = 6;
openfl.display.OpenGLView.CONTEXT_LOST = "glcontextlost";
openfl.display.OpenGLView.CONTEXT_RESTORED = "glcontextrestored";
openfl.display.Tilesheet.TILE_SCALE = 1;
openfl.display.Tilesheet.TILE_ROTATION = 2;
openfl.display.Tilesheet.TILE_RGB = 4;
openfl.display.Tilesheet.TILE_ALPHA = 8;
openfl.display.Tilesheet.TILE_TRANS_2x2 = 16;
openfl.display.Tilesheet.TILE_RECT = 32;
openfl.display.Tilesheet.TILE_ORIGIN = 64;
openfl.display.Tilesheet.TILE_BLEND_NORMAL = 0;
openfl.display.Tilesheet.TILE_BLEND_ADD = 65536;
openfl.display.Tilesheet.TILE_BLEND_MULTIPLY = 131072;
openfl.display.Tilesheet.TILE_BLEND_SCREEN = 262144;
openfl.display.Tilesheet.TILE_BLEND_SUBTRACT = 524288;
openfl.display.Tilesheet.__defaultPoint = new openfl.geom.Point(0,0);
openfl.display3D.Context3D.TEXTURE_MAX_ANISOTROPY_EXT = 34046;
openfl.display3D.Context3D.MAX_SAMPLERS = 8;
openfl.display3D.Context3D.MAX_TEXTURE_MAX_ANISOTROPY_EXT = 34047;
openfl.display3D.Context3D.anisotropySupportTested = false;
openfl.display3D.Context3D.supportsAnisotropy = false;
openfl.display3D.Context3D.maxSupportedAnisotropy = 256;
openfl.display3D.Context3DClearMask.ALL = 17664;
openfl.display3D.Context3DClearMask.COLOR = 16384;
openfl.display3D.Context3DClearMask.DEPTH = 256;
openfl.display3D.Context3DClearMask.STENCIL = 1024;
openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_.BACK = 1028;
openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_.FRONT = 1029;
openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_.FRONT_AND_BACK = 1032;
openfl.display3D._Context3DTriangleFace.Context3DTriangleFace_Impl_.NONE = 0;
openfl.errors.Error.DEFAULT_TO_STRING = "Error";
openfl.events.Event.ACTIVATE = "activate";
openfl.events.Event.ADDED = "added";
openfl.events.Event.ADDED_TO_STAGE = "addedToStage";
openfl.events.Event.CANCEL = "cancel";
openfl.events.Event.CHANGE = "change";
openfl.events.Event.CLOSE = "close";
openfl.events.Event.COMPLETE = "complete";
openfl.events.Event.CONNECT = "connect";
openfl.events.Event.CONTEXT3D_CREATE = "context3DCreate";
openfl.events.Event.DEACTIVATE = "deactivate";
openfl.events.Event.ENTER_FRAME = "enterFrame";
openfl.events.Event.ID3 = "id3";
openfl.events.Event.INIT = "init";
openfl.events.Event.MOUSE_LEAVE = "mouseLeave";
openfl.events.Event.OPEN = "open";
openfl.events.Event.REMOVED = "removed";
openfl.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
openfl.events.Event.RENDER = "render";
openfl.events.Event.RESIZE = "resize";
openfl.events.Event.SCROLL = "scroll";
openfl.events.Event.SELECT = "select";
openfl.events.Event.SOUND_COMPLETE = "soundComplete";
openfl.events.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
openfl.events.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
openfl.events.Event.TAB_INDEX_CHANGE = "tabIndexChange";
openfl.events.Event.UNLOAD = "unload";
openfl.events.TextEvent.LINK = "link";
openfl.events.TextEvent.TEXT_INPUT = "textInput";
openfl.events.ErrorEvent.ERROR = "error";
openfl.events.FocusEvent.FOCUS_IN = "focusIn";
openfl.events.FocusEvent.FOCUS_OUT = "focusOut";
openfl.events.FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
openfl.events.FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
openfl.events.IOErrorEvent.IO_ERROR = "ioError";
openfl.events.KeyboardEvent.KEY_DOWN = "keyDown";
openfl.events.KeyboardEvent.KEY_UP = "keyUp";
openfl.events.MouseEvent.CLICK = "click";
openfl.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
openfl.events.MouseEvent.MIDDLE_CLICK = "middleClick";
openfl.events.MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
openfl.events.MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
openfl.events.MouseEvent.MOUSE_DOWN = "mouseDown";
openfl.events.MouseEvent.MOUSE_MOVE = "mouseMove";
openfl.events.MouseEvent.MOUSE_OUT = "mouseOut";
openfl.events.MouseEvent.MOUSE_OVER = "mouseOver";
openfl.events.MouseEvent.MOUSE_UP = "mouseUp";
openfl.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
openfl.events.MouseEvent.RIGHT_CLICK = "rightClick";
openfl.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
openfl.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
openfl.events.MouseEvent.ROLL_OUT = "rollOut";
openfl.events.MouseEvent.ROLL_OVER = "rollOver";
openfl.events.MouseEvent.__buttonDown = [false,false,false];
openfl.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
openfl.events.TouchEvent.TOUCH_END = "touchEnd";
openfl.events.TouchEvent.TOUCH_MOVE = "touchMove";
openfl.events.TouchEvent.TOUCH_OUT = "touchOut";
openfl.events.TouchEvent.TOUCH_OVER = "touchOver";
openfl.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
openfl.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
openfl.events.TouchEvent.TOUCH_TAP = "touchTap";
openfl.media.Sound.__registeredSounds = new haxe.ds.StringMap();
openfl.net.URLRequestMethod.DELETE = "DELETE";
openfl.net.URLRequestMethod.GET = "GET";
openfl.net.URLRequestMethod.HEAD = "HEAD";
openfl.net.URLRequestMethod.OPTIONS = "OPTIONS";
openfl.net.URLRequestMethod.POST = "POST";
openfl.net.URLRequestMethod.PUT = "PUT";
openfl.system.SecurityDomain.currentDomain = new openfl.system.SecurityDomain();
openfl.text.Font.__registeredFonts = new Array();
openfl.ui._KeyLocation.KeyLocation_Impl_.STANDARD = 0;
openfl.ui._KeyLocation.KeyLocation_Impl_.LEFT = 1;
openfl.ui._KeyLocation.KeyLocation_Impl_.RIGHT = 2;
openfl.ui._KeyLocation.KeyLocation_Impl_.NUM_PAD = 3;
openfl.ui.Keyboard.NUMBER_0 = 48;
openfl.ui.Keyboard.NUMBER_1 = 49;
openfl.ui.Keyboard.NUMBER_2 = 50;
openfl.ui.Keyboard.NUMBER_3 = 51;
openfl.ui.Keyboard.NUMBER_4 = 52;
openfl.ui.Keyboard.NUMBER_5 = 53;
openfl.ui.Keyboard.NUMBER_6 = 54;
openfl.ui.Keyboard.NUMBER_7 = 55;
openfl.ui.Keyboard.NUMBER_8 = 56;
openfl.ui.Keyboard.NUMBER_9 = 57;
openfl.ui.Keyboard.A = 65;
openfl.ui.Keyboard.B = 66;
openfl.ui.Keyboard.C = 67;
openfl.ui.Keyboard.D = 68;
openfl.ui.Keyboard.E = 69;
openfl.ui.Keyboard.F = 70;
openfl.ui.Keyboard.G = 71;
openfl.ui.Keyboard.H = 72;
openfl.ui.Keyboard.I = 73;
openfl.ui.Keyboard.J = 74;
openfl.ui.Keyboard.K = 75;
openfl.ui.Keyboard.L = 76;
openfl.ui.Keyboard.M = 77;
openfl.ui.Keyboard.N = 78;
openfl.ui.Keyboard.O = 79;
openfl.ui.Keyboard.P = 80;
openfl.ui.Keyboard.Q = 81;
openfl.ui.Keyboard.R = 82;
openfl.ui.Keyboard.S = 83;
openfl.ui.Keyboard.T = 84;
openfl.ui.Keyboard.U = 85;
openfl.ui.Keyboard.V = 86;
openfl.ui.Keyboard.W = 87;
openfl.ui.Keyboard.X = 88;
openfl.ui.Keyboard.Y = 89;
openfl.ui.Keyboard.Z = 90;
openfl.ui.Keyboard.NUMPAD_0 = 96;
openfl.ui.Keyboard.NUMPAD_1 = 97;
openfl.ui.Keyboard.NUMPAD_2 = 98;
openfl.ui.Keyboard.NUMPAD_3 = 99;
openfl.ui.Keyboard.NUMPAD_4 = 100;
openfl.ui.Keyboard.NUMPAD_5 = 101;
openfl.ui.Keyboard.NUMPAD_6 = 102;
openfl.ui.Keyboard.NUMPAD_7 = 103;
openfl.ui.Keyboard.NUMPAD_8 = 104;
openfl.ui.Keyboard.NUMPAD_9 = 105;
openfl.ui.Keyboard.NUMPAD_MULTIPLY = 106;
openfl.ui.Keyboard.NUMPAD_ADD = 107;
openfl.ui.Keyboard.NUMPAD_ENTER = 108;
openfl.ui.Keyboard.NUMPAD_SUBTRACT = 109;
openfl.ui.Keyboard.NUMPAD_DECIMAL = 110;
openfl.ui.Keyboard.NUMPAD_DIVIDE = 111;
openfl.ui.Keyboard.F1 = 112;
openfl.ui.Keyboard.F2 = 113;
openfl.ui.Keyboard.F3 = 114;
openfl.ui.Keyboard.F4 = 115;
openfl.ui.Keyboard.F5 = 116;
openfl.ui.Keyboard.F6 = 117;
openfl.ui.Keyboard.F7 = 118;
openfl.ui.Keyboard.F8 = 119;
openfl.ui.Keyboard.F9 = 120;
openfl.ui.Keyboard.F10 = 121;
openfl.ui.Keyboard.F11 = 122;
openfl.ui.Keyboard.F12 = 123;
openfl.ui.Keyboard.F13 = 124;
openfl.ui.Keyboard.F14 = 125;
openfl.ui.Keyboard.F15 = 126;
openfl.ui.Keyboard.BACKSPACE = 8;
openfl.ui.Keyboard.TAB = 9;
openfl.ui.Keyboard.ALTERNATE = 18;
openfl.ui.Keyboard.ENTER = 13;
openfl.ui.Keyboard.COMMAND = 15;
openfl.ui.Keyboard.SHIFT = 16;
openfl.ui.Keyboard.CONTROL = 17;
openfl.ui.Keyboard.CAPS_LOCK = 20;
openfl.ui.Keyboard.NUMPAD = 21;
openfl.ui.Keyboard.ESCAPE = 27;
openfl.ui.Keyboard.SPACE = 32;
openfl.ui.Keyboard.PAGE_UP = 33;
openfl.ui.Keyboard.PAGE_DOWN = 34;
openfl.ui.Keyboard.END = 35;
openfl.ui.Keyboard.HOME = 36;
openfl.ui.Keyboard.LEFT = 37;
openfl.ui.Keyboard.RIGHT = 39;
openfl.ui.Keyboard.UP = 38;
openfl.ui.Keyboard.DOWN = 40;
openfl.ui.Keyboard.INSERT = 45;
openfl.ui.Keyboard.DELETE = 46;
openfl.ui.Keyboard.NUMLOCK = 144;
openfl.ui.Keyboard.BREAK = 19;
openfl.ui.Keyboard.SEMICOLON = 186;
openfl.ui.Keyboard.EQUAL = 187;
openfl.ui.Keyboard.COMMA = 188;
openfl.ui.Keyboard.MINUS = 189;
openfl.ui.Keyboard.PERIOD = 190;
openfl.ui.Keyboard.SLASH = 191;
openfl.ui.Keyboard.BACKQUOTE = 192;
openfl.ui.Keyboard.LEFTBRACKET = 219;
openfl.ui.Keyboard.BACKSLASH = 220;
openfl.ui.Keyboard.RIGHTBRACKET = 221;
openfl.ui.Keyboard.QUOTE = 222;
openfl.ui.Keyboard.DOM_VK_CANCEL = 3;
openfl.ui.Keyboard.DOM_VK_HELP = 6;
openfl.ui.Keyboard.DOM_VK_BACK_SPACE = 8;
openfl.ui.Keyboard.DOM_VK_TAB = 9;
openfl.ui.Keyboard.DOM_VK_CLEAR = 12;
openfl.ui.Keyboard.DOM_VK_RETURN = 13;
openfl.ui.Keyboard.DOM_VK_ENTER = 14;
openfl.ui.Keyboard.DOM_VK_SHIFT = 16;
openfl.ui.Keyboard.DOM_VK_CONTROL = 17;
openfl.ui.Keyboard.DOM_VK_ALT = 18;
openfl.ui.Keyboard.DOM_VK_PAUSE = 19;
openfl.ui.Keyboard.DOM_VK_CAPS_LOCK = 20;
openfl.ui.Keyboard.DOM_VK_ESCAPE = 27;
openfl.ui.Keyboard.DOM_VK_SPACE = 32;
openfl.ui.Keyboard.DOM_VK_PAGE_UP = 33;
openfl.ui.Keyboard.DOM_VK_PAGE_DOWN = 34;
openfl.ui.Keyboard.DOM_VK_END = 35;
openfl.ui.Keyboard.DOM_VK_HOME = 36;
openfl.ui.Keyboard.DOM_VK_LEFT = 37;
openfl.ui.Keyboard.DOM_VK_UP = 38;
openfl.ui.Keyboard.DOM_VK_RIGHT = 39;
openfl.ui.Keyboard.DOM_VK_DOWN = 40;
openfl.ui.Keyboard.DOM_VK_PRINTSCREEN = 44;
openfl.ui.Keyboard.DOM_VK_INSERT = 45;
openfl.ui.Keyboard.DOM_VK_DELETE = 46;
openfl.ui.Keyboard.DOM_VK_0 = 48;
openfl.ui.Keyboard.DOM_VK_1 = 49;
openfl.ui.Keyboard.DOM_VK_2 = 50;
openfl.ui.Keyboard.DOM_VK_3 = 51;
openfl.ui.Keyboard.DOM_VK_4 = 52;
openfl.ui.Keyboard.DOM_VK_5 = 53;
openfl.ui.Keyboard.DOM_VK_6 = 54;
openfl.ui.Keyboard.DOM_VK_7 = 55;
openfl.ui.Keyboard.DOM_VK_8 = 56;
openfl.ui.Keyboard.DOM_VK_9 = 57;
openfl.ui.Keyboard.DOM_VK_SEMICOLON = 59;
openfl.ui.Keyboard.DOM_VK_EQUALS = 61;
openfl.ui.Keyboard.DOM_VK_A = 65;
openfl.ui.Keyboard.DOM_VK_B = 66;
openfl.ui.Keyboard.DOM_VK_C = 67;
openfl.ui.Keyboard.DOM_VK_D = 68;
openfl.ui.Keyboard.DOM_VK_E = 69;
openfl.ui.Keyboard.DOM_VK_F = 70;
openfl.ui.Keyboard.DOM_VK_G = 71;
openfl.ui.Keyboard.DOM_VK_H = 72;
openfl.ui.Keyboard.DOM_VK_I = 73;
openfl.ui.Keyboard.DOM_VK_J = 74;
openfl.ui.Keyboard.DOM_VK_K = 75;
openfl.ui.Keyboard.DOM_VK_L = 76;
openfl.ui.Keyboard.DOM_VK_M = 77;
openfl.ui.Keyboard.DOM_VK_N = 78;
openfl.ui.Keyboard.DOM_VK_O = 79;
openfl.ui.Keyboard.DOM_VK_P = 80;
openfl.ui.Keyboard.DOM_VK_Q = 81;
openfl.ui.Keyboard.DOM_VK_R = 82;
openfl.ui.Keyboard.DOM_VK_S = 83;
openfl.ui.Keyboard.DOM_VK_T = 84;
openfl.ui.Keyboard.DOM_VK_U = 85;
openfl.ui.Keyboard.DOM_VK_V = 86;
openfl.ui.Keyboard.DOM_VK_W = 87;
openfl.ui.Keyboard.DOM_VK_X = 88;
openfl.ui.Keyboard.DOM_VK_Y = 89;
openfl.ui.Keyboard.DOM_VK_Z = 90;
openfl.ui.Keyboard.DOM_VK_CONTEXT_MENU = 93;
openfl.ui.Keyboard.DOM_VK_NUMPAD0 = 96;
openfl.ui.Keyboard.DOM_VK_NUMPAD1 = 97;
openfl.ui.Keyboard.DOM_VK_NUMPAD2 = 98;
openfl.ui.Keyboard.DOM_VK_NUMPAD3 = 99;
openfl.ui.Keyboard.DOM_VK_NUMPAD4 = 100;
openfl.ui.Keyboard.DOM_VK_NUMPAD5 = 101;
openfl.ui.Keyboard.DOM_VK_NUMPAD6 = 102;
openfl.ui.Keyboard.DOM_VK_NUMPAD7 = 103;
openfl.ui.Keyboard.DOM_VK_NUMPAD8 = 104;
openfl.ui.Keyboard.DOM_VK_NUMPAD9 = 105;
openfl.ui.Keyboard.DOM_VK_MULTIPLY = 106;
openfl.ui.Keyboard.DOM_VK_ADD = 107;
openfl.ui.Keyboard.DOM_VK_SEPARATOR = 108;
openfl.ui.Keyboard.DOM_VK_SUBTRACT = 109;
openfl.ui.Keyboard.DOM_VK_DECIMAL = 110;
openfl.ui.Keyboard.DOM_VK_DIVIDE = 111;
openfl.ui.Keyboard.DOM_VK_F1 = 112;
openfl.ui.Keyboard.DOM_VK_F2 = 113;
openfl.ui.Keyboard.DOM_VK_F3 = 114;
openfl.ui.Keyboard.DOM_VK_F4 = 115;
openfl.ui.Keyboard.DOM_VK_F5 = 116;
openfl.ui.Keyboard.DOM_VK_F6 = 117;
openfl.ui.Keyboard.DOM_VK_F7 = 118;
openfl.ui.Keyboard.DOM_VK_F8 = 119;
openfl.ui.Keyboard.DOM_VK_F9 = 120;
openfl.ui.Keyboard.DOM_VK_F10 = 121;
openfl.ui.Keyboard.DOM_VK_F11 = 122;
openfl.ui.Keyboard.DOM_VK_F12 = 123;
openfl.ui.Keyboard.DOM_VK_F13 = 124;
openfl.ui.Keyboard.DOM_VK_F14 = 125;
openfl.ui.Keyboard.DOM_VK_F15 = 126;
openfl.ui.Keyboard.DOM_VK_F16 = 127;
openfl.ui.Keyboard.DOM_VK_F17 = 128;
openfl.ui.Keyboard.DOM_VK_F18 = 129;
openfl.ui.Keyboard.DOM_VK_F19 = 130;
openfl.ui.Keyboard.DOM_VK_F20 = 131;
openfl.ui.Keyboard.DOM_VK_F21 = 132;
openfl.ui.Keyboard.DOM_VK_F22 = 133;
openfl.ui.Keyboard.DOM_VK_F23 = 134;
openfl.ui.Keyboard.DOM_VK_F24 = 135;
openfl.ui.Keyboard.DOM_VK_NUM_LOCK = 144;
openfl.ui.Keyboard.DOM_VK_SCROLL_LOCK = 145;
openfl.ui.Keyboard.DOM_VK_COMMA = 188;
openfl.ui.Keyboard.DOM_VK_PERIOD = 190;
openfl.ui.Keyboard.DOM_VK_SLASH = 191;
openfl.ui.Keyboard.DOM_VK_BACK_QUOTE = 192;
openfl.ui.Keyboard.DOM_VK_OPEN_BRACKET = 219;
openfl.ui.Keyboard.DOM_VK_BACK_SLASH = 220;
openfl.ui.Keyboard.DOM_VK_CLOSE_BRACKET = 221;
openfl.ui.Keyboard.DOM_VK_QUOTE = 222;
openfl.ui.Keyboard.DOM_VK_META = 224;
openfl.ui.Keyboard.DOM_VK_KANA = 21;
openfl.ui.Keyboard.DOM_VK_HANGUL = 21;
openfl.ui.Keyboard.DOM_VK_JUNJA = 23;
openfl.ui.Keyboard.DOM_VK_FINAL = 24;
openfl.ui.Keyboard.DOM_VK_HANJA = 25;
openfl.ui.Keyboard.DOM_VK_KANJI = 25;
openfl.ui.Keyboard.DOM_VK_CONVERT = 28;
openfl.ui.Keyboard.DOM_VK_NONCONVERT = 29;
openfl.ui.Keyboard.DOM_VK_ACEPT = 30;
openfl.ui.Keyboard.DOM_VK_MODECHANGE = 31;
openfl.ui.Keyboard.DOM_VK_SELECT = 41;
openfl.ui.Keyboard.DOM_VK_PRINT = 42;
openfl.ui.Keyboard.DOM_VK_EXECUTE = 43;
openfl.ui.Keyboard.DOM_VK_SLEEP = 95;
ApplicationMain.main();
})(typeof window != "undefined" ? window : exports);
