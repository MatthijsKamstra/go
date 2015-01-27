(function ($hx_exports) { "use strict";
$hx_exports.openfl = $hx_exports.openfl || {};
$hx_exports.lime = $hx_exports.lime || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
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
ApplicationMain.app = null;
ApplicationMain.create = function() {
	ApplicationMain.app = new openfl_display_Application();
	ApplicationMain.app.create(ApplicationMain.config);
	var display = new NMEPreloader();
	ApplicationMain.preloader = new openfl_display_Preloader(display);
	ApplicationMain.preloader.onComplete = ApplicationMain.init;
	ApplicationMain.preloader.create(ApplicationMain.config);
	var urls = [];
	var types = [];
	ApplicationMain.preloader.load(urls,types);
	var result = ApplicationMain.app.exec();
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
	openfl_Lib.current.stage.align = openfl_display_StageAlign.TOP_LEFT;
	openfl_Lib.current.stage.scaleMode = openfl_display_StageScaleMode.NO_SCALE;
	var hasMain = false;
	var _g = 0;
	var _g1 = Type.getClassFields(Main);
	while(_g < _g1.length) {
		var methodName = _g1[_g];
		++_g;
		if(methodName == "main") {
			hasMain = true;
			break;
		}
	}
	if(hasMain) Reflect.callMethod(Main,Reflect.field(Main,"main"),[]); else {
		var instance = Type.createInstance(DocumentClass,[]);
	}
	openfl_Lib.current.stage.dispatchEvent(new openfl_events_Event(openfl_events_Event.RESIZE,false,false));
};
var openfl_events_IEventDispatcher = function() { };
$hxClasses["openfl.events.IEventDispatcher"] = openfl_events_IEventDispatcher;
openfl_events_IEventDispatcher.__name__ = ["openfl","events","IEventDispatcher"];
openfl_events_IEventDispatcher.prototype = {
	__class__: openfl_events_IEventDispatcher
};
var openfl_events_EventDispatcher = function(target) {
	if(target != null) this.__targetDispatcher = target;
};
$hxClasses["openfl.events.EventDispatcher"] = openfl_events_EventDispatcher;
openfl_events_EventDispatcher.__name__ = ["openfl","events","EventDispatcher"];
openfl_events_EventDispatcher.__interfaces__ = [openfl_events_IEventDispatcher];
openfl_events_EventDispatcher.__sortByPriority = function(l1,l2) {
	if(l1.priority == l2.priority) return 0; else if(l1.priority > l2.priority) return -1; else return 1;
};
openfl_events_EventDispatcher.prototype = {
	addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		if(this.__eventMap == null) this.__eventMap = new haxe_ds_StringMap();
		if(!this.__eventMap.exists(type)) {
			var list = new Array();
			list.push(new openfl_events__$EventDispatcher_Listener(listener,useCapture,priority));
			this.__eventMap.set(type,list);
		} else {
			var list1 = this.__eventMap.get(type);
			var _g1 = 0;
			var _g = list1.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(Reflect.compareMethods(list1[i].callback,listener)) return;
			}
			list1.push(new openfl_events__$EventDispatcher_Listener(listener,useCapture,priority));
			list1.sort(openfl_events_EventDispatcher.__sortByPriority);
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
		var capture = event.eventPhase == openfl_events_EventPhase.CAPTURING_PHASE;
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
	,__class__: openfl_events_EventDispatcher
};
var openfl_display_IBitmapDrawable = function() { };
$hxClasses["openfl.display.IBitmapDrawable"] = openfl_display_IBitmapDrawable;
openfl_display_IBitmapDrawable.__name__ = ["openfl","display","IBitmapDrawable"];
openfl_display_IBitmapDrawable.prototype = {
	__class__: openfl_display_IBitmapDrawable
};
var openfl_display_DisplayObject = function() {
	openfl_events_EventDispatcher.call(this);
	this.set_alpha(1);
	this.set_rotation(0);
	this.set_scaleX(1);
	this.set_scaleY(1);
	this.set_visible(true);
	this.set_x(0);
	this.set_y(0);
	this.__worldAlpha = 1;
	this.__worldTransform = new openfl_geom_Matrix();
	this.__rotationCache = 0;
	this.__rotationSine = 0;
	this.__rotationCosine = 1;
	this.set_name("instance" + ++openfl_display_DisplayObject.__instanceCount);
};
$hxClasses["openfl.display.DisplayObject"] = openfl_display_DisplayObject;
openfl_display_DisplayObject.__name__ = ["openfl","display","DisplayObject"];
openfl_display_DisplayObject.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_DisplayObject.__super__ = openfl_events_EventDispatcher;
openfl_display_DisplayObject.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	dispatchEvent: function(event) {
		var result = openfl_events_EventDispatcher.prototype.dispatchEvent.call(this,event);
		if(event.__isCancelled) return true;
		if(event.bubbles && this.parent != null && this.parent != this) {
			event.eventPhase = openfl_events_EventPhase.BUBBLING_PHASE;
			this.parent.dispatchEvent(event);
		}
		return result;
	}
	,getBounds: function(targetCoordinateSpace) {
		var matrix = this.__getTransform();
		if(targetCoordinateSpace != null) {
			matrix = new openfl_geom_Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			matrix.concat(targetCoordinateSpace.__worldTransform.clone().invert());
		}
		var bounds = new openfl_geom_Rectangle();
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
			return currentBounds.containsPoint(new openfl_geom_Point(x,y));
		}
		return false;
	}
	,localToGlobal: function(point) {
		return this.__getTransform().transformPoint(point);
	}
	,__broadcast: function(event,notifyChilden) {
		if(this.__eventMap != null && this.hasEventListener(event.type)) {
			var result = openfl_events_EventDispatcher.prototype.dispatchEvent.call(this,event);
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
		this.__getBounds(rect,new openfl_geom_Matrix());
	}
	,__getTransform: function() {
		if(openfl_display_DisplayObject.__worldTransformDirty > 0) {
			var list = [];
			var current = this;
			var transformDirty = this.__transformDirty;
			while(current.parent != null) {
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
			if(this.stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED_TO_STAGE,false,false));
		}
	}
	,__setRenderDirty: function() {
		if(!this.__renderDirty) {
			this.__renderDirty = true;
			openfl_display_DisplayObject.__worldRenderDirty++;
		}
	}
	,__setTransformDirty: function() {
		if(!this.__transformDirty) {
			this.__transformDirty = true;
			openfl_display_DisplayObject.__worldTransformDirty++;
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
			openfl_display_DisplayObject.__worldTransformDirty--;
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
			openfl_display_DisplayObject.__worldTransformDirty--;
		}
	}
	,get_alpha: function() {
		return this.__alpha;
	}
	,set_alpha: function(value) {
		if(value != this.__alpha) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
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
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
		return bounds.height * this.get_scaleY();
	}
	,set_height: function(value) {
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
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
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
		}
		if(this.__mask != null) this.__mask.__isMask = false;
		if(value != null) value.__isMask = true;
		return this.__mask = value;
	}
	,get_mouseX: function() {
		if(this.stage != null) return this.globalToLocal(new openfl_geom_Point(this.stage.__mouseX,0)).x;
		return 0;
	}
	,get_mouseY: function() {
		if(this.stage != null) return this.globalToLocal(new openfl_geom_Point(0,this.stage.__mouseY)).y;
		return 0;
	}
	,get_name: function() {
		return this.__name;
	}
	,set_name: function(value) {
		return this.__name = value;
	}
	,get_root: function() {
		if(this.stage != null) return openfl_Lib.current;
		return null;
	}
	,get_rotation: function() {
		return this.__rotation;
	}
	,set_rotation: function(value) {
		if(value != this.__rotation) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
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
				openfl_display_DisplayObject.__worldTransformDirty++;
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
				openfl_display_DisplayObject.__worldTransformDirty++;
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
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scrollRect = value;
	}
	,get_transform: function() {
		if(this.__transform == null) this.__transform = new openfl_geom_Transform(this);
		return this.__transform;
	}
	,set_transform: function(value) {
		if(value == null) throw new openfl_errors_TypeError("Parameter transform must be non-null.");
		if(this.__transform == null) this.__transform = new openfl_geom_Transform(this);
		if(!this.__transformDirty) {
			this.__transformDirty = true;
			openfl_display_DisplayObject.__worldTransformDirty++;
		}
		this.__transform.set_matrix(value.get_matrix().clone());
		this.__transform.colorTransform = new openfl_geom_ColorTransform(value.colorTransform.redMultiplier,value.colorTransform.greenMultiplier,value.colorTransform.blueMultiplier,value.colorTransform.alphaMultiplier,value.colorTransform.redOffset,value.colorTransform.greenOffset,value.colorTransform.blueOffset,value.colorTransform.alphaOffset);
		return this.__transform;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,set_visible: function(value) {
		if(value != this.__visible) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__visible = value;
	}
	,get_width: function() {
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
		return bounds.width * this.get_scaleX();
	}
	,set_width: function(value) {
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
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
				openfl_display_DisplayObject.__worldTransformDirty++;
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
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__y = value;
	}
	,__class__: openfl_display_DisplayObject
	,__properties__: {set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_width:"set_width",get_width:"get_width",set_visible:"set_visible",get_visible:"get_visible",set_transform:"set_transform",get_transform:"get_transform",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_rotation:"set_rotation",get_rotation:"get_rotation",get_root:"get_root",set_name:"set_name",get_name:"get_name",get_mouseY:"get_mouseY",get_mouseX:"get_mouseX",set_mask:"set_mask",get_mask:"get_mask",set_height:"set_height",get_height:"get_height",set_filters:"set_filters",get_filters:"get_filters",set_alpha:"set_alpha",get_alpha:"get_alpha"}
});
var openfl_display_InteractiveObject = function() {
	openfl_display_DisplayObject.call(this);
	this.doubleClickEnabled = false;
	this.mouseEnabled = true;
	this.needsSoftKeyboard = false;
	this.tabEnabled = true;
	this.tabIndex = -1;
};
$hxClasses["openfl.display.InteractiveObject"] = openfl_display_InteractiveObject;
openfl_display_InteractiveObject.__name__ = ["openfl","display","InteractiveObject"];
openfl_display_InteractiveObject.__super__ = openfl_display_DisplayObject;
openfl_display_InteractiveObject.prototype = $extend(openfl_display_DisplayObject.prototype,{
	requestSoftKeyboard: function() {
		openfl_Lib.notImplemented("InteractiveObject.requestSoftKeyboard");
		return false;
	}
	,__getInteractive: function(stack) {
		stack.push(this);
		if(this.parent != null) this.parent.__getInteractive(stack);
	}
	,__class__: openfl_display_InteractiveObject
});
var openfl_display_DisplayObjectContainer = function() {
	openfl_display_InteractiveObject.call(this);
	this.mouseChildren = true;
	this.__children = new Array();
	this.__removedChildren = new Array();
};
$hxClasses["openfl.display.DisplayObjectContainer"] = openfl_display_DisplayObjectContainer;
openfl_display_DisplayObjectContainer.__name__ = ["openfl","display","DisplayObjectContainer"];
openfl_display_DisplayObjectContainer.__super__ = openfl_display_InteractiveObject;
openfl_display_DisplayObjectContainer.prototype = $extend(openfl_display_InteractiveObject.prototype,{
	addChild: function(child) {
		if(child != null) {
			if(child.parent != null) child.parent.removeChild(child);
			this.__children.push(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			child.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED,true));
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
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			child.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED,true));
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
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			child.dispatchEvent(new openfl_events_Event(openfl_events_Event.REMOVED,true));
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
		if(beginIndex > this.__children.length - 1) return; else if(endIndex < beginIndex || beginIndex < 0 || endIndex > this.__children.length) throw new openfl_errors_RangeError("The supplied index is out of bounds.");
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
		return openfl_display_InteractiveObject.prototype.__broadcast.call(this,event,notifyChilden);
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
		if(this.__mask != null) {
		}
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCanvas(renderSession);
		}
		this.__removedChildren = [];
		if(this.__mask != null) {
		}
		if(this.get_scrollRect() != null) {
		}
	}
	,__renderDOM: function(renderSession) {
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
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
		renderSession.context.rect(0,0,bounds.width,bounds.height);
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED_TO_STAGE,false,false));
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
		openfl_display_InteractiveObject.prototype.__update.call(this,transformOnly,updateChildren);
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
		openfl_display_InteractiveObject.prototype.__updateChildren.call(this,transformOnly);
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
	,__class__: openfl_display_DisplayObjectContainer
	,__properties__: $extend(openfl_display_InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
var openfl_display_Sprite = function() {
	openfl_display_DisplayObjectContainer.call(this);
	this.buttonMode = false;
	this.useHandCursor = true;
};
$hxClasses["openfl.display.Sprite"] = openfl_display_Sprite;
openfl_display_Sprite.__name__ = ["openfl","display","Sprite"];
openfl_display_Sprite.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Sprite.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		if(this.stage != null) this.stage.__startDrag(this,lockCenter,bounds);
	}
	,stopDrag: function() {
		if(this.stage != null) this.stage.__stopDrag(this);
	}
	,__getBounds: function(rect,matrix) {
		openfl_display_DisplayObjectContainer.prototype.__getBounds.call(this,rect,matrix);
		if(this.__graphics != null) this.__graphics.__getBounds(rect,matrix != null?matrix:this.__worldTransform);
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var length = 0;
		if(stack != null) length = stack.length;
		if(openfl_display_DisplayObjectContainer.prototype.__hitTest.call(this,x,y,shapeFlag,stack,interactiveOnly)) return interactiveOnly; else if(this.__graphics != null && this.__graphics.__hitTest(x,y,shapeFlag,this.__getTransform())) {
			if(stack != null) stack.push(this);
			return true;
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		openfl__$internal_renderer_canvas_CanvasShape.render(this,renderSession);
		openfl_display_DisplayObjectContainer.prototype.__renderCanvas.call(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		openfl__$internal_renderer_dom_DOMShape.render(this,renderSession);
		openfl_display_DisplayObjectContainer.prototype.__renderDOM.call(this,renderSession);
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__graphics != null) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.render(this,renderSession);
		openfl_display_DisplayObjectContainer.prototype.__renderGL.call(this,renderSession);
	}
	,__renderMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasGraphics.renderMask(this.__graphics,renderSession); else openfl_display_DisplayObjectContainer.prototype.__renderMask.call(this,renderSession);
	}
	,get_graphics: function() {
		if(this.__graphics == null) this.__graphics = new openfl_display_Graphics();
		return this.__graphics;
	}
	,__class__: openfl_display_Sprite
	,__properties__: $extend(openfl_display_DisplayObjectContainer.prototype.__properties__,{get_graphics:"get_graphics"})
});
var Main = function() {
	openfl_display_Sprite.call(this);
	this.initialize();
	this.construct();
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.__super__ = openfl_display_Sprite;
Main.prototype = $extend(openfl_display_Sprite.prototype,{
	animateCircle: function(circle) {
		var duration = 1.5 + Math.random() * 4.5;
		var targetX = Math.random() * this.stage.stageWidth;
		var targetY = Math.random() * this.stage.stageHeight;
		lets_Go.to(circle,duration).x(targetX).y(targetY).ease(lets_Easing.quad).onComplete($bind(this,this.animateCircle),[circle]);
	}
	,construct: function() {
		var _g = 0;
		while(_g < 80) {
			var i = _g++;
			var creationDelay = Math.random() * 10;
			haxe_Timer.delay($bind(this,this.createCircle),creationDelay * 1000 | 0);
		}
	}
	,createCircle: function() {
		var size = 5 + Math.random() * 35 + 20;
		var circle = new openfl_display_Sprite();
		circle.get_graphics().beginFill(Std["int"](Math.random() * 16777215));
		circle.get_graphics().drawCircle(0,0,size);
		circle.set_alpha(0.2 + Math.random() * 0.6);
		circle.set_x(Math.random() * this.stage.stageWidth);
		circle.set_y(Math.random() * this.stage.stageHeight);
		this.addChildAt(circle,0);
		this.animateCircle(circle);
	}
	,initialize: function() {
		this.stage.addEventListener(openfl_events_Event.ACTIVATE,$bind(this,this.stage_onActivate));
		this.stage.addEventListener(openfl_events_Event.DEACTIVATE,$bind(this,this.stage_onDeactivate));
	}
	,stage_onActivate: function(event) {
		haxe_Log.trace("stage_onActivate () event : " + Std.string(event),{ fileName : "Main.hx", lineNumber : 66, className : "Main", methodName : "stage_onActivate"});
	}
	,stage_onDeactivate: function(event) {
		haxe_Log.trace("stage_onDeactivate () event : " + Std.string(event),{ fileName : "Main.hx", lineNumber : 73, className : "Main", methodName : "stage_onDeactivate"});
	}
	,__class__: Main
});
var DocumentClass = function() {
	openfl_Lib.current.addChild(this);
	Main.call(this);
	this.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED_TO_STAGE,false,false));
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	__class__: DocumentClass
});
var lime_AssetLibrary = function() {
};
$hxClasses["lime.AssetLibrary"] = lime_AssetLibrary;
lime_AssetLibrary.__name__ = ["lime","AssetLibrary"];
lime_AssetLibrary.prototype = {
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
	,__class__: lime_AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe_ds_StringMap();
	this.path = new haxe_ds_StringMap();
	this.className = new haxe_ds_StringMap();
	lime_AssetLibrary.call(this);
	var id;
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = ["DefaultAssetLibrary"];
DefaultAssetLibrary.__super__ = lime_AssetLibrary;
DefaultAssetLibrary.prototype = $extend(lime_AssetLibrary.prototype,{
	exists: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
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
			$r = lime_app_Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") {
			bytes = new lime_utils_ByteArray();
			bytes.writeUTFBytes(data);
		} else if(js_Boot.__instanceof(data,lime_utils_ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes;
		} else return null;
	}
	,getFont: function(id) {
		return js_Boot.__cast(Type.createInstance(this.className.get(id),[]) , openfl_text_Font);
		return null;
	}
	,getImage: function(id) {
		return lime_graphics_Image.fromImageElement((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime_app_Preloader.images.get(key);
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
			$r = lime_app_Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") return data; else if(js_Boot.__instanceof(data,lime_utils_ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes.readUTFBytes(bytes.length);
		} else return null;
	}
	,isLocal: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
		return true;
	}
	,list: function(type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
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
	openfl_display_Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new openfl_display_Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new openfl_display_Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = openfl_display_Sprite;
NMEPreloader.prototype = $extend(openfl_display_Sprite.prototype,{
	getBackgroundColor: function() {
		return 16777215;
	}
	,getHeight: function() {
		var height = 0;
		if(height > 0) return height; else return openfl_Lib.current.stage.stageHeight;
	}
	,getWidth: function() {
		var width = 0;
		if(width > 0) return width; else return openfl_Lib.current.stage.stageWidth;
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
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
	return js_Boot.__string_rec(s,"");
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
	return js_Boot.getClass(o);
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
var haxe_StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe_CallStack;
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.callStack = function() {
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
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.exceptionStack = function() {
	return [];
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
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
			haxe_CallStack.itemToString(b,s1);
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
haxe_CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe_StackItem.Module(line));
		}
		return m;
	} else return s;
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.measure = function(f,pos) {
	var t0 = haxe_Timer.stamp();
	var r = f();
	haxe_Log.trace(haxe_Timer.stamp() - t0 + "s",pos);
	return r;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe_crypto_BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe_io_Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
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
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe_ds_BalancedTree.prototype = {
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
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
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
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
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
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
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
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe_ds_EnumValueMap.__interfaces__ = [IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
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
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [IMap];
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [IMap];
haxe_ds_StringMap.prototype = {
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
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$Vector_Vector_$Impl_$ = function() { };
$hxClasses["haxe.ds._Vector.Vector_Impl_"] = haxe_ds__$Vector_Vector_$Impl_$;
haxe_ds__$Vector_Vector_$Impl_$.__name__ = ["haxe","ds","_Vector","Vector_Impl_"];
haxe_ds__$Vector_Vector_$Impl_$.blit = function(src,srcPos,dest,destPos,len) {
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		dest[destPos + i] = src[srcPos + i];
	}
};
haxe_ds__$Vector_Vector_$Impl_$.toArray = function(this1) {
	var a = new Array();
	var len = this1.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		a[i] = this1[i];
	}
	return a;
};
var haxe_io_Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe_io_Bytes(length,a);
};
haxe_io_Bytes.ofString = function(s) {
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
	return new haxe_io_Bytes(a.length,a);
};
haxe_io_Bytes.ofData = function(b) {
	return new haxe_io_Bytes(b.length,b);
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe_io_Error.OutsideBounds;
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
	,__class__: haxe_io_Bytes
};
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = ["haxe","io","Eof"];
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_Path = function(path) {
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
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = ["haxe","io","Path"];
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe_io_Path
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
};
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
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
					if(i != 2) str += "," + js_Boot.__string_rec(o[i],s); else str += js_Boot.__string_rec(o[i],s);
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
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
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
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
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
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
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
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var lets_Easing = function() { };
$hxClasses["lets.Easing"] = lets_Easing;
lets_Easing.__name__ = ["lets","Easing"];
lets_Easing.linear = function(v) {
	return v;
};
lets_Easing.quad = function(v) {
	return v * v;
};
lets_Easing.cubic = function(v) {
	return v * v * v;
};
lets_Easing.quart = function(v) {
	return v * v * v;
};
lets_Easing.quint = function(v) {
	return v * v * v;
};
lets_Easing.sine = function(v) {
	return 1 - Math.cos(v * Math.PI / 2);
};
lets_Easing.circ = function(v) {
	return 1 - Math.sqrt(1 - v * v);
};
lets_Easing.expo = function(v) {
	if(v == 0) return 0; else return Math.pow(2,10 * (v - 1));
};
lets_Easing.back = function(v) {
	var s = 1.70158;
	return v * v * ((s + 1) * v - s);
};
lets_Easing.bounce = function(v) {
	v = 1 - v;
	return 1 - (v < 0.363636363636363646?7.5625 * v * v:v < 0.727272727272727293?7.5625 * (v -= 0.545454545454545414) * v + .75:v < 0.909090909090909061?7.5625 * (v -= 0.818181818181818232) * v + .9375:7.5625 * (v -= 0.954545454545454586) * v + .984375);
};
lets_Easing.elastic = function(v) {
	if(v == 0) return 0;
	if(v == 1) return 1;
	var p = .3;
	var s = p / 4;
	return -(Math.pow(2,10 * (v -= 1)) * Math.sin((v - 0.075) * (2 * Math.PI) / 0.3));
};
lets_Easing.reverse = function(f) {
	return function(v) {
		return 1 - f(1 - v);
	};
};
lets_Easing.reflect = function(f) {
	return function(v) {
		if(v < 0.5) return f(v * 2) / 2; else return 1 - f(2 - v * 2) / 2;
	};
};
var lets_Go = function(target,duration) {
	this._delay = 0;
	this._initTime = 0;
	this._isYoyo = false;
	this._isFrom = false;
	this._props = new haxe_ds_StringMap();
	this._options = { };
	this._easing = lets_Easing.linear;
	this._target = target;
	this._duration = duration * 1000 | 0;
	this._initTime = openfl_Lib.getTimer();
	lets_Go._tweens.push(this);
	haxe_Timer.delay($bind(this,this.init),1);
};
$hxClasses["lets.Go"] = lets_Go;
lets_Go.__name__ = ["lets","Go"];
lets_Go._trigger = null;
lets_Go.to = function(target,duration) {
	var go = new lets_Go(target,duration);
	go._isFrom = false;
	return go;
};
lets_Go.from = function(target,duration) {
	var go = new lets_Go(target,duration);
	go._isFrom = true;
	return go;
};
lets_Go.timer = function(duration) {
	var go = new lets_Go(new openfl_display_Sprite(),duration);
	return go;
};
lets_Go.prototype = {
	x: function(value) {
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
	,delay: function(value) {
		this._delay = value * 1000 | 0;
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
		this._options.onCompleteParams = arr;
		return this;
	}
	,onUpdate: function(func,arr) {
		this._options.onUpdate = func;
		this._options.onUpdateParams = arr;
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
		var framerate = 30;
		if(lets_Go._trigger == null) lets_Go._trigger = new haxe_Timer(1000 / framerate | 0); else lets_Go._trigger = lets_Go._trigger;
		lets_Go._trigger.run = $bind(this,this.onEnterFrameHandler);
	}
	,onEnterFrameHandler: function() {
		if(this._initTime == 0) return;
		if(lets_Go._tweens.length <= 0) {
			lets_Go._trigger.stop();
			lets_Go._trigger.run = null;
		} else {
			var _g1 = 0;
			var _g = lets_Go._tweens.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(lets_Go._tweens[i] != null) lets_Go._tweens[i].update();
			}
		}
	}
	,update: function() {
		if(this._delay > 0) {
			var waitTime = openfl_Lib.getTimer() - this._initTime;
			if(waitTime >= this._delay) {
				this._delay = 0;
				this._initTime = openfl_Lib.getTimer();
			} else return null;
		}
		var progressed = openfl_Lib.getTimer() - this._initTime;
		if(progressed >= this._duration) {
			this.updateProperties(this._duration);
			this.complete();
		} else this.updateProperties(progressed);
	}
	,updateProperties: function(time) {
		if(Reflect.isFunction(this._options.onUpdate)) {
			var func = this._options.onUpdate;
			var arr;
			if(this._options.onUpdateParams != null) arr = this._options.onUpdateParams; else arr = [];
			func.apply(func,arr);
		}
		var $it0 = this._props.keys();
		while( $it0.hasNext() ) {
			var n = $it0.next();
			var range = this._props.get(n);
			Reflect.setProperty(this._target,n,this._easing(time / this._duration) * (range.to - range.from) + range.from);
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
			this._initTime = openfl_Lib.getTimer();
			this._isYoyo = false;
			return null;
		}
		var func = this._options.onComplete;
		var arr;
		if(this._options.onCompleteParams != null) arr = this._options.onCompleteParams; else arr = [];
		this.destroy();
		if(Reflect.isFunction(func)) func.apply(func,arr);
	}
	,destroy: function() {
		if(Lambda.has(lets_Go._tweens,this)) HxOverrides.remove(lets_Go._tweens,this);
		if(this._options) {
			this._easing = lets_Easing.linear;
			this._options = { };
			this._target = null;
			this._props = null;
			this._duration = 0;
			this._initTime = 0;
			this._delay = 0;
		}
	}
	,__class__: lets_Go
};
var lime_AssetCache = function() {
	this.enabled = true;
	this.audio = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.image = new haxe_ds_StringMap();
};
$hxClasses["lime.AssetCache"] = lime_AssetCache;
lime_AssetCache.__name__ = ["lime","AssetCache"];
lime_AssetCache.prototype = {
	clear: function(prefix) {
		if(prefix == null) {
			this.audio = new haxe_ds_StringMap();
			this.font = new haxe_ds_StringMap();
			this.image = new haxe_ds_StringMap();
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
	,__class__: lime_AssetCache
};
var lime_Assets = function() { };
$hxClasses["lime.Assets"] = lime_Assets;
lime_Assets.__name__ = ["lime","Assets"];
lime_Assets.exists = function(id,type) {
	lime_Assets.initialize();
	if(type == null) type = "BINARY";
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) return library.exists(symbolName,type);
	return false;
};
lime_Assets.getAudioBuffer = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.audio.exists(id)) {
		var audio = lime_Assets.cache.audio.get(id);
		if(lime_Assets.isValidAudio(audio)) return audio;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"SOUND")) {
			if(library.isLocal(symbolName,"SOUND")) {
				var audio1 = library.getAudioBuffer(symbolName);
				if(useCache && lime_Assets.cache.enabled) lime_Assets.cache.audio.set(id,audio1);
				return audio1;
			} else haxe_Log.trace("[Assets] Audio asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 115, className : "lime.Assets", methodName : "getAudioBuffer"});
		} else haxe_Log.trace("[Assets] There is no audio asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 121, className : "lime.Assets", methodName : "getAudioBuffer"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 127, className : "lime.Assets", methodName : "getAudioBuffer"});
	return null;
};
lime_Assets.getBytes = function(id) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"BINARY")) {
			if(library.isLocal(symbolName,"BINARY")) return library.getBytes(symbolName); else haxe_Log.trace("[Assets] String or ByteArray asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 164, className : "lime.Assets", methodName : "getBytes"});
		} else haxe_Log.trace("[Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 170, className : "lime.Assets", methodName : "getBytes"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 176, className : "lime.Assets", methodName : "getBytes"});
	return null;
};
lime_Assets.getFont = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.font.exists(id)) return lime_Assets.cache.font.get(id);
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"FONT")) {
			if(library.isLocal(symbolName,"FONT")) {
				var font = library.getFont(symbolName);
				if(useCache && lime_Assets.cache.enabled) lime_Assets.cache.font.set(id,font);
				return font;
			} else haxe_Log.trace("[Assets] Font asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 227, className : "lime.Assets", methodName : "getFont"});
		} else haxe_Log.trace("[Assets] There is no Font asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 233, className : "lime.Assets", methodName : "getFont"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 239, className : "lime.Assets", methodName : "getFont"});
	return null;
};
lime_Assets.getImage = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.image.exists(id)) {
		var image = lime_Assets.cache.image.get(id);
		if(lime_Assets.isValidImage(image)) return image;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			if(library.isLocal(symbolName,"IMAGE")) {
				var image1 = library.getImage(symbolName);
				if(useCache && lime_Assets.cache.enabled) lime_Assets.cache.image.set(id,image1);
				return image1;
			} else haxe_Log.trace("[Assets] Image asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 297, className : "lime.Assets", methodName : "getImage"});
		} else haxe_Log.trace("[Assets] There is no Image asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 303, className : "lime.Assets", methodName : "getImage"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 309, className : "lime.Assets", methodName : "getImage"});
	return null;
};
lime_Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return lime_Assets.libraries.get(name);
};
lime_Assets.getPath = function(id) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,null)) return library.getPath(symbolName); else haxe_Log.trace("[Assets] There is no asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 426, className : "lime.Assets", methodName : "getPath"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 432, className : "lime.Assets", methodName : "getPath"});
	return null;
};
lime_Assets.getText = function(id) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			if(library.isLocal(symbolName,"TEXT")) return library.getText(symbolName); else haxe_Log.trace("[Assets] String asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 469, className : "lime.Assets", methodName : "getText"});
		} else haxe_Log.trace("[Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 475, className : "lime.Assets", methodName : "getText"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 481, className : "lime.Assets", methodName : "getText"});
	return null;
};
lime_Assets.initialize = function() {
	if(!lime_Assets.initialized) {
		lime_Assets.registerLibrary("default",new DefaultAssetLibrary());
		lime_Assets.initialized = true;
	}
};
lime_Assets.isLocal = function(id,type,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled) {
		if(type == "IMAGE" || type == null) {
			if(lime_Assets.cache.image.exists(id)) return true;
		}
		if(type == "FONT" || type == null) {
			if(lime_Assets.cache.font.exists(id)) return true;
		}
		if(type == "SOUND" || type == "MUSIC" || type == null) {
			if(lime_Assets.cache.audio.exists(id)) return true;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) return library.isLocal(symbolName,type);
	return false;
};
lime_Assets.isValidAudio = function(buffer) {
	return buffer != null;
	return true;
};
lime_Assets.isValidImage = function(buffer) {
	return true;
};
lime_Assets.list = function(type) {
	lime_Assets.initialize();
	var items = [];
	var $it0 = lime_Assets.libraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var libraryItems = library.list(type);
		if(libraryItems != null) items = items.concat(libraryItems);
	}
	return items;
};
lime_Assets.loadAudioBuffer = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.audio.exists(id)) {
		var audio = lime_Assets.cache.audio.get(id);
		if(lime_Assets.isValidAudio(audio)) {
			handler(audio);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"SOUND")) {
			if(useCache && lime_Assets.cache.enabled) library.loadAudioBuffer(symbolName,function(audio1) {
				var value = audio1;
				lime_Assets.cache.audio.set(id,value);
				handler(audio1);
			}); else library.loadAudioBuffer(symbolName,handler);
			return;
		} else haxe_Log.trace("[Assets] There is no audio asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 666, className : "lime.Assets", methodName : "loadAudioBuffer"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 672, className : "lime.Assets", methodName : "loadAudioBuffer"});
	handler(null);
};
lime_Assets.loadBytes = function(id,handler) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"BINARY")) {
			library.loadBytes(symbolName,handler);
			return;
		} else haxe_Log.trace("[Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 702, className : "lime.Assets", methodName : "loadBytes"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 708, className : "lime.Assets", methodName : "loadBytes"});
	handler(null);
};
lime_Assets.loadImage = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.image.exists(id)) {
		var image = lime_Assets.cache.image.get(id);
		if(lime_Assets.isValidImage(image)) {
			handler(image);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			if(useCache && lime_Assets.cache.enabled) library.loadImage(symbolName,function(image1) {
				lime_Assets.cache.image.set(id,image1);
				handler(image1);
			}); else library.loadImage(symbolName,handler);
			return;
		} else haxe_Log.trace("[Assets] There is no Image asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 765, className : "lime.Assets", methodName : "loadImage"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 771, className : "lime.Assets", methodName : "loadImage"});
	handler(null);
};
lime_Assets.loadLibrary = function(name,handler) {
	lime_Assets.initialize();
	var data = lime_Assets.getText("libraries/" + name + ".json");
	if(data != null && data != "") {
		var info = JSON.parse(data);
		var library = Type.createInstance(Type.resolveClass(info.type),info.args);
		lime_Assets.libraries.set(name,library);
		library.eventCallback = lime_Assets.library_onEvent;
		library.load(handler);
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + name + "\"",{ fileName : "Assets.hx", lineNumber : 800, className : "lime.Assets", methodName : "loadLibrary"});
};
lime_Assets.loadText = function(id,handler) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			library.loadText(symbolName,handler);
			return;
		} else haxe_Log.trace("[Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 891, className : "lime.Assets", methodName : "loadText"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 897, className : "lime.Assets", methodName : "loadText"});
	handler(null);
};
lime_Assets.registerLibrary = function(name,library) {
	if(lime_Assets.libraries.exists(name)) lime_Assets.unloadLibrary(name);
	if(library != null) library.eventCallback = lime_Assets.library_onEvent;
	lime_Assets.libraries.set(name,library);
};
lime_Assets.unloadLibrary = function(name) {
	lime_Assets.initialize();
	var library = lime_Assets.libraries.get(name);
	if(library != null) {
		lime_Assets.cache.clear(name + ":");
		library.eventCallback = null;
	}
	lime_Assets.libraries.remove(name);
};
lime_Assets.library_onEvent = function(library,type) {
	if(type == "change") lime_Assets.cache.clear();
};
var lime__$Assets_AssetType_$Impl_$ = function() { };
$hxClasses["lime._Assets.AssetType_Impl_"] = lime__$Assets_AssetType_$Impl_$;
lime__$Assets_AssetType_$Impl_$.__name__ = ["lime","_Assets","AssetType_Impl_"];
var lime_app_Module = function() {
};
$hxClasses["lime.app.Module"] = lime_app_Module;
lime_app_Module.__name__ = ["lime","app","Module"];
lime_app_Module.prototype = {
	__class__: lime_app_Module
};
var lime_app__$Application_UpdateEventInfo = function(type,deltaTime) {
	if(deltaTime == null) deltaTime = 0;
	this.type = type;
	this.deltaTime = deltaTime;
};
$hxClasses["lime.app._Application.UpdateEventInfo"] = lime_app__$Application_UpdateEventInfo;
lime_app__$Application_UpdateEventInfo.__name__ = ["lime","app","_Application","UpdateEventInfo"];
lime_app__$Application_UpdateEventInfo.prototype = {
	clone: function() {
		return new lime_app__$Application_UpdateEventInfo(this.type,this.deltaTime);
	}
	,__class__: lime_app__$Application_UpdateEventInfo
};
var lime_app_Event = function() {
	this.listeners = new Array();
	this.priorities = new Array();
	this.repeat = new Array();
};
$hxClasses["lime.app.Event"] = lime_app_Event;
lime_app_Event.__name__ = ["lime","app","Event"];
lime_app_Event.prototype = {
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
	,__class__: lime_app_Event
};
var lime_app_Application = function() {
	lime_app_Module.call(this);
	lime_app_Application.__instance = this;
	this.windows = new Array();
	if(!lime_app_Application.__registered) {
		lime_app_Application.__registered = true;
		lime_audio_AudioManager.init();
	}
};
$hxClasses["lime.app.Application"] = lime_app_Application;
lime_app_Application.__name__ = ["lime","app","Application"];
lime_app_Application.__initialized = null;
lime_app_Application.__instance = null;
lime_app_Application.__registered = null;
lime_app_Application.__dispatch = function() {
	lime_app_Application.__instance.update(lime_app_Application.__eventInfo.deltaTime);
	var listeners = lime_app_Application.onUpdate.listeners;
	var repeat = lime_app_Application.onUpdate.repeat;
	var length = listeners.length;
	var i = 0;
	while(i < length) {
		listeners[i](lime_app_Application.__eventInfo.deltaTime);
		if(!repeat[i]) {
			lime_app_Application.onUpdate.remove(listeners[i]);
			length--;
		} else i++;
	}
};
lime_app_Application.__super__ = lime_app_Module;
lime_app_Application.prototype = $extend(lime_app_Module.prototype,{
	addWindow: function(window) {
		this.windows.push(window);
		window.create(this);
	}
	,create: function(config) {
		this.config = config;
		lime_ui_KeyEventManager.create();
		lime_ui_MouseEventManager.create();
		lime_ui_TouchEventManager.create();
		lime_ui_KeyEventManager.onKeyDown.add($bind(this,this.onKeyDown));
		lime_ui_KeyEventManager.onKeyUp.add($bind(this,this.onKeyUp));
		lime_ui_MouseEventManager.onMouseDown.add($bind(this,this.onMouseDown));
		lime_ui_MouseEventManager.onMouseMove.add($bind(this,this.onMouseMove));
		lime_ui_MouseEventManager.onMouseUp.add($bind(this,this.onMouseUp));
		lime_ui_MouseEventManager.onMouseWheel.add($bind(this,this.onMouseWheel));
		lime_ui_TouchEventManager.onTouchStart.add($bind(this,this.onTouchStart));
		lime_ui_TouchEventManager.onTouchMove.add($bind(this,this.onTouchMove));
		lime_ui_TouchEventManager.onTouchEnd.add($bind(this,this.onTouchEnd));
		lime_graphics_Renderer.onRenderContextLost.add($bind(this,this.onRenderContextLost));
		lime_graphics_Renderer.onRenderContextRestored.add($bind(this,this.onRenderContextRestored));
		lime_ui_Window.onWindowActivate.add($bind(this,this.onWindowActivate));
		lime_ui_Window.onWindowClose.add($bind(this,this.onWindowClose));
		lime_ui_Window.onWindowDeactivate.add($bind(this,this.onWindowDeactivate));
		lime_ui_Window.onWindowFocusIn.add($bind(this,this.onWindowFocusIn));
		lime_ui_Window.onWindowFocusOut.add($bind(this,this.onWindowFocusOut));
		lime_ui_Window.onWindowMove.add($bind(this,this.onWindowMove));
		lime_ui_Window.onWindowResize.add($bind(this,this.onWindowResize));
		var $window = new lime_ui_Window(config);
		var renderer = new lime_graphics_Renderer($window);
		$window.width = config.width;
		$window.height = config.height;
		$window.element = config.element;
		this.addWindow($window);
	}
	,exec: function() {
		
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
		this.__triggerFrame();
		return 0;
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
	,render: function(context) {
	}
	,update: function(deltaTime) {
	}
	,__cleanup: function() {
	}
	,__triggerFrame: function(__) {
		lime_app_Application.__eventInfo.deltaTime = 16;
		lime_app_Application.__dispatch();
		lime_graphics_Renderer.render();
		window.requestAnimationFrame($bind(this,this.__triggerFrame));
	}
	,get_window: function() {
		return this.windows[0];
	}
	,__class__: lime_app_Application
	,__properties__: {get_window:"get_window"}
});
var lime_app__$Application_UpdateEventType_$Impl_$ = function() { };
$hxClasses["lime.app._Application.UpdateEventType_Impl_"] = lime_app__$Application_UpdateEventType_$Impl_$;
lime_app__$Application_UpdateEventType_$Impl_$.__name__ = ["lime","app","_Application","UpdateEventType_Impl_"];
var lime_app_Preloader = function() {
	this.total = 0;
	this.loaded = 0;
};
$hxClasses["lime.app.Preloader"] = lime_app_Preloader;
lime_app_Preloader.__name__ = ["lime","app","Preloader"];
lime_app_Preloader.prototype = {
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
				lime_app_Preloader.images.set(url,image);
				image.onload = $bind(this,this.image_onLoad);
				image.src = url;
				this.total++;
				break;
			case "BINARY":
				var loader = new lime_net_URLLoader();
				loader.set_dataFormat(lime_net_URLLoaderDataFormat.BINARY);
				lime_app_Preloader.loaders.set(url,loader);
				this.total++;
				break;
			case "TEXT":
				var loader1 = new lime_net_URLLoader();
				lime_app_Preloader.loaders.set(url,loader1);
				this.total++;
				break;
			case "FONT":
				this.total++;
				this.loadFont(url);
				break;
			default:
			}
		}
		var $it0 = lime_app_Preloader.loaders.keys();
		while( $it0.hasNext() ) {
			var url1 = $it0.next();
			var loader2 = lime_app_Preloader.loaders.get(url1);
			loader2.onComplete.add($bind(this,this.loader_onComplete));
			loader2.load(new lime_net_URLRequest(url1));
		}
		if(this.total == 0) this.start();
	}
	,loadFont: function(font) {
		var _g = this;
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
	,__class__: lime_app_Preloader
};
var lime_audio_ALAudioContext = function() {
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
$hxClasses["lime.audio.ALAudioContext"] = lime_audio_ALAudioContext;
lime_audio_ALAudioContext.__name__ = ["lime","audio","ALAudioContext"];
lime_audio_ALAudioContext.prototype = {
	bufferData: function(buffer,format,data,size,freq) {
		lime_audio_openal_AL.bufferData(buffer,format,data,size,freq);
	}
	,buffer3f: function(buffer,param,value1,value2,value3) {
		lime_audio_openal_AL.buffer3f(buffer,param,value1,value2,value3);
	}
	,buffer3i: function(buffer,param,value1,value2,value3) {
		lime_audio_openal_AL.buffer3i(buffer,param,value1,value2,value3);
	}
	,bufferf: function(buffer,param,value) {
		lime_audio_openal_AL.bufferf(buffer,param,value);
	}
	,bufferfv: function(buffer,param,values) {
		lime_audio_openal_AL.bufferfv(buffer,param,values);
	}
	,bufferi: function(buffer,param,value) {
		lime_audio_openal_AL.bufferi(buffer,param,value);
	}
	,bufferiv: function(buffer,param,values) {
		lime_audio_openal_AL.bufferiv(buffer,param,values);
	}
	,deleteBuffer: function(buffer) {
		lime_audio_openal_AL.deleteBuffer(buffer);
	}
	,deleteBuffers: function(buffers) {
		lime_audio_openal_AL.deleteBuffers(buffers);
	}
	,deleteSource: function(source) {
		lime_audio_openal_AL.deleteSource(source);
	}
	,deleteSources: function(sources) {
		lime_audio_openal_AL.deleteSources(sources);
	}
	,disable: function(capability) {
		lime_audio_openal_AL.disable(capability);
	}
	,distanceModel: function(distanceModel) {
		lime_audio_openal_AL.distanceModel(distanceModel);
	}
	,dopplerFactor: function(value) {
		lime_audio_openal_AL.dopplerFactor(value);
	}
	,dopplerVelocity: function(value) {
		lime_audio_openal_AL.dopplerVelocity(value);
	}
	,enable: function(capability) {
		lime_audio_openal_AL.enable(capability);
	}
	,genSource: function() {
		return lime_audio_openal_AL.genSource();
	}
	,genSources: function(n) {
		return lime_audio_openal_AL.genSources(n);
	}
	,genBuffer: function() {
		return lime_audio_openal_AL.genBuffer();
	}
	,genBuffers: function(n) {
		return lime_audio_openal_AL.genBuffers(n);
	}
	,getBoolean: function(param) {
		return lime_audio_openal_AL.getBoolean(param);
	}
	,getBooleanv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getBooleanv(param,count);
	}
	,getBuffer3f: function(buffer,param) {
		return lime_audio_openal_AL.getBuffer3f(buffer,param);
	}
	,getBuffer3i: function(buffer,param) {
		return lime_audio_openal_AL.getBuffer3i(buffer,param);
	}
	,getBufferf: function(buffer,param) {
		return lime_audio_openal_AL.getBufferf(buffer,param);
	}
	,getBufferfv: function(buffer,param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getBufferfv(buffer,param,count);
	}
	,getBufferi: function(buffer,param) {
		return lime_audio_openal_AL.getBufferi(buffer,param);
	}
	,getBufferiv: function(buffer,param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getBufferiv(buffer,param,count);
	}
	,getDouble: function(param) {
		return lime_audio_openal_AL.getDouble(param);
	}
	,getDoublev: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getDoublev(param,count);
	}
	,getEnumValue: function(ename) {
		return lime_audio_openal_AL.getEnumValue(ename);
	}
	,getError: function() {
		return lime_audio_openal_AL.getError();
	}
	,getErrorString: function() {
		return lime_audio_openal_AL.getErrorString();
	}
	,getFloat: function(param) {
		return lime_audio_openal_AL.getFloat(param);
	}
	,getFloatv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getFloatv(param,count);
	}
	,getInteger: function(param) {
		return lime_audio_openal_AL.getInteger(param);
	}
	,getIntegerv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getIntegerv(param,count);
	}
	,getListener3f: function(param) {
		return lime_audio_openal_AL.getListener3f(param);
	}
	,getListener3i: function(param) {
		return lime_audio_openal_AL.getListener3i(param);
	}
	,getListenerf: function(param) {
		return lime_audio_openal_AL.getListenerf(param);
	}
	,getListenerfv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getListenerfv(param,count);
	}
	,getListeneri: function(param) {
		return lime_audio_openal_AL.getListeneri(param);
	}
	,getListeneriv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getListeneriv(param,count);
	}
	,getProcAddress: function(fname) {
		return lime_audio_openal_AL.getProcAddress(fname);
	}
	,getSource3f: function(source,param) {
		return lime_audio_openal_AL.getSource3f(source,param);
	}
	,getSourcef: function(source,param) {
		return lime_audio_openal_AL.getSourcef(source,param);
	}
	,getSource3i: function(source,param) {
		return lime_audio_openal_AL.getSource3i(source,param);
	}
	,getSourcefv: function(source,param) {
		return lime_audio_openal_AL.getSourcefv(source,param);
	}
	,getSourcei: function(source,param) {
		return lime_audio_openal_AL.getSourcei(source,param);
	}
	,getSourceiv: function(source,param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getSourceiv(source,param,count);
	}
	,getString: function(param) {
		return lime_audio_openal_AL.getString(param);
	}
	,isBuffer: function(buffer) {
		return lime_audio_openal_AL.isBuffer(buffer);
	}
	,isEnabled: function(capability) {
		return lime_audio_openal_AL.isEnabled(capability);
	}
	,isExtensionPresent: function(extname) {
		return lime_audio_openal_AL.isExtensionPresent(extname);
	}
	,isSource: function(source) {
		return lime_audio_openal_AL.isSource(source);
	}
	,listener3f: function(param,value1,value2,value3) {
		lime_audio_openal_AL.listener3f(param,value1,value2,value3);
	}
	,listener3i: function(param,value1,value2,value3) {
		lime_audio_openal_AL.listener3i(param,value1,value2,value3);
	}
	,listenerf: function(param,value) {
		lime_audio_openal_AL.listenerf(param,value);
	}
	,listenerfv: function(param,values) {
		lime_audio_openal_AL.listenerfv(param,values);
	}
	,listeneri: function(param,value) {
		lime_audio_openal_AL.listeneri(param,value);
	}
	,listeneriv: function(param,values) {
		lime_audio_openal_AL.listeneriv(param,values);
	}
	,source3f: function(source,param,value1,value2,value3) {
		lime_audio_openal_AL.source3f(source,param,value1,value2,value3);
	}
	,source3i: function(source,param,value1,value2,value3) {
		lime_audio_openal_AL.source3i(source,param,value1,value2,value3);
	}
	,sourcef: function(source,param,value) {
		lime_audio_openal_AL.sourcef(source,param,value);
	}
	,sourcefv: function(source,param,values) {
		lime_audio_openal_AL.sourcefv(source,param,values);
	}
	,sourcei: function(source,param,value) {
		lime_audio_openal_AL.sourcei(source,param,value);
	}
	,sourceiv: function(source,param,values) {
		lime_audio_openal_AL.sourceiv(source,param,values);
	}
	,sourcePlay: function(source) {
		lime_audio_openal_AL.sourcePlay(source);
	}
	,sourcePlayv: function(sources) {
		lime_audio_openal_AL.sourcePlayv(sources);
	}
	,sourceStop: function(source) {
		lime_audio_openal_AL.sourceStop(source);
	}
	,sourceStopv: function(sources) {
		lime_audio_openal_AL.sourceStopv(sources);
	}
	,sourceRewind: function(source) {
		lime_audio_openal_AL.sourceRewind(source);
	}
	,sourceRewindv: function(sources) {
		lime_audio_openal_AL.sourceRewindv(sources);
	}
	,sourcePause: function(source) {
		lime_audio_openal_AL.sourcePause(source);
	}
	,sourcePausev: function(sources) {
		lime_audio_openal_AL.sourcePausev(sources);
	}
	,sourceQueueBuffer: function(source,buffer) {
		lime_audio_openal_AL.sourceQueueBuffer(source,buffer);
	}
	,sourceQueueBuffers: function(source,nb,buffers) {
		lime_audio_openal_AL.sourceQueueBuffers(source,nb,buffers);
	}
	,sourceUnqueueBuffer: function(source) {
		return lime_audio_openal_AL.sourceUnqueueBuffer(source);
	}
	,sourceUnqueueBuffers: function(source,nb) {
		return lime_audio_openal_AL.sourceUnqueueBuffers(source,nb);
	}
	,speedOfSound: function(value) {
		lime_audio_openal_AL.speedOfSound(value);
	}
	,__class__: lime_audio_ALAudioContext
};
var lime_audio_ALCAudioContext = function() {
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
$hxClasses["lime.audio.ALCAudioContext"] = lime_audio_ALCAudioContext;
lime_audio_ALCAudioContext.__name__ = ["lime","audio","ALCAudioContext"];
lime_audio_ALCAudioContext.prototype = {
	closeDevice: function(device) {
		return lime_audio_openal_ALC.closeDevice(device);
	}
	,createContext: function(device,attrlist) {
		return lime_audio_openal_ALC.createContext(device,attrlist);
	}
	,destroyContext: function(context) {
		lime_audio_openal_ALC.destroyContext(context);
	}
	,getContextsDevice: function(context) {
		return lime_audio_openal_ALC.getContextsDevice(context);
	}
	,getCurrentContext: function() {
		return lime_audio_openal_ALC.getCurrentContext();
	}
	,getError: function(device) {
		return lime_audio_openal_ALC.getError(device);
	}
	,getErrorString: function(device) {
		return lime_audio_openal_ALC.getErrorString(device);
	}
	,getIntegerv: function(device,param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_ALC.getIntegerv(device,param,count);
	}
	,getString: function(device,param) {
		return lime_audio_openal_ALC.getString(device,param);
	}
	,makeContextCurrent: function(context) {
		return lime_audio_openal_ALC.makeContextCurrent(context);
	}
	,openDevice: function(deviceName) {
		return lime_audio_openal_ALC.openDevice(deviceName);
	}
	,processContext: function(context) {
		lime_audio_openal_ALC.processContext(context);
	}
	,suspendContext: function(context) {
		lime_audio_openal_ALC.suspendContext(context);
	}
	,__class__: lime_audio_ALCAudioContext
};
var lime_audio_AudioBuffer = function() {
	this.id = 0;
};
$hxClasses["lime.audio.AudioBuffer"] = lime_audio_AudioBuffer;
lime_audio_AudioBuffer.__name__ = ["lime","audio","AudioBuffer"];
lime_audio_AudioBuffer.fromBytes = function(bytes) {
	return null;
};
lime_audio_AudioBuffer.fromFile = function(path) {
	return null;
};
lime_audio_AudioBuffer.fromURL = function(url,handler) {
};
lime_audio_AudioBuffer.prototype = {
	dispose: function() {
	}
	,__class__: lime_audio_AudioBuffer
};
var lime_audio_AudioContext = $hxClasses["lime.audio.AudioContext"] = { __ename__ : true, __constructs__ : ["OPENAL","HTML5","WEB","FLASH","CUSTOM"] };
lime_audio_AudioContext.OPENAL = function(alc,al) { var $x = ["OPENAL",0,alc,al]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.HTML5 = function(context) { var $x = ["HTML5",1,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.WEB = function(context) { var $x = ["WEB",2,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.FLASH = function(context) { var $x = ["FLASH",3,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
var lime_audio_AudioManager = function() { };
$hxClasses["lime.audio.AudioManager"] = lime_audio_AudioManager;
lime_audio_AudioManager.__name__ = ["lime","audio","AudioManager"];
lime_audio_AudioManager.context = null;
lime_audio_AudioManager.init = function(context) {
	if(context == null) try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;;
		lime_audio_AudioManager.context = lime_audio_AudioContext.WEB(new AudioContext ());
	} catch( e ) {
		lime_audio_AudioManager.context = lime_audio_AudioContext.HTML5(new lime_audio_HTML5AudioContext());
	} else lime_audio_AudioManager.context = context;
};
lime_audio_AudioManager.resume = function() {
	if(lime_audio_AudioManager.context != null) {
		var _g = lime_audio_AudioManager.context;
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
lime_audio_AudioManager.shutdown = function() {
	if(lime_audio_AudioManager.context != null) {
		var _g = lime_audio_AudioManager.context;
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
lime_audio_AudioManager.suspend = function() {
	if(lime_audio_AudioManager.context != null) {
		var _g = lime_audio_AudioManager.context;
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
var lime_audio_AudioSource = function(buffer) {
	this.onComplete = new lime_app_Event();
	this.buffer = buffer;
	this.id = 0;
	this.pauseTime = 0;
	if(buffer != null) this.init();
};
$hxClasses["lime.audio.AudioSource"] = lime_audio_AudioSource;
lime_audio_AudioSource.__name__ = ["lime","audio","AudioSource"];
lime_audio_AudioSource.prototype = {
	init: function() {
		{
			var _g = lime_audio_AudioManager.context;
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
		return value;
	}
	,get_timeOffset: function() {
		return 0;
	}
	,set_timeOffset: function(value) {
		return value;
	}
	,__class__: lime_audio_AudioSource
	,__properties__: {set_timeOffset:"set_timeOffset",get_timeOffset:"get_timeOffset",set_gain:"set_gain",get_gain:"get_gain"}
};
var lime_audio_FlashAudioContext = function() {
};
$hxClasses["lime.audio.FlashAudioContext"] = lime_audio_FlashAudioContext;
lime_audio_FlashAudioContext.__name__ = ["lime","audio","FlashAudioContext"];
lime_audio_FlashAudioContext.prototype = {
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
	,__class__: lime_audio_FlashAudioContext
};
var lime_audio_HTML5AudioContext = function() {
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
$hxClasses["lime.audio.HTML5AudioContext"] = lime_audio_HTML5AudioContext;
lime_audio_HTML5AudioContext.__name__ = ["lime","audio","HTML5AudioContext"];
lime_audio_HTML5AudioContext.prototype = {
	canPlayType: function(buffer,type) {
		if(buffer.src != null) return buffer.src.canPlayType(type);
		return null;
	}
	,createBuffer: function(urlString) {
		var buffer = new lime_audio_AudioBuffer();
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
	,__class__: lime_audio_HTML5AudioContext
};
var lime_audio_openal_AL = function() { };
$hxClasses["lime.audio.openal.AL"] = lime_audio_openal_AL;
lime_audio_openal_AL.__name__ = ["lime","audio","openal","AL"];
lime_audio_openal_AL.bufferData = function(buffer,format,data,size,freq) {
};
lime_audio_openal_AL.buffer3f = function(buffer,param,value1,value2,value3) {
};
lime_audio_openal_AL.buffer3i = function(buffer,param,value1,value2,value3) {
};
lime_audio_openal_AL.bufferf = function(buffer,param,value) {
};
lime_audio_openal_AL.bufferfv = function(buffer,param,values) {
};
lime_audio_openal_AL.bufferi = function(buffer,param,value) {
};
lime_audio_openal_AL.bufferiv = function(buffer,param,values) {
};
lime_audio_openal_AL.deleteBuffer = function(buffer) {
};
lime_audio_openal_AL.deleteBuffers = function(buffers) {
};
lime_audio_openal_AL.deleteSource = function(source) {
};
lime_audio_openal_AL.deleteSources = function(sources) {
};
lime_audio_openal_AL.disable = function(capability) {
};
lime_audio_openal_AL.distanceModel = function(distanceModel) {
};
lime_audio_openal_AL.dopplerFactor = function(value) {
};
lime_audio_openal_AL.dopplerVelocity = function(value) {
};
lime_audio_openal_AL.enable = function(capability) {
};
lime_audio_openal_AL.genSource = function() {
	return 0;
};
lime_audio_openal_AL.genSources = function(n) {
	return null;
};
lime_audio_openal_AL.genBuffer = function() {
	return 0;
};
lime_audio_openal_AL.genBuffers = function(n) {
	return null;
};
lime_audio_openal_AL.getBoolean = function(param) {
	return false;
};
lime_audio_openal_AL.getBooleanv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getBuffer3f = function(buffer,param) {
	return null;
};
lime_audio_openal_AL.getBuffer3i = function(buffer,param) {
	return null;
};
lime_audio_openal_AL.getBufferf = function(buffer,param) {
	return 0;
};
lime_audio_openal_AL.getBufferfv = function(buffer,param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getBufferi = function(buffer,param) {
	return 0;
};
lime_audio_openal_AL.getBufferiv = function(buffer,param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getDouble = function(param) {
	return 0;
};
lime_audio_openal_AL.getDoublev = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getEnumValue = function(ename) {
	return 0;
};
lime_audio_openal_AL.getError = function() {
	return 0;
};
lime_audio_openal_AL.getErrorString = function() {
	var _g = lime_audio_openal_AL.getError();
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
lime_audio_openal_AL.getFloat = function(param) {
	return 0;
};
lime_audio_openal_AL.getFloatv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getInteger = function(param) {
	return 0;
};
lime_audio_openal_AL.getIntegerv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getListener3f = function(param) {
	return null;
};
lime_audio_openal_AL.getListener3i = function(param) {
	return null;
};
lime_audio_openal_AL.getListenerf = function(param) {
	return 0;
};
lime_audio_openal_AL.getListenerfv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getListeneri = function(param) {
	return 0;
};
lime_audio_openal_AL.getListeneriv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getProcAddress = function(fname) {
	return null;
};
lime_audio_openal_AL.getSource3f = function(source,param) {
	return null;
};
lime_audio_openal_AL.getSourcef = function(source,param) {
	return 0;
};
lime_audio_openal_AL.getSource3i = function(source,param) {
	return null;
};
lime_audio_openal_AL.getSourcefv = function(source,param) {
	return null;
};
lime_audio_openal_AL.getSourcei = function(source,param) {
	return 0;
};
lime_audio_openal_AL.getSourceiv = function(source,param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getString = function(param) {
	return null;
};
lime_audio_openal_AL.isBuffer = function(buffer) {
	return false;
};
lime_audio_openal_AL.isEnabled = function(capability) {
	return false;
};
lime_audio_openal_AL.isExtensionPresent = function(extname) {
	return false;
};
lime_audio_openal_AL.isSource = function(source) {
	return false;
};
lime_audio_openal_AL.listener3f = function(param,value1,value2,value3) {
};
lime_audio_openal_AL.listener3i = function(param,value1,value2,value3) {
};
lime_audio_openal_AL.listenerf = function(param,value) {
};
lime_audio_openal_AL.listenerfv = function(param,values) {
};
lime_audio_openal_AL.listeneri = function(param,value) {
};
lime_audio_openal_AL.listeneriv = function(param,values) {
};
lime_audio_openal_AL.source3f = function(source,param,value1,value2,value3) {
};
lime_audio_openal_AL.source3i = function(source,param,value1,value2,value3) {
};
lime_audio_openal_AL.sourcef = function(source,param,value) {
};
lime_audio_openal_AL.sourcefv = function(source,param,values) {
};
lime_audio_openal_AL.sourcei = function(source,param,value) {
};
lime_audio_openal_AL.sourceiv = function(source,param,values) {
};
lime_audio_openal_AL.sourcePlay = function(source) {
};
lime_audio_openal_AL.sourcePlayv = function(sources) {
};
lime_audio_openal_AL.sourceStop = function(source) {
};
lime_audio_openal_AL.sourceStopv = function(sources) {
};
lime_audio_openal_AL.sourceRewind = function(source) {
};
lime_audio_openal_AL.sourceRewindv = function(sources) {
};
lime_audio_openal_AL.sourcePause = function(source) {
};
lime_audio_openal_AL.sourcePausev = function(sources) {
};
lime_audio_openal_AL.sourceQueueBuffer = function(source,buffer) {
};
lime_audio_openal_AL.sourceQueueBuffers = function(source,nb,buffers) {
};
lime_audio_openal_AL.sourceUnqueueBuffer = function(source) {
	return 0;
};
lime_audio_openal_AL.sourceUnqueueBuffers = function(source,nb) {
	return null;
};
lime_audio_openal_AL.speedOfSound = function(value) {
};
var lime_audio_openal_ALC = function() { };
$hxClasses["lime.audio.openal.ALC"] = lime_audio_openal_ALC;
lime_audio_openal_ALC.__name__ = ["lime","audio","openal","ALC"];
lime_audio_openal_ALC.closeDevice = function(device) {
	return false;
};
lime_audio_openal_ALC.createContext = function(device,attrlist) {
	return null;
};
lime_audio_openal_ALC.destroyContext = function(context) {
};
lime_audio_openal_ALC.getContextsDevice = function(context) {
	return null;
};
lime_audio_openal_ALC.getCurrentContext = function() {
	return null;
};
lime_audio_openal_ALC.getError = function(device) {
	return 0;
};
lime_audio_openal_ALC.getErrorString = function(device) {
	var _g = lime_audio_openal_ALC.getError(device);
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
lime_audio_openal_ALC.getIntegerv = function(device,param,size) {
	return null;
};
lime_audio_openal_ALC.getString = function(device,param) {
	return null;
};
lime_audio_openal_ALC.makeContextCurrent = function(context) {
	return false;
};
lime_audio_openal_ALC.openDevice = function(deviceName) {
	return null;
};
lime_audio_openal_ALC.processContext = function(context) {
};
lime_audio_openal_ALC.suspendContext = function(context) {
};
var lime_audio_openal__$ALContext_ALContext_$Impl_$ = function() { };
$hxClasses["lime.audio.openal._ALContext.ALContext_Impl_"] = lime_audio_openal__$ALContext_ALContext_$Impl_$;
lime_audio_openal__$ALContext_ALContext_$Impl_$.__name__ = ["lime","audio","openal","_ALContext","ALContext_Impl_"];
lime_audio_openal__$ALContext_ALContext_$Impl_$._new = function(handle) {
	return handle;
};
var lime_audio_openal__$ALDevice_ALDevice_$Impl_$ = function() { };
$hxClasses["lime.audio.openal._ALDevice.ALDevice_Impl_"] = lime_audio_openal__$ALDevice_ALDevice_$Impl_$;
lime_audio_openal__$ALDevice_ALDevice_$Impl_$.__name__ = ["lime","audio","openal","_ALDevice","ALDevice_Impl_"];
lime_audio_openal__$ALDevice_ALDevice_$Impl_$._new = function(handle) {
	return handle;
};
var lime_graphics_FlashRenderContext = function() {
};
$hxClasses["lime.graphics.FlashRenderContext"] = lime_graphics_FlashRenderContext;
lime_graphics_FlashRenderContext.__name__ = ["lime","graphics","FlashRenderContext"];
lime_graphics_FlashRenderContext.prototype = {
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
	,__class__: lime_graphics_FlashRenderContext
};
var lime_graphics_Font = function(fontName) {
	this.fontName = fontName;
	this.glyphs = new haxe_ds_IntMap();
};
$hxClasses["lime.graphics.Font"] = lime_graphics_Font;
lime_graphics_Font.__name__ = ["lime","graphics","Font"];
lime_graphics_Font.fromBytes = function(bytes) {
	var font = new lime_graphics_Font();
	return font;
};
lime_graphics_Font.fromFile = function(path) {
	var font = new lime_graphics_Font();
	font.__fromFile(path);
	return font;
};
lime_graphics_Font.prototype = {
	createImage: function() {
		this.glyphs = new haxe_ds_IntMap();
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
	,__class__: lime_graphics_Font
};
var lime_graphics_GlyphRect = function(x,y,width,height,xOffset,yOffset) {
	if(yOffset == null) yOffset = 0;
	if(xOffset == null) xOffset = 0;
	this.x = x;
	this.y = y;
	this.xOffset = xOffset;
	this.yOffset = yOffset;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.graphics.GlyphRect"] = lime_graphics_GlyphRect;
lime_graphics_GlyphRect.__name__ = ["lime","graphics","GlyphRect"];
lime_graphics_GlyphRect.prototype = {
	__class__: lime_graphics_GlyphRect
};
var lime_graphics_Image = function(buffer,offsetX,offsetY,width,height,color,type) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.width = width;
	this.height = height;
	if(type == null) {
		if(lime_app_Application.__instance != null && lime_app_Application.__instance.windows != null && lime_app_Application.__instance.windows[0].currentRenderer != null) {
			var _g = lime_app_Application.__instance.windows[0].currentRenderer.context;
			switch(_g[1]) {
			case 2:case 1:
				this.type = lime_graphics_ImageType.CANVAS;
				break;
			case 3:
				this.type = lime_graphics_ImageType.FLASH;
				break;
			default:
				this.type = lime_graphics_ImageType.DATA;
			}
		} else this.type = lime_graphics_ImageType.DATA;
	} else this.type = type;
	if(buffer == null) {
		if(width > 0 && height > 0) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 0:
				this.buffer = new lime_graphics_ImageBuffer(null,width,height);
				lime_graphics_utils_ImageCanvasUtil.createCanvas(this,width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 1:
				this.buffer = new lime_graphics_ImageBuffer(new Uint8Array(width * height * 4),width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 2:
				break;
			default:
			}
		}
	} else this.__fromImageBuffer(buffer);
};
$hxClasses["lime.graphics.Image"] = lime_graphics_Image;
lime_graphics_Image.__name__ = ["lime","graphics","Image"];
lime_graphics_Image.__base64Encoder = null;
lime_graphics_Image.fromBase64 = function(base64,type,onload) {
	var image = new lime_graphics_Image();
	image.__fromBase64(base64,type,onload);
	return image;
};
lime_graphics_Image.fromBitmapData = function(bitmapData) {
	var buffer = new lime_graphics_ImageBuffer(null,bitmapData.width,bitmapData.height);
	buffer.__srcBitmapData = bitmapData;
	return new lime_graphics_Image(buffer);
};
lime_graphics_Image.fromBytes = function(bytes,onload) {
	var image = new lime_graphics_Image();
	image.__fromBytes(bytes,onload);
	return image;
};
lime_graphics_Image.fromCanvas = function(canvas) {
	var buffer = new lime_graphics_ImageBuffer(null,canvas.width,canvas.height);
	buffer.set_src(canvas);
	return new lime_graphics_Image(buffer);
};
lime_graphics_Image.fromFile = function(path,onload,onerror) {
	var image = new lime_graphics_Image();
	image.__fromFile(path,onload,onerror);
	return image;
};
lime_graphics_Image.fromImageElement = function(image) {
	var buffer = new lime_graphics_ImageBuffer(null,image.width,image.height);
	buffer.set_src(image);
	return new lime_graphics_Image(buffer);
};
lime_graphics_Image.__base64Encode = function(bytes) {
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
	if(lime_graphics_Image.__base64Encoder == null) lime_graphics_Image.__base64Encoder = new haxe_crypto_BaseCode(haxe_io_Bytes.ofString(lime_graphics_Image.__base64Chars));
	return lime_graphics_Image.__base64Encoder.encodeBytes(haxe_io_Bytes.ofData(bytes.byteView)).toString() + extension;
};
lime_graphics_Image.__isJPG = function(bytes) {
	bytes.position = 0;
	return bytes.readUnsignedByte() == 255 && bytes.readUnsignedByte() == 216;
};
lime_graphics_Image.__isPNG = function(bytes) {
	bytes.position = 0;
	return bytes.readUnsignedByte() == 137 && bytes.readUnsignedByte() == 80 && bytes.readUnsignedByte() == 78 && bytes.readUnsignedByte() == 71 && bytes.readUnsignedByte() == 13 && bytes.readUnsignedByte() == 10 && bytes.readUnsignedByte() == 26 && bytes.readUnsignedByte() == 10;
};
lime_graphics_Image.__isGIF = function(bytes) {
	bytes.position = 0;
	if(bytes.readUnsignedByte() == 71 && bytes.readUnsignedByte() == 73 && bytes.readUnsignedByte() == 70 && bytes.readUnsignedByte() == 56) {
		var b = bytes.readUnsignedByte();
		return (b == 55 || b == 57) && bytes.readUnsignedByte() == 97;
	}
	return false;
};
lime_graphics_Image.prototype = {
	clone: function() {
		lime_graphics_utils_ImageCanvasUtil.sync(this);
		var image = new lime_graphics_Image(this.buffer.clone(),this.offsetX,this.offsetY,this.width,this.height,null,this.type);
		return image;
	}
	,colorTransform: function(rect,colorMatrix) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.colorTransform(this,rect,colorMatrix);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.colorTransform(this,rect,colorMatrix);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.colorTransform(rect.__toFlashRectangle(),lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__toFlashColorTransform(colorMatrix));
			break;
		default:
		}
	}
	,copyChannel: function(sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
		sourceRect = this.__clipRect(sourceRect);
		if(this.buffer == null || sourceRect == null) return;
		if(destChannel == lime_graphics_ImageChannel.ALPHA && !this.get_transparent()) return;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceImage.width) sourceRect.width = sourceImage.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceImage.height) sourceRect.height = sourceImage.height - sourceRect.y;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
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
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
			lime_graphics_utils_ImageCanvasUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageCanvasUtil.convertToData(sourceImage);
			lime_graphics_utils_ImageDataUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
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
			lime_graphics_utils_ImageCanvasUtil.fillRect(this,rect,color);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.fillRect(this,rect,color);
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
			lime_graphics_utils_ImageCanvasUtil.floodFill(this,x,y,color);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.floodFill(this,x,y,color);
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
			return lime_graphics_utils_ImageCanvasUtil.getPixel(this,x,y);
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			return lime_graphics_utils_ImageDataUtil.getPixel(this,x,y);
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
			return lime_graphics_utils_ImageCanvasUtil.getPixel32(this,x,y);
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			return lime_graphics_utils_ImageDataUtil.getPixel32(this,x,y);
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
			return lime_graphics_utils_ImageCanvasUtil.getPixels(this,rect);
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			return lime_graphics_utils_ImageDataUtil.getPixels(this,rect);
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			return this.buffer.__srcBitmapData.getPixels(rect.__toFlashRectangle());
		default:
			return null;
		}
	}
	,resize: function(newWidth,newHeight) {
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.resize(this,newWidth,newHeight);
			break;
		case 1:
			lime_graphics_utils_ImageDataUtil.resize(this,newWidth,newHeight);
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
			lime_graphics_utils_ImageCanvasUtil.setPixel(this,x,y,color);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.setPixel(this,x,y,color);
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
			lime_graphics_utils_ImageCanvasUtil.setPixel32(this,x,y,color);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.setPixel32(this,x,y,color);
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
			lime_graphics_utils_ImageCanvasUtil.setPixels(this,rect,byteArray);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.setPixels(this,rect,byteArray);
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
			_g.buffer = new lime_graphics_ImageBuffer(null,image.width,image.height);
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
		if(lime_graphics_Image.__isPNG(bytes)) type = "image/png"; else if(lime_graphics_Image.__isJPG(bytes)) type = "image/jpeg"; else if(lime_graphics_Image.__isGIF(bytes)) type = "image/gif"; else throw "Image tried to read a PNG/JPG ByteArray, but found an invalid header.";
		this.__fromBase64(lime_graphics_Image.__base64Encode(bytes),type,onload);
	}
	,__fromFile: function(path,onload,onerror) {
		var _g = this;
		var image = new Image();
		image.onload = function(_) {
			_g.buffer = new lime_graphics_ImageBuffer(null,image.width,image.height);
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
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
			lime_graphics_utils_ImageCanvasUtil.createImageData(this);
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
				lime_graphics_utils_ImageDataUtil.resizeBuffer(this,newWidth,newHeight);
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
				lime_graphics_utils_ImageCanvasUtil.convertToData(this);
				lime_graphics_utils_ImageDataUtil.multiplyAlpha(this);
				break;
			default:
			}
		} else if(!value && this.buffer.premultiplied) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 1:
				lime_graphics_utils_ImageCanvasUtil.convertToData(this);
				lime_graphics_utils_ImageDataUtil.unmultiplyAlpha(this);
				break;
			default:
			}
		}
		return value;
	}
	,get_rect: function() {
		return new lime_math_Rectangle(0,0,this.width,this.height);
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
	,__class__: lime_graphics_Image
	,__properties__: {set_transparent:"set_transparent",get_transparent:"get_transparent",set_src:"set_src",get_src:"get_src",get_rect:"get_rect",set_premultiplied:"set_premultiplied",get_premultiplied:"get_premultiplied",set_powerOfTwo:"set_powerOfTwo",get_powerOfTwo:"get_powerOfTwo",set_data:"set_data",get_data:"get_data"}
};
var lime_graphics_ImageChannel = $hxClasses["lime.graphics.ImageChannel"] = { __ename__ : true, __constructs__ : ["RED","GREEN","BLUE","ALPHA"] };
lime_graphics_ImageChannel.RED = ["RED",0];
lime_graphics_ImageChannel.RED.toString = $estr;
lime_graphics_ImageChannel.RED.__enum__ = lime_graphics_ImageChannel;
lime_graphics_ImageChannel.GREEN = ["GREEN",1];
lime_graphics_ImageChannel.GREEN.toString = $estr;
lime_graphics_ImageChannel.GREEN.__enum__ = lime_graphics_ImageChannel;
lime_graphics_ImageChannel.BLUE = ["BLUE",2];
lime_graphics_ImageChannel.BLUE.toString = $estr;
lime_graphics_ImageChannel.BLUE.__enum__ = lime_graphics_ImageChannel;
lime_graphics_ImageChannel.ALPHA = ["ALPHA",3];
lime_graphics_ImageChannel.ALPHA.toString = $estr;
lime_graphics_ImageChannel.ALPHA.__enum__ = lime_graphics_ImageChannel;
var lime_graphics_ImageBuffer = function(data,width,height,bitsPerPixel) {
	if(bitsPerPixel == null) bitsPerPixel = 4;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.data = data;
	this.width = width;
	this.height = height;
	this.bitsPerPixel = bitsPerPixel;
	this.transparent = true;
};
$hxClasses["lime.graphics.ImageBuffer"] = lime_graphics_ImageBuffer;
lime_graphics_ImageBuffer.__name__ = ["lime","graphics","ImageBuffer"];
lime_graphics_ImageBuffer.prototype = {
	clone: function() {
		var buffer = new lime_graphics_ImageBuffer(this.data,this.width,this.height,this.bitsPerPixel);
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
		if(js_Boot.__instanceof(value,Image)) this.__srcImage = value; else if(js_Boot.__instanceof(value,HTMLCanvasElement)) {
			this.__srcCanvas = value;
			this.__srcContext = this.__srcCanvas.getContext("2d");
		}
		return value;
	}
	,__class__: lime_graphics_ImageBuffer
	,__properties__: {set_src:"set_src",get_src:"get_src"}
};
var lime_graphics_ImageType = $hxClasses["lime.graphics.ImageType"] = { __ename__ : true, __constructs__ : ["CANVAS","DATA","FLASH","CUSTOM"] };
lime_graphics_ImageType.CANVAS = ["CANVAS",0];
lime_graphics_ImageType.CANVAS.toString = $estr;
lime_graphics_ImageType.CANVAS.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.DATA = ["DATA",1];
lime_graphics_ImageType.DATA.toString = $estr;
lime_graphics_ImageType.DATA.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.FLASH = ["FLASH",2];
lime_graphics_ImageType.FLASH.toString = $estr;
lime_graphics_ImageType.FLASH.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.CUSTOM = ["CUSTOM",3];
lime_graphics_ImageType.CUSTOM.toString = $estr;
lime_graphics_ImageType.CUSTOM.__enum__ = lime_graphics_ImageType;
var lime_graphics_RenderContext = $hxClasses["lime.graphics.RenderContext"] = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CUSTOM"] };
lime_graphics_RenderContext.OPENGL = function(gl) { var $x = ["OPENGL",0,gl]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CANVAS = function(context) { var $x = ["CANVAS",1,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.DOM = function(element) { var $x = ["DOM",2,element]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.FLASH = function(stage) { var $x = ["FLASH",3,stage]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
var lime_graphics__$Renderer_RenderEventInfo = function(type,context) {
	this.type = type;
	this.context = context;
};
$hxClasses["lime.graphics._Renderer.RenderEventInfo"] = lime_graphics__$Renderer_RenderEventInfo;
lime_graphics__$Renderer_RenderEventInfo.__name__ = ["lime","graphics","_Renderer","RenderEventInfo"];
lime_graphics__$Renderer_RenderEventInfo.prototype = {
	clone: function() {
		return new lime_graphics__$Renderer_RenderEventInfo(this.type,this.context);
	}
	,__class__: lime_graphics__$Renderer_RenderEventInfo
};
var lime_graphics_Renderer = function(window) {
	this.window = window;
	this.window.currentRenderer = this;
};
$hxClasses["lime.graphics.Renderer"] = lime_graphics_Renderer;
lime_graphics_Renderer.__name__ = ["lime","graphics","Renderer"];
lime_graphics_Renderer.registered = null;
lime_graphics_Renderer.render = function() {
	lime_graphics_Renderer.eventInfo.type = 0;
	var _g = 0;
	var _g1 = lime_app_Application.__instance.windows;
	while(_g < _g1.length) {
		var $window = _g1[_g];
		++_g;
		if($window.currentRenderer != null) $window.currentRenderer.dispatch();
	}
};
lime_graphics_Renderer.prototype = {
	create: function() {
		this.createContext();
		{
			var _g = this.context;
			switch(_g[1]) {
			case 0:
				this.window.canvas.addEventListener("webglcontextlost",$bind(this,this.handleCanvasEvent),false);
				this.window.canvas.addEventListener("webglcontextrestored",$bind(this,this.handleCanvasEvent),false);
				break;
			default:
			}
		}
		if(!lime_graphics_Renderer.registered) lime_graphics_Renderer.registered = true;
	}
	,createContext: function() {
		if(this.window.div != null) this.context = lime_graphics_RenderContext.DOM(this.window.div); else if(this.window.canvas != null) {
			var webgl = null;
			if(webgl == null) this.context = lime_graphics_RenderContext.CANVAS(this.window.canvas.getContext("2d")); else {
				lime_graphics_opengl_GL.context = webgl;
				this.context = lime_graphics_RenderContext.OPENGL(lime_graphics_opengl_GL.context);
			}
		}
	}
	,dispatch: function() {
		var _g = lime_graphics_Renderer.eventInfo.type;
		switch(_g) {
		case 0:
			if(!lime_app_Application.__initialized) {
				lime_app_Application.__initialized = true;
				lime_app_Application.__instance.init(this.context);
			}
			lime_app_Application.__instance.render(this.context);
			var listeners = lime_graphics_Renderer.onRender.listeners;
			var repeat = lime_graphics_Renderer.onRender.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](this.context);
				if(!repeat[i]) {
					lime_graphics_Renderer.onRender.remove(listeners[i]);
					length--;
				} else i++;
			}
			this.flip();
			break;
		case 1:
			this.context = null;
			var listeners1 = lime_graphics_Renderer.onRenderContextLost.listeners;
			var repeat1 = lime_graphics_Renderer.onRenderContextLost.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1]();
				if(!repeat1[i1]) {
					lime_graphics_Renderer.onRenderContextLost.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		case 2:
			this.createContext();
			var listeners2 = lime_graphics_Renderer.onRenderContextRestored.listeners;
			var repeat2 = lime_graphics_Renderer.onRenderContextRestored.repeat;
			var length2 = listeners2.length;
			var i2 = 0;
			while(i2 < length2) {
				listeners2[i2](this.context);
				if(!repeat2[i2]) {
					lime_graphics_Renderer.onRenderContextRestored.remove(listeners2[i2]);
					length2--;
				} else i2++;
			}
			break;
		}
	}
	,flip: function() {
	}
	,handleCanvasEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "webglcontextlost":
			event.preventDefault();
			lime_graphics_Renderer.eventInfo.type = 1;
			this.dispatch();
			break;
		case "webglcontextrestored":
			this.createContext();
			lime_graphics_Renderer.eventInfo.type = 2;
			this.dispatch();
			break;
		default:
		}
	}
	,__class__: lime_graphics_Renderer
};
var lime_graphics__$Renderer_RenderEventType_$Impl_$ = function() { };
$hxClasses["lime.graphics._Renderer.RenderEventType_Impl_"] = lime_graphics__$Renderer_RenderEventType_$Impl_$;
lime_graphics__$Renderer_RenderEventType_$Impl_$.__name__ = ["lime","graphics","_Renderer","RenderEventType_Impl_"];
var lime_graphics_opengl_GL = function() { };
$hxClasses["lime.graphics.opengl.GL"] = lime_graphics_opengl_GL;
lime_graphics_opengl_GL.__name__ = ["lime","graphics","opengl","GL"];
lime_graphics_opengl_GL.__properties__ = {get_version:"get_version"}
lime_graphics_opengl_GL.version = null;
lime_graphics_opengl_GL.context = null;
lime_graphics_opengl_GL.activeTexture = function(texture) {
	lime_graphics_opengl_GL.context.activeTexture(texture);
};
lime_graphics_opengl_GL.attachShader = function(program,shader) {
	lime_graphics_opengl_GL.context.attachShader(program,shader);
};
lime_graphics_opengl_GL.bindAttribLocation = function(program,index,name) {
	lime_graphics_opengl_GL.context.bindAttribLocation(program,index,name);
};
lime_graphics_opengl_GL.bindBuffer = function(target,buffer) {
	lime_graphics_opengl_GL.context.bindBuffer(target,buffer);
};
lime_graphics_opengl_GL.bindFramebuffer = function(target,framebuffer) {
	lime_graphics_opengl_GL.context.bindFramebuffer(target,framebuffer);
};
lime_graphics_opengl_GL.bindRenderbuffer = function(target,renderbuffer) {
	lime_graphics_opengl_GL.context.bindRenderbuffer(target,renderbuffer);
};
lime_graphics_opengl_GL.bindTexture = function(target,texture) {
	lime_graphics_opengl_GL.context.bindTexture(target,texture);
};
lime_graphics_opengl_GL.blendColor = function(red,green,blue,alpha) {
	lime_graphics_opengl_GL.context.blendColor(red,green,blue,alpha);
};
lime_graphics_opengl_GL.blendEquation = function(mode) {
	lime_graphics_opengl_GL.context.blendEquation(mode);
};
lime_graphics_opengl_GL.blendEquationSeparate = function(modeRGB,modeAlpha) {
	lime_graphics_opengl_GL.context.blendEquationSeparate(modeRGB,modeAlpha);
};
lime_graphics_opengl_GL.blendFunc = function(sfactor,dfactor) {
	lime_graphics_opengl_GL.context.blendFunc(sfactor,dfactor);
};
lime_graphics_opengl_GL.blendFuncSeparate = function(srcRGB,dstRGB,srcAlpha,dstAlpha) {
	lime_graphics_opengl_GL.context.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
};
lime_graphics_opengl_GL.bufferData = function(target,data,usage) {
	lime_graphics_opengl_GL.context.bufferData(target,data,usage);
};
lime_graphics_opengl_GL.bufferSubData = function(target,offset,data) {
	lime_graphics_opengl_GL.context.bufferSubData(target,offset,data);
};
lime_graphics_opengl_GL.checkFramebufferStatus = function(target) {
	return lime_graphics_opengl_GL.context.checkFramebufferStatus(target);
};
lime_graphics_opengl_GL.clear = function(mask) {
	lime_graphics_opengl_GL.context.clear(mask);
};
lime_graphics_opengl_GL.clearColor = function(red,green,blue,alpha) {
	lime_graphics_opengl_GL.context.clearColor(red,green,blue,alpha);
};
lime_graphics_opengl_GL.clearDepth = function(depth) {
	lime_graphics_opengl_GL.context.clearDepth(depth);
};
lime_graphics_opengl_GL.clearStencil = function(s) {
	lime_graphics_opengl_GL.context.clearStencil(s);
};
lime_graphics_opengl_GL.colorMask = function(red,green,blue,alpha) {
	lime_graphics_opengl_GL.context.colorMask(red,green,blue,alpha);
};
lime_graphics_opengl_GL.compileShader = function(shader) {
	lime_graphics_opengl_GL.context.compileShader(shader);
};
lime_graphics_opengl_GL.compressedTexImage2D = function(target,level,internalformat,width,height,border,data) {
	lime_graphics_opengl_GL.context.compressedTexImage2D(target,level,internalformat,width,height,border,data);
};
lime_graphics_opengl_GL.compressedTexSubImage2D = function(target,level,xoffset,yoffset,width,height,format,data) {
	lime_graphics_opengl_GL.context.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
};
lime_graphics_opengl_GL.copyTexImage2D = function(target,level,internalformat,x,y,width,height,border) {
	lime_graphics_opengl_GL.context.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
};
lime_graphics_opengl_GL.copyTexSubImage2D = function(target,level,xoffset,yoffset,x,y,width,height) {
	lime_graphics_opengl_GL.context.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
};
lime_graphics_opengl_GL.createBuffer = function() {
	return lime_graphics_opengl_GL.context.createBuffer();
};
lime_graphics_opengl_GL.createFramebuffer = function() {
	return lime_graphics_opengl_GL.context.createFramebuffer();
};
lime_graphics_opengl_GL.createProgram = function() {
	return lime_graphics_opengl_GL.context.createProgram();
};
lime_graphics_opengl_GL.createRenderbuffer = function() {
	return lime_graphics_opengl_GL.context.createRenderbuffer();
};
lime_graphics_opengl_GL.createShader = function(type) {
	return lime_graphics_opengl_GL.context.createShader(type);
};
lime_graphics_opengl_GL.createTexture = function() {
	return lime_graphics_opengl_GL.context.createTexture();
};
lime_graphics_opengl_GL.cullFace = function(mode) {
	lime_graphics_opengl_GL.context.cullFace(mode);
};
lime_graphics_opengl_GL.deleteBuffer = function(buffer) {
	lime_graphics_opengl_GL.context.deleteBuffer(buffer);
};
lime_graphics_opengl_GL.deleteFramebuffer = function(framebuffer) {
	lime_graphics_opengl_GL.context.deleteFramebuffer(framebuffer);
};
lime_graphics_opengl_GL.deleteProgram = function(program) {
	lime_graphics_opengl_GL.context.deleteProgram(program);
};
lime_graphics_opengl_GL.deleteRenderbuffer = function(renderbuffer) {
	lime_graphics_opengl_GL.context.deleteRenderbuffer(renderbuffer);
};
lime_graphics_opengl_GL.deleteShader = function(shader) {
	lime_graphics_opengl_GL.context.deleteShader(shader);
};
lime_graphics_opengl_GL.deleteTexture = function(texture) {
	lime_graphics_opengl_GL.context.deleteTexture(texture);
};
lime_graphics_opengl_GL.depthFunc = function(func) {
	lime_graphics_opengl_GL.context.depthFunc(func);
};
lime_graphics_opengl_GL.depthMask = function(flag) {
	lime_graphics_opengl_GL.context.depthMask(flag);
};
lime_graphics_opengl_GL.depthRange = function(zNear,zFar) {
	lime_graphics_opengl_GL.context.depthRange(zNear,zFar);
};
lime_graphics_opengl_GL.detachShader = function(program,shader) {
	lime_graphics_opengl_GL.context.detachShader(program,shader);
};
lime_graphics_opengl_GL.disable = function(cap) {
	lime_graphics_opengl_GL.context.disable(cap);
};
lime_graphics_opengl_GL.disableVertexAttribArray = function(index) {
	lime_graphics_opengl_GL.context.disableVertexAttribArray(index);
};
lime_graphics_opengl_GL.drawArrays = function(mode,first,count) {
	lime_graphics_opengl_GL.context.drawArrays(mode,first,count);
};
lime_graphics_opengl_GL.drawElements = function(mode,count,type,offset) {
	lime_graphics_opengl_GL.context.drawElements(mode,count,type,offset);
};
lime_graphics_opengl_GL.enable = function(cap) {
	lime_graphics_opengl_GL.context.enable(cap);
};
lime_graphics_opengl_GL.enableVertexAttribArray = function(index) {
	lime_graphics_opengl_GL.context.enableVertexAttribArray(index);
};
lime_graphics_opengl_GL.finish = function() {
	lime_graphics_opengl_GL.context.finish();
};
lime_graphics_opengl_GL.flush = function() {
	lime_graphics_opengl_GL.context.flush();
};
lime_graphics_opengl_GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	lime_graphics_opengl_GL.context.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
};
lime_graphics_opengl_GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	lime_graphics_opengl_GL.context.framebufferTexture2D(target,attachment,textarget,texture,level);
};
lime_graphics_opengl_GL.frontFace = function(mode) {
	lime_graphics_opengl_GL.context.frontFace(mode);
};
lime_graphics_opengl_GL.generateMipmap = function(target) {
	lime_graphics_opengl_GL.context.generateMipmap(target);
};
lime_graphics_opengl_GL.getActiveAttrib = function(program,index) {
	return lime_graphics_opengl_GL.context.getActiveAttrib(program,index);
};
lime_graphics_opengl_GL.getActiveUniform = function(program,index) {
	return lime_graphics_opengl_GL.context.getActiveUniform(program,index);
};
lime_graphics_opengl_GL.getAttachedShaders = function(program) {
	return lime_graphics_opengl_GL.context.getAttachedShaders(program);
};
lime_graphics_opengl_GL.getAttribLocation = function(program,name) {
	return lime_graphics_opengl_GL.context.getAttribLocation(program,name);
};
lime_graphics_opengl_GL.getBufferParameter = function(target,pname) {
	return lime_graphics_opengl_GL.context.getBufferParameter(target,pname);
};
lime_graphics_opengl_GL.getContextAttributes = function() {
	return lime_graphics_opengl_GL.context.getContextAttributes();
};
lime_graphics_opengl_GL.getError = function() {
	return lime_graphics_opengl_GL.context.getError();
};
lime_graphics_opengl_GL.getExtension = function(name) {
	return lime_graphics_opengl_GL.context.getExtension(name);
};
lime_graphics_opengl_GL.getFramebufferAttachmentParameter = function(target,attachment,pname) {
	return lime_graphics_opengl_GL.context.getFramebufferAttachmentParameter(target,attachment,pname);
};
lime_graphics_opengl_GL.getParameter = function(pname) {
	return lime_graphics_opengl_GL.context.getParameter(pname);
};
lime_graphics_opengl_GL.getProgramInfoLog = function(program) {
	return lime_graphics_opengl_GL.context.getProgramInfoLog(program);
};
lime_graphics_opengl_GL.getProgramParameter = function(program,pname) {
	return lime_graphics_opengl_GL.context.getProgramParameter(program,pname);
};
lime_graphics_opengl_GL.getRenderbufferParameter = function(target,pname) {
	return lime_graphics_opengl_GL.context.getRenderbufferParameter(target,pname);
};
lime_graphics_opengl_GL.getShaderInfoLog = function(shader) {
	return lime_graphics_opengl_GL.context.getShaderInfoLog(shader);
};
lime_graphics_opengl_GL.getShaderParameter = function(shader,pname) {
	return lime_graphics_opengl_GL.context.getShaderParameter(shader,pname);
};
lime_graphics_opengl_GL.getShaderPrecisionFormat = function(shadertype,precisiontype) {
	return lime_graphics_opengl_GL.context.getShaderPrecisionFormat(shadertype,precisiontype);
};
lime_graphics_opengl_GL.getShaderSource = function(shader) {
	return lime_graphics_opengl_GL.context.getShaderSource(shader);
};
lime_graphics_opengl_GL.getSupportedExtensions = function() {
	return lime_graphics_opengl_GL.context.getSupportedExtensions();
};
lime_graphics_opengl_GL.getTexParameter = function(target,pname) {
	return lime_graphics_opengl_GL.context.getTexParameter(target,pname);
};
lime_graphics_opengl_GL.getUniform = function(program,location) {
	return lime_graphics_opengl_GL.context.getUniform(program,location);
};
lime_graphics_opengl_GL.getUniformLocation = function(program,name) {
	return lime_graphics_opengl_GL.context.getUniformLocation(program,name);
};
lime_graphics_opengl_GL.getVertexAttrib = function(index,pname) {
	return lime_graphics_opengl_GL.context.getVertexAttrib(index,pname);
};
lime_graphics_opengl_GL.getVertexAttribOffset = function(index,pname) {
	return lime_graphics_opengl_GL.context.getVertexAttribOffset(index,pname);
};
lime_graphics_opengl_GL.hint = function(target,mode) {
	lime_graphics_opengl_GL.context.hint(target,mode);
};
lime_graphics_opengl_GL.isBuffer = function(buffer) {
	return lime_graphics_opengl_GL.context.isBuffer(buffer);
};
lime_graphics_opengl_GL.isContextLost = function() {
	return lime_graphics_opengl_GL.context.isContextLost();
};
lime_graphics_opengl_GL.isEnabled = function(cap) {
	return lime_graphics_opengl_GL.context.isEnabled(cap);
};
lime_graphics_opengl_GL.isFramebuffer = function(framebuffer) {
	return lime_graphics_opengl_GL.context.isFramebuffer(framebuffer);
};
lime_graphics_opengl_GL.isProgram = function(program) {
	return lime_graphics_opengl_GL.context.isProgram(program);
};
lime_graphics_opengl_GL.isRenderbuffer = function(renderbuffer) {
	return lime_graphics_opengl_GL.context.isRenderbuffer(renderbuffer);
};
lime_graphics_opengl_GL.isShader = function(shader) {
	return lime_graphics_opengl_GL.context.isShader(shader);
};
lime_graphics_opengl_GL.isTexture = function(texture) {
	return lime_graphics_opengl_GL.context.isTexture(texture);
};
lime_graphics_opengl_GL.lineWidth = function(width) {
	lime_graphics_opengl_GL.context.lineWidth(width);
};
lime_graphics_opengl_GL.linkProgram = function(program) {
	lime_graphics_opengl_GL.context.linkProgram(program);
};
lime_graphics_opengl_GL.pixelStorei = function(pname,param) {
	lime_graphics_opengl_GL.context.pixelStorei(pname,param);
};
lime_graphics_opengl_GL.polygonOffset = function(factor,units) {
	lime_graphics_opengl_GL.context.polygonOffset(factor,units);
};
lime_graphics_opengl_GL.readPixels = function(x,y,width,height,format,type,pixels) {
	lime_graphics_opengl_GL.context.readPixels(x,y,width,height,format,type,pixels);
};
lime_graphics_opengl_GL.renderbufferStorage = function(target,internalformat,width,height) {
	lime_graphics_opengl_GL.context.renderbufferStorage(target,internalformat,width,height);
};
lime_graphics_opengl_GL.sampleCoverage = function(value,invert) {
	lime_graphics_opengl_GL.context.sampleCoverage(value,invert);
};
lime_graphics_opengl_GL.scissor = function(x,y,width,height) {
	lime_graphics_opengl_GL.context.scissor(x,y,width,height);
};
lime_graphics_opengl_GL.shaderSource = function(shader,source) {
	lime_graphics_opengl_GL.context.shaderSource(shader,source);
};
lime_graphics_opengl_GL.stencilFunc = function(func,ref,mask) {
	lime_graphics_opengl_GL.context.stencilFunc(func,ref,mask);
};
lime_graphics_opengl_GL.stencilFuncSeparate = function(face,func,ref,mask) {
	lime_graphics_opengl_GL.context.stencilFuncSeparate(face,func,ref,mask);
};
lime_graphics_opengl_GL.stencilMask = function(mask) {
	lime_graphics_opengl_GL.context.stencilMask(mask);
};
lime_graphics_opengl_GL.stencilMaskSeparate = function(face,mask) {
	lime_graphics_opengl_GL.context.stencilMaskSeparate(face,mask);
};
lime_graphics_opengl_GL.stencilOp = function(fail,zfail,zpass) {
	lime_graphics_opengl_GL.context.stencilOp(fail,zfail,zpass);
};
lime_graphics_opengl_GL.stencilOpSeparate = function(face,fail,zfail,zpass) {
	lime_graphics_opengl_GL.context.stencilOpSeparate(face,fail,zfail,zpass);
};
lime_graphics_opengl_GL.texImage2D = function(target,level,internalformat,width,height,border,format,type,pixels) {
	lime_graphics_opengl_GL.context.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
};
lime_graphics_opengl_GL.texParameterf = function(target,pname,param) {
	lime_graphics_opengl_GL.context.texParameterf(target,pname,param);
};
lime_graphics_opengl_GL.texParameteri = function(target,pname,param) {
	lime_graphics_opengl_GL.context.texParameteri(target,pname,param);
};
lime_graphics_opengl_GL.texSubImage2D = function(target,level,xoffset,yoffset,width,height,format,type,pixels) {
	lime_graphics_opengl_GL.context.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels);
};
lime_graphics_opengl_GL.uniform1f = function(location,x) {
	lime_graphics_opengl_GL.context.uniform1f(location,x);
};
lime_graphics_opengl_GL.uniform1fv = function(location,x) {
	lime_graphics_opengl_GL.context.uniform1fv(location,x);
};
lime_graphics_opengl_GL.uniform1i = function(location,x) {
	lime_graphics_opengl_GL.context.uniform1i(location,x);
};
lime_graphics_opengl_GL.uniform1iv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform1iv(location,v);
};
lime_graphics_opengl_GL.uniform2f = function(location,x,y) {
	lime_graphics_opengl_GL.context.uniform2f(location,x,y);
};
lime_graphics_opengl_GL.uniform2fv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform2fv(location,v);
};
lime_graphics_opengl_GL.uniform2i = function(location,x,y) {
	lime_graphics_opengl_GL.context.uniform2i(location,x,y);
};
lime_graphics_opengl_GL.uniform2iv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform2iv(location,v);
};
lime_graphics_opengl_GL.uniform3f = function(location,x,y,z) {
	lime_graphics_opengl_GL.context.uniform3f(location,x,y,z);
};
lime_graphics_opengl_GL.uniform3fv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform3fv(location,v);
};
lime_graphics_opengl_GL.uniform3i = function(location,x,y,z) {
	lime_graphics_opengl_GL.context.uniform3i(location,x,y,z);
};
lime_graphics_opengl_GL.uniform3iv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform3iv(location,v);
};
lime_graphics_opengl_GL.uniform4f = function(location,x,y,z,w) {
	lime_graphics_opengl_GL.context.uniform4f(location,x,y,z,w);
};
lime_graphics_opengl_GL.uniform4fv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform4fv(location,v);
};
lime_graphics_opengl_GL.uniform4i = function(location,x,y,z,w) {
	lime_graphics_opengl_GL.context.uniform4i(location,x,y,z,w);
};
lime_graphics_opengl_GL.uniform4iv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform4iv(location,v);
};
lime_graphics_opengl_GL.uniformMatrix2fv = function(location,transpose,v) {
	lime_graphics_opengl_GL.context.uniformMatrix2fv(location,transpose,v);
};
lime_graphics_opengl_GL.uniformMatrix3fv = function(location,transpose,v) {
	lime_graphics_opengl_GL.context.uniformMatrix3fv(location,transpose,v);
};
lime_graphics_opengl_GL.uniformMatrix4fv = function(location,transpose,v) {
	lime_graphics_opengl_GL.context.uniformMatrix4fv(location,transpose,v);
};
lime_graphics_opengl_GL.useProgram = function(program) {
	lime_graphics_opengl_GL.context.useProgram(program);
};
lime_graphics_opengl_GL.validateProgram = function(program) {
	lime_graphics_opengl_GL.context.validateProgram(program);
};
lime_graphics_opengl_GL.vertexAttrib1f = function(indx,x) {
	lime_graphics_opengl_GL.context.vertexAttrib1f(indx,x);
};
lime_graphics_opengl_GL.vertexAttrib1fv = function(indx,values) {
	lime_graphics_opengl_GL.context.vertexAttrib1fv(indx,values);
};
lime_graphics_opengl_GL.vertexAttrib2f = function(indx,x,y) {
	lime_graphics_opengl_GL.context.vertexAttrib2f(indx,x,y);
};
lime_graphics_opengl_GL.vertexAttrib2fv = function(indx,values) {
	lime_graphics_opengl_GL.context.vertexAttrib2fv(indx,values);
};
lime_graphics_opengl_GL.vertexAttrib3f = function(indx,x,y,z) {
	lime_graphics_opengl_GL.context.vertexAttrib3f(indx,x,y,z);
};
lime_graphics_opengl_GL.vertexAttrib3fv = function(indx,values) {
	lime_graphics_opengl_GL.context.vertexAttrib3fv(indx,values);
};
lime_graphics_opengl_GL.vertexAttrib4f = function(indx,x,y,z,w) {
	lime_graphics_opengl_GL.context.vertexAttrib4f(indx,x,y,z,w);
};
lime_graphics_opengl_GL.vertexAttrib4fv = function(indx,values) {
	lime_graphics_opengl_GL.context.vertexAttrib4fv(indx,values);
};
lime_graphics_opengl_GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	lime_graphics_opengl_GL.context.vertexAttribPointer(indx,size,type,normalized,stride,offset);
};
lime_graphics_opengl_GL.viewport = function(x,y,width,height) {
	lime_graphics_opengl_GL.context.viewport(x,y,width,height);
};
lime_graphics_opengl_GL.get_version = function() {
	return 2;
};
var lime_graphics_utils_ImageCanvasUtil = function() { };
$hxClasses["lime.graphics.utils.ImageCanvasUtil"] = lime_graphics_utils_ImageCanvasUtil;
lime_graphics_utils_ImageCanvasUtil.__name__ = ["lime","graphics","utils","ImageCanvasUtil"];
lime_graphics_utils_ImageCanvasUtil.colorTransform = function(image,rect,colorMatrix) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.colorTransform(image,rect,colorMatrix);
};
lime_graphics_utils_ImageCanvasUtil.convertToCanvas = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImage != null) {
		if(buffer.__srcCanvas == null) {
			lime_graphics_utils_ImageCanvasUtil.createCanvas(image,buffer.__srcImage.width,buffer.__srcImage.height);
			buffer.__srcContext.drawImage(buffer.__srcImage,0,0);
		}
		buffer.__srcImage = null;
	}
};
lime_graphics_utils_ImageCanvasUtil.convertToData = function(image) {
	if(image.buffer.data == null) {
		lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
		lime_graphics_utils_ImageCanvasUtil.createImageData(image);
		image.buffer.__srcCanvas = null;
		image.buffer.__srcContext = null;
	}
};
lime_graphics_utils_ImageCanvasUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(sourceImage);
	lime_graphics_utils_ImageCanvasUtil.createImageData(sourceImage);
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.copyChannel(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
};
lime_graphics_utils_ImageCanvasUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	if(alphaImage != null && alphaImage.get_transparent()) {
		if(alphaPoint == null) alphaPoint = new lime_math_Vector2();
		var tempData = image.clone();
		tempData.copyChannel(alphaImage,new lime_math_Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new lime_math_Vector2(sourceRect.x,sourceRect.y),lime_graphics_ImageChannel.ALPHA,lime_graphics_ImageChannel.ALPHA);
		sourceImage = tempData;
	}
	lime_graphics_utils_ImageCanvasUtil.sync(image);
	if(!mergeAlpha) {
		if(image.get_transparent() && sourceImage.get_transparent()) image.buffer.__srcContext.clearRect(destPoint.x + image.offsetX,destPoint.y + image.offsetY,sourceRect.width + image.offsetX,sourceRect.height + image.offsetY);
	}
	lime_graphics_utils_ImageCanvasUtil.sync(sourceImage);
	if(sourceImage.buffer.get_src() != null) image.buffer.__srcContext.drawImage(sourceImage.buffer.get_src(),sourceRect.x + sourceImage.offsetX | 0,sourceRect.y + sourceImage.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0,destPoint.x + image.offsetX | 0,destPoint.y + image.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0);
};
lime_graphics_utils_ImageCanvasUtil.createCanvas = function(image,width,height) {
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
lime_graphics_utils_ImageCanvasUtil.createImageData = function(image) {
	var buffer = image.buffer;
	if(buffer.data == null) {
		buffer.__srcImageData = buffer.__srcContext.getImageData(0,0,buffer.width,buffer.height);
		if(image.type == lime_graphics_ImageType.CANVAS) buffer.data = buffer.__srcImageData.data; else buffer.data = new Uint8Array(buffer.__srcImageData.data);
	}
};
lime_graphics_utils_ImageCanvasUtil.fillRect = function(image,rect,color) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.sync(image);
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
lime_graphics_utils_ImageCanvasUtil.floodFill = function(image,x,y,color) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.floodFill(image,x,y,color);
};
lime_graphics_utils_ImageCanvasUtil.getPixel = function(image,x,y) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	return lime_graphics_utils_ImageDataUtil.getPixel(image,x,y);
};
lime_graphics_utils_ImageCanvasUtil.getPixel32 = function(image,x,y) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	return lime_graphics_utils_ImageDataUtil.getPixel32(image,x,y);
};
lime_graphics_utils_ImageCanvasUtil.getPixels = function(image,rect) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	return lime_graphics_utils_ImageDataUtil.getPixels(image,rect);
};
lime_graphics_utils_ImageCanvasUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		lime_graphics_utils_ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(buffer.get_src(),0,0,newWidth,newHeight);
	} else {
		var sourceCanvas = buffer.__srcCanvas;
		buffer.__srcCanvas = null;
		lime_graphics_utils_ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(sourceCanvas,0,0,newWidth,newHeight);
	}
};
lime_graphics_utils_ImageCanvasUtil.setPixel = function(image,x,y,color) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.setPixel(image,x,y,color);
};
lime_graphics_utils_ImageCanvasUtil.setPixel32 = function(image,x,y,color) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.setPixel32(image,x,y,color);
};
lime_graphics_utils_ImageCanvasUtil.setPixels = function(image,rect,byteArray) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.setPixels(image,rect,byteArray);
};
lime_graphics_utils_ImageCanvasUtil.sync = function(image) {
	if(image.dirty && image.type != lime_graphics_ImageType.DATA) {
		image.buffer.__srcContext.putImageData(image.buffer.__srcImageData,0,0);
		image.buffer.data = null;
		image.dirty = false;
	}
};
var lime_graphics_utils_ImageDataUtil = function() { };
$hxClasses["lime.graphics.utils.ImageDataUtil"] = lime_graphics_utils_ImageDataUtil;
lime_graphics_utils_ImageDataUtil.__name__ = ["lime","graphics","utils","ImageDataUtil"];
lime_graphics_utils_ImageDataUtil.__alpha16 = null;
lime_graphics_utils_ImageDataUtil.__clamp = null;
lime_graphics_utils_ImageDataUtil.colorTransform = function(image,rect,colorMatrix) {
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
lime_graphics_utils_ImageDataUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
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
lime_graphics_utils_ImageDataUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	if(alphaImage != null && alphaImage.get_transparent()) {
		if(alphaPoint == null) alphaPoint = new lime_math_Vector2();
		var tempData = image.clone();
		tempData.copyChannel(alphaImage,new lime_math_Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new lime_math_Vector2(sourceRect.x,sourceRect.y),lime_graphics_ImageChannel.ALPHA,lime_graphics_ImageChannel.ALPHA);
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
				data[offset] = lime_graphics_utils_ImageDataUtil.__clamp[sourceData[sourceOffset] + data[offset] * oneMinusSourceAlpha | 0];
				data[offset + 1] = lime_graphics_utils_ImageDataUtil.__clamp[sourceData[sourceOffset + 1] + data[offset + 1] * oneMinusSourceAlpha | 0];
				data[offset + 2] = lime_graphics_utils_ImageDataUtil.__clamp[sourceData[sourceOffset + 2] + data[offset + 2] * oneMinusSourceAlpha | 0];
				data[offset + 3] = lime_graphics_utils_ImageDataUtil.__clamp[sourceData[sourceOffset + 3] + data[offset + 3] * oneMinusSourceAlpha | 0];
			}
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.fillRect = function(image,rect,color) {
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
lime_graphics_utils_ImageDataUtil.floodFill = function(image,x,y,color) {
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
lime_graphics_utils_ImageDataUtil.getPixel = function(image,x,y) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	if(image.get_premultiplied()) {
		var unmultiply = 255.0 / data[offset + 3];
		haxe_Log.trace(unmultiply,{ fileName : "ImageDataUtil.hx", lineNumber : 364, className : "lime.graphics.utils.ImageDataUtil", methodName : "getPixel"});
		return lime_graphics_utils_ImageDataUtil.__clamp[data[offset] * unmultiply | 0] << 16 | lime_graphics_utils_ImageDataUtil.__clamp[data[offset + 1] * unmultiply | 0] << 8 | lime_graphics_utils_ImageDataUtil.__clamp[data[offset + 2] * unmultiply | 0];
	} else return data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
};
lime_graphics_utils_ImageDataUtil.getPixel32 = function(image,x,y) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	var a;
	if(image.get_transparent()) a = data[offset + 3]; else a = 255;
	if(image.get_premultiplied() && a != 0) {
		var unmultiply = 255.0 / a;
		return a << 24 | (function($this) {
			var $r;
			var index = Math.round(data[offset] * unmultiply);
			$r = lime_graphics_utils_ImageDataUtil.__clamp[index];
			return $r;
		}(this)) << 16 | lime_graphics_utils_ImageDataUtil.__clamp[data[offset + 1] * unmultiply | 0] << 8 | lime_graphics_utils_ImageDataUtil.__clamp[data[offset + 2] * unmultiply | 0];
	} else return a << 24 | data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
};
lime_graphics_utils_ImageDataUtil.getPixels = function(image,rect) {
	var byteArray = new lime_utils_ByteArray(image.width * image.height * 4);
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
lime_graphics_utils_ImageDataUtil.multiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null) return;
	var index;
	var a16;
	var length = data.length / 4 | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		index = i * 4;
		var a161 = lime_graphics_utils_ImageDataUtil.__alpha16[data[index + 3]];
		data[index] = data[index] * a161 >> 16;
		data[index + 1] = data[index + 1] * a161 >> 16;
		data[index + 2] = data[index + 2] * a161 >> 16;
	}
	image.buffer.premultiplied = true;
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	var newBuffer = new lime_graphics_ImageBuffer(new Uint8Array(newWidth * newHeight * 4),newWidth,newHeight);
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
lime_graphics_utils_ImageDataUtil.resizeBuffer = function(image,newWidth,newHeight) {
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
lime_graphics_utils_ImageDataUtil.setPixel = function(image,x,y,color) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	data[offset] = (color & 16711680) >>> 16;
	data[offset + 1] = (color & 65280) >>> 8;
	data[offset + 2] = color & 255;
	if(image.get_transparent()) data[offset + 3] = 255;
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.setPixel32 = function(image,x,y,color) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	if(image.get_transparent() && image.get_premultiplied()) {
		var a16 = lime_graphics_utils_ImageDataUtil.__alpha16[a];
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
lime_graphics_utils_ImageDataUtil.setPixels = function(image,rect,byteArray) {
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
lime_graphics_utils_ImageDataUtil.unmultiplyAlpha = function(image) {
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
			data[index] = lime_graphics_utils_ImageDataUtil.__clamp[data[index] * unmultiply | 0];
			data[index + 1] = lime_graphics_utils_ImageDataUtil.__clamp[data[index + 1] * unmultiply | 0];
			data[index + 2] = lime_graphics_utils_ImageDataUtil.__clamp[data[index + 2] * unmultiply | 0];
		}
	}
	image.buffer.premultiplied = false;
	image.dirty = true;
};
var lime_math__$ColorMatrix_ColorMatrix_$Impl_$ = function() { };
$hxClasses["lime.math._ColorMatrix.ColorMatrix_Impl_"] = lime_math__$ColorMatrix_ColorMatrix_$Impl_$;
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__name__ = ["lime","math","_ColorMatrix","ColorMatrix_Impl_"];
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__properties__ = {set_redOffset:"set_redOffset",get_redOffset:"get_redOffset",set_redMultiplier:"set_redMultiplier",get_redMultiplier:"get_redMultiplier",set_greenOffset:"set_greenOffset",get_greenOffset:"get_greenOffset",set_greenMultiplier:"set_greenMultiplier",get_greenMultiplier:"get_greenMultiplier",set_color:"set_color",get_color:"get_color",set_blueOffset:"set_blueOffset",get_blueOffset:"get_blueOffset",set_blueMultiplier:"set_blueMultiplier",get_blueMultiplier:"get_blueMultiplier",set_alphaOffset:"set_alphaOffset",get_alphaOffset:"get_alphaOffset",set_alphaMultiplier:"set_alphaMultiplier",get_alphaMultiplier:"get_alphaMultiplier"}
lime_math__$ColorMatrix_ColorMatrix_$Impl_$._new = function(data) {
	var this1;
	if(data != null && data.length == 20) this1 = data; else this1 = new Float32Array(lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__identity);
	return this1;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.clone = function(this1) {
	return lime_math__$ColorMatrix_ColorMatrix_$Impl_$._new(new Float32Array(this1));
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.concat = function(this1,second) {
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
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.copyFrom = function(this1,other) {
	this1.set(other);
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.identity = function(this1) {
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
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__toFlashColorTransform = function(this1) {
	return null;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_alphaMultiplier = function(this1) {
	return this1[18];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_alphaMultiplier = function(this1,value) {
	this1[18] = value;
	return value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_alphaOffset = function(this1) {
	return this1[19] * 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_alphaOffset = function(this1,value) {
	this1[19] = value / 255;
	return value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_blueMultiplier = function(this1) {
	return this1[12];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_blueMultiplier = function(this1,value) {
	this1[12] = value;
	return value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_blueOffset = function(this1) {
	return this1[14] * 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_blueOffset = function(this1,value) {
	this1[14] = value / 255;
	return value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_color = function(this1) {
	return (this1[4] * 255 | 0) << 16 | (this1[9] * 255 | 0) << 8 | (this1[14] * 255 | 0);
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_color = function(this1,value) {
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
	return lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_color(this1);
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_greenMultiplier = function(this1) {
	return this1[6];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_greenMultiplier = function(this1,value) {
	this1[6] = value;
	return value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_greenOffset = function(this1) {
	return this1[9] * 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_greenOffset = function(this1,value) {
	this1[9] = value / 255;
	return value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_redMultiplier = function(this1) {
	return this1[0];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_redMultiplier = function(this1,value) {
	this1[0] = value;
	return value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_redOffset = function(this1) {
	return this1[4] * 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_redOffset = function(this1,value) {
	this1[4] = value / 255;
	return value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get = function(this1,index) {
	return this1[index];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set = function(this1,index,value) {
	this1[index] = value;
	return value;
};
var lime_math_Matrix3 = function(a,b,c,d,tx,ty) {
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
$hxClasses["lime.math.Matrix3"] = lime_math_Matrix3;
lime_math_Matrix3.__name__ = ["lime","math","Matrix3"];
lime_math_Matrix3.prototype = {
	clone: function() {
		return new lime_math_Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
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
		return new lime_math_Vector2(Vector2.x * this.a + Vector2.y * this.c,Vector2.x * this.b + Vector2.y * this.d);
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
		var result = new lime_math_Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
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
		return new lime_math_Vector2(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		var m = new lime_math_Matrix3();
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
	,__class__: lime_math_Matrix3
};
var lime_math__$Matrix4_Matrix4_$Impl_$ = function() { };
$hxClasses["lime.math._Matrix4.Matrix4_Impl_"] = lime_math__$Matrix4_Matrix4_$Impl_$;
lime_math__$Matrix4_Matrix4_$Impl_$.__name__ = ["lime","math","_Matrix4","Matrix4_Impl_"];
lime_math__$Matrix4_Matrix4_$Impl_$.__properties__ = {set_position:"set_position",get_position:"get_position",get_determinant:"get_determinant"}
lime_math__$Matrix4_Matrix4_$Impl_$._new = function(data) {
	var this1;
	if(data != null && data.length == 16) this1 = data; else this1 = new Float32Array(lime_math__$Matrix4_Matrix4_$Impl_$.__identity);
	return this1;
};
lime_math__$Matrix4_Matrix4_$Impl_$.append = function(this1,lhs) {
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
	var m211 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,0);
	var m221 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,4);
	var m231 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,8);
	var m241 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,12);
	var m212 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,1);
	var m222 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,5);
	var m232 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,9);
	var m242 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,13);
	var m213 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,2);
	var m223 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,6);
	var m233 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,10);
	var m243 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,14);
	var m214 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,3);
	var m224 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,7);
	var m234 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,11);
	var m244 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,15);
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
lime_math__$Matrix4_Matrix4_$Impl_$.appendRotation = function(this1,degrees,axis,pivotPoint) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		lime_math__$Matrix4_Matrix4_$Impl_$.appendTranslation(m,p.x,p.y,p.z);
	}
	lime_math__$Matrix4_Matrix4_$Impl_$.append(this1,m);
};
lime_math__$Matrix4_Matrix4_$Impl_$.appendScale = function(this1,xScale,yScale,zScale) {
	lime_math__$Matrix4_Matrix4_$Impl_$.append(this1,lime_math__$Matrix4_Matrix4_$Impl_$._new(new Float32Array([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0])));
};
lime_math__$Matrix4_Matrix4_$Impl_$.appendTranslation = function(this1,x,y,z) {
	this1[12] = this1[12] + x;
	this1[13] = this1[13] + y;
	this1[14] = this1[14] + z;
};
lime_math__$Matrix4_Matrix4_$Impl_$.clone = function(this1) {
	return lime_math__$Matrix4_Matrix4_$Impl_$._new(new Float32Array(this1));
};
lime_math__$Matrix4_Matrix4_$Impl_$.copyColumnFrom = function(this1,column,vector) {
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
lime_math__$Matrix4_Matrix4_$Impl_$.copyColumnTo = function(this1,column,vector) {
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
lime_math__$Matrix4_Matrix4_$Impl_$.copyFrom = function(this1,other) {
	this1.set(other);
};
lime_math__$Matrix4_Matrix4_$Impl_$.copythisFrom = function(this1,array,index,transposeValues) {
	if(transposeValues == null) transposeValues = false;
	if(index == null) index = 0;
	if(transposeValues) lime_math__$Matrix4_Matrix4_$Impl_$.transpose(this1);
	var l = array.length - index;
	var _g = 0;
	while(_g < l) {
		var c = _g++;
		this1[c] = array[c + index];
	}
	if(transposeValues) lime_math__$Matrix4_Matrix4_$Impl_$.transpose(this1);
};
lime_math__$Matrix4_Matrix4_$Impl_$.copythisTo = function(this1,array,index,transposeValues) {
	if(transposeValues == null) transposeValues = false;
	if(index == null) index = 0;
	if(transposeValues) lime_math__$Matrix4_Matrix4_$Impl_$.transpose(this1);
	var l = this1.length;
	var _g = 0;
	while(_g < l) {
		var c = _g++;
		array[c + index] = this1[c];
	}
	if(transposeValues) lime_math__$Matrix4_Matrix4_$Impl_$.transpose(this1);
};
lime_math__$Matrix4_Matrix4_$Impl_$.copyRowFrom = function(this1,row,vector) {
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
lime_math__$Matrix4_Matrix4_$Impl_$.create2D = function(x,y,scale,rotation) {
	if(rotation == null) rotation = 0;
	if(scale == null) scale = 1;
	var theta = rotation * Math.PI / 180.0;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	return lime_math__$Matrix4_Matrix4_$Impl_$._new(new Float32Array([c * scale,-s * scale,0,0,s * scale,c * scale,0,0,0,0,1,0,x,y,0,1]));
};
lime_math__$Matrix4_Matrix4_$Impl_$.createABCD = function(a,b,c,d,tx,ty) {
	return lime_math__$Matrix4_Matrix4_$Impl_$._new(new Float32Array([a,b,0,0,c,d,0,0,0,0,1,0,tx,ty,0,1]));
};
lime_math__$Matrix4_Matrix4_$Impl_$.createOrtho = function(x0,x1,y0,y1,zNear,zFar) {
	var sx = 1.0 / (x1 - x0);
	var sy = 1.0 / (y1 - y0);
	var sz = 1.0 / (zFar - zNear);
	return lime_math__$Matrix4_Matrix4_$Impl_$._new(new Float32Array([2.0 * sx,0,0,0,0,2.0 * sy,0,0,0,0,-2. * sz,0,-(x0 + x1) * sx,-(y0 + y1) * sy,-(zNear + zFar) * sz,1]));
};
lime_math__$Matrix4_Matrix4_$Impl_$.copyRowTo = function(this1,row,vector) {
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
lime_math__$Matrix4_Matrix4_$Impl_$.copyToMatrix4 = function(this1,other) {
	(js_Boot.__cast(other , Float32Array)).set(this1);
};
lime_math__$Matrix4_Matrix4_$Impl_$.deltaTransformVector = function(this1,v) {
	var x = v.x;
	var y = v.y;
	var z = v.z;
	return new lime_math_Vector4(x * this1[0] + y * this1[4] + z * this1[8] + this1[3],x * this1[1] + y * this1[5] + z * this1[9] + this1[7],x * this1[2] + y * this1[6] + z * this1[10] + this1[11],0);
};
lime_math__$Matrix4_Matrix4_$Impl_$.identity = function(this1) {
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
lime_math__$Matrix4_Matrix4_$Impl_$.interpolate = function(thisMat,toMat,percent) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$._new();
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		lime_math__$Matrix4_Matrix4_$Impl_$.set(m,i,lime_math__$Matrix4_Matrix4_$Impl_$.get(thisMat,i) + (lime_math__$Matrix4_Matrix4_$Impl_$.get(toMat,i) - lime_math__$Matrix4_Matrix4_$Impl_$.get(thisMat,i)) * percent);
	}
	return m;
};
lime_math__$Matrix4_Matrix4_$Impl_$.interpolateTo = function(this1,toMat,percent) {
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		this1[i] = this1[i] + (lime_math__$Matrix4_Matrix4_$Impl_$.get(toMat,i) - this1[i]) * percent;
	}
};
lime_math__$Matrix4_Matrix4_$Impl_$.invert = function(this1) {
	var d = lime_math__$Matrix4_Matrix4_$Impl_$.get_determinant(this1);
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
lime_math__$Matrix4_Matrix4_$Impl_$.pointAt = function(this1,pos,at,up) {
	if(at == null) at = new lime_math_Vector4(0,0,-1);
	if(up == null) up = new lime_math_Vector4(0,-1,0);
	var dir = new lime_math_Vector4(at.x - pos.x,at.y - pos.y,at.z - pos.z);
	var vup = new lime_math_Vector4(up.x,up.y,up.z,up.w);
	var right;
	dir.normalize();
	vup.normalize();
	var dir2 = new lime_math_Vector4(dir.x,dir.y,dir.z,dir.w);
	dir2.scaleBy(vup.x * dir.x + vup.y * dir.y + vup.z * dir.z);
	vup = new lime_math_Vector4(vup.x - dir2.x,vup.y - dir2.y,vup.z - dir2.z);
	if(Math.sqrt(vup.x * vup.x + vup.y * vup.y + vup.z * vup.z) > 0) vup.normalize(); else if(dir.x != 0) vup = new lime_math_Vector4(-dir.y,dir.x,0); else vup = new lime_math_Vector4(1,0,0);
	right = new lime_math_Vector4(vup.y * dir.z - vup.z * dir.y,vup.z * dir.x - vup.x * dir.z,vup.x * dir.y - vup.y * dir.x,1);
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
lime_math__$Matrix4_Matrix4_$Impl_$.prepend = function(this1,rhs) {
	var m111 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,0);
	var m121 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,4);
	var m131 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,8);
	var m141 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,12);
	var m112 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,1);
	var m122 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,5);
	var m132 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,9);
	var m142 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,13);
	var m113 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,2);
	var m123 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,6);
	var m133 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,10);
	var m143 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,14);
	var m114 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,3);
	var m124 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,7);
	var m134 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,11);
	var m144 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,15);
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
lime_math__$Matrix4_Matrix4_$Impl_$.prependRotation = function(this1,degrees,axis,pivotPoint) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		lime_math__$Matrix4_Matrix4_$Impl_$.appendTranslation(m,p.x,p.y,p.z);
	}
	lime_math__$Matrix4_Matrix4_$Impl_$.prepend(this1,m);
};
lime_math__$Matrix4_Matrix4_$Impl_$.prependScale = function(this1,xScale,yScale,zScale) {
	lime_math__$Matrix4_Matrix4_$Impl_$.prepend(this1,lime_math__$Matrix4_Matrix4_$Impl_$._new(new Float32Array([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0])));
};
lime_math__$Matrix4_Matrix4_$Impl_$.prependTranslation = function(this1,x,y,z) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$._new();
	lime_math__$Matrix4_Matrix4_$Impl_$.set_position(m,new lime_math_Vector4(x,y,z));
	lime_math__$Matrix4_Matrix4_$Impl_$.prepend(this1,m);
};
lime_math__$Matrix4_Matrix4_$Impl_$.transformVector = function(this1,v) {
	var x = v.x;
	var y = v.y;
	var z = v.z;
	return new lime_math_Vector4(x * this1[0] + y * this1[4] + z * this1[8] + this1[12],x * this1[1] + y * this1[5] + z * this1[9] + this1[13],x * this1[2] + y * this1[6] + z * this1[10] + this1[14],x * this1[3] + y * this1[7] + z * this1[11] + this1[15]);
};
lime_math__$Matrix4_Matrix4_$Impl_$.transformVectors = function(this1,ain,aout) {
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
lime_math__$Matrix4_Matrix4_$Impl_$.transpose = function(this1) {
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
lime_math__$Matrix4_Matrix4_$Impl_$.getAxisRotation = function(x,y,z,degrees) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$._new();
	var a1 = new lime_math_Vector4(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,0,c + a1.x * a1.x * t);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,5,c + a1.y * a1.y * t);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,10,c + a1.z * a1.z * t);
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,4,tmp1 + tmp2);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,1,tmp1 - tmp2);
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,8,tmp1 - tmp2);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,2,tmp1 + tmp2);
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,9,tmp1 + tmp2);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,6,tmp1 - tmp2);
	return m;
};
lime_math__$Matrix4_Matrix4_$Impl_$.get_determinant = function(this1) {
	return (this1[0] * this1[5] - this1[4] * this1[1]) * (this1[10] * this1[15] - this1[14] * this1[11]) - (this1[0] * this1[9] - this1[8] * this1[1]) * (this1[6] * this1[15] - this1[14] * this1[7]) + (this1[0] * this1[13] - this1[12] * this1[1]) * (this1[6] * this1[11] - this1[10] * this1[7]) + (this1[4] * this1[9] - this1[8] * this1[5]) * (this1[2] * this1[15] - this1[14] * this1[3]) - (this1[4] * this1[13] - this1[12] * this1[5]) * (this1[2] * this1[11] - this1[10] * this1[3]) + (this1[8] * this1[13] - this1[12] * this1[9]) * (this1[2] * this1[7] - this1[6] * this1[3]);
};
lime_math__$Matrix4_Matrix4_$Impl_$.get_position = function(this1) {
	return new lime_math_Vector4(this1[12],this1[13],this1[14]);
};
lime_math__$Matrix4_Matrix4_$Impl_$.set_position = function(this1,val) {
	this1[12] = val.x;
	this1[13] = val.y;
	this1[14] = val.z;
	return val;
};
lime_math__$Matrix4_Matrix4_$Impl_$.get = function(this1,index) {
	return this1[index];
};
lime_math__$Matrix4_Matrix4_$Impl_$.set = function(this1,index,value) {
	this1[index] = value;
	return value;
};
var lime_math_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.math.Rectangle"] = lime_math_Rectangle;
lime_math_Rectangle.__name__ = ["lime","math","Rectangle"];
lime_math_Rectangle.prototype = {
	clone: function() {
		return new lime_math_Rectangle(this.x,this.y,this.width,this.height);
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
		if(x1 <= x0) return new lime_math_Rectangle();
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		if(y1 <= y0) return new lime_math_Rectangle();
		return new lime_math_Rectangle(x0,y0,x1 - x0,y1 - y0);
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
		return new lime_math_Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
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
		return new lime_math_Rectangle(x0,y0,x1 - x0,y1 - y0);
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
		return new lime_math_Vector2(this.x + this.width,this.y + this.height);
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
		return new lime_math_Vector2(this.width,this.height);
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
		return new lime_math_Vector2(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,__class__: lime_math_Rectangle
	,__properties__: {set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_top:"set_top",get_top:"get_top",set_size:"set_size",get_size:"get_size",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_bottom:"set_bottom",get_bottom:"get_bottom"}
};
var lime_math_Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["lime.math.Vector2"] = lime_math_Vector2;
lime_math_Vector2.__name__ = ["lime","math","Vector2"];
lime_math_Vector2.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
};
lime_math_Vector2.interpolate = function(pt1,pt2,f) {
	return new lime_math_Vector2(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
};
lime_math_Vector2.polar = function(len,angle) {
	return new lime_math_Vector2(len * Math.cos(angle),len * Math.sin(angle));
};
lime_math_Vector2.prototype = {
	add: function(v) {
		return new lime_math_Vector2(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new lime_math_Vector2(this.x,this.y);
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
		return new lime_math_Vector2(this.x - v.x,this.y - v.y);
	}
	,__toFlashPoint: function() {
		return null;
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: lime_math_Vector2
	,__properties__: {get_length:"get_length"}
};
var lime_math_Vector4 = function(x,y,z,w) {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["lime.math.Vector4"] = lime_math_Vector4;
lime_math_Vector4.__name__ = ["lime","math","Vector4"];
lime_math_Vector4.__properties__ = {get_Z_AXIS:"get_Z_AXIS",get_Y_AXIS:"get_Y_AXIS",get_X_AXIS:"get_X_AXIS"}
lime_math_Vector4.X_AXIS = null;
lime_math_Vector4.Y_AXIS = null;
lime_math_Vector4.Z_AXIS = null;
lime_math_Vector4.angleBetween = function(a,b) {
	var a0 = new lime_math_Vector4(a.x,a.y,a.z,a.w);
	a0.normalize();
	var b0 = new lime_math_Vector4(b.x,b.y,b.z,b.w);
	b0.normalize();
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
};
lime_math_Vector4.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
};
lime_math_Vector4.get_X_AXIS = function() {
	return new lime_math_Vector4(1,0,0);
};
lime_math_Vector4.get_Y_AXIS = function() {
	return new lime_math_Vector4(0,1,0);
};
lime_math_Vector4.get_Z_AXIS = function() {
	return new lime_math_Vector4(0,0,1);
};
lime_math_Vector4.prototype = {
	add: function(a) {
		return new lime_math_Vector4(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new lime_math_Vector4(this.x,this.y,this.z,this.w);
	}
	,copyFrom: function(sourceVector4) {
		this.x = sourceVector4.x;
		this.y = sourceVector4.y;
		this.z = sourceVector4.z;
	}
	,crossProduct: function(a) {
		return new lime_math_Vector4(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
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
		return new lime_math_Vector4(this.x - a.x,this.y - a.y,this.z - a.z);
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
	,__class__: lime_math_Vector4
	,__properties__: {get_lengthSquared:"get_lengthSquared",get_length:"get_length"}
};
var lime_net_URLLoader = function(request) {
	this.onSecurityError = new lime_app_Event();
	this.onProgress = new lime_app_Event();
	this.onOpen = new lime_app_Event();
	this.onIOError = new lime_app_Event();
	this.onHTTPStatus = new lime_app_Event();
	this.onComplete = new lime_app_Event();
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(lime_net_URLLoaderDataFormat.TEXT);
	this.__data = "";
	this.__curl = lime_net_curl_CURLEasy.init();
	if(request != null) this.load(request);
};
$hxClasses["lime.net.URLLoader"] = lime_net_URLLoader;
lime_net_URLLoader.__name__ = ["lime","net","URLLoader"];
lime_net_URLLoader.prototype = {
	close: function() {
		lime_net_curl_CURLEasy.cleanup(this.__curl);
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
		if(js_Boot.__instanceof(data,lime_utils_ByteArray)) {
			var data1 = data;
			var _g = this.dataFormat;
			switch(_g[1]) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js_Boot.__instanceof(data,lime_net_URLVariables)) {
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
			} else xmlHttpRequest.open(js_Boot.__cast(method , String),url,true);
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
			this.data = lime_utils_ByteArray.__ofBuffer(content);
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
		if(inputVal == lime_net_URLLoaderDataFormat.BINARY && !Reflect.hasField(window,"ArrayBuffer")) this.dataFormat = lime_net_URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: lime_net_URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
};
var lime_net_URLLoaderDataFormat = $hxClasses["lime.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] };
lime_net_URLLoaderDataFormat.BINARY = ["BINARY",0];
lime_net_URLLoaderDataFormat.BINARY.toString = $estr;
lime_net_URLLoaderDataFormat.BINARY.__enum__ = lime_net_URLLoaderDataFormat;
lime_net_URLLoaderDataFormat.TEXT = ["TEXT",1];
lime_net_URLLoaderDataFormat.TEXT.toString = $estr;
lime_net_URLLoaderDataFormat.TEXT.__enum__ = lime_net_URLLoaderDataFormat;
lime_net_URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
lime_net_URLLoaderDataFormat.VARIABLES.toString = $estr;
lime_net_URLLoaderDataFormat.VARIABLES.__enum__ = lime_net_URLLoaderDataFormat;
var lime_net_URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["lime.net.URLRequest"] = lime_net_URLRequest;
lime_net_URLRequest.__name__ = ["lime","net","URLRequest"];
lime_net_URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == "GET" || this.data == null) return res;
		if(typeof(this.data) == "string" || js_Boot.__instanceof(this.data,lime_utils_ByteArray)) {
			res = res.slice();
			res.push(new lime_net_URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: lime_net_URLRequest
};
var lime_net_URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["lime.net.URLRequestHeader"] = lime_net_URLRequestHeader;
lime_net_URLRequestHeader.__name__ = ["lime","net","URLRequestHeader"];
lime_net_URLRequestHeader.prototype = {
	__class__: lime_net_URLRequestHeader
};
var lime_net__$URLRequestMethod_URLRequestMethod_$Impl_$ = function() { };
$hxClasses["lime.net._URLRequestMethod.URLRequestMethod_Impl_"] = lime_net__$URLRequestMethod_URLRequestMethod_$Impl_$;
lime_net__$URLRequestMethod_URLRequestMethod_$Impl_$.__name__ = ["lime","net","_URLRequestMethod","URLRequestMethod_Impl_"];
var lime_net_URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["lime.net.URLVariables"] = lime_net_URLVariables;
lime_net_URLVariables.__name__ = ["lime","net","URLVariables"];
lime_net_URLVariables.prototype = {
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
	,__class__: lime_net_URLVariables
};
var lime_net_curl__$CURL_CURL_$Impl_$ = function() { };
$hxClasses["lime.net.curl._CURL.CURL_Impl_"] = lime_net_curl__$CURL_CURL_$Impl_$;
lime_net_curl__$CURL_CURL_$Impl_$.__name__ = ["lime","net","curl","_CURL","CURL_Impl_"];
lime_net_curl__$CURL_CURL_$Impl_$.getDate = function(date,now) {
	return 0;
};
lime_net_curl__$CURL_CURL_$Impl_$.globalCleanup = function() {
};
lime_net_curl__$CURL_CURL_$Impl_$.globalInit = function(flags) {
	return 0;
};
lime_net_curl__$CURL_CURL_$Impl_$.version = function() {
	return null;
};
lime_net_curl__$CURL_CURL_$Impl_$.versionInfo = function(type) {
	return null;
};
lime_net_curl__$CURL_CURL_$Impl_$.intGt = function(a,b) {
	return a > b;
};
var lime_net_curl__$CURLCode_CURLCode_$Impl_$ = function() { };
$hxClasses["lime.net.curl._CURLCode.CURLCode_Impl_"] = lime_net_curl__$CURLCode_CURLCode_$Impl_$;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.__name__ = ["lime","net","curl","_CURLCode","CURLCode_Impl_"];
var lime_net_curl_CURLEasy = function() { };
$hxClasses["lime.net.curl.CURLEasy"] = lime_net_curl_CURLEasy;
lime_net_curl_CURLEasy.__name__ = ["lime","net","curl","CURLEasy"];
lime_net_curl_CURLEasy.cleanup = function(handle) {
};
lime_net_curl_CURLEasy.duphandle = function(handle) {
	return 0;
};
lime_net_curl_CURLEasy.escape = function(handle,url,length) {
	return null;
};
lime_net_curl_CURLEasy.getinfo = function(handle,info) {
	return null;
};
lime_net_curl_CURLEasy.init = function() {
	return 0;
};
lime_net_curl_CURLEasy.pause = function(handle,bitMask) {
	return 0;
};
lime_net_curl_CURLEasy.perform = function(handle) {
	return 0;
};
lime_net_curl_CURLEasy.reset = function(handle) {
	return 0;
};
lime_net_curl_CURLEasy.setopt = function(handle,option,parameter) {
	return 0;
};
lime_net_curl_CURLEasy.strerror = function(code) {
	return null;
};
lime_net_curl_CURLEasy.unescape = function(handle,url,inLength,outLength) {
	return null;
};
var lime_net_curl__$CURLInfo_CURLInfo_$Impl_$ = function() { };
$hxClasses["lime.net.curl._CURLInfo.CURLInfo_Impl_"] = lime_net_curl__$CURLInfo_CURLInfo_$Impl_$;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.__name__ = ["lime","net","curl","_CURLInfo","CURLInfo_Impl_"];
var lime_net_curl__$CURLOption_CURLOption_$Impl_$ = function() { };
$hxClasses["lime.net.curl._CURLOption.CURLOption_Impl_"] = lime_net_curl__$CURLOption_CURLOption_$Impl_$;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.__name__ = ["lime","net","curl","_CURLOption","CURLOption_Impl_"];
var lime_net_curl__$CURLVersion_CURLVersion_$Impl_$ = function() { };
$hxClasses["lime.net.curl._CURLVersion.CURLVersion_Impl_"] = lime_net_curl__$CURLVersion_CURLVersion_$Impl_$;
lime_net_curl__$CURLVersion_CURLVersion_$Impl_$.__name__ = ["lime","net","curl","_CURLVersion","CURLVersion_Impl_"];
var lime_system_System = function() { };
$hxClasses["lime.system.System"] = lime_system_System;
lime_system_System.__name__ = ["lime","system","System"];
lime_system_System.disableCFFI = null;
lime_system_System.embed = $hx_exports.lime.embed = function(elementName,width,height,background) {
	var element = null;
	if(elementName != null) element = window.document.getElementById(elementName); else element = window.document.createElement("div");
	var color = null;
	if(background != null) {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	if(width == null) width = 0;
	if(height == null) height = 0;
	ApplicationMain.config.background = color;
	ApplicationMain.config.element = element;
	ApplicationMain.config.width = width;
	ApplicationMain.config.height = height;
	ApplicationMain.create();
};
lime_system_System.findHaxeLib = function(library) {
	return "";
};
lime_system_System.load = function(library,method,args,lazy) {
	if(lazy == null) lazy = false;
	if(args == null) args = 0;
	if(lime_system_System.disableCFFI) return Reflect.makeVarArgs(function(__) {
		return { };
	});
	if(lazy) {
	}
	var result = null;
	return result;
};
lime_system_System.sysName = function() {
	return null;
};
lime_system_System.tryLoad = function(name,library,func,args) {
	return null;
};
lime_system_System.loaderTrace = function(message) {
};
var lime_ui__$KeyCode_KeyCode_$Impl_$ = function() { };
$hxClasses["lime.ui._KeyCode.KeyCode_Impl_"] = lime_ui__$KeyCode_KeyCode_$Impl_$;
lime_ui__$KeyCode_KeyCode_$Impl_$.__name__ = ["lime","ui","_KeyCode","KeyCode_Impl_"];
var lime_ui_KeyEventManager = function() { };
$hxClasses["lime.ui.KeyEventManager"] = lime_ui_KeyEventManager;
lime_ui_KeyEventManager.__name__ = ["lime","ui","KeyEventManager"];
lime_ui_KeyEventManager.eventInfo = null;
lime_ui_KeyEventManager.create = function() {
	lime_ui_KeyEventManager.eventInfo = new lime_ui__$KeyEventManager_KeyEventInfo();
	window.addEventListener("keydown",lime_ui_KeyEventManager.handleEvent,false);
	window.addEventListener("keyup",lime_ui_KeyEventManager.handleEvent,false);
};
lime_ui_KeyEventManager.convertKeyCode = function(keyCode) {
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
};
lime_ui_KeyEventManager.handleEvent = function(event) {
	var _g = event.keyCode;
	switch(_g) {
	case 32:case 37:case 38:case 39:case 40:
		event.preventDefault();
		break;
	}
	lime_ui_KeyEventManager.eventInfo.keyCode = lime_ui_KeyEventManager.convertKeyCode(event.keyCode != null?event.keyCode:event.which);
	if(event.type == "keydown") lime_ui_KeyEventManager.eventInfo.type = 0; else lime_ui_KeyEventManager.eventInfo.type = 1;
	var _g1 = lime_ui_KeyEventManager.eventInfo.type;
	switch(_g1) {
	case 0:
		var listeners = lime_ui_KeyEventManager.onKeyDown.listeners;
		var repeat = lime_ui_KeyEventManager.onKeyDown.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](lime_ui_KeyEventManager.eventInfo.keyCode,lime_ui_KeyEventManager.eventInfo.modifier);
			if(!repeat[i]) {
				lime_ui_KeyEventManager.onKeyDown.remove(listeners[i]);
				length--;
			} else i++;
		}
		break;
	case 1:
		var listeners1 = lime_ui_KeyEventManager.onKeyUp.listeners;
		var repeat1 = lime_ui_KeyEventManager.onKeyUp.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](lime_ui_KeyEventManager.eventInfo.keyCode,lime_ui_KeyEventManager.eventInfo.modifier);
			if(!repeat1[i1]) {
				lime_ui_KeyEventManager.onKeyUp.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		break;
	}
};
lime_ui_KeyEventManager.registerWindow = function(_window) {
};
var lime_ui__$KeyEventManager_KeyEventInfo = function(type,keyCode,modifier) {
	if(modifier == null) modifier = 0;
	if(keyCode == null) keyCode = 0;
	this.type = type;
	this.keyCode = keyCode;
	this.modifier = modifier;
};
$hxClasses["lime.ui._KeyEventManager.KeyEventInfo"] = lime_ui__$KeyEventManager_KeyEventInfo;
lime_ui__$KeyEventManager_KeyEventInfo.__name__ = ["lime","ui","_KeyEventManager","KeyEventInfo"];
lime_ui__$KeyEventManager_KeyEventInfo.prototype = {
	clone: function() {
		return new lime_ui__$KeyEventManager_KeyEventInfo(this.type,this.keyCode,this.modifier);
	}
	,__class__: lime_ui__$KeyEventManager_KeyEventInfo
};
var lime_ui__$KeyEventManager_KeyEventType_$Impl_$ = function() { };
$hxClasses["lime.ui._KeyEventManager.KeyEventType_Impl_"] = lime_ui__$KeyEventManager_KeyEventType_$Impl_$;
lime_ui__$KeyEventManager_KeyEventType_$Impl_$.__name__ = ["lime","ui","_KeyEventManager","KeyEventType_Impl_"];
var lime_ui_Mouse = function() { };
$hxClasses["lime.ui.Mouse"] = lime_ui_Mouse;
lime_ui_Mouse.__name__ = ["lime","ui","Mouse"];
lime_ui_Mouse.__properties__ = {set_cursor:"set_cursor",get_cursor:"get_cursor"}
lime_ui_Mouse.__cursor = null;
lime_ui_Mouse.__hidden = null;
lime_ui_Mouse.hide = function() {
	if(!lime_ui_Mouse.__hidden) {
		lime_ui_Mouse.__hidden = true;
		var _g = 0;
		var _g1 = lime_app_Application.__instance.windows;
		while(_g < _g1.length) {
			var $window = _g1[_g];
			++_g;
			$window.element.style.cursor = "none";
		}
	}
};
lime_ui_Mouse.show = function() {
	if(lime_ui_Mouse.__hidden) {
		lime_ui_Mouse.__hidden = false;
		var cacheValue = lime_ui_Mouse.__cursor;
		lime_ui_Mouse.__cursor = null;
		lime_ui_Mouse.set_cursor(cacheValue);
	}
};
lime_ui_Mouse.get_cursor = function() {
	if(lime_ui_Mouse.__cursor == null) return lime_ui_MouseCursor.DEFAULT;
	return lime_ui_Mouse.__cursor;
};
lime_ui_Mouse.set_cursor = function(value) {
	if(lime_ui_Mouse.__cursor != value) {
		if(!lime_ui_Mouse.__hidden) {
			var _g = 0;
			var _g1 = lime_app_Application.__instance.windows;
			while(_g < _g1.length) {
				var $window = _g1[_g];
				++_g;
				switch(value[1]) {
				case 0:
					$window.element.style.cursor = "default";
					break;
				case 1:
					$window.element.style.cursor = "crosshair";
					break;
				case 3:
					$window.element.style.cursor = "move";
					break;
				case 4:
					$window.element.style.cursor = "pointer";
					break;
				case 5:
					$window.element.style.cursor = "nesw-resize";
					break;
				case 6:
					$window.element.style.cursor = "ns-resize";
					break;
				case 7:
					$window.element.style.cursor = "nwse-resize";
					break;
				case 8:
					$window.element.style.cursor = "ew-resize";
					break;
				case 9:
					$window.element.style.cursor = "text";
					break;
				case 10:
					$window.element.style.cursor = "wait";
					break;
				case 11:
					$window.element.style.cursor = "wait";
					break;
				default:
					$window.element.style.cursor = "auto";
				}
			}
		}
		lime_ui_Mouse.__cursor = value;
	}
	return lime_ui_Mouse.__cursor;
};
var lime_ui__$Mouse_MouseCursorType_$Impl_$ = function() { };
$hxClasses["lime.ui._Mouse.MouseCursorType_Impl_"] = lime_ui__$Mouse_MouseCursorType_$Impl_$;
lime_ui__$Mouse_MouseCursorType_$Impl_$.__name__ = ["lime","ui","_Mouse","MouseCursorType_Impl_"];
var lime_ui_MouseCursor = $hxClasses["lime.ui.MouseCursor"] = { __ename__ : true, __constructs__ : ["ARROW","CROSSHAIR","DEFAULT","MOVE","POINTER","RESIZE_NESW","RESIZE_NS","RESIZE_NWSE","RESIZE_WE","TEXT","WAIT","WAIT_ARROW","CUSTOM"] };
lime_ui_MouseCursor.ARROW = ["ARROW",0];
lime_ui_MouseCursor.ARROW.toString = $estr;
lime_ui_MouseCursor.ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CROSSHAIR = ["CROSSHAIR",1];
lime_ui_MouseCursor.CROSSHAIR.toString = $estr;
lime_ui_MouseCursor.CROSSHAIR.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.DEFAULT = ["DEFAULT",2];
lime_ui_MouseCursor.DEFAULT.toString = $estr;
lime_ui_MouseCursor.DEFAULT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.MOVE = ["MOVE",3];
lime_ui_MouseCursor.MOVE.toString = $estr;
lime_ui_MouseCursor.MOVE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.POINTER = ["POINTER",4];
lime_ui_MouseCursor.POINTER.toString = $estr;
lime_ui_MouseCursor.POINTER.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NESW = ["RESIZE_NESW",5];
lime_ui_MouseCursor.RESIZE_NESW.toString = $estr;
lime_ui_MouseCursor.RESIZE_NESW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NS = ["RESIZE_NS",6];
lime_ui_MouseCursor.RESIZE_NS.toString = $estr;
lime_ui_MouseCursor.RESIZE_NS.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NWSE = ["RESIZE_NWSE",7];
lime_ui_MouseCursor.RESIZE_NWSE.toString = $estr;
lime_ui_MouseCursor.RESIZE_NWSE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_WE = ["RESIZE_WE",8];
lime_ui_MouseCursor.RESIZE_WE.toString = $estr;
lime_ui_MouseCursor.RESIZE_WE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.TEXT = ["TEXT",9];
lime_ui_MouseCursor.TEXT.toString = $estr;
lime_ui_MouseCursor.TEXT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT = ["WAIT",10];
lime_ui_MouseCursor.WAIT.toString = $estr;
lime_ui_MouseCursor.WAIT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT_ARROW = ["WAIT_ARROW",11];
lime_ui_MouseCursor.WAIT_ARROW.toString = $estr;
lime_ui_MouseCursor.WAIT_ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CUSTOM = ["CUSTOM",12];
lime_ui_MouseCursor.CUSTOM.toString = $estr;
lime_ui_MouseCursor.CUSTOM.__enum__ = lime_ui_MouseCursor;
var lime_ui_MouseEventManager = function() { };
$hxClasses["lime.ui.MouseEventManager"] = lime_ui_MouseEventManager;
lime_ui_MouseEventManager.__name__ = ["lime","ui","MouseEventManager"];
lime_ui_MouseEventManager.created = null;
lime_ui_MouseEventManager.eventInfo = null;
lime_ui_MouseEventManager.window = null;
lime_ui_MouseEventManager.create = function() {
	lime_ui_MouseEventManager.eventInfo = new lime_ui__$MouseEventManager_MouseEventInfo();
};
lime_ui_MouseEventManager.handleEvent = function(event) {
	var _g = event.type;
	switch(_g) {
	case "mousedown":
		lime_ui_MouseEventManager.eventInfo.type = 0;
		break;
	case "mouseup":
		lime_ui_MouseEventManager.eventInfo.type = 1;
		break;
	case "mousemove":
		lime_ui_MouseEventManager.eventInfo.type = 2;
		break;
	case "wheel":
		lime_ui_MouseEventManager.eventInfo.type = 3;
		break;
	default:
		lime_ui_MouseEventManager.eventInfo.type = null;
	}
	if(lime_ui_MouseEventManager.eventInfo.type != 3) {
		if(lime_ui_MouseEventManager.window != null && lime_ui_MouseEventManager.window.element != null) {
			if(lime_ui_MouseEventManager.window.canvas != null) {
				var rect = lime_ui_MouseEventManager.window.canvas.getBoundingClientRect();
				lime_ui_MouseEventManager.eventInfo.x = (event.clientX - rect.left) * (lime_ui_MouseEventManager.window.width / rect.width);
				lime_ui_MouseEventManager.eventInfo.y = (event.clientY - rect.top) * (lime_ui_MouseEventManager.window.height / rect.height);
			} else if(lime_ui_MouseEventManager.window.div != null) {
				var rect1 = lime_ui_MouseEventManager.window.div.getBoundingClientRect();
				lime_ui_MouseEventManager.eventInfo.x = event.clientX - rect1.left;
				lime_ui_MouseEventManager.eventInfo.y = event.clientY - rect1.top;
			} else {
				var rect2 = lime_ui_MouseEventManager.window.element.getBoundingClientRect();
				lime_ui_MouseEventManager.eventInfo.x = (event.clientX - rect2.left) * (lime_ui_MouseEventManager.window.width / rect2.width);
				lime_ui_MouseEventManager.eventInfo.y = (event.clientY - rect2.top) * (lime_ui_MouseEventManager.window.height / rect2.height);
			}
		} else {
			lime_ui_MouseEventManager.eventInfo.x = event.clientX;
			lime_ui_MouseEventManager.eventInfo.y = event.clientY;
		}
	} else {
		lime_ui_MouseEventManager.eventInfo.x = event.deltaX;
		lime_ui_MouseEventManager.eventInfo.y = event.deltaY;
	}
	lime_ui_MouseEventManager.eventInfo.button = event.button;
	var _g1 = lime_ui_MouseEventManager.eventInfo.type;
	switch(_g1) {
	case 0:
		var listeners = lime_ui_MouseEventManager.onMouseDown.listeners;
		var repeat = lime_ui_MouseEventManager.onMouseDown.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](lime_ui_MouseEventManager.eventInfo.x,lime_ui_MouseEventManager.eventInfo.y,lime_ui_MouseEventManager.eventInfo.button);
			if(!repeat[i]) {
				lime_ui_MouseEventManager.onMouseDown.remove(listeners[i]);
				length--;
			} else i++;
		}
		break;
	case 1:
		var listeners1 = lime_ui_MouseEventManager.onMouseUp.listeners;
		var repeat1 = lime_ui_MouseEventManager.onMouseUp.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](lime_ui_MouseEventManager.eventInfo.x,lime_ui_MouseEventManager.eventInfo.y,lime_ui_MouseEventManager.eventInfo.button);
			if(!repeat1[i1]) {
				lime_ui_MouseEventManager.onMouseUp.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		break;
	case 2:
		var listeners2 = lime_ui_MouseEventManager.onMouseMove.listeners;
		var repeat2 = lime_ui_MouseEventManager.onMouseMove.repeat;
		var length2 = listeners2.length;
		var i2 = 0;
		while(i2 < length2) {
			listeners2[i2](lime_ui_MouseEventManager.eventInfo.x,lime_ui_MouseEventManager.eventInfo.y,lime_ui_MouseEventManager.eventInfo.button);
			if(!repeat2[i2]) {
				lime_ui_MouseEventManager.onMouseMove.remove(listeners2[i2]);
				length2--;
			} else i2++;
		}
		break;
	case 3:
		var listeners3 = lime_ui_MouseEventManager.onMouseWheel.listeners;
		var repeat3 = lime_ui_MouseEventManager.onMouseWheel.repeat;
		var length3 = listeners3.length;
		var i3 = 0;
		while(i3 < length3) {
			listeners3[i3](lime_ui_MouseEventManager.eventInfo.x,lime_ui_MouseEventManager.eventInfo.y);
			if(!repeat3[i3]) {
				lime_ui_MouseEventManager.onMouseWheel.remove(listeners3[i3]);
				length3--;
			} else i3++;
		}
		break;
	}
};
lime_ui_MouseEventManager.registerWindow = function(_window) {
	var events = ["mousedown","mousemove","mouseup","wheel"];
	var _g = 0;
	while(_g < events.length) {
		var event = events[_g];
		++_g;
		_window.element.addEventListener(event,lime_ui_MouseEventManager.handleEvent,true);
	}
	lime_ui_MouseEventManager.window = _window;
	window.document.addEventListener("dragstart",function(e) {
		if(e.target.nodeName.toLowerCase() == "img") {
			e.preventDefault();
			return false;
		}
		return true;
	},false);
};
var lime_ui__$MouseEventManager_MouseEventInfo = function(type,x,y,button) {
	if(button == null) button = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.type = type;
	this.x = x;
	this.y = y;
	this.button = button;
};
$hxClasses["lime.ui._MouseEventManager.MouseEventInfo"] = lime_ui__$MouseEventManager_MouseEventInfo;
lime_ui__$MouseEventManager_MouseEventInfo.__name__ = ["lime","ui","_MouseEventManager","MouseEventInfo"];
lime_ui__$MouseEventManager_MouseEventInfo.prototype = {
	clone: function() {
		return new lime_ui__$MouseEventManager_MouseEventInfo(this.type,this.x,this.y,this.button);
	}
	,__class__: lime_ui__$MouseEventManager_MouseEventInfo
};
var lime_ui__$MouseEventManager_MouseEventType_$Impl_$ = function() { };
$hxClasses["lime.ui._MouseEventManager.MouseEventType_Impl_"] = lime_ui__$MouseEventManager_MouseEventType_$Impl_$;
lime_ui__$MouseEventManager_MouseEventType_$Impl_$.__name__ = ["lime","ui","_MouseEventManager","MouseEventType_Impl_"];
var lime_ui_TouchEventManager = function() { };
$hxClasses["lime.ui.TouchEventManager"] = lime_ui_TouchEventManager;
lime_ui_TouchEventManager.__name__ = ["lime","ui","TouchEventManager"];
lime_ui_TouchEventManager.eventInfo = null;
lime_ui_TouchEventManager.window = null;
lime_ui_TouchEventManager.create = function() {
	lime_ui_TouchEventManager.eventInfo = new lime_ui__$TouchEventManager_TouchEventInfo();
};
lime_ui_TouchEventManager.handleEvent = function(event) {
	event.preventDefault();
	var _g = event.type;
	switch(_g) {
	case "touchstart":
		lime_ui_TouchEventManager.eventInfo.type = 0;
		break;
	case "touchmove":
		lime_ui_TouchEventManager.eventInfo.type = 2;
		break;
	case "touchend":
		lime_ui_TouchEventManager.eventInfo.type = 1;
		break;
	default:
		lime_ui_TouchEventManager.eventInfo.type = null;
	}
	var touch = event.changedTouches[0];
	lime_ui_TouchEventManager.eventInfo.id = touch.identifier;
	if(lime_ui_TouchEventManager.window != null && lime_ui_TouchEventManager.window.element != null) {
		if(lime_ui_TouchEventManager.window.canvas != null) {
			var rect = lime_ui_TouchEventManager.window.canvas.getBoundingClientRect();
			lime_ui_TouchEventManager.eventInfo.x = (touch.clientX - rect.left) * (lime_ui_TouchEventManager.window.width / rect.width);
			lime_ui_TouchEventManager.eventInfo.y = (touch.clientY - rect.top) * (lime_ui_TouchEventManager.window.height / rect.height);
		} else if(lime_ui_TouchEventManager.window.div != null) {
			var rect1 = lime_ui_TouchEventManager.window.div.getBoundingClientRect();
			lime_ui_TouchEventManager.eventInfo.x = touch.clientX - rect1.left;
			lime_ui_TouchEventManager.eventInfo.y = touch.clientY - rect1.top;
		} else {
			var rect2 = lime_ui_TouchEventManager.window.element.getBoundingClientRect();
			lime_ui_TouchEventManager.eventInfo.x = (touch.clientX - rect2.left) * (lime_ui_TouchEventManager.window.width / rect2.width);
			lime_ui_TouchEventManager.eventInfo.y = (touch.clientY - rect2.top) * (lime_ui_TouchEventManager.window.height / rect2.height);
		}
	} else {
		lime_ui_TouchEventManager.eventInfo.x = touch.clientX;
		lime_ui_TouchEventManager.eventInfo.y = touch.clientY;
	}
	var _g1 = lime_ui_TouchEventManager.eventInfo.type;
	switch(_g1) {
	case 0:
		var listeners = lime_ui_TouchEventManager.onTouchStart.listeners;
		var repeat = lime_ui_TouchEventManager.onTouchStart.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](lime_ui_TouchEventManager.eventInfo.x,lime_ui_TouchEventManager.eventInfo.y,lime_ui_TouchEventManager.eventInfo.id);
			if(!repeat[i]) {
				lime_ui_TouchEventManager.onTouchStart.remove(listeners[i]);
				length--;
			} else i++;
		}
		break;
	case 1:
		var listeners1 = lime_ui_TouchEventManager.onTouchEnd.listeners;
		var repeat1 = lime_ui_TouchEventManager.onTouchEnd.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](lime_ui_TouchEventManager.eventInfo.x,lime_ui_TouchEventManager.eventInfo.y,lime_ui_TouchEventManager.eventInfo.id);
			if(!repeat1[i1]) {
				lime_ui_TouchEventManager.onTouchEnd.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		break;
	case 2:
		var listeners2 = lime_ui_TouchEventManager.onTouchMove.listeners;
		var repeat2 = lime_ui_TouchEventManager.onTouchMove.repeat;
		var length2 = listeners2.length;
		var i2 = 0;
		while(i2 < length2) {
			listeners2[i2](lime_ui_TouchEventManager.eventInfo.x,lime_ui_TouchEventManager.eventInfo.y,lime_ui_TouchEventManager.eventInfo.id);
			if(!repeat2[i2]) {
				lime_ui_TouchEventManager.onTouchMove.remove(listeners2[i2]);
				length2--;
			} else i2++;
		}
		break;
	}
};
lime_ui_TouchEventManager.registerWindow = function(window) {
	window.element.addEventListener("touchstart",lime_ui_TouchEventManager.handleEvent,true);
	window.element.addEventListener("touchmove",lime_ui_TouchEventManager.handleEvent,true);
	window.element.addEventListener("touchend",lime_ui_TouchEventManager.handleEvent,true);
	lime_ui_TouchEventManager.window = window;
};
var lime_ui__$TouchEventManager_TouchEventInfo = function(type,x,y,id) {
	if(id == null) id = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.type = type;
	this.x = x;
	this.y = y;
	this.id = id;
};
$hxClasses["lime.ui._TouchEventManager.TouchEventInfo"] = lime_ui__$TouchEventManager_TouchEventInfo;
lime_ui__$TouchEventManager_TouchEventInfo.__name__ = ["lime","ui","_TouchEventManager","TouchEventInfo"];
lime_ui__$TouchEventManager_TouchEventInfo.prototype = {
	clone: function() {
		return new lime_ui__$TouchEventManager_TouchEventInfo(this.type,this.x,this.y,this.id);
	}
	,__class__: lime_ui__$TouchEventManager_TouchEventInfo
};
var lime_ui__$TouchEventManager_TouchEventType_$Impl_$ = function() { };
$hxClasses["lime.ui._TouchEventManager.TouchEventType_Impl_"] = lime_ui__$TouchEventManager_TouchEventType_$Impl_$;
lime_ui__$TouchEventManager_TouchEventType_$Impl_$.__name__ = ["lime","ui","_TouchEventManager","TouchEventType_Impl_"];
var lime_ui__$Window_WindowEventInfo = function(type,width,height,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.type = type;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
};
$hxClasses["lime.ui._Window.WindowEventInfo"] = lime_ui__$Window_WindowEventInfo;
lime_ui__$Window_WindowEventInfo.__name__ = ["lime","ui","_Window","WindowEventInfo"];
lime_ui__$Window_WindowEventInfo.prototype = {
	clone: function() {
		return new lime_ui__$Window_WindowEventInfo(this.type,this.width,this.height,this.x,this.y);
	}
	,__class__: lime_ui__$Window_WindowEventInfo
};
var lime_ui_Window = function(config) {
	this.config = config;
	if(!lime_ui_Window.registered) lime_ui_Window.registered = true;
};
$hxClasses["lime.ui.Window"] = lime_ui_Window;
lime_ui_Window.__name__ = ["lime","ui","Window"];
lime_ui_Window.registered = null;
lime_ui_Window.prototype = {
	create: function(application) {
		this.setWidth = this.width;
		this.setHeight = this.height;
		if(js_Boot.__instanceof(this.element,HTMLCanvasElement)) this.canvas = this.element; else this.canvas = window.document.createElement("canvas");
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
		if(this.width == 0 && this.height == 0) {
			if(this.element != null) {
				this.width = this.element.clientWidth;
				this.height = this.element.clientHeight;
			} else {
				this.width = window.innerWidth;
				this.height = window.innerHeight;
			}
			this.fullscreen = true;
		}
		if(this.canvas != null) {
			this.canvas.width = this.width;
			this.canvas.height = this.height;
		} else {
			this.div.style.width = this.width + "px";
			this.div.style.height = this.height + "px";
		}
		this.handleDOMResize();
		if(this.element != null) {
			if(this.canvas != null) {
				if(this.element != this.canvas) this.element.appendChild(this.canvas);
			} else this.element.appendChild(this.div);
		}
		lime_ui_KeyEventManager.registerWindow(this);
		lime_ui_MouseEventManager.registerWindow(this);
		lime_ui_TouchEventManager.registerWindow(this);
		window.addEventListener("focus",$bind(this,this.handleDOMEvent),false);
		window.addEventListener("blur",$bind(this,this.handleDOMEvent),false);
		window.addEventListener("resize",$bind(this,this.handleDOMEvent),false);
		window.addEventListener("beforeunload",$bind(this,this.handleDOMEvent),false);
		if(this.currentRenderer != null) this.currentRenderer.create();
	}
	,dispatch: function() {
		var _g = lime_ui_Window.eventInfo.type;
		switch(_g) {
		case 0:
			var listeners = lime_ui_Window.onWindowActivate.listeners;
			var repeat = lime_ui_Window.onWindowActivate.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i]();
				if(!repeat[i]) {
					lime_ui_Window.onWindowActivate.remove(listeners[i]);
					length--;
				} else i++;
			}
			break;
		case 1:
			var listeners1 = lime_ui_Window.onWindowClose.listeners;
			var repeat1 = lime_ui_Window.onWindowClose.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1]();
				if(!repeat1[i1]) {
					lime_ui_Window.onWindowClose.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		case 2:
			var listeners2 = lime_ui_Window.onWindowDeactivate.listeners;
			var repeat2 = lime_ui_Window.onWindowDeactivate.repeat;
			var length2 = listeners2.length;
			var i2 = 0;
			while(i2 < length2) {
				listeners2[i2]();
				if(!repeat2[i2]) {
					lime_ui_Window.onWindowDeactivate.remove(listeners2[i2]);
					length2--;
				} else i2++;
			}
			break;
		case 3:
			var listeners3 = lime_ui_Window.onWindowFocusIn.listeners;
			var repeat3 = lime_ui_Window.onWindowFocusIn.repeat;
			var length3 = listeners3.length;
			var i3 = 0;
			while(i3 < length3) {
				listeners3[i3]();
				if(!repeat3[i3]) {
					lime_ui_Window.onWindowFocusIn.remove(listeners3[i3]);
					length3--;
				} else i3++;
			}
			break;
		case 4:
			var listeners4 = lime_ui_Window.onWindowFocusOut.listeners;
			var repeat4 = lime_ui_Window.onWindowFocusOut.repeat;
			var length4 = listeners4.length;
			var i4 = 0;
			while(i4 < length4) {
				listeners4[i4]();
				if(!repeat4[i4]) {
					lime_ui_Window.onWindowFocusOut.remove(listeners4[i4]);
					length4--;
				} else i4++;
			}
			break;
		case 5:
			this.x = lime_ui_Window.eventInfo.x;
			this.y = lime_ui_Window.eventInfo.y;
			var listeners5 = lime_ui_Window.onWindowMove.listeners;
			var repeat5 = lime_ui_Window.onWindowMove.repeat;
			var length5 = listeners5.length;
			var i5 = 0;
			while(i5 < length5) {
				listeners5[i5](lime_ui_Window.eventInfo.x,lime_ui_Window.eventInfo.y);
				if(!repeat5[i5]) {
					lime_ui_Window.onWindowMove.remove(listeners5[i5]);
					length5--;
				} else i5++;
			}
			break;
		case 6:
			this.width = lime_ui_Window.eventInfo.width;
			this.height = lime_ui_Window.eventInfo.height;
			var listeners6 = lime_ui_Window.onWindowResize.listeners;
			var repeat6 = lime_ui_Window.onWindowResize.repeat;
			var length6 = listeners6.length;
			var i6 = 0;
			while(i6 < length6) {
				listeners6[i6](lime_ui_Window.eventInfo.width,lime_ui_Window.eventInfo.height);
				if(!repeat6[i6]) {
					lime_ui_Window.onWindowResize.remove(listeners6[i6]);
					length6--;
				} else i6++;
			}
			break;
		}
	}
	,handleDOMEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "focus":
			lime_ui_Window.eventInfo.type = 3;
			this.dispatch();
			lime_ui_Window.eventInfo.type = 0;
			this.dispatch();
			break;
		case "blur":
			lime_ui_Window.eventInfo.type = 4;
			this.dispatch();
			lime_ui_Window.eventInfo.type = 2;
			this.dispatch();
			break;
		case "resize":
			var cacheWidth = this.width;
			var cacheHeight = this.height;
			this.handleDOMResize();
			if(this.width != cacheWidth || this.height != cacheHeight) {
				lime_ui_Window.eventInfo.type = 6;
				lime_ui_Window.eventInfo.width = this.width;
				lime_ui_Window.eventInfo.height = this.height;
				this.dispatch();
			}
			break;
		case "beforeunload":
			lime_ui_Window.eventInfo.type = 1;
			this.dispatch();
			break;
		}
	}
	,handleDOMResize: function() {
		var stretch = this.fullscreen || this.setWidth == 0 && this.setHeight == 0;
		if(this.element != null && (this.div == null || this.div != null && stretch)) {
			if(stretch) {
				if(this.width != this.element.clientWidth || this.height != this.element.clientHeight) {
					this.width = this.element.clientWidth;
					this.height = this.element.clientHeight;
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
	,move: function(x,y) {
	}
	,resize: function(width,height) {
		this.setWidth = width;
		this.setHeight = height;
	}
	,setIcon: function(image) {
		if(image == null) return;
	}
	,__class__: lime_ui_Window
};
var lime_ui__$Window_WindowFlags_$Impl_$ = function() { };
$hxClasses["lime.ui._Window.WindowFlags_Impl_"] = lime_ui__$Window_WindowFlags_$Impl_$;
lime_ui__$Window_WindowFlags_$Impl_$.__name__ = ["lime","ui","_Window","WindowFlags_Impl_"];
var lime_ui__$Window_WindowEventType_$Impl_$ = function() { };
$hxClasses["lime.ui._Window.WindowEventType_Impl_"] = lime_ui__$Window_WindowEventType_$Impl_$;
lime_ui__$Window_WindowEventType_$Impl_$.__name__ = ["lime","ui","_Window","WindowEventType_Impl_"];
var lime_utils_ByteArray = function(size) {
	if(size == null) size = 0;
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	if(size > 0) this.allocated = size;
	this.___resizeBuffer(this.allocated);
	this.set_length(this.allocated);
};
$hxClasses["lime.utils.ByteArray"] = lime_utils_ByteArray;
lime_utils_ByteArray.__name__ = ["lime","utils","ByteArray"];
lime_utils_ByteArray.fromBytes = function(bytes) {
	var result = new lime_utils_ByteArray();
	result.byteView = new Uint8Array(bytes.b);
	result.set_length(result.byteView.length);
	result.allocated = result.length;
	return result;
};
lime_utils_ByteArray.readFile = function(path) {
	return null;
};
lime_utils_ByteArray.__ofBuffer = function(buffer) {
	var bytes = new lime_utils_ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
};
lime_utils_ByteArray.prototype = {
	clear: function() {
		if(this.allocated < 0) this.___resizeBuffer(this.allocated = Std["int"](Math.max(0,this.allocated * 2))); else if(this.allocated > 0) this.___resizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
		this.position = 0;
	}
	,compress: function(algorithm) {
	}
	,deflate: function() {
		this.compress(lime_utils_CompressionAlgorithm.DEFLATE);
	}
	,inflate: function() {
		this.uncompress(lime_utils_CompressionAlgorithm.DEFLATE);
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
		haxe_Log.trace("Warning: ByteArray.uncompress on JS target requires the 'format' haxelib",{ fileName : "ByteArray.hx", lineNumber : 659, className : "lime.utils.ByteArray", methodName : "uncompress"});
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
	,__class__: lime_utils_ByteArray
	,__properties__: {set_length:"set_length",set_endian:"set_endian",get_endian:"get_endian",get_bytesAvailable:"get_bytesAvailable"}
};
var lime_utils_CompressionAlgorithm = $hxClasses["lime.utils.CompressionAlgorithm"] = { __ename__ : true, __constructs__ : ["DEFLATE","ZLIB","LZMA","GZIP"] };
lime_utils_CompressionAlgorithm.DEFLATE = ["DEFLATE",0];
lime_utils_CompressionAlgorithm.DEFLATE.toString = $estr;
lime_utils_CompressionAlgorithm.DEFLATE.__enum__ = lime_utils_CompressionAlgorithm;
lime_utils_CompressionAlgorithm.ZLIB = ["ZLIB",1];
lime_utils_CompressionAlgorithm.ZLIB.toString = $estr;
lime_utils_CompressionAlgorithm.ZLIB.__enum__ = lime_utils_CompressionAlgorithm;
lime_utils_CompressionAlgorithm.LZMA = ["LZMA",2];
lime_utils_CompressionAlgorithm.LZMA.toString = $estr;
lime_utils_CompressionAlgorithm.LZMA.__enum__ = lime_utils_CompressionAlgorithm;
lime_utils_CompressionAlgorithm.GZIP = ["GZIP",3];
lime_utils_CompressionAlgorithm.GZIP.toString = $estr;
lime_utils_CompressionAlgorithm.GZIP.__enum__ = lime_utils_CompressionAlgorithm;
var lime_utils_GLUtils = function() { };
$hxClasses["lime.utils.GLUtils"] = lime_utils_GLUtils;
lime_utils_GLUtils.__name__ = ["lime","utils","GLUtils"];
lime_utils_GLUtils.compileShader = function(source,type) {
	var shader = lime_graphics_opengl_GL.context.createShader(type);
	lime_graphics_opengl_GL.context.shaderSource(shader,source);
	lime_graphics_opengl_GL.context.compileShader(shader);
	if(lime_graphics_opengl_GL.context.getShaderParameter(shader,35713) == 0) switch(type) {
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
lime_utils_GLUtils.createProgram = function(vertexSource,fragmentSource) {
	var vertexShader = lime_utils_GLUtils.compileShader(vertexSource,35633);
	var fragmentShader = lime_utils_GLUtils.compileShader(fragmentSource,35632);
	var program = lime_graphics_opengl_GL.context.createProgram();
	lime_graphics_opengl_GL.context.attachShader(program,vertexShader);
	lime_graphics_opengl_GL.context.attachShader(program,fragmentShader);
	lime_graphics_opengl_GL.context.linkProgram(program);
	if(lime_graphics_opengl_GL.context.getProgramParameter(program,35714) == 0) throw "Unable to initialize the shader program.";
	return program;
};
var lime_utils_IDataInput = function() { };
$hxClasses["lime.utils.IDataInput"] = lime_utils_IDataInput;
lime_utils_IDataInput.__name__ = ["lime","utils","IDataInput"];
lime_utils_IDataInput.prototype = {
	__class__: lime_utils_IDataInput
	,__properties__: {set_endian:"set_endian",get_endian:"get_endian",get_bytesAvailable:"get_bytesAvailable"}
};
var lime_utils_IMemoryRange = function() { };
$hxClasses["lime.utils.IMemoryRange"] = lime_utils_IMemoryRange;
lime_utils_IMemoryRange.__name__ = ["lime","utils","IMemoryRange"];
lime_utils_IMemoryRange.prototype = {
	__class__: lime_utils_IMemoryRange
};
var openfl_display_MovieClip = function() {
	openfl_display_Sprite.call(this);
	this.__currentFrame = 0;
	this.__currentLabels = [];
	this.__totalFrames = 0;
	this.enabled = true;
	this.loaderInfo = openfl_display_LoaderInfo.create(null);
};
$hxClasses["openfl.display.MovieClip"] = openfl_display_MovieClip;
openfl_display_MovieClip.__name__ = ["openfl","display","MovieClip"];
openfl_display_MovieClip.__super__ = openfl_display_Sprite;
openfl_display_MovieClip.prototype = $extend(openfl_display_Sprite.prototype,{
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
	,__class__: openfl_display_MovieClip
	,__properties__: $extend(openfl_display_Sprite.prototype.__properties__,{get_totalFrames:"get_totalFrames",get_framesLoaded:"get_framesLoaded",get_currentLabels:"get_currentLabels",get_currentLabel:"get_currentLabel",get_currentFrameLabel:"get_currentFrameLabel",get_currentFrame:"get_currentFrame"})
});
var openfl_display_LoaderInfo = function() {
	openfl_events_EventDispatcher.call(this);
	this.applicationDomain = openfl_system_ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["openfl.display.LoaderInfo"] = openfl_display_LoaderInfo;
openfl_display_LoaderInfo.__name__ = ["openfl","display","LoaderInfo"];
openfl_display_LoaderInfo.create = function(loader) {
	var loaderInfo = new openfl_display_LoaderInfo();
	loaderInfo.uncaughtErrorEvents = new openfl_events_UncaughtErrorEvents();
	if(loader != null) loaderInfo.loader = loader; else loaderInfo.url = "";
	return loaderInfo;
};
openfl_display_LoaderInfo.__super__ = openfl_events_EventDispatcher;
openfl_display_LoaderInfo.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_LoaderInfo
});
var openfl_system_ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = openfl_system_ApplicationDomain.currentDomain;
};
$hxClasses["openfl.system.ApplicationDomain"] = openfl_system_ApplicationDomain;
openfl_system_ApplicationDomain.__name__ = ["openfl","system","ApplicationDomain"];
openfl_system_ApplicationDomain.prototype = {
	getDefinition: function(name) {
		return Type.resolveClass(name);
	}
	,hasDefinition: function(name) {
		return Type.resolveClass(name) != null;
	}
	,__class__: openfl_system_ApplicationDomain
};
var openfl_events_UncaughtErrorEvents = function(target) {
	openfl_events_EventDispatcher.call(this,target);
};
$hxClasses["openfl.events.UncaughtErrorEvents"] = openfl_events_UncaughtErrorEvents;
openfl_events_UncaughtErrorEvents.__name__ = ["openfl","events","UncaughtErrorEvents"];
openfl_events_UncaughtErrorEvents.__super__ = openfl_events_EventDispatcher;
openfl_events_UncaughtErrorEvents.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_events_UncaughtErrorEvents
});
var openfl_geom_Matrix = function(a,b,c,d,tx,ty) {
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
$hxClasses["openfl.geom.Matrix"] = openfl_geom_Matrix;
openfl_geom_Matrix.__name__ = ["openfl","geom","Matrix"];
openfl_geom_Matrix.prototype = {
	clone: function() {
		return new openfl_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
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
		return new openfl_geom_Point(point.x * this.a + point.y * this.c,point.x * this.b + point.y * this.d);
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
		var result = new openfl_geom_Matrix();
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
		return new openfl_geom_Point(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		var m = new openfl_geom_Matrix();
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
	,__class__: openfl_geom_Matrix
};
var openfl_Lib = function() { };
$hxClasses["openfl.Lib"] = openfl_Lib;
openfl_Lib.__name__ = ["openfl","Lib"];
openfl_Lib.application = null;
openfl_Lib["as"] = function(v,c) {
	if(js_Boot.__instanceof(v,c)) return v; else return null;
};
openfl_Lib.attach = function(name) {
	return new openfl_display_MovieClip();
};
openfl_Lib.embed = $hx_exports.openfl.embed = function(elementName,width,height,background) {
	lime_system_System.embed(elementName,width,height,background);
};
openfl_Lib.getTimer = function() {
	return Std["int"]((haxe_Timer.stamp() - openfl_Lib.__startTime) * 1000);
};
openfl_Lib.getURL = function(request,target) {
	if(target == null) target = "_blank";
	window.open(request.url,target);
};
openfl_Lib.notImplemented = function(api) {
	if(!openfl_Lib.__sentWarnings.exists(api)) {
		openfl_Lib.__sentWarnings.set(api,true);
		haxe_Log.trace("Warning: " + api + " is not implemented",{ fileName : "Lib.hx", lineNumber : 117, className : "openfl.Lib", methodName : "notImplemented"});
	}
};
openfl_Lib.preventDefaultTouchMove = function() {
	window.document.addEventListener("touchmove",function(evt) {
		evt.preventDefault();
	},false);
};
openfl_Lib.trace = function(arg) {
	haxe_Log.trace(arg,{ fileName : "Lib.hx", lineNumber : 148, className : "openfl.Lib", methodName : "trace"});
};
var openfl_Memory = function() { };
$hxClasses["openfl.Memory"] = openfl_Memory;
openfl_Memory.__name__ = ["openfl","Memory"];
openfl_Memory.gcRef = null;
openfl_Memory.len = null;
openfl_Memory._setPositionTemporarily = function(position,action) {
	var oldPosition = openfl_Memory.gcRef.position;
	openfl_Memory.gcRef.position = position;
	var value = action();
	openfl_Memory.gcRef.position = oldPosition;
	return value;
};
openfl_Memory.getByte = function(addr) {
	return openfl_Memory.gcRef.data.getInt8(addr);
};
openfl_Memory.getDouble = function(addr) {
	return openfl_Memory._setPositionTemporarily(addr,function() {
		return openfl_Memory.gcRef.readDouble();
	});
};
openfl_Memory.getFloat = function(addr) {
	return openfl_Memory._setPositionTemporarily(addr,function() {
		return openfl_Memory.gcRef.readFloat();
	});
};
openfl_Memory.getI32 = function(addr) {
	return openfl_Memory._setPositionTemporarily(addr,function() {
		return openfl_Memory.gcRef.readInt();
	});
};
openfl_Memory.getUI16 = function(addr) {
	return openfl_Memory._setPositionTemporarily(addr,function() {
		return openfl_Memory.gcRef.readUnsignedShort();
	});
};
openfl_Memory.select = function(inBytes) {
	openfl_Memory.gcRef = inBytes;
	if(inBytes != null) openfl_Memory.len = inBytes.length; else openfl_Memory.len = 0;
};
openfl_Memory.setByte = function(addr,v) {
	openfl_Memory.gcRef.data.setUint8(addr,v);
};
openfl_Memory.setDouble = function(addr,v) {
	openfl_Memory._setPositionTemporarily(addr,function() {
		openfl_Memory.gcRef.writeDouble(v);
	});
};
openfl_Memory.setFloat = function(addr,v) {
	openfl_Memory._setPositionTemporarily(addr,function() {
		openfl_Memory.gcRef.writeFloat(v);
	});
};
openfl_Memory.setI16 = function(addr,v) {
	openfl_Memory._setPositionTemporarily(addr,function() {
		openfl_Memory.gcRef.writeUnsignedShort(v);
	});
};
openfl_Memory.setI32 = function(addr,v) {
	openfl_Memory._setPositionTemporarily(addr,function() {
		openfl_Memory.gcRef.writeInt(v);
	});
};
var openfl__$Vector_Vector_$Impl_$ = function() { };
$hxClasses["openfl._Vector.Vector_Impl_"] = openfl__$Vector_Vector_$Impl_$;
openfl__$Vector_Vector_$Impl_$.__name__ = ["openfl","_Vector","Vector_Impl_"];
openfl__$Vector_Vector_$Impl_$.__properties__ = {set_fixed:"set_fixed",get_fixed:"get_fixed",set_length:"set_length",get_length:"get_length"}
openfl__$Vector_Vector_$Impl_$._new = function(length,fixed) {
	if(fixed == null) fixed = false;
	if(length == null) length = 0;
	var this1;
	this1 = new openfl_VectorData();
	var this2;
	this2 = new Array(length);
	this1.data = this2;
	this1.length = length;
	this1.fixed = fixed;
	return this1;
};
openfl__$Vector_Vector_$Impl_$.concat = function(this1,a) {
	var vectorData = new openfl_VectorData();
	if(a != null) vectorData.length = this1.length + a.length; else vectorData.length = this1.length;
	vectorData.fixed = false;
	var this2;
	this2 = new Array(vectorData.length);
	vectorData.data = this2;
	haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,0,vectorData.data,0,this1.length);
	if(a != null) haxe_ds__$Vector_Vector_$Impl_$.blit(a.data,0,vectorData.data,this1.length,a.length);
	return vectorData;
};
openfl__$Vector_Vector_$Impl_$.copy = function(this1) {
	var vectorData = new openfl_VectorData();
	vectorData.length = this1.length;
	vectorData.fixed = this1.fixed;
	var this2;
	this2 = new Array(this1.length);
	vectorData.data = this2;
	haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,0,vectorData.data,0,this1.length);
	return vectorData;
};
openfl__$Vector_Vector_$Impl_$.iterator = function(this1) {
	return new openfl_VectorDataIterator(this1);
};
openfl__$Vector_Vector_$Impl_$.join = function(this1,sep) {
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
openfl__$Vector_Vector_$Impl_$.pop = function(this1) {
	var value = null;
	if(!this1.fixed) {
		if(this1.length > 0) {
			this1.length--;
			value = this1.data[this1.length];
		}
	}
	return value;
};
openfl__$Vector_Vector_$Impl_$.push = function(this1,x) {
	if(!this1.fixed) {
		this1.length++;
		if(this1.data.length < this1.length) {
			var data;
			var this2;
			this2 = new Array(this1.data.length + 10);
			data = this2;
			haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,0,data,0,this1.data.length);
			this1.data = data;
		}
		this1.data[this1.length - 1] = x;
	}
	return this1.length;
};
openfl__$Vector_Vector_$Impl_$.reverse = function(this1) {
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
openfl__$Vector_Vector_$Impl_$.shift = function(this1) {
	if(!this1.fixed && this1.length > 0) {
		this1.length--;
		var value = this1.data[0];
		haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,1,this1.data,0,this1.length);
		return value;
	}
	return null;
};
openfl__$Vector_Vector_$Impl_$.unshift = function(this1,x) {
	if(!this1.fixed) {
		this1.length++;
		if(this1.data.length < this1.length) {
			var data;
			var this2;
			this2 = new Array(this1.length + 10);
			data = this2;
			haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,0,data,1,this1.data.length);
			this1.data = data;
		} else haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,0,this1.data,1,this1.length - 1);
		this1.data[0] = x;
	}
};
openfl__$Vector_Vector_$Impl_$.slice = function(this1,pos,end) {
	if(end == null) end = 0;
	if(pos == null) pos = 0;
	if(pos < 0) pos += this1.length;
	if(end <= 0) end += this1.length;
	if(end > this1.length) end = this1.length;
	var length = end - pos;
	if(length <= 0 || length > this1.length) length = this1.length;
	var vectorData = new openfl_VectorData();
	vectorData.length = end - pos;
	vectorData.fixed = true;
	var this2;
	this2 = new Array(length);
	vectorData.data = this2;
	haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,pos,vectorData.data,0,length);
	return vectorData;
};
openfl__$Vector_Vector_$Impl_$.sort = function(this1,f) {
	var array = haxe_ds__$Vector_Vector_$Impl_$.toArray(this1.data);
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
openfl__$Vector_Vector_$Impl_$.splice = function(this1,pos,len) {
	if(pos < 0) pos += this1.length;
	if(pos + len > this1.length) len = this1.length - pos;
	if(len < 0) len = 0;
	var vectorData = new openfl_VectorData();
	vectorData.length = len;
	vectorData.fixed = false;
	var this2;
	this2 = new Array(len);
	vectorData.data = this2;
	haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,pos,vectorData.data,0,len);
	if(len > 0) {
		this1.length -= len;
		haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,pos + len,this1.data,pos,this1.length - pos);
	}
	return vectorData;
};
openfl__$Vector_Vector_$Impl_$.toString = function(this1) {
	return haxe_ds__$Vector_Vector_$Impl_$.toArray(this1.data).toString();
};
openfl__$Vector_Vector_$Impl_$.indexOf = function(this1,x,from) {
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
openfl__$Vector_Vector_$Impl_$.lastIndexOf = function(this1,x,from) {
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
openfl__$Vector_Vector_$Impl_$.ofArray = function(a) {
	var vectorData = new openfl_VectorData();
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
openfl__$Vector_Vector_$Impl_$.convert = function(v) {
	return v;
};
openfl__$Vector_Vector_$Impl_$.get = function(this1,index) {
	return this1.data[index];
};
openfl__$Vector_Vector_$Impl_$.set = function(this1,key,value) {
	if(!this1.fixed) {
		if(key >= this1.length) this1.length = key + 1;
		if(this1.data.length < this1.length) {
			var data;
			var this2;
			this2 = new Array(this1.data.length + 10);
			data = this2;
			haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,0,data,0,this1.data.length);
			this1.data = data;
		}
	}
	return this1.data[key] = value;
};
openfl__$Vector_Vector_$Impl_$.fromArray = function(value) {
	var vectorData = new openfl_VectorData();
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
openfl__$Vector_Vector_$Impl_$.toArray = function(this1) {
	var value = new Array();
	var _g1 = 0;
	var _g = this1.data.length;
	while(_g1 < _g) {
		var i = _g1++;
		value.push(this1.data[i]);
	}
	return value;
};
openfl__$Vector_Vector_$Impl_$.fromHaxeVector = function(value) {
	var vectorData = new openfl_VectorData();
	vectorData.length = value.length;
	vectorData.fixed = true;
	vectorData.data = value;
	return vectorData;
};
openfl__$Vector_Vector_$Impl_$.toHaxeVector = function(this1) {
	return this1.data;
};
openfl__$Vector_Vector_$Impl_$.fromVectorData = function(value) {
	return value;
};
openfl__$Vector_Vector_$Impl_$.toVectorData = function(this1) {
	return this1;
};
openfl__$Vector_Vector_$Impl_$.get_length = function(this1) {
	return this1.length;
};
openfl__$Vector_Vector_$Impl_$.set_length = function(this1,value) {
	if(!this1.fixed) {
		if(value > this1.length) {
			var data;
			var this2;
			this2 = new Array(value);
			data = this2;
			haxe_ds__$Vector_Vector_$Impl_$.blit(this1.data,0,data,0,Std["int"](Math.min(this1.data.length,value)));
			this1.data = data;
		}
		this1.length = value;
	}
	return value;
};
openfl__$Vector_Vector_$Impl_$.get_fixed = function(this1) {
	return this1.fixed;
};
openfl__$Vector_Vector_$Impl_$.set_fixed = function(this1,value) {
	return this1.fixed = value;
};
var openfl_VectorData = function() {
	this.length = 0;
};
$hxClasses["openfl.VectorData"] = openfl_VectorData;
openfl_VectorData.__name__ = ["openfl","VectorData"];
openfl_VectorData.prototype = {
	__class__: openfl_VectorData
};
var openfl_VectorDataIterator = function(data) {
	this.index = 0;
	this.vectorData = data;
};
$hxClasses["openfl.VectorDataIterator"] = openfl_VectorDataIterator;
openfl_VectorDataIterator.__name__ = ["openfl","VectorDataIterator"];
openfl_VectorDataIterator.prototype = {
	hasNext: function() {
		return this.index < this.vectorData.length;
	}
	,next: function() {
		var index = this.index++;
		return this.vectorData.data[index];
	}
	,__class__: openfl_VectorDataIterator
};
var openfl__$internal_renderer_AbstractRenderer = function(width,height) {
	this.width = width;
	this.height = height;
};
$hxClasses["openfl._internal.renderer.AbstractRenderer"] = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_AbstractRenderer.__name__ = ["openfl","_internal","renderer","AbstractRenderer"];
openfl__$internal_renderer_AbstractRenderer.prototype = {
	render: function(stage) {
	}
	,renderShape: function(shape) {
	}
	,resize: function(width,height) {
	}
	,__class__: openfl__$internal_renderer_AbstractRenderer
};
var openfl__$internal_renderer_RenderSession = function() {
};
$hxClasses["openfl._internal.renderer.RenderSession"] = openfl__$internal_renderer_RenderSession;
openfl__$internal_renderer_RenderSession.__name__ = ["openfl","_internal","renderer","RenderSession"];
openfl__$internal_renderer_RenderSession.prototype = {
	__class__: openfl__$internal_renderer_RenderSession
};
var openfl__$internal_renderer_canvas_CanvasBitmap = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasBitmap"] = openfl__$internal_renderer_canvas_CanvasBitmap;
openfl__$internal_renderer_canvas_CanvasBitmap.__name__ = ["openfl","_internal","renderer","canvas","CanvasBitmap"];
openfl__$internal_renderer_canvas_CanvasBitmap.render = function(bitmap,renderSession) {
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
var openfl__$internal_renderer_canvas_CanvasGraphics = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasGraphics"] = openfl__$internal_renderer_canvas_CanvasGraphics;
openfl__$internal_renderer_canvas_CanvasGraphics.__name__ = ["openfl","_internal","renderer","canvas","CanvasGraphics"];
openfl__$internal_renderer_canvas_CanvasGraphics.bounds = null;
openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = null;
openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = null;
openfl__$internal_renderer_canvas_CanvasGraphics.inPath = null;
openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = null;
openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = null;
openfl__$internal_renderer_canvas_CanvasGraphics.positionX = null;
openfl__$internal_renderer_canvas_CanvasGraphics.positionY = null;
openfl__$internal_renderer_canvas_CanvasGraphics.setFill = null;
openfl__$internal_renderer_canvas_CanvasGraphics.context = null;
openfl__$internal_renderer_canvas_CanvasGraphics.pattern = null;
openfl__$internal_renderer_canvas_CanvasGraphics.beginPath = function() {
	if(!openfl__$internal_renderer_canvas_CanvasGraphics.inPath) {
		openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
		openfl__$internal_renderer_canvas_CanvasGraphics.inPath = true;
	}
};
openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill = function(bitmapFill,bitmapRepeat) {
	if(openfl__$internal_renderer_canvas_CanvasGraphics.setFill || bitmapFill == null) return;
	if(openfl__$internal_renderer_canvas_CanvasGraphics.pattern == null) openfl__$internal_renderer_canvas_CanvasGraphics.pattern = openfl__$internal_renderer_canvas_CanvasGraphics.context.createPattern(bitmapFill.__image.get_src(),bitmapRepeat?"repeat":"no-repeat");
	openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = openfl__$internal_renderer_canvas_CanvasGraphics.pattern;
	openfl__$internal_renderer_canvas_CanvasGraphics.setFill = true;
};
openfl__$internal_renderer_canvas_CanvasGraphics.closePath = function(closeFill) {
	if(openfl__$internal_renderer_canvas_CanvasGraphics.inPath) {
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill) {
			openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(-openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x,-openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y);
			if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix != null) {
				openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.a,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.b,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.c,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.d,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.tx,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.ty);
				openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.a,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.b,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.c,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.d,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.tx,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.ty);
			} else openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y);
		}
		openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) openfl__$internal_renderer_canvas_CanvasGraphics.context.stroke();
	}
	openfl__$internal_renderer_canvas_CanvasGraphics.inPath = false;
	if(closeFill) {
		openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = null;
		openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = null;
	}
};
openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect = function(x,y,width,height,rx,ry) {
	if(ry == -1) ry = rx;
	rx *= 0.5;
	ry *= 0.5;
	if(rx > width / 2) rx = width / 2;
	if(ry > height / 2) ry = height / 2;
	var xe = x + width;
	var ye = y + height;
	var cx1 = -rx + rx * openfl__$internal_renderer_canvas_CanvasGraphics.SIN45;
	var cx2 = -rx + rx * openfl__$internal_renderer_canvas_CanvasGraphics.TAN22;
	var cy1 = -ry + ry * openfl__$internal_renderer_canvas_CanvasGraphics.SIN45;
	var cy2 = -ry + ry * openfl__$internal_renderer_canvas_CanvasGraphics.TAN22;
	openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(xe,ye - ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe,ye + cy2,xe + cx1,ye + cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe + cx2,ye,xe - rx,ye);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x + rx,ye);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x - cx2,ye,x - cx1,ye + cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x,ye + cy2,x,ye - ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x,y + ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x,y - cy2,x - cx1,y - cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x - cx2,y,x + rx,y);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(xe - rx,y);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe + cx2,y,xe + cx1,y - cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe,y - cy2,xe,y + ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(xe,ye - ry);
};
openfl__$internal_renderer_canvas_CanvasGraphics.render = function(graphics,renderSession) {
	if(graphics.__dirty) {
		openfl__$internal_renderer_canvas_CanvasGraphics.bounds = graphics.__bounds;
		openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.inPath = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.positionX = 0;
		openfl__$internal_renderer_canvas_CanvasGraphics.positionY = 0;
		if(!graphics.__visible || graphics.__commands.length == 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds == null || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width == 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height == 0) {
			graphics.__canvas = null;
			graphics.__context = null;
		} else {
			if(graphics.__canvas == null) {
				graphics.__canvas = window.document.createElement("canvas");
				graphics.__context = graphics.__canvas.getContext("2d");
			}
			openfl__$internal_renderer_canvas_CanvasGraphics.context = graphics.__context;
			graphics.__canvas.width = Math.ceil(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width);
			graphics.__canvas.height = Math.ceil(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height);
			var offsetX = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x;
			var offsetY = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y;
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
						openfl__$internal_renderer_canvas_CanvasGraphics.closePath(false);
						if(bitmap != bitmapFill || repeat != bitmapRepeat) {
							bitmapFill = bitmap;
							bitmapRepeat = repeat;
							openfl__$internal_renderer_canvas_CanvasGraphics.pattern = null;
							openfl__$internal_renderer_canvas_CanvasGraphics.setFill = false;
							bitmap.__sync();
						}
						if(matrix != null) {
							openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = matrix;
							openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = new openfl_geom_Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
							openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.invert();
						} else {
							openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = null;
							openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = null;
						}
						openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
						break;
					case 1:
						var alpha = command[3];
						var rgb = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.closePath(false);
						if(alpha == 1) openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = "#" + StringTools.hex(rgb,6); else {
							var r = (rgb & 16711680) >>> 16;
							var g = (rgb & 65280) >>> 8;
							var b = rgb & 255;
							openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
						}
						bitmapFill = null;
						openfl__$internal_renderer_canvas_CanvasGraphics.setFill = true;
						openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
						break;
					case 2:
						var y = command[7];
						var x = command[6];
						var cy2 = command[5];
						var cx2 = command[4];
						var cy1 = command[3];
						var cx1 = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPath();
						openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
						openfl__$internal_renderer_canvas_CanvasGraphics.positionX = x;
						openfl__$internal_renderer_canvas_CanvasGraphics.positionY = y;
						break;
					case 3:
						var y1 = command[5];
						var x1 = command[4];
						var cy = command[3];
						var cx = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPath();
						openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
						openfl__$internal_renderer_canvas_CanvasGraphics.positionX = x1;
						openfl__$internal_renderer_canvas_CanvasGraphics.positionY = y1;
						break;
					case 4:
						var radius = command[4];
						var y2 = command[3];
						var x2 = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPath();
						openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x2 - offsetX + radius,y2 - offsetY);
						openfl__$internal_renderer_canvas_CanvasGraphics.context.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2,true);
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
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPath();
						openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x3,ym);
						openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(x3,ym - oy,xm - ox,y3,xm,y3);
						openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm + ox,y3,xe,ym - oy,xe,ym);
						openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
						openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm - ox,ye,x3,ym + oy,x3,ym);
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
							if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix != null) {
								if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.b != 0 || openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.c != 0) canOptimizeMatrix = false; else {
									var stl = openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.transformPoint(new openfl_geom_Point(x4,y4));
									var sbr = openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.transformPoint(new openfl_geom_Point(x4 + width1,y4 + height1));
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
								openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(bitmapFill.__image.get_src(),sl,st,sr - sl,sb - st,x4 - offsetX,y4 - offsetY,width1,height1);
							}
						}
						if(!optimizationUsed) {
							openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
							openfl__$internal_renderer_canvas_CanvasGraphics.beginPath();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.rect(x4 - offsetX,y4 - offsetY,width1,height1);
						}
						break;
					case 7:
						var ry = command[7];
						var rx = command[6];
						var height2 = command[5];
						var width2 = command[4];
						var y5 = command[3];
						var x5 = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPath();
						openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect(x5 - offsetX,y5 - offsetY,width2,height2,rx,ry);
						break;
					case 8:
						var count = command[6];
						var flags = command[5];
						var smooth1 = command[4];
						var tileData = command[3];
						var sheet = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.closePath(false);
						var useScale = (flags & 1) > 0;
						var useRotation = (flags & 2) > 0;
						var useTransform = (flags & 16) > 0;
						var useRGB = (flags & 4) > 0;
						var useAlpha = (flags & 8) > 0;
						var useRect = (flags & 32) > 0;
						var useOrigin = (flags & 64) > 0;
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
								openfl__$internal_renderer_canvas_CanvasGraphics.context.save();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(tileData[index],tileData[index + 1]);
								if(useRotation) openfl__$internal_renderer_canvas_CanvasGraphics.context.rotate(tileData[index + rotationIndex]);
								var scale = 1.0;
								if(useScale) scale = tileData[index + scaleIndex];
								if(useTransform) openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
								if(useAlpha) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalAlpha = tileData[index + alphaIndex];
								openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.restore();
							}
							index += numValues;
						}
						break;
					case 10:
						openfl__$internal_renderer_canvas_CanvasGraphics.closePath(true);
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
						openfl__$internal_renderer_canvas_CanvasGraphics.closePath(false);
						if(thickness == null) openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false; else {
							openfl__$internal_renderer_canvas_CanvasGraphics.context.lineWidth = thickness;
							if(joints == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineJoin = "round"; else openfl__$internal_renderer_canvas_CanvasGraphics.context.lineJoin = Std.string(joints).toLowerCase();
							if(caps == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = "round"; else switch(caps[1]) {
							case 0:
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = "butt";
								break;
							default:
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = Std.string(caps).toLowerCase();
							}
							if(miterLimit == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.miterLimit = 3; else openfl__$internal_renderer_canvas_CanvasGraphics.context.miterLimit = miterLimit;
							if(color == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "#000000"; else openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "#" + StringTools.hex(color & 16777215,6);
							openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = true;
						}
						break;
					case 12:
						var y6 = command[3];
						var x6 = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPath();
						openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x6 - offsetX,y6 - offsetY);
						openfl__$internal_renderer_canvas_CanvasGraphics.positionX = x6;
						openfl__$internal_renderer_canvas_CanvasGraphics.positionY = y6;
						break;
					case 13:
						var y7 = command[3];
						var x7 = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.beginPath();
						openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x7 - offsetX,y7 - offsetY);
						openfl__$internal_renderer_canvas_CanvasGraphics.positionX = x7;
						openfl__$internal_renderer_canvas_CanvasGraphics.positionY = y7;
						break;
					case 9:
						var culling = command[5];
						var uvtData = command[4];
						var indices = command[3];
						var vertices = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.closePath(false);
						var v = vertices;
						var ind = indices;
						var uvt = uvtData;
						var pattern = null;
						var colorFill = bitmapFill == null;
						if(colorFill && uvt != null) throw "__break__";
						if(!colorFill) {
							if(uvtData == null) {
								var this1;
								this1 = new openfl_VectorData();
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
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data,0,uvtData.data.length);
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
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data1,0,uvtData.data.length);
											uvtData.data = data1;
										}
										uvtData.data[uvtData.length - 1] = v.data[i * 2 + 1] / bitmapFill.height;
									}
									uvtData.length;
								}
							}
							var skipT = uvtData.length != v.length;
							var normalizedUvt = openfl__$internal_renderer_canvas_CanvasGraphics.normalizeUvt(uvtData,skipT);
							var maxUvt = normalizedUvt.max;
							uvt = normalizedUvt.uvt;
							if(maxUvt > 1) pattern = openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas(bitmapFill,bitmapRepeat,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height); else pattern = openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas(bitmapFill,bitmapRepeat,bitmapFill.width,bitmapFill.height);
						}
						var i1 = 0;
						var l = ind.length;
						var a;
						var b1;
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
							b1 = i1 + 1;
							c = i1 + 2;
							iax = ind.data[a] * 2;
							iay = ind.data[a] * 2 + 1;
							ibx = ind.data[b1] * 2;
							iby = ind.data[b1] * 2 + 1;
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
								openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x11,y11);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x21,y21);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x31,y31);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
								i1 += 3;
								continue;
							}
							openfl__$internal_renderer_canvas_CanvasGraphics.context.save();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x11,y11);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x21,y21);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x31,y31);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.clip();
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
							openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(t1,t2,t3,t4,dx,dy);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(pattern,0,0);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.restore();
							i1 += 3;
						}
						break;
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
		}
		graphics.__dirty = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.closePath(false);
	}
};
openfl__$internal_renderer_canvas_CanvasGraphics.renderMask = function(graphics,renderSession) {
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
				openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect(x5 - offsetX,y5 - offsetY,width2,height2,rx,ry);
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
openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas = function(bitmap,repeat,width,height) {
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
openfl__$internal_renderer_canvas_CanvasGraphics.isCCW = function(x1,y1,x2,y2,x3,y3) {
	return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0;
};
openfl__$internal_renderer_canvas_CanvasGraphics.normalizeUvt = function(uvt,skipT) {
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
	this1 = new openfl_VectorData();
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
				haxe_ds__$Vector_Vector_$Impl_$.blit(result.data,0,data,0,result.data.length);
				result.data = data;
			}
			result.data[result.length - 1] = uvt.data[t1 - 1] / max;
		}
		result.length;
	}
	return { max : max, uvt : result};
};
var openfl__$internal_renderer_canvas_CanvasRenderer = function(width,height,context) {
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.context = context;
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.context = context;
	this.renderSession.roundPixels = true;
	this.renderSession.renderer = this;
	this.renderSession.maskManager = new openfl__$internal_renderer_canvas_MaskManager(this.renderSession);
};
$hxClasses["openfl._internal.renderer.canvas.CanvasRenderer"] = openfl__$internal_renderer_canvas_CanvasRenderer;
openfl__$internal_renderer_canvas_CanvasRenderer.__name__ = ["openfl","_internal","renderer","canvas","CanvasRenderer"];
openfl__$internal_renderer_canvas_CanvasRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_canvas_CanvasRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.context.setTransform(1,0,0,1,0,0);
		this.context.globalAlpha = 1;
		if(!stage.__transparent && stage.__clearBeforeRender) {
			this.context.fillStyle = stage.__colorString;
			this.context.fillRect(0,0,stage.stageWidth,stage.stageHeight);
		} else if(stage.__transparent && stage.__clearBeforeRender) this.context.clearRect(0,0,stage.stageWidth,stage.stageHeight);
		stage.__renderCanvas(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_canvas_CanvasRenderer
});
var openfl__$internal_renderer_canvas_CanvasShape = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasShape"] = openfl__$internal_renderer_canvas_CanvasShape;
openfl__$internal_renderer_canvas_CanvasShape.__name__ = ["openfl","_internal","renderer","canvas","CanvasShape"];
openfl__$internal_renderer_canvas_CanvasShape.render = function(shape,renderSession) {
	if(!shape.__renderable || shape.__worldAlpha <= 0) return;
	var graphics = shape.__graphics;
	if(graphics != null) {
		openfl__$internal_renderer_canvas_CanvasGraphics.render(graphics,renderSession);
		if(graphics.__canvas != null) {
			var context = renderSession.context;
			var scrollRect = shape.get_scrollRect();
			context.globalAlpha = shape.__worldAlpha;
			var transform = shape.__worldTransform;
			if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
			if(scrollRect == null) context.drawImage(graphics.__canvas,graphics.__bounds.x,graphics.__bounds.y); else context.drawImage(graphics.__canvas,scrollRect.x - graphics.__bounds.x,scrollRect.y - graphics.__bounds.y,scrollRect.width,scrollRect.height,graphics.__bounds.x + scrollRect.x,graphics.__bounds.y + scrollRect.y,scrollRect.width,scrollRect.height);
		}
	}
};
var openfl__$internal_renderer_canvas_MaskManager = function(renderSession) {
	this.renderSession = renderSession;
};
$hxClasses["openfl._internal.renderer.canvas.MaskManager"] = openfl__$internal_renderer_canvas_MaskManager;
openfl__$internal_renderer_canvas_MaskManager.__name__ = ["openfl","_internal","renderer","canvas","MaskManager"];
openfl__$internal_renderer_canvas_MaskManager.prototype = {
	pushMask: function(mask) {
		var context = this.renderSession.context;
		context.save();
		var transform = mask.__worldTransform;
		if(transform == null) transform = new openfl_geom_Matrix();
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
	,__class__: openfl__$internal_renderer_canvas_MaskManager
};
var openfl__$internal_renderer_dom_DOMBitmap = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMBitmap"] = openfl__$internal_renderer_dom_DOMBitmap;
openfl__$internal_renderer_dom_DOMBitmap.__name__ = ["openfl","_internal","renderer","dom","DOMBitmap"];
openfl__$internal_renderer_dom_DOMBitmap.render = function(bitmap,renderSession) {
	if(bitmap.stage != null && bitmap.__worldVisible && bitmap.__renderable && bitmap.bitmapData != null && bitmap.bitmapData.__isValid) {
		if(bitmap.bitmapData.__image.buffer.__srcImage != null) openfl__$internal_renderer_dom_DOMBitmap.renderImage(bitmap,renderSession); else openfl__$internal_renderer_dom_DOMBitmap.renderCanvas(bitmap,renderSession);
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
openfl__$internal_renderer_dom_DOMBitmap.renderCanvas = function(bitmap,renderSession) {
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
		openfl__$internal_renderer_dom_DOMRenderer.initializeElement(bitmap,bitmap.__canvas,renderSession);
	}
	bitmap.bitmapData.__sync();
	bitmap.__canvas.width = bitmap.bitmapData.width;
	bitmap.__canvas.height = bitmap.bitmapData.height;
	bitmap.__context.globalAlpha = bitmap.__worldAlpha;
	bitmap.__context.drawImage(bitmap.bitmapData.__image.buffer.__srcCanvas,0,0);
	openfl__$internal_renderer_dom_DOMRenderer.applyStyle(bitmap,renderSession,true,false,true);
};
openfl__$internal_renderer_dom_DOMBitmap.renderImage = function(bitmap,renderSession) {
	if(bitmap.__canvas != null) {
		renderSession.element.removeChild(bitmap.__canvas);
		bitmap.__canvas = null;
	}
	if(bitmap.__image == null) {
		bitmap.__image = window.document.createElement("img");
		bitmap.__image.src = bitmap.bitmapData.__image.buffer.__srcImage.src;
		openfl__$internal_renderer_dom_DOMRenderer.initializeElement(bitmap,bitmap.__image,renderSession);
	}
	openfl__$internal_renderer_dom_DOMRenderer.applyStyle(bitmap,renderSession,true,true,true);
};
var openfl__$internal_renderer_dom_DOMRenderer = function(width,height,element) {
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.element = element;
	this.renderSession = new openfl__$internal_renderer_RenderSession();
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
$hxClasses["openfl._internal.renderer.dom.DOMRenderer"] = openfl__$internal_renderer_dom_DOMRenderer;
openfl__$internal_renderer_dom_DOMRenderer.__name__ = ["openfl","_internal","renderer","dom","DOMRenderer"];
openfl__$internal_renderer_dom_DOMRenderer.applyStyle = function(displayObject,renderSession,setTransform,setAlpha,setClip) {
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
openfl__$internal_renderer_dom_DOMRenderer.initializeElement = function(displayObject,element,renderSession) {
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
openfl__$internal_renderer_dom_DOMRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_dom_DOMRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.element.style.background = stage.__colorString;
		this.renderSession.z = 1;
		stage.__renderDOM(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_dom_DOMRenderer
});
var openfl__$internal_renderer_dom_DOMShape = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMShape"] = openfl__$internal_renderer_dom_DOMShape;
openfl__$internal_renderer_dom_DOMShape.__name__ = ["openfl","_internal","renderer","dom","DOMShape"];
openfl__$internal_renderer_dom_DOMShape.render = function(shape,renderSession) {
	var graphics = shape.__graphics;
	if(shape.stage != null && shape.__worldVisible && shape.__renderable && graphics != null) {
		if(graphics.__dirty || shape.__worldAlphaChanged || shape.__canvas == null && graphics.__canvas != null) {
			openfl__$internal_renderer_canvas_CanvasGraphics.render(graphics,renderSession);
			if(graphics.__canvas != null) {
				if(shape.__canvas == null) {
					shape.__canvas = window.document.createElement("canvas");
					shape.__context = shape.__canvas.getContext("2d");
					openfl__$internal_renderer_dom_DOMRenderer.initializeElement(shape,shape.__canvas,renderSession);
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
				var transform = new openfl_geom_Matrix();
				transform.translate(graphics.__bounds.x,graphics.__bounds.y);
				transform = transform.mult(shape.__worldTransform);
				shape.__style.setProperty(renderSession.transformProperty,renderSession.roundPixels?"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + (transform.tx | 0) + ", " + (transform.ty | 0) + ", 0, 1)":"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + transform.tx + ", " + transform.ty + ", 0, 1)",null);
			}
			openfl__$internal_renderer_dom_DOMRenderer.applyStyle(shape,renderSession,false,false,true);
		}
	} else if(shape.__canvas != null) {
		renderSession.element.removeChild(shape.__canvas);
		shape.__canvas = null;
		shape.__style = null;
	}
};
var openfl__$internal_renderer_opengl_GLBitmap = function() { };
$hxClasses["openfl._internal.renderer.opengl.GLBitmap"] = openfl__$internal_renderer_opengl_GLBitmap;
openfl__$internal_renderer_opengl_GLBitmap.__name__ = ["openfl","_internal","renderer","opengl","GLBitmap"];
openfl__$internal_renderer_opengl_GLBitmap.render = function(bitmap,renderSession) {
	if(!bitmap.__renderable || bitmap.__worldAlpha <= 0) return;
	var i;
	var j;
	renderSession.spriteBatch.render(bitmap);
};
var openfl__$internal_renderer_opengl_GLRenderer = function(width,height,gl,transparent,antialias,preserveDrawingBuffer) {
	if(preserveDrawingBuffer == null) preserveDrawingBuffer = false;
	if(antialias == null) antialias = false;
	if(transparent == null) transparent = false;
	if(height == null) height = 600;
	if(width == null) width = 800;
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.transparent = transparent;
	this.preserveDrawingBuffer = preserveDrawingBuffer;
	this.width = width;
	this.height = height;
	this.options = { alpha : transparent, antialias : antialias, premultipliedAlpha : transparent, stencil : true, preserveDrawingBuffer : preserveDrawingBuffer};
	this._glContextId = openfl__$internal_renderer_opengl_GLRenderer.glContextId++;
	this.gl = gl;
	openfl__$internal_renderer_opengl_GLRenderer.glContexts[this._glContextId] = gl;
	if(openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL == null) {
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL = new haxe_ds_EnumValueMap();
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.NORMAL,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.ADD,[gl.SRC_ALPHA,gl.DST_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.MULTIPLY,[gl.DST_COLOR,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.SCREEN,[gl.SRC_ALPHA,gl.ONE]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.ALPHA,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.DARKEN,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.DIFFERENCE,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.ERASE,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.HARDLIGHT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.INVERT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.LAYER,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.LIGHTEN,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.OVERLAY,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.SUBTRACT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
	}
	this.projection = new openfl_geom_Point();
	this.projection.x = this.width / 2;
	this.projection.y = -this.height / 2;
	this.offset = new openfl_geom_Point(0,0);
	this.resize(this.width,this.height);
	this.contextLost = false;
	this.shaderManager = new openfl__$internal_renderer_opengl_utils_ShaderManager(gl);
	this.spriteBatch = new openfl__$internal_renderer_opengl_utils_SpriteBatch(gl);
	this.maskManager = new openfl__$internal_renderer_opengl_utils_MaskManager(gl);
	this.filterManager = new openfl__$internal_renderer_opengl_utils_FilterManager(gl,this.transparent);
	this.stencilManager = new openfl__$internal_renderer_opengl_utils_StencilManager(gl);
	this.blendModeManager = new openfl__$internal_renderer_opengl_utils_BlendModeManager(gl);
	this.renderSession = new openfl__$internal_renderer_RenderSession();
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
$hxClasses["openfl._internal.renderer.opengl.GLRenderer"] = openfl__$internal_renderer_opengl_GLRenderer;
openfl__$internal_renderer_opengl_GLRenderer.__name__ = ["openfl","_internal","renderer","opengl","GLRenderer"];
openfl__$internal_renderer_opengl_GLRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_opengl_GLRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	destroy: function() {
		openfl__$internal_renderer_opengl_GLRenderer.glContexts[this._glContextId] = null;
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
		openfl__$internal_renderer_opengl_GLRenderer.glContextId++;
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
		this.renderSession.blendModeManager.setBlendMode(openfl_display_BlendMode.NORMAL);
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
		openfl__$internal_renderer_AbstractRenderer.prototype.resize.call(this,width,height);
		this.gl.viewport(0,0,width,height);
		this.projection.x = width / 2;
		this.projection.y = -height / 2;
	}
	,__class__: openfl__$internal_renderer_opengl_GLRenderer
});
var openfl__$internal_renderer_opengl_shaders_AbstractShader = function(gl) {
	this._UID = openfl__$internal_renderer_opengl_shaders_AbstractShader.__UID++;
	this.gl = gl;
	this.program = null;
	this.attributes = [];
};
$hxClasses["openfl._internal.renderer.opengl.shaders.AbstractShader"] = openfl__$internal_renderer_opengl_shaders_AbstractShader;
openfl__$internal_renderer_opengl_shaders_AbstractShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","AbstractShader"];
openfl__$internal_renderer_opengl_shaders_AbstractShader.compileProgram = function(gl,vertexSrc,fragmentSrc) {
	var fragmentShader = openfl__$internal_renderer_opengl_shaders_AbstractShader.CompileFragmentShader(gl,fragmentSrc);
	var vertexShader = openfl__$internal_renderer_opengl_shaders_AbstractShader.CompileVertexShader(gl,vertexSrc);
	var shaderProgram = gl.createProgram();
	if(fragmentShader != null && vertexShader != null) {
		gl.attachShader(shaderProgram,vertexShader);
		gl.attachShader(shaderProgram,fragmentShader);
		gl.linkProgram(shaderProgram);
		if(gl.getProgramParameter(shaderProgram,gl.LINK_STATUS) == 0) haxe_Log.trace("Could not initialize shaders",{ fileName : "AbstractShader.hx", lineNumber : 80, className : "openfl._internal.renderer.opengl.shaders.AbstractShader", methodName : "compileProgram"});
	}
	return shaderProgram;
};
openfl__$internal_renderer_opengl_shaders_AbstractShader.CompileVertexShader = function(gl,shaderSrc) {
	return openfl__$internal_renderer_opengl_shaders_AbstractShader._CompileShader(gl,shaderSrc,gl.VERTEX_SHADER);
};
openfl__$internal_renderer_opengl_shaders_AbstractShader.CompileFragmentShader = function(gl,shaderSrc) {
	return openfl__$internal_renderer_opengl_shaders_AbstractShader._CompileShader(gl,shaderSrc,gl.FRAGMENT_SHADER);
};
openfl__$internal_renderer_opengl_shaders_AbstractShader._CompileShader = function(gl,shaderSrc,shaderType) {
	var src = shaderSrc.join("\n");
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader,src);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {
		haxe_Log.trace(gl.getShaderInfoLog(shader),{ fileName : "AbstractShader.hx", lineNumber : 115, className : "openfl._internal.renderer.opengl.shaders.AbstractShader", methodName : "_CompileShader"});
		return null;
	}
	return shader;
};
openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype = {
	destroy: function() {
		if(this.program != null) this.gl.deleteProgram(this.program);
		this.uniforms = null;
		this.gl = null;
		this.attributes = null;
	}
	,init: function() {
		var gl = this.gl;
		var program = openfl__$internal_renderer_opengl_shaders_AbstractShader.compileProgram(gl,this.vertexSrc,this.fragmentSrc);
		gl.useProgram(program);
		this.program = program;
	}
	,__class__: openfl__$internal_renderer_opengl_shaders_AbstractShader
};
var openfl__$internal_renderer_opengl_shaders_ComplexPrimitiveShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders_AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader"] = openfl__$internal_renderer_opengl_shaders_ComplexPrimitiveShader;
openfl__$internal_renderer_opengl_shaders_ComplexPrimitiveShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","ComplexPrimitiveShader"];
openfl__$internal_renderer_opengl_shaders_ComplexPrimitiveShader.__super__ = openfl__$internal_renderer_opengl_shaders_AbstractShader;
openfl__$internal_renderer_opengl_shaders_ComplexPrimitiveShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype.init.call(this);
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
	,__class__: openfl__$internal_renderer_opengl_shaders_ComplexPrimitiveShader
});
var openfl__$internal_renderer_opengl_shaders_DefaultShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders_AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"];
	this.textureCount = 0;
	this.attributes = [];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.DefaultShader"] = openfl__$internal_renderer_opengl_shaders_DefaultShader;
openfl__$internal_renderer_opengl_shaders_DefaultShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","DefaultShader"];
openfl__$internal_renderer_opengl_shaders_DefaultShader.__super__ = openfl__$internal_renderer_opengl_shaders_AbstractShader;
openfl__$internal_renderer_opengl_shaders_DefaultShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype,{
	init: function() {
		if(this.vertexSrc == null) this.vertexSrc = openfl__$internal_renderer_opengl_shaders_DefaultShader.defaultVertexSrc;
		openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype.init.call(this);
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
		gl.bindTexture(gl.TEXTURE_2D,uniform.value.baseTexture._glTextures[openfl__$internal_renderer_opengl_GLRenderer.glContextId]);
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
	,__class__: openfl__$internal_renderer_opengl_shaders_DefaultShader
});
var openfl__$internal_renderer_opengl_shaders_DrawTrianglesShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders_AbstractShader.call(this,gl);
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vPos;","varying vec4 vColor;","void main(void) {","   vec3 v = vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vPos = aTextureCoord;","   vColor = aColor;","}"];
	this.fragmentSrc = ["precision mediump float;","uniform sampler2D sampler;","uniform vec3 color;","uniform bool useTexture;","uniform float alpha;","varying vec2 vPos;","varying vec4 vColor;","vec4 tmp;","void main(void) {","   if(useTexture) {","       tmp = texture2D(sampler, vPos);","   } else {","       tmp = vec4(color, 1.);","   }","   float a = tmp.a * vColor.a * alpha;","   gl_FragColor = vec4(vec3((tmp.rgb * vColor.rgb) * a), a);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.DrawTrianglesShader"] = openfl__$internal_renderer_opengl_shaders_DrawTrianglesShader;
openfl__$internal_renderer_opengl_shaders_DrawTrianglesShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","DrawTrianglesShader"];
openfl__$internal_renderer_opengl_shaders_DrawTrianglesShader.__super__ = openfl__$internal_renderer_opengl_shaders_AbstractShader;
openfl__$internal_renderer_opengl_shaders_DrawTrianglesShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype.init.call(this);
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
	,__class__: openfl__$internal_renderer_opengl_shaders_DrawTrianglesShader
});
var openfl__$internal_renderer_opengl_shaders_FastShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders_AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 uMatrix;","varying vec2 vTextureCoord;","varying float vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   vec2 v;","   vec2 sv = aVertexPosition * aScale;","   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);","   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);","   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;","   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"];
	this.textureCount = 0;
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.FastShader"] = openfl__$internal_renderer_opengl_shaders_FastShader;
openfl__$internal_renderer_opengl_shaders_FastShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","FastShader"];
openfl__$internal_renderer_opengl_shaders_FastShader.__super__ = openfl__$internal_renderer_opengl_shaders_AbstractShader;
openfl__$internal_renderer_opengl_shaders_FastShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype.init.call(this);
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
	,__class__: openfl__$internal_renderer_opengl_shaders_FastShader
});
var openfl__$internal_renderer_opengl_shaders_FillShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders_AbstractShader.call(this,gl);
	this.vertexSrc = ["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","}"];
	this.fragmentSrc = ["precision mediump float;","uniform vec3 color;","uniform float alpha;","void main(void) {","   gl_FragColor = vec4((color * alpha), alpha);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.FillShader"] = openfl__$internal_renderer_opengl_shaders_FillShader;
openfl__$internal_renderer_opengl_shaders_FillShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","FillShader"];
openfl__$internal_renderer_opengl_shaders_FillShader.__super__ = openfl__$internal_renderer_opengl_shaders_AbstractShader;
openfl__$internal_renderer_opengl_shaders_FillShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype.init.call(this);
		this.translationMatrix = this.gl.getUniformLocation(this.program,"translationMatrix");
		this.projectionVector = this.gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = this.gl.getUniformLocation(this.program,"offsetVector");
		this.color = this.gl.getUniformLocation(this.program,"color");
		this.alpha = this.gl.getUniformLocation(this.program,"alpha");
		this.aVertexPosition = this.gl.getAttribLocation(this.program,"aVertexPosition");
		this.attributes = [this.aVertexPosition];
	}
	,__class__: openfl__$internal_renderer_opengl_shaders_FillShader
});
var openfl__$internal_renderer_opengl_shaders_PatternFillShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders_AbstractShader.call(this,gl);
	this.vertexSrc = ["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 patternMatrix;","varying vec2 vPos;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vPos = (patternMatrix * vec3(aVertexPosition, 1)).xy;","}"];
	this.fragmentSrc = ["precision mediump float;","uniform float alpha;","uniform vec2 patternTL;","uniform vec2 patternBR;","uniform sampler2D sampler;","varying vec2 vPos;","void main(void) {","   vec2 pos = mix(patternTL, patternBR, vPos);","   vec4 tcol = texture2D(sampler, pos);","   gl_FragColor = vec4(tcol.rgb * alpha, tcol.a * alpha);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.PatternFillShader"] = openfl__$internal_renderer_opengl_shaders_PatternFillShader;
openfl__$internal_renderer_opengl_shaders_PatternFillShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","PatternFillShader"];
openfl__$internal_renderer_opengl_shaders_PatternFillShader.__super__ = openfl__$internal_renderer_opengl_shaders_AbstractShader;
openfl__$internal_renderer_opengl_shaders_PatternFillShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype.init.call(this);
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
	,__class__: openfl__$internal_renderer_opengl_shaders_PatternFillShader
});
var openfl__$internal_renderer_opengl_shaders_PrimitiveShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders_AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform float alpha;","uniform vec3 tint;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vColor = aColor;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.PrimitiveShader"] = openfl__$internal_renderer_opengl_shaders_PrimitiveShader;
openfl__$internal_renderer_opengl_shaders_PrimitiveShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","PrimitiveShader"];
openfl__$internal_renderer_opengl_shaders_PrimitiveShader.__super__ = openfl__$internal_renderer_opengl_shaders_AbstractShader;
openfl__$internal_renderer_opengl_shaders_PrimitiveShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype.init.call(this);
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
	,__class__: openfl__$internal_renderer_opengl_shaders_PrimitiveShader
});
var openfl__$internal_renderer_opengl_shaders_StripShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders_AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision mediump float;","varying vec2 vTextureCoord;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.StripShader"] = openfl__$internal_renderer_opengl_shaders_StripShader;
openfl__$internal_renderer_opengl_shaders_StripShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","StripShader"];
openfl__$internal_renderer_opengl_shaders_StripShader.__super__ = openfl__$internal_renderer_opengl_shaders_AbstractShader;
openfl__$internal_renderer_opengl_shaders_StripShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders_AbstractShader.prototype.init.call(this);
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
	,__class__: openfl__$internal_renderer_opengl_shaders_StripShader
});
var openfl__$internal_renderer_opengl_utils_BlendModeManager = function(gl) {
	this.gl = gl;
	this.currentBlendMode = null;
};
$hxClasses["openfl._internal.renderer.opengl.utils.BlendModeManager"] = openfl__$internal_renderer_opengl_utils_BlendModeManager;
openfl__$internal_renderer_opengl_utils_BlendModeManager.__name__ = ["openfl","_internal","renderer","opengl","utils","BlendModeManager"];
openfl__$internal_renderer_opengl_utils_BlendModeManager.prototype = {
	destroy: function() {
		this.gl = null;
	}
	,setBlendMode: function(blendMode) {
		if(blendMode == null) blendMode = openfl_display_BlendMode.NORMAL;
		if(this.currentBlendMode == blendMode) return false;
		this.currentBlendMode = blendMode;
		var blendModeWebGL = openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.get(this.currentBlendMode);
		this.gl.blendFunc(blendModeWebGL[0],blendModeWebGL[1]);
		return true;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_BlendModeManager
};
var openfl__$internal_renderer_opengl_utils_DrawPath = function() {
	this.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
	this.points = [];
	this.isRemovable = true;
	this.fillIndex = 0;
	this.line = new openfl__$internal_renderer_opengl_utils_LineStyle();
	this.fill = openfl__$internal_renderer_opengl_utils_FillType.None;
};
$hxClasses["openfl._internal.renderer.opengl.utils.DrawPath"] = openfl__$internal_renderer_opengl_utils_DrawPath;
openfl__$internal_renderer_opengl_utils_DrawPath.__name__ = ["openfl","_internal","renderer","opengl","utils","DrawPath"];
openfl__$internal_renderer_opengl_utils_DrawPath.getStack = function(graphics,gl) {
	return openfl__$internal_renderer_opengl_utils_PathBuiler.build(graphics,gl);
};
openfl__$internal_renderer_opengl_utils_DrawPath.prototype = {
	update: function(line,fill,fillIndex) {
		this.updateLine(line);
		this.fill = fill;
		this.fillIndex = fillIndex;
	}
	,updateLine: function(line) {
		this.line.width = line.width;
		this.line.color = line.color & 16777215;
		if(line.alpha == null) this.line.alpha = 1; else this.line.alpha = line.alpha;
		if(line.scaleMode == null) this.line.scaleMode = openfl_display_LineScaleMode.NORMAL; else this.line.scaleMode = line.scaleMode;
		if(line.caps == null) this.line.caps = openfl_display_CapsStyle.ROUND; else this.line.caps = line.caps;
		if(line.joints == null) this.line.joints = openfl_display_JointStyle.ROUND; else this.line.joints = line.joints;
		this.line.miterLimit = line.miterLimit;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_DrawPath
};
var openfl__$internal_renderer_opengl_utils_PathBuiler = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PathBuiler"] = openfl__$internal_renderer_opengl_utils_PathBuiler;
openfl__$internal_renderer_opengl_utils_PathBuiler.__name__ = ["openfl","_internal","renderer","opengl","utils","PathBuiler"];
openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.__line = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.closePath = function() {
	var l = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length;
	if(l <= 0) return;
	if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type == openfl__$internal_renderer_opengl_utils_GraphicType.Polygon && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.fill != openfl__$internal_renderer_opengl_utils_FillType.None) {
		var sx = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[0];
		var sy = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[1];
		var ex = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[l - 2];
		var ey = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[l - 1];
		if(!(sx == ex && sy == ey)) {
			openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(sx);
			openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(sy);
		}
	}
};
openfl__$internal_renderer_opengl_utils_PathBuiler.endFill = function() {
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex++;
};
openfl__$internal_renderer_opengl_utils_PathBuiler.moveTo = function(x,y) {
	if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
	openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
	openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
	openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(x);
	openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(y);
	openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
};
openfl__$internal_renderer_opengl_utils_PathBuiler.graphicDataPop = function() {
	if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
};
openfl__$internal_renderer_opengl_utils_PathBuiler.build = function(graphics,gl) {
	var glStack = null;
	var bounds = graphics.__bounds;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths = new Array();
	openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
	openfl__$internal_renderer_opengl_utils_PathBuiler.__line = new openfl__$internal_renderer_opengl_utils_LineStyle();
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex = 0;
	glStack = graphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId];
	if(glStack == null) glStack = graphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId] = new openfl__$internal_renderer_opengl_utils_GLStack(gl);
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
				openfl__$internal_renderer_opengl_utils_PathBuiler.endFill();
				if(bitmap != null) openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.Texture(bitmap,matrix,repeat,smooth); else openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
					if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [];
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
					openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				}
				break;
			case 1:
				var alpha = command[3];
				var rgb = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.endFill();
				if(alpha > 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.Color(rgb & 16777215,alpha); else openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
					if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [];
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
					openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				}
				break;
			case 2:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cx2 = command[4];
				var cy = command[3];
				var cx = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.moveTo(0,0);
				var n = 20;
				var dt = 0;
				var dt2 = 0;
				var dt3 = 0;
				var t2 = 0;
				var t3 = 0;
				var points = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points;
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
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.moveTo(0,0);
				var xa = 0;
				var ya = 0;
				var n1 = 20;
				var points1 = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points;
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
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Circle;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x2,y2,radius];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 5:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x3,y3,width,height];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 6:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Rectangle(false);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x4,y4,width1,height1];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
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
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Rectangle(true);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x5,y5,width2,height2,rx,ry];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 10:
				openfl__$internal_renderer_opengl_utils_PathBuiler.endFill();
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
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line = new openfl__$internal_renderer_opengl_utils_LineStyle();
				if(thickness == null || thickness == Math.NaN || thickness < 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.width = 0; else if(thickness == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.width = 1; else openfl__$internal_renderer_opengl_utils_PathBuiler.__line.width = thickness;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.color = color;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.alpha = alpha1;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.scaleMode = scaleMode;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.caps = caps;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.joints = joints;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.miterLimit = miterLimit;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 12:
				var y6 = command[3];
				var x6 = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(x6);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(y6);
				break;
			case 13:
				var y7 = command[3];
				var x7 = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.moveTo(x7,y7);
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
					var _g22 = openfl__$internal_renderer_opengl_utils_PathBuiler.__fill;
					switch(_g22[1]) {
					case 1:
						isColor = true;
						break;
					default:
						isColor = false;
					}
				}
				if(isColor && uvtData != null) continue;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
				if(uvtData == null) {
					var this1;
					this1 = new openfl_VectorData();
					var this2;
					this2 = new Array(0);
					this1.data = this2;
					this1.length = 0;
					this1.fixed = false;
					uvtData = this1;
					{
						var _g23 = openfl__$internal_renderer_opengl_utils_PathBuiler.__fill;
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
										haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data,0,uvtData.data.length);
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
										haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data1,0,uvtData.data.length);
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
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.DrawTriangles(vertices,indices,uvtData,culling,colors,blendMode);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable = false;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 8:
				var count = command[6];
				var flags = command[5];
				var smooth1 = command[4];
				var tileData = command[3];
				var sheet = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex++;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.DrawTiles(sheet,tileData,smooth1,flags,count);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable = false;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			}
		}
		openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
	}
	graphics.__drawPaths = openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths;
	return glStack;
};
var openfl__$internal_renderer_opengl_utils_LineStyle = function() {
	this.width = 0;
	this.color = 0;
	this.alpha = 1;
	this.scaleMode = openfl_display_LineScaleMode.NORMAL;
	this.caps = openfl_display_CapsStyle.ROUND;
	this.joints = openfl_display_JointStyle.ROUND;
	this.miterLimit = 3;
};
$hxClasses["openfl._internal.renderer.opengl.utils.LineStyle"] = openfl__$internal_renderer_opengl_utils_LineStyle;
openfl__$internal_renderer_opengl_utils_LineStyle.__name__ = ["openfl","_internal","renderer","opengl","utils","LineStyle"];
openfl__$internal_renderer_opengl_utils_LineStyle.prototype = {
	__class__: openfl__$internal_renderer_opengl_utils_LineStyle
};
var openfl__$internal_renderer_opengl_utils_FillType = $hxClasses["openfl._internal.renderer.opengl.utils.FillType"] = { __ename__ : true, __constructs__ : ["None","Color","Texture","Gradient"] };
openfl__$internal_renderer_opengl_utils_FillType.None = ["None",0];
openfl__$internal_renderer_opengl_utils_FillType.None.toString = $estr;
openfl__$internal_renderer_opengl_utils_FillType.None.__enum__ = openfl__$internal_renderer_opengl_utils_FillType;
openfl__$internal_renderer_opengl_utils_FillType.Color = function(color,alpha) { var $x = ["Color",1,color,alpha]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_FillType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_FillType.Texture = function(bitmap,matrix,repeat,smooth) { var $x = ["Texture",2,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_FillType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_FillType.Gradient = ["Gradient",3];
openfl__$internal_renderer_opengl_utils_FillType.Gradient.toString = $estr;
openfl__$internal_renderer_opengl_utils_FillType.Gradient.__enum__ = openfl__$internal_renderer_opengl_utils_FillType;
var openfl__$internal_renderer_opengl_utils_FilterManager = function(gl,transparent) {
	this.transparent = transparent;
	this.filterStack = [];
	this.offsetX = 0;
	this.offsetY = 0;
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.FilterManager"] = openfl__$internal_renderer_opengl_utils_FilterManager;
openfl__$internal_renderer_opengl_utils_FilterManager.__name__ = ["openfl","_internal","renderer","opengl","utils","FilterManager"];
openfl__$internal_renderer_opengl_utils_FilterManager.prototype = {
	applyFilterPass: function(filter,filterArea,width,height) {
		var gl = this.gl;
		var shader = filter.shaders[openfl__$internal_renderer_opengl_GLRenderer.glContextId];
		if(shader == null) {
			shader = new openfl__$internal_renderer_opengl_shaders_DefaultShader(gl);
			shader.fragmentSrc = filter.fragmentSrc;
			shader.uniforms = filter.uniforms;
			shader.init();
			filter.shaders[openfl__$internal_renderer_opengl_GLRenderer.glContextId] = shader;
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
			if(outputTexture == null) outputTexture = new openfl__$internal_renderer_opengl_utils_FilterTexture(gl,this.width,this.height);
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
		if(texture == null) texture = new openfl__$internal_renderer_opengl_utils_FilterTexture(gl,this.width,this.height); else texture.resize(this.width,this.height);
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
	,__class__: openfl__$internal_renderer_opengl_utils_FilterManager
};
var openfl__$internal_renderer_opengl_utils_FilterTexture = function(gl,width,height,smoothing) {
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
$hxClasses["openfl._internal.renderer.opengl.utils.FilterTexture"] = openfl__$internal_renderer_opengl_utils_FilterTexture;
openfl__$internal_renderer_opengl_utils_FilterTexture.__name__ = ["openfl","_internal","renderer","opengl","utils","FilterTexture"];
openfl__$internal_renderer_opengl_utils_FilterTexture.prototype = {
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
	,__class__: openfl__$internal_renderer_opengl_utils_FilterTexture
};
var openfl_geom_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["openfl.geom.Rectangle"] = openfl_geom_Rectangle;
openfl_geom_Rectangle.__name__ = ["openfl","geom","Rectangle"];
openfl_geom_Rectangle.prototype = {
	clone: function() {
		return new openfl_geom_Rectangle(this.x,this.y,this.width,this.height);
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
		if(x1 <= x0) return new openfl_geom_Rectangle();
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		if(y1 <= y0) return new openfl_geom_Rectangle();
		return new openfl_geom_Rectangle(x0,y0,x1 - x0,y1 - y0);
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
		return new openfl_geom_Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
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
		return new openfl_geom_Rectangle(x0,y0,x1 - x0,y1 - y0);
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
		return new lime_math_Rectangle(this.x,this.y,this.width,this.height);
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottomRight: function() {
		return new openfl_geom_Point(this.x + this.width,this.y + this.height);
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
		return new openfl_geom_Point(this.width,this.height);
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
		return new openfl_geom_Point(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,__class__: openfl_geom_Rectangle
	,__properties__: {set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_top:"set_top",get_top:"get_top",set_size:"set_size",get_size:"get_size",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_bottom:"set_bottom",get_bottom:"get_bottom"}
};
var openfl_geom_Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["openfl.geom.Point"] = openfl_geom_Point;
openfl_geom_Point.__name__ = ["openfl","geom","Point"];
openfl_geom_Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
};
openfl_geom_Point.interpolate = function(pt1,pt2,f) {
	return new openfl_geom_Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
};
openfl_geom_Point.polar = function(len,angle) {
	return new openfl_geom_Point(len * Math.cos(angle),len * Math.sin(angle));
};
openfl_geom_Point.prototype = {
	add: function(v) {
		return new openfl_geom_Point(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new openfl_geom_Point(this.x,this.y);
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
		return new openfl_geom_Point(this.x - v.x,this.y - v.y);
	}
	,toString: function() {
		return "(x=" + this.x + ", y=" + this.y + ")";
	}
	,__toLimeVector2: function() {
		return new lime_math_Vector2(this.x,this.y);
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: openfl_geom_Point
	,__properties__: {get_length:"get_length"}
};
var openfl__$internal_renderer_opengl_utils_GraphicsRenderer = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.GraphicsRenderer"] = openfl__$internal_renderer_opengl_utils_GraphicsRenderer;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.__name__ = ["openfl","_internal","renderer","opengl","utils","GraphicsRenderer"];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.lastVertsBuffer = null;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.lastBucketMode = null;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.lastTexture = null;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.lastTextureRepeat = null;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.lastTextureSmooth = null;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildCircle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height;
	if(rectData.length == 3) height = width; else height = rectData[3];
	if(path.type == openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse) {
		width /= 2;
		height /= 2;
		x += width;
		y += height;
	}
	if(localCoords) {
		x -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
		y -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
	}
	var totalSegs = 40;
	var seg = Math.PI * 2 / totalSegs;
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
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
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket.line);
		path.points = tempPoints;
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildComplexPoly = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	if(path.points.length < 6) return;
	var points = path.points.slice();
	if(localCoords) {
		var _g1 = 0;
		var _g = points.length / 2 | 0;
		while(_g1 < _g) {
			var i = _g1++;
			points[i * 2] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			points[i * 2 + 1] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
		}
	}
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	bucket.drawMode = glStack.gl.TRIANGLE_FAN;
	bucket.verts = points;
	var indices = bucket.indices;
	var length = points.length / 2 | 0;
	var _g2 = 0;
	while(_g2 < length) {
		var i1 = _g2++;
		indices.push(i1);
	}
	if(path.line.width > 0) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket.line,localCoords);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine = function(path,bucket,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points;
	if(points.length == 0) return;
	if(localCoords) {
		var _g1 = 0;
		var _g = points.length / 2 | 0;
		while(_g1 < _g) {
			var i = _g1++;
			points[i * 2] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			points[i * 2 + 1] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
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
	var firstPoint = new openfl_geom_Point(points[0],points[1]);
	var lastPoint = new openfl_geom_Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
	if(firstPoint.x == lastPoint.x && firstPoint.y == lastPoint.y) {
		points = points.slice();
		points.pop();
		points.pop();
		lastPoint = new openfl_geom_Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
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
	var color = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgb(path.line.color);
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
	if(!Math.isFinite(dist)) haxe_Log.trace(perpx * perpx + perpy * perpy,{ fileName : "GraphicsRenderer.hx", lineNumber : 372, className : "openfl._internal.renderer.opengl.utils.GraphicsRenderer", methodName : "buildLine"});
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
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildPoly = function(path,glStack) {
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
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	var verts = bucket.verts;
	var indices = bucket.indices;
	if(bucket != null) {
		var triangles = openfl__$internal_renderer_opengl_utils_PolyK.triangulate(points);
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
	if(path.line.width > 0) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket.line);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	if(localCoords) {
		x -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
		y -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
	}
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
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
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket.line);
		path.points = tempPoints;
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRoundedRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points.slice();
	var x = points[0];
	var y = points[1];
	var width = points[2];
	var height = points[3];
	var radius = points[4];
	if(localCoords) {
		x -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
		y -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
	}
	var recPoints = [];
	recPoints.push(x);
	recPoints.push(y + radius);
	recPoints = recPoints.concat(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.quadraticBezierCurve(x,y + height - radius,x,y + height,x + radius,y + height));
	recPoints = recPoints.concat(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.quadraticBezierCurve(x + width - radius,y + height,x + width,y + height,x + width,y + height - radius));
	recPoints = recPoints.concat(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.quadraticBezierCurve(x + width,y + radius,x + width,y,x + width - radius,y));
	recPoints = recPoints.concat(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.quadraticBezierCurve(x + radius,y,x,y,x,y + radius));
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	if(bucket != null) {
		var verts = bucket.verts;
		var indices = bucket.indices;
		var vecPos = verts.length / 2;
		var triangles = openfl__$internal_renderer_opengl_utils_PolyK.triangulate(recPoints);
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
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket.line);
		path.points = tempPoints;
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildDrawTriangles = function(path,object,glStack,localCoords) {
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
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
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
			x0 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			y0 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
			x1 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			y1 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
			x2 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			y2 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
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
			ctmp = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgba(colors.data[i0]);
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
			ctmp = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgba(colors.data[i1]);
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
			ctmp = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgba(colors.data[i2]);
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
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildDrawTiles = function(path,glStack) {
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.quadraticBezierCurve = function(fromX,fromY,cpX,cpY,toX,toY) {
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
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.render = function(object,renderSession) {
	var graphics = object.__graphics;
	var spritebatch = renderSession.spriteBatch;
	var dirty = graphics.__dirty;
	if(graphics.__commands.length <= 0) return;
	if(dirty) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.updateGraphics(object,renderSession.gl,object.cacheAsBitmap);
	if(object.cacheAsBitmap) {
		if(dirty) {
			var gl = renderSession.gl;
			var bounds = graphics.__bounds;
			var texture = graphics.__cachedTexture;
			var w = Math.floor(bounds.width + 0.5);
			var h = Math.floor(bounds.height + 0.5);
			if(texture == null) {
				texture = new openfl__$internal_renderer_opengl_utils_FilterTexture(gl,w,h,false);
				graphics.__cachedTexture = texture;
			}
			texture.resize(w,h);
			gl.bindFramebuffer(gl.FRAMEBUFFER,texture.frameBuffer);
			gl.viewport(0,0,w,h);
			texture.clear();
			openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderGraphics(object,renderSession,new openfl_geom_Point(w / 2,-h / 2),true);
			gl.bindFramebuffer(gl.FRAMEBUFFER,null);
			gl.viewport(0,0,renderSession.renderer.width,renderSession.renderer.height);
		}
		if(!spritebatch.drawing) spritebatch.begin(renderSession);
		spritebatch.renderCachedGraphics(object);
	} else openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderGraphics(object,renderSession,renderSession.projection,false);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderGraphics = function(object,renderSession,projection,localCoords) {
	if(localCoords == null) localCoords = false;
	var graphics = object.__graphics;
	var gl = renderSession.gl;
	var offset = renderSession.offset;
	var glStack = graphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId];
	var bucket;
	var translationMatrix;
	if(localCoords) translationMatrix = openfl_geom_Matrix.__identity; else translationMatrix = object.__worldTransform;
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
			var shader = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareShader(bucket,renderSession,object,projection,translationMatrix.toArray(false));
			openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderFill(bucket,shader,renderSession);
			renderSession.stencilManager.popBucket(object,bucket,renderSession);
			break;
		case 5:
			if(batchDrawing && !localCoords) renderSession.spriteBatch.end();
			var shader1 = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareShader(bucket,renderSession,object,projection,null);
			openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderDrawTriangles(bucket,shader1,renderSession);
			break;
		case 6:
			if(!batchDrawing) renderSession.spriteBatch.begin(renderSession);
			openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderDrawTiles(object,bucket,renderSession);
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
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.updateGraphics = function(object,gl,localCoords) {
	if(localCoords == null) localCoords = false;
	var graphics = object.__graphics;
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectPosition.setTo(object.get_x(),object.get_y());
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.copyFrom(graphics.__bounds);
	var glStack = null;
	if(graphics.__dirty) glStack = openfl__$internal_renderer_opengl_utils_DrawPath.getStack(graphics,gl);
	graphics.__dirty = false;
	var _g = 0;
	var _g1 = glStack.buckets;
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		data.reset();
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bucketPool.push(data);
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
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildComplexPoly(path,glStack,localCoords);
				break;
			case 1:
				var rounded = _g21[2];
				if(rounded) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRoundedRectangle(path,glStack,localCoords); else openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRectangle(path,glStack,localCoords);
				break;
			case 2:case 3:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildCircle(path,glStack,localCoords);
				break;
			case 4:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildDrawTriangles(path,object,glStack,localCoords);
				break;
			case 5:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
				break;
			}
		}
		glStack.lastIndex++;
	}
	glStack.upload();
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket = function(path,glStack) {
	var bucket = null;
	{
		var _g = path.fill;
		switch(_g[1]) {
		case 1:
			var a = _g[3];
			var c = _g[2];
			bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl__$internal_renderer_opengl_utils_BucketMode.Fill);
			if(c == null) bucket.color = [0,0,0]; else bucket.color = [(c >> 16 & 255) / 255,(c >> 8 & 255) / 255,(c & 255) / 255];
			bucket.alpha = a;
			bucket.uploadTileBuffer = true;
			break;
		case 2:
			var s = _g[5];
			var r = _g[4];
			var m = _g[3];
			var b = _g[2];
			bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill);
			bucket.bitmap = b;
			bucket.textureRepeat = r;
			bucket.textureSmooth = s;
			bucket.texture = b.getTexture(glStack.gl);
			bucket.uploadTileBuffer = true;
			var tMatrix = bucket.textureMatrix;
			tMatrix.identity();
			var pMatrix;
			if(m == null) pMatrix = new openfl_geom_Matrix(); else pMatrix = new openfl_geom_Matrix(m.a,m.b,m.c,m.d,m.tx,m.ty);
			pMatrix = pMatrix.invert();
			pMatrix.__translateTransformed(new openfl_geom_Point(-openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectPosition.x,-openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectPosition.y));
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
			bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl__$internal_renderer_opengl_utils_BucketMode.Line);
			bucket.uploadTileBuffer = false;
		}
	}
	{
		var _g1 = path.type;
		switch(_g1[1]) {
		case 4:
			bucket.mode = openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles;
			bucket.uploadTileBuffer = false;
			break;
		case 5:
			bucket.mode = openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles;
			bucket.uploadTileBuffer = false;
			break;
		default:
		}
	}
	bucket.graphicType = path.type;
	var bucketData = bucket.getData();
	return bucketData;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.getBucket = function(glStack,mode) {
	var b = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bucketPool.pop();
	if(b == null) b = new openfl__$internal_renderer_opengl_utils_GLBucket(glStack.gl);
	b.mode = mode;
	glStack.buckets.push(b);
	return b;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket = function(fillIndex,glStack,mode) {
	var bucket;
	if(glStack.buckets.length == 0) bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.getBucket(glStack,mode); else {
		bucket = glStack.buckets[glStack.buckets.length - 1];
		if(bucket.fillIndex != fillIndex) bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.getBucket(glStack,mode);
	}
	bucket.dirty = true;
	bucket.fillIndex = fillIndex;
	return bucket;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareShader = function(bucket,renderSession,object,projection,translationMatrix) {
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
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderFill = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	if(bucket.mode == openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill && bucket.texture != null) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindTexture(gl,bucket);
	gl.bindBuffer(gl.ARRAY_BUFFER,bucket.tileBuffer);
	gl.vertexAttribPointer(shader.aVertexPosition,4,gl.SHORT,false,0,0);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderDrawTriangles = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	var _g = 0;
	var _g1 = bucket.data;
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		if(data.destroyed) continue;
		if(bucket.texture == null) {
		} else openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindTexture(gl,bucket);
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindDrawTrianglesBuffer(gl,shader,data);
		gl.drawArrays(gl.TRIANGLES,data.glStart,data.glLength);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderDrawTiles = function(object,bucket,renderSession) {
	var args = bucket.graphicType.slice(2);
	renderSession.spriteBatch.renderTiles(object,args[0],args[1],args[2],args[3],args[4]);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindDrawTrianglesBuffer = function(gl,shader,data) {
	gl.bindBuffer(gl.ARRAY_BUFFER,data.vertsBuffer);
	var stride = data.stride * 4;
	gl.vertexAttribPointer(shader.aVertexPosition,2,gl.FLOAT,false,stride,0);
	gl.vertexAttribPointer(shader.aTextureCoord,2,gl.FLOAT,false,stride,8);
	gl.vertexAttribPointer(shader.colorAttribute,4,gl.FLOAT,false,stride,16);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindTexture = function(gl,bucket) {
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
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.isCCW = function(x1,y1,x2,y2,x3,y3) {
	return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgb = function(hex) {
	if(hex == null) return [0,0,0]; else return [(hex >> 16 & 255) / 255,(hex >> 8 & 255) / 255,(hex & 255) / 255];
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgba = function(hex) {
	if(hex == null) return [1,1,1,1]; else return [(hex >> 16 & 255) / 255,(hex >> 8 & 255) / 255,(hex & 255) / 255,(hex >> 24 & 255) / 255];
};
var openfl__$internal_renderer_opengl_utils_GLStack = function(gl) {
	this.lastIndex = 0;
	this.gl = gl;
	this.buckets = [];
	this.lastIndex = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLStack"] = openfl__$internal_renderer_opengl_utils_GLStack;
openfl__$internal_renderer_opengl_utils_GLStack.__name__ = ["openfl","_internal","renderer","opengl","utils","GLStack"];
openfl__$internal_renderer_opengl_utils_GLStack.prototype = {
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
	,__class__: openfl__$internal_renderer_opengl_utils_GLStack
};
var openfl__$internal_renderer_opengl_utils_GLBucket = function(gl) {
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
	this.mode = openfl__$internal_renderer_opengl_utils_BucketMode.Fill;
	this.textureMatrix = new openfl_geom_Matrix();
	this.textureTL = new openfl_geom_Point();
	this.textureBR = new openfl_geom_Point(1,1);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucket"] = openfl__$internal_renderer_opengl_utils_GLBucket;
openfl__$internal_renderer_opengl_utils_GLBucket.__name__ = ["openfl","_internal","renderer","opengl","utils","GLBucket"];
openfl__$internal_renderer_opengl_utils_GLBucket.prototype = {
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
		if(result == null) result = new openfl__$internal_renderer_opengl_utils_GLBucketData(this.gl);
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
		this.graphicType = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
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
	,__class__: openfl__$internal_renderer_opengl_utils_GLBucket
};
var openfl__$internal_renderer_opengl_utils_GLBucketData = function(gl,initLine) {
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
	if(initLine) this.line = new openfl__$internal_renderer_opengl_utils_GLBucketData(gl,false);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucketData"] = openfl__$internal_renderer_opengl_utils_GLBucketData;
openfl__$internal_renderer_opengl_utils_GLBucketData.__name__ = ["openfl","_internal","renderer","opengl","utils","GLBucketData"];
openfl__$internal_renderer_opengl_utils_GLBucketData.prototype = {
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
	,__class__: openfl__$internal_renderer_opengl_utils_GLBucketData
};
var openfl__$internal_renderer_opengl_utils_BucketMode = $hxClasses["openfl._internal.renderer.opengl.utils.BucketMode"] = { __ename__ : true, __constructs__ : ["None","Fill","PatternFill","Line","PatternLine","DrawTriangles","DrawTiles"] };
openfl__$internal_renderer_opengl_utils_BucketMode.None = ["None",0];
openfl__$internal_renderer_opengl_utils_BucketMode.None.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.None.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.Fill = ["Fill",1];
openfl__$internal_renderer_opengl_utils_BucketMode.Fill.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.Fill.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill = ["PatternFill",2];
openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.Line = ["Line",3];
openfl__$internal_renderer_opengl_utils_BucketMode.Line.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.Line.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternLine = ["PatternLine",4];
openfl__$internal_renderer_opengl_utils_BucketMode.PatternLine.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternLine.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles = ["DrawTriangles",5];
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles = ["DrawTiles",6];
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
var openfl__$internal_renderer_opengl_utils_GLGraphicsData = function(gl) {
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
$hxClasses["openfl._internal.renderer.opengl.utils.GLGraphicsData"] = openfl__$internal_renderer_opengl_utils_GLGraphicsData;
openfl__$internal_renderer_opengl_utils_GLGraphicsData.__name__ = ["openfl","_internal","renderer","opengl","utils","GLGraphicsData"];
openfl__$internal_renderer_opengl_utils_GLGraphicsData.prototype = {
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
	,__class__: openfl__$internal_renderer_opengl_utils_GLGraphicsData
};
var openfl__$internal_renderer_opengl_utils_PolyK = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PolyK"] = openfl__$internal_renderer_opengl_utils_PolyK;
openfl__$internal_renderer_opengl_utils_PolyK.__name__ = ["openfl","_internal","renderer","opengl","utils","PolyK"];
openfl__$internal_renderer_opengl_utils_PolyK.triangulate = function(p) {
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
		if(openfl__$internal_renderer_opengl_utils_PolyK._convex(ax,ay,bx,by,cx,cy,sign)) {
			earFound = true;
			var _g11 = 0;
			while(_g11 < al) {
				var j = _g11++;
				var vi = avl[j];
				if(vi == i0 || vi == i11 || vi == i2) continue;
				if(openfl__$internal_renderer_opengl_utils_PolyK._PointInTriangle(p[2 * vi],p[2 * vi + 1],ax,ay,bx,by,cx,cy)) {
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
				haxe_Log.trace("Warning: shape too complex to fill",{ fileName : "GraphicsRenderer.hx", lineNumber : 1506, className : "openfl._internal.renderer.opengl.utils.PolyK", methodName : "triangulate"});
				return [];
			}
		}
	}
	tgs.push(avl[0]);
	tgs.push(avl[1]);
	tgs.push(avl[2]);
	return tgs;
};
openfl__$internal_renderer_opengl_utils_PolyK._PointInTriangle = function(px,py,ax,ay,bx,by,cx,cy) {
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
openfl__$internal_renderer_opengl_utils_PolyK._convex = function(ax,ay,bx,by,cx,cy,sign) {
	return (ay - by) * (cx - bx) + (bx - ax) * (cy - by) >= 0 == sign;
};
var openfl__$internal_renderer_opengl_utils_GraphicType = $hxClasses["openfl._internal.renderer.opengl.utils.GraphicType"] = { __ename__ : true, __constructs__ : ["Polygon","Rectangle","Circle","Ellipse","DrawTriangles","DrawTiles"] };
openfl__$internal_renderer_opengl_utils_GraphicType.Polygon = ["Polygon",0];
openfl__$internal_renderer_opengl_utils_GraphicType.Polygon.toString = $estr;
openfl__$internal_renderer_opengl_utils_GraphicType.Polygon.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType;
openfl__$internal_renderer_opengl_utils_GraphicType.Rectangle = function(rounded) { var $x = ["Rectangle",1,rounded]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_GraphicType.Circle = ["Circle",2];
openfl__$internal_renderer_opengl_utils_GraphicType.Circle.toString = $estr;
openfl__$internal_renderer_opengl_utils_GraphicType.Circle.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType;
openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse = ["Ellipse",3];
openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse.toString = $estr;
openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType;
openfl__$internal_renderer_opengl_utils_GraphicType.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",4,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_GraphicType.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",5,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
var openfl__$internal_renderer_opengl_utils__$GraphicsRenderer_RenderMode_$Impl_$ = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils._GraphicsRenderer.RenderMode_Impl_"] = openfl__$internal_renderer_opengl_utils__$GraphicsRenderer_RenderMode_$Impl_$;
openfl__$internal_renderer_opengl_utils__$GraphicsRenderer_RenderMode_$Impl_$.__name__ = ["openfl","_internal","renderer","opengl","utils","_GraphicsRenderer","RenderMode_Impl_"];
var openfl__$internal_renderer_opengl_utils_MaskManager = function(gl) {
	this.maskStack = [];
	this.maskPosition = 0;
	this.setContext(gl);
	this.reverse = false;
	this.count = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.MaskManager"] = openfl__$internal_renderer_opengl_utils_MaskManager;
openfl__$internal_renderer_opengl_utils_MaskManager.__name__ = ["openfl","_internal","renderer","opengl","utils","MaskManager"];
openfl__$internal_renderer_opengl_utils_MaskManager.prototype = {
	destroy: function() {
		this.maskStack = null;
		this.gl = null;
	}
	,popMask: function(maskData,renderSession) {
		var gl = this.gl;
		renderSession.stencilManager.popStencil(maskData,maskData._webGL[openfl__$internal_renderer_opengl_GLRenderer.glContextId].data[0],renderSession);
	}
	,pushMask: function(maskData,renderSession) {
		var gl = renderSession.gl;
		if(maskData.dirty) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.updateGraphics(maskData,gl);
		if(maskData._webGL[openfl__$internal_renderer_opengl_GLRenderer.glContextId].data.length == 0) return;
		renderSession.stencilManager.pushStencil(maskData,maskData._webGL[openfl__$internal_renderer_opengl_GLRenderer.glContextId].data[0],renderSession);
	}
	,setContext: function(gl) {
		this.gl = gl;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_MaskManager
};
var openfl__$internal_renderer_opengl_utils_ShaderManager = function(gl) {
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
$hxClasses["openfl._internal.renderer.opengl.utils.ShaderManager"] = openfl__$internal_renderer_opengl_utils_ShaderManager;
openfl__$internal_renderer_opengl_utils_ShaderManager.__name__ = ["openfl","_internal","renderer","opengl","utils","ShaderManager"];
openfl__$internal_renderer_opengl_utils_ShaderManager.prototype = {
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
		this.primitiveShader = new openfl__$internal_renderer_opengl_shaders_PrimitiveShader(gl);
		this.complexPrimitiveShader = new openfl__$internal_renderer_opengl_shaders_ComplexPrimitiveShader(gl);
		this.defaultShader = new openfl__$internal_renderer_opengl_shaders_DefaultShader(gl);
		this.fastShader = new openfl__$internal_renderer_opengl_shaders_FastShader(gl);
		this.stripShader = new openfl__$internal_renderer_opengl_shaders_StripShader(gl);
		this.fillShader = new openfl__$internal_renderer_opengl_shaders_FillShader(gl);
		this.patternFillShader = new openfl__$internal_renderer_opengl_shaders_PatternFillShader(gl);
		this.drawTrianglesShader = new openfl__$internal_renderer_opengl_shaders_DrawTrianglesShader(gl);
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
	,__class__: openfl__$internal_renderer_opengl_utils_ShaderManager
};
var openfl__$internal_renderer_opengl_utils_SpriteBatch = function(gl) {
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
	this.currentState = new openfl__$internal_renderer_opengl_utils__$SpriteBatch_State();
};
$hxClasses["openfl._internal.renderer.opengl.utils.SpriteBatch"] = openfl__$internal_renderer_opengl_utils_SpriteBatch;
openfl__$internal_renderer_opengl_utils_SpriteBatch.__name__ = ["openfl","_internal","renderer","opengl","utils","SpriteBatch"];
openfl__$internal_renderer_opengl_utils_SpriteBatch.prototype = {
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
		var uvs = new openfl_display_TextureUvs();
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
		worldTransform.__translateTransformed(new openfl_geom_Point(object.__graphics.__bounds.x,object.__graphics.__bounds.y));
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
			blendMode = openfl_display_BlendMode.ADD;
			break;
		case 131072:
			blendMode = openfl_display_BlendMode.MULTIPLY;
			break;
		case 262144:
			blendMode = openfl_display_BlendMode.SCREEN;
			break;
		default:
			blendMode = openfl_display_BlendMode.NORMAL;
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
		var matrix = new openfl_geom_Matrix();
		var oMatrix = object.__worldTransform;
		var uvs = new openfl_display_TextureUvs();
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
		if(state == null) state = this.states[this.currentBatchSize] = new openfl__$internal_renderer_opengl_utils__$SpriteBatch_State();
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
	,__class__: openfl__$internal_renderer_opengl_utils_SpriteBatch
};
var openfl__$internal_renderer_opengl_utils__$SpriteBatch_State = function() {
	this.textureSmooth = true;
};
$hxClasses["openfl._internal.renderer.opengl.utils._SpriteBatch.State"] = openfl__$internal_renderer_opengl_utils__$SpriteBatch_State;
openfl__$internal_renderer_opengl_utils__$SpriteBatch_State.__name__ = ["openfl","_internal","renderer","opengl","utils","_SpriteBatch","State"];
openfl__$internal_renderer_opengl_utils__$SpriteBatch_State.prototype = {
	__class__: openfl__$internal_renderer_opengl_utils__$SpriteBatch_State
};
var openfl__$internal_renderer_opengl_utils_StencilManager = function(gl) {
	this.stencilStack = [];
	this.bucketStack = [];
	this.setContext(gl);
	this.reverse = true;
	this.count = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.StencilManager"] = openfl__$internal_renderer_opengl_utils_StencilManager;
openfl__$internal_renderer_opengl_utils_StencilManager.__name__ = ["openfl","_internal","renderer","opengl","utils","StencilManager"];
openfl__$internal_renderer_opengl_utils_StencilManager.prototype = {
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
	,__class__: openfl__$internal_renderer_opengl_utils_StencilManager
};
var openfl_display_Application = function() {
	lime_app_Application.call(this);
	openfl_Lib.application = this;
};
$hxClasses["openfl.display.Application"] = openfl_display_Application;
openfl_display_Application.__name__ = ["openfl","display","Application"];
openfl_display_Application.__super__ = lime_app_Application;
openfl_display_Application.prototype = $extend(lime_app_Application.prototype,{
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
		lime_app_Application.prototype.create.call(this,config);
		this.stage = new openfl_display_Stage(this.windows[0].width,this.windows[0].height,config.background);
		this.stage.addChild(openfl_Lib.current);
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
		this.onKey(new openfl_events_KeyboardEvent(openfl_events_KeyboardEvent.KEY_DOWN,true,false,charCode,keyCode1));
	}
	,onKeyUp: function(keyCode,modifier) {
		var keyCode1 = this.convertKeyCode(keyCode);
		var charCode = keyCode1;
		this.onKey(new openfl_events_KeyboardEvent(openfl_events_KeyboardEvent.KEY_UP,true,false,charCode,keyCode1));
	}
	,onMouse: function(type,x,y,button) {
		if(button > 2) return;
		this.stage.__mouseX = x;
		this.stage.__mouseY = y;
		var stack = [];
		var target = null;
		var targetPoint = new openfl_geom_Point(x,y);
		if(this.stage.__hitTest(x,y,false,stack,true)) target = stack[stack.length - 1]; else {
			target = this.stage;
			stack = [this.stage];
		}
		this.stage.__fireEvent(openfl_events_MouseEvent.__create(type,button,target == this.stage?targetPoint:target.globalToLocal(targetPoint),target),stack);
		var clickType;
		switch(type) {
		case openfl_events_MouseEvent.MOUSE_UP:
			clickType = openfl_events_MouseEvent.CLICK;
			break;
		case openfl_events_MouseEvent.MIDDLE_MOUSE_UP:
			clickType = openfl_events_MouseEvent.MIDDLE_CLICK;
			break;
		case openfl_events_MouseEvent.RIGHT_MOUSE_UP:
			clickType = openfl_events_MouseEvent.RIGHT_CLICK;
			break;
		default:
			clickType = null;
		}
		if(clickType != null) {
			this.stage.__fireEvent(openfl_events_MouseEvent.__create(clickType,button,target == this.stage?targetPoint:target.globalToLocal(targetPoint),target),stack);
			if(type == openfl_events_MouseEvent.MOUSE_UP && (js_Boot.__cast(target , openfl_display_InteractiveObject)).doubleClickEnabled) {
				var currentTime = openfl_Lib.getTimer();
				if(currentTime - this.__lastClickTime < 500) {
					this.stage.__fireEvent(openfl_events_MouseEvent.__create(openfl_events_MouseEvent.DOUBLE_CLICK,button,target == this.stage?targetPoint:target.globalToLocal(targetPoint),target),stack);
					this.__lastClickTime = 0;
				} else this.__lastClickTime = currentTime;
			}
		}
		if(js_Boot.__instanceof(target,openfl_display_Sprite)) {
			var targetSprite = target;
			if(targetSprite.buttonMode && targetSprite.useHandCursor) lime_ui_Mouse.set_cursor(lime_ui_MouseCursor.POINTER); else lime_ui_Mouse.set_cursor(lime_ui_MouseCursor.ARROW);
		} else lime_ui_Mouse.set_cursor(lime_ui_MouseCursor.ARROW);
		if(this.stage.__dragObject != null) this.stage.__drag(targetPoint);
	}
	,onMouseDown: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl_events_MouseEvent.MIDDLE_MOUSE_DOWN;
			break;
		case 2:
			type = openfl_events_MouseEvent.RIGHT_MOUSE_DOWN;
			break;
		default:
			type = openfl_events_MouseEvent.MOUSE_DOWN;
		}
		this.onMouse(type,x,y,button);
	}
	,onMouseMove: function(x,y,button) {
		this.onMouse(openfl_events_MouseEvent.MOUSE_MOVE,x,y,0);
	}
	,onMouseUp: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl_events_MouseEvent.MIDDLE_MOUSE_UP;
			break;
		case 2:
			type = openfl_events_MouseEvent.RIGHT_MOUSE_UP;
			break;
		default:
			type = openfl_events_MouseEvent.MOUSE_UP;
		}
		this.onMouse(type,x,y,button);
	}
	,onTouch: function(type,x,y,id) {
		var point = new openfl_geom_Point(x,y);
		this.stage.__mouseX = point.x;
		this.stage.__mouseY = point.y;
		var __stack = [];
		var mouseType;
		switch(type) {
		case "touchBegin":
			mouseType = openfl_events_MouseEvent.MOUSE_DOWN;
			break;
		case "touchMove":
			mouseType = openfl_events_MouseEvent.MOUSE_MOVE;
			break;
		case "touchEnd":
			mouseType = openfl_events_MouseEvent.MOUSE_UP;
			break;
		default:
			mouseType = null;
		}
		if(this.stage.__hitTest(x,y,false,__stack,true)) {
			var target = __stack[__stack.length - 1];
			var localPoint = target.globalToLocal(point);
			var touchEvent = openfl_events_TouchEvent.__create(type,null,localPoint,target);
			touchEvent.touchPointID = id;
			touchEvent.isPrimaryTouchPoint = true;
			var mouseEvent = openfl_events_MouseEvent.__create(mouseType,0,localPoint,target);
			mouseEvent.buttonDown = type != "touchEnd";
			this.stage.__fireEvent(touchEvent,__stack);
			this.stage.__fireEvent(mouseEvent,__stack);
		} else {
			var touchEvent1 = openfl_events_TouchEvent.__create(type,null,point,this.stage);
			touchEvent1.touchPointID = id;
			touchEvent1.isPrimaryTouchPoint = true;
			var mouseEvent1 = openfl_events_MouseEvent.__create(mouseType,0,point,this.stage);
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
		var event = new openfl_events_Event(openfl_events_Event.ACTIVATE);
		this.stage.__broadcast(event,true);
	}
	,onWindowDeactivate: function() {
		var event = new openfl_events_Event(openfl_events_Event.DEACTIVATE);
		this.stage.__broadcast(event,true);
	}
	,onWindowResize: function(width,height) {
		this.stage.stageWidth = width;
		this.stage.stageHeight = height;
		var event = new openfl_events_Event(openfl_events_Event.RESIZE);
		this.stage.__broadcast(event,false);
	}
	,render: function(context) {
		this.stage.__render(context);
	}
	,__class__: openfl_display_Application
});
var openfl_display_Bitmap = function(bitmapData,pixelSnapping,smoothing) {
	if(smoothing == null) smoothing = false;
	openfl_display_DisplayObjectContainer.call(this);
	this.bitmapData = bitmapData;
	this.pixelSnapping = pixelSnapping;
	this.smoothing = smoothing;
	if(pixelSnapping == null) this.pixelSnapping = openfl_display_PixelSnapping.AUTO;
};
$hxClasses["openfl.display.Bitmap"] = openfl_display_Bitmap;
openfl_display_Bitmap.__name__ = ["openfl","display","Bitmap"];
openfl_display_Bitmap.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Bitmap.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	__getBounds: function(rect,matrix) {
		if(this.bitmapData != null) {
			var bounds = new openfl_geom_Rectangle(0,0,this.bitmapData.width,this.bitmapData.height);
			bounds = bounds.transform(this.__worldTransform);
			rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || this.bitmapData == null) return false;
		var point = this.globalToLocal(new openfl_geom_Point(x,y));
		if(point.x > 0 && point.y > 0 && point.x <= this.bitmapData.width && point.y <= this.bitmapData.height) {
			if(stack != null && !interactiveOnly) stack.push(this);
			return true;
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		openfl__$internal_renderer_canvas_CanvasBitmap.render(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		if(this.stage != null && this.__worldVisible && this.__renderable && this.bitmapData != null && this.bitmapData.__isValid) {
			if(this.bitmapData.__image.buffer.__srcImage != null) openfl__$internal_renderer_dom_DOMBitmap.renderImage(this,renderSession); else openfl__$internal_renderer_dom_DOMBitmap.renderCanvas(this,renderSession);
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
		openfl__$internal_renderer_opengl_GLBitmap.render(this,renderSession);
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
					openfl_display_DisplayObject.__worldTransformDirty++;
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
					openfl_display_DisplayObject.__worldTransformDirty++;
				}
				this.set_scaleX(value / this.bitmapData.width);
			}
			return value;
		}
		return 0;
	}
	,__class__: openfl_display_Bitmap
});
var openfl_display_BitmapData = function(width,height,transparent,fillColor) {
	if(fillColor == null) fillColor = -1;
	if(transparent == null) transparent = true;
	this.transparent = transparent;
	if(width > 0 && height > 0) {
		this.width = width;
		this.height = height;
		this.rect = new openfl_geom_Rectangle(0,0,width,height);
		if(!transparent) fillColor = -16777216 | fillColor & 16777215;
		this.__image = new lime_graphics_Image(null,0,0,width,height,fillColor);
		this.__image.set_transparent(transparent);
		this.__isValid = true;
	}
	this.__createUVs();
};
$hxClasses["openfl.display.BitmapData"] = openfl_display_BitmapData;
openfl_display_BitmapData.__name__ = ["openfl","display","BitmapData"];
openfl_display_BitmapData.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_BitmapData.fromBase64 = function(base64,type,onload) {
	var bitmapData = new openfl_display_BitmapData(0,0,true);
	bitmapData.__loadFromBase64(base64,type,onload);
	return bitmapData;
};
openfl_display_BitmapData.fromBytes = function(bytes,rawAlpha,onload) {
	var bitmapData = new openfl_display_BitmapData(0,0,true);
	bitmapData.__loadFromBytes(bytes,rawAlpha,onload);
	return bitmapData;
};
openfl_display_BitmapData.fromCanvas = function(canvas,transparent) {
	if(transparent == null) transparent = true;
	var bitmapData = new openfl_display_BitmapData(0,0,transparent);
	bitmapData.__loadFromImage(lime_graphics_Image.fromCanvas(canvas));
	bitmapData.__image.set_transparent(transparent);
	return bitmapData;
};
openfl_display_BitmapData.fromFile = function(path,onload,onerror) {
	var bitmapData = new openfl_display_BitmapData(0,0,true);
	bitmapData.__loadFromFile(path,onload,onerror);
	return bitmapData;
};
openfl_display_BitmapData.fromImage = function(image,transparent) {
	if(transparent == null) transparent = true;
	var bitmapData = new openfl_display_BitmapData(0,0,transparent);
	bitmapData.__loadFromImage(image);
	bitmapData.__image.set_transparent(transparent);
	return bitmapData;
};
openfl_display_BitmapData.__flipPixel = function(pixel) {
	return (pixel & 255) << 24 | (pixel >> 8 & 255) << 16 | (pixel >> 16 & 255) << 8 | pixel >> 24 & 255;
};
openfl_display_BitmapData.__ucompare = function(n1,n2) {
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
openfl_display_BitmapData.prototype = {
	applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
		if(!this.__isValid || sourceBitmapData == null || !sourceBitmapData.__isValid) return;
		lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this.__image);
		lime_graphics_utils_ImageCanvasUtil.createImageData(this.__image);
		lime_graphics_utils_ImageCanvasUtil.convertToCanvas(sourceBitmapData.__image);
		lime_graphics_utils_ImageCanvasUtil.createImageData(sourceBitmapData.__image);
		filter.__applyFilter(this.__image.buffer.__srcImageData,sourceBitmapData.__image.buffer.__srcImageData,sourceRect,destPoint);
		this.__image.dirty = true;
	}
	,clone: function() {
		if(!this.__isValid) return new openfl_display_BitmapData(this.width,this.height,this.transparent); else return openfl_display_BitmapData.fromImage(this.__image.clone(),this.transparent);
	}
	,colorTransform: function(rect,colorTransform) {
		this.__image.colorTransform(rect.__toLimeRectangle(),colorTransform.__toLimeColorMatrix());
	}
	,copyChannel: function(sourceBitmapData,sourceRect,destPoint,sourceChannel,destChannel) {
		if(!this.__isValid) return;
		var sourceChannel1;
		switch(sourceChannel) {
		case 1:
			sourceChannel1 = lime_graphics_ImageChannel.RED;
			break;
		case 2:
			sourceChannel1 = lime_graphics_ImageChannel.GREEN;
			break;
		case 4:
			sourceChannel1 = lime_graphics_ImageChannel.BLUE;
			break;
		case 8:
			sourceChannel1 = lime_graphics_ImageChannel.ALPHA;
			break;
		default:
			return;
		}
		var destChannel1;
		switch(destChannel) {
		case 1:
			destChannel1 = lime_graphics_ImageChannel.RED;
			break;
		case 2:
			destChannel1 = lime_graphics_ImageChannel.GREEN;
			break;
		case 4:
			destChannel1 = lime_graphics_ImageChannel.BLUE;
			break;
		case 8:
			destChannel1 = lime_graphics_ImageChannel.ALPHA;
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
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this.__image);
			lime_graphics_utils_ImageCanvasUtil.sync(this.__image);
			var buffer = this.__image.buffer;
			var renderSession = new openfl__$internal_renderer_RenderSession();
			renderSession.context = buffer.__srcContext;
			renderSession.roundPixels = true;
			if(!smoothing) {
				buffer.__srcContext.mozImageSmoothingEnabled = false;
				buffer.__srcContext.webkitImageSmoothingEnabled = false;
				buffer.__srcContext.imageSmoothingEnabled = false;
			}
			var matrixCache = source.__worldTransform;
			if(matrix != null) source.__worldTransform = matrix; else source.__worldTransform = new openfl_geom_Matrix();
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
		openfl_Lib.notImplemented("BitmapData.encode");
		return null;
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
		var result;
		var this1;
		this1 = new openfl_VectorData();
		var this2;
		this2 = new Array(0);
		this1.data = this2;
		this1.length = 0;
		this1.fixed = false;
		result = this1;
		var _g1 = 0;
		var _g = pixels.length / 4 | 0;
		while(_g1 < _g) {
			var i = _g1++;
			var x = pixels.readUnsignedInt();
			if(!result.fixed) {
				result.length++;
				if(result.data.length < result.length) {
					var data;
					var this3;
					this3 = new Array(result.data.length + 10);
					data = this3;
					haxe_ds__$Vector_Vector_$Impl_$.blit(result.data,0,data,0,result.data.length);
					result.data = data;
				}
				result.data[result.length - 1] = x;
			}
			result.length;
		}
		return result;
	}
	,histogram: function(hRect) {
		var rect;
		if(hRect != null) rect = hRect; else rect = new openfl_geom_Rectangle(0,0,this.width,this.height);
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
		openfl_Lib.notImplemented("BitmapData.hitTest");
		return false;
	}
	,lock: function() {
	}
	,noise: function(randomSeed,low,high,channelOptions,grayScale) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		if(high == null) high = 255;
		if(low == null) low = 0;
		if(!this.__isValid) return;
		openfl_Lib.notImplemented("BitmapData.noise");
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
		var destRect = new openfl_geom_Rectangle(destPoint.x,destPoint.y,sw,sh);
		this.setPixels(destRect,pixels);
	}
	,perlinNoise: function(baseX,baseY,numOctaves,randomSeed,stitch,fractalNoise,channelOptions,grayScale,offsets) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		openfl_Lib.notImplemented("BitmapData.perlinNoise");
	}
	,scroll: function(x,y) {
		openfl_Lib.notImplemented("BitmapData.scroll");
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
		var byteArray = new lime_utils_ByteArray();
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
			var memory = new lime_utils_ByteArray();
			memory.set_length(this.width * this.height * 4);
			memory = this.getPixels(this.rect);
			memory.position = 0;
			openfl_Memory.select(memory);
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
					pixelValue = openfl_Memory._setPositionTemporarily(position,function() {
						return openfl_Memory.gcRef.readInt();
					});
					pixelMask = pixelValue & mask;
					i = openfl_display_BitmapData.__ucompare(pixelMask,thresholdMask);
					test = false;
					if(operation == "==") test = i == 0; else if(operation == "<") test = i == -1; else if(operation == ">") test = i == 1; else if(operation == "!=") test = i != 0; else if(operation == "<=") test = i == 0 || i == -1; else if(operation == ">=") test = i == 0 || i == 1;
					if(test) {
						openfl_Memory.setI32(position,color);
						hits++;
					}
				}
			}
			memory.position = 0;
			this.setPixels(this.rect,memory);
			openfl_Memory.select(null);
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
			var memory1 = new lime_utils_ByteArray();
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
			openfl_Memory.select(memory1);
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
					pixelValue1 = openfl_Memory._setPositionTemporarily(position1,function() {
						return openfl_Memory.gcRef.readInt();
					});
					pixelMask1 = pixelValue1 & mask;
					i1 = openfl_display_BitmapData.__ucompare(pixelMask1,thresholdMask1);
					test1 = false;
					if(operation == "==") test1 = i1 == 0; else if(operation == "<") test1 = i1 == -1; else if(operation == ">") test1 = i1 == 1; else if(operation == "!=") test1 = i1 != 0; else if(operation == "<=") test1 = i1 == 0 || i1 == -1; else if(operation == ">=") test1 = i1 == 0 || i1 == 1;
					if(test1) {
						openfl_Memory.setI32(position1,color);
						hits1++;
					} else if(copySource) openfl_Memory.setI32(position1,openfl_Memory._setPositionTemporarily(canvasMemory + position1,function() {
						return openfl_Memory.gcRef.readInt();
					}));
				}
			}
			memory1.position = 0;
			bitmapData.setPixels(sourceRect,memory1);
			this.copyPixels(bitmapData,bitmapData.rect,destPoint);
			openfl_Memory.select(null);
			return hits1;
		}
	}
	,unlock: function(changeRect) {
	}
	,__createUVs: function() {
		if(this.__uvData == null) this.__uvData = new openfl_display_TextureUvs();
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
		lime_graphics_Image.fromBase64(base64,type,function(image) {
			_g.__loadFromImage(image);
			if(onload != null) onload(_g);
		});
	}
	,__loadFromBytes: function(bytes,rawAlpha,onload) {
		var _g = this;
		lime_graphics_Image.fromBytes(bytes,function(image) {
			_g.__loadFromImage(image);
			if(rawAlpha != null) {
				lime_graphics_utils_ImageCanvasUtil.convertToCanvas(_g.__image);
				lime_graphics_utils_ImageCanvasUtil.createImageData(_g.__image);
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
		lime_graphics_Image.fromFile(path,function(image) {
			_g.__loadFromImage(image);
			if(onload != null) onload(_g);
		},onerror);
	}
	,__loadFromImage: function(image) {
		this.__image = image;
		this.width = image.width;
		this.height = image.height;
		this.rect = new openfl_geom_Rectangle(0,0,image.width,image.height);
		this.__isValid = true;
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__isValid) return;
		lime_graphics_utils_ImageCanvasUtil.sync(this.__image);
		var context = renderSession.context;
		if(this.__worldTransform == null) this.__worldTransform = new openfl_geom_Matrix();
		context.globalAlpha = 1;
		var transform = this.__worldTransform;
		if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		context.drawImage(this.__image.buffer.get_src(),0,0);
	}
	,__renderMask: function(renderSession) {
	}
	,__sync: function() {
		lime_graphics_utils_ImageCanvasUtil.sync(this.__image);
	}
	,__updateChildren: function(transformOnly) {
	}
	,__class__: openfl_display_BitmapData
};
var openfl_display_TextureUvs = function() {
	this.y3 = 0;
	this.y2 = 0;
	this.y1 = 0;
	this.y0 = 0;
	this.x3 = 0;
	this.x2 = 0;
	this.x1 = 0;
	this.x0 = 0;
};
$hxClasses["openfl.display.TextureUvs"] = openfl_display_TextureUvs;
openfl_display_TextureUvs.__name__ = ["openfl","display","TextureUvs"];
openfl_display_TextureUvs.prototype = {
	__class__: openfl_display_TextureUvs
};
var openfl_display_BlendMode = $hxClasses["openfl.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] };
openfl_display_BlendMode.ADD = ["ADD",0];
openfl_display_BlendMode.ADD.toString = $estr;
openfl_display_BlendMode.ADD.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.ALPHA = ["ALPHA",1];
openfl_display_BlendMode.ALPHA.toString = $estr;
openfl_display_BlendMode.ALPHA.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.DARKEN = ["DARKEN",2];
openfl_display_BlendMode.DARKEN.toString = $estr;
openfl_display_BlendMode.DARKEN.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.DIFFERENCE = ["DIFFERENCE",3];
openfl_display_BlendMode.DIFFERENCE.toString = $estr;
openfl_display_BlendMode.DIFFERENCE.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.ERASE = ["ERASE",4];
openfl_display_BlendMode.ERASE.toString = $estr;
openfl_display_BlendMode.ERASE.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.HARDLIGHT = ["HARDLIGHT",5];
openfl_display_BlendMode.HARDLIGHT.toString = $estr;
openfl_display_BlendMode.HARDLIGHT.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.INVERT = ["INVERT",6];
openfl_display_BlendMode.INVERT.toString = $estr;
openfl_display_BlendMode.INVERT.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.LAYER = ["LAYER",7];
openfl_display_BlendMode.LAYER.toString = $estr;
openfl_display_BlendMode.LAYER.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.LIGHTEN = ["LIGHTEN",8];
openfl_display_BlendMode.LIGHTEN.toString = $estr;
openfl_display_BlendMode.LIGHTEN.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.MULTIPLY = ["MULTIPLY",9];
openfl_display_BlendMode.MULTIPLY.toString = $estr;
openfl_display_BlendMode.MULTIPLY.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.NORMAL = ["NORMAL",10];
openfl_display_BlendMode.NORMAL.toString = $estr;
openfl_display_BlendMode.NORMAL.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.OVERLAY = ["OVERLAY",11];
openfl_display_BlendMode.OVERLAY.toString = $estr;
openfl_display_BlendMode.OVERLAY.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.SCREEN = ["SCREEN",12];
openfl_display_BlendMode.SCREEN.toString = $estr;
openfl_display_BlendMode.SCREEN.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.SUBTRACT = ["SUBTRACT",13];
openfl_display_BlendMode.SUBTRACT.toString = $estr;
openfl_display_BlendMode.SUBTRACT.__enum__ = openfl_display_BlendMode;
var openfl_display_CapsStyle = $hxClasses["openfl.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] };
openfl_display_CapsStyle.NONE = ["NONE",0];
openfl_display_CapsStyle.NONE.toString = $estr;
openfl_display_CapsStyle.NONE.__enum__ = openfl_display_CapsStyle;
openfl_display_CapsStyle.ROUND = ["ROUND",1];
openfl_display_CapsStyle.ROUND.toString = $estr;
openfl_display_CapsStyle.ROUND.__enum__ = openfl_display_CapsStyle;
openfl_display_CapsStyle.SQUARE = ["SQUARE",2];
openfl_display_CapsStyle.SQUARE.toString = $estr;
openfl_display_CapsStyle.SQUARE.__enum__ = openfl_display_CapsStyle;
var openfl_display_FrameLabel = function(name,frame) {
	openfl_events_EventDispatcher.call(this);
	this.__name = name;
	this.__frame = frame;
};
$hxClasses["openfl.display.FrameLabel"] = openfl_display_FrameLabel;
openfl_display_FrameLabel.__name__ = ["openfl","display","FrameLabel"];
openfl_display_FrameLabel.__super__ = openfl_events_EventDispatcher;
openfl_display_FrameLabel.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	get_frame: function() {
		return this.__frame;
	}
	,get_name: function() {
		return this.__name;
	}
	,__class__: openfl_display_FrameLabel
	,__properties__: {get_name:"get_name",get_frame:"get_frame"}
});
var openfl_display_GradientType = $hxClasses["openfl.display.GradientType"] = { __ename__ : true, __constructs__ : ["RADIAL","LINEAR"] };
openfl_display_GradientType.RADIAL = ["RADIAL",0];
openfl_display_GradientType.RADIAL.toString = $estr;
openfl_display_GradientType.RADIAL.__enum__ = openfl_display_GradientType;
openfl_display_GradientType.LINEAR = ["LINEAR",1];
openfl_display_GradientType.LINEAR.toString = $estr;
openfl_display_GradientType.LINEAR.__enum__ = openfl_display_GradientType;
var openfl_display_Graphics = function() {
	this.__visible = true;
	this.__glStack = [];
	this.__dirty = true;
	this.__commands = [];
	this.__commands = new Array();
	this.__halfStrokeWidth = 0;
	this.__positionX = 0;
	this.__positionY = 0;
};
$hxClasses["openfl.display.Graphics"] = openfl_display_Graphics;
openfl_display_Graphics.__name__ = ["openfl","display","Graphics"];
openfl_display_Graphics.prototype = {
	beginBitmapFill: function(bitmap,matrix,repeat,smooth) {
		if(smooth == null) smooth = false;
		if(repeat == null) repeat = true;
		this.__commands.push(openfl_display_DrawCommand.BeginBitmapFill(bitmap,matrix != null?new openfl_geom_Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty):null,repeat,smooth));
		this.__visible = true;
	}
	,beginFill: function(color,alpha) {
		if(alpha == null) alpha = 1;
		if(color == null) color = 0;
		this.__commands.push(openfl_display_DrawCommand.BeginFill(color & 16777215,alpha));
		if(alpha > 0) this.__visible = true;
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		openfl_Lib.notImplemented("Graphics.beginGradientFill");
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
		this.__commands.push(openfl_display_DrawCommand.CubicCurveTo(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY));
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
		this.__commands.push(openfl_display_DrawCommand.CurveTo(controlX,controlY,anchorX,anchorY));
		this.__dirty = true;
	}
	,drawCircle: function(x,y,radius) {
		if(radius <= 0) return;
		this.__inflateBounds(x - radius - this.__halfStrokeWidth,y - radius - this.__halfStrokeWidth);
		this.__inflateBounds(x + radius + this.__halfStrokeWidth,y + radius + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.DrawCircle(x,y,radius));
		this.__dirty = true;
	}
	,drawEllipse: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.DrawEllipse(x,y,width,height));
		this.__dirty = true;
	}
	,drawGraphicsData: function(graphicsData) {
		openfl_Lib.notImplemented("Graphics.drawGraphicsData");
	}
	,drawPath: function(commands,data,winding) {
		openfl_Lib.notImplemented("Graphics.drawPath");
	}
	,drawRect: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.DrawRect(x,y,width,height));
		this.__dirty = true;
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.DrawRoundRect(x,y,width,height,rx,ry));
		this.__dirty = true;
	}
	,drawRoundRectComplex: function(x,y,width,height,topLeftRadius,topRightRadius,bottomLeftRadius,bottomRightRadius) {
		openfl_Lib.notImplemented("Graphics.drawRoundRectComplex");
	}
	,drawTiles: function(sheet,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.__inflateBounds(0,0);
		this.__inflateBounds(openfl_Lib.current.stage.stageWidth,openfl_Lib.current.stage.stageHeight);
		this.__commands.push(openfl_display_DrawCommand.DrawTiles(sheet,tileData,smooth,flags,count));
		this.__dirty = true;
		this.__visible = true;
	}
	,drawTriangles: function(vertices,indices,uvtData,culling,colors,blendMode) {
		if(blendMode == null) blendMode = 0;
		var vlen = vertices.length / 2 | 0;
		if(culling == null) culling = openfl_display_TriangleCulling.NONE;
		if(indices == null) {
			if(vlen % 3 != 0) throw new openfl_errors_ArgumentError("Not enough vertices to close a triangle.");
			var this1;
			this1 = new openfl_VectorData();
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
						haxe_ds__$Vector_Vector_$Impl_$.blit(indices.data,0,data,0,indices.data.length);
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
		this.__commands.push(openfl_display_DrawCommand.DrawTriangles(vertices,indices,uvtData,culling,colors,blendMode));
		this.__dirty = true;
		this.__visible = true;
	}
	,endFill: function() {
		this.__commands.push(openfl_display_DrawCommand.EndFill);
	}
	,lineBitmapStyle: function(bitmap,matrix,repeat,smooth) {
		if(smooth == null) smooth = false;
		if(repeat == null) repeat = true;
		openfl_Lib.notImplemented("Graphics.lineBitmapStyle");
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		openfl_Lib.notImplemented("Graphics.lineGradientStyle");
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		if(thickness != null) this.__halfStrokeWidth = thickness / 2; else this.__halfStrokeWidth = 0;
		this.__commands.push(openfl_display_DrawCommand.LineStyle(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit));
		if(thickness != null) this.__visible = true;
	}
	,lineTo: function(x,y) {
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__positionX = x;
		this.__positionY = y;
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.LineTo(x,y));
		this.__dirty = true;
	}
	,moveTo: function(x,y) {
		this.__positionX = x;
		this.__positionY = y;
		this.__commands.push(openfl_display_DrawCommand.MoveTo(x,y));
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
			this.__bounds = new openfl_geom_Rectangle(x,y,0,0);
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
	,__class__: openfl_display_Graphics
};
var openfl_display_DrawCommand = $hxClasses["openfl.display.DrawCommand"] = { __ename__ : true, __constructs__ : ["BeginBitmapFill","BeginFill","CubicCurveTo","CurveTo","DrawCircle","DrawEllipse","DrawRect","DrawRoundRect","DrawTiles","DrawTriangles","EndFill","LineStyle","LineTo","MoveTo"] };
openfl_display_DrawCommand.BeginBitmapFill = function(bitmap,matrix,repeat,smooth) { var $x = ["BeginBitmapFill",0,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.BeginFill = function(color,alpha) { var $x = ["BeginFill",1,color,alpha]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.CubicCurveTo = function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) { var $x = ["CubicCurveTo",2,controlX1,controlY1,controlX2,controlY2,anchorX,anchorY]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.CurveTo = function(controlX,controlY,anchorX,anchorY) { var $x = ["CurveTo",3,controlX,controlY,anchorX,anchorY]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawCircle = function(x,y,radius) { var $x = ["DrawCircle",4,x,y,radius]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawEllipse = function(x,y,width,height) { var $x = ["DrawEllipse",5,x,y,width,height]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawRect = function(x,y,width,height) { var $x = ["DrawRect",6,x,y,width,height]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawRoundRect = function(x,y,width,height,rx,ry) { var $x = ["DrawRoundRect",7,x,y,width,height,rx,ry]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",8,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",9,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.EndFill = ["EndFill",10];
openfl_display_DrawCommand.EndFill.toString = $estr;
openfl_display_DrawCommand.EndFill.__enum__ = openfl_display_DrawCommand;
openfl_display_DrawCommand.LineStyle = function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) { var $x = ["LineStyle",11,thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.LineTo = function(x,y) { var $x = ["LineTo",12,x,y]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.MoveTo = function(x,y) { var $x = ["MoveTo",13,x,y]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
var openfl_display_GraphicsPathWinding = $hxClasses["openfl.display.GraphicsPathWinding"] = { __ename__ : true, __constructs__ : ["EVEN_ODD","NON_ZERO"] };
openfl_display_GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
openfl_display_GraphicsPathWinding.EVEN_ODD.toString = $estr;
openfl_display_GraphicsPathWinding.EVEN_ODD.__enum__ = openfl_display_GraphicsPathWinding;
openfl_display_GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
openfl_display_GraphicsPathWinding.NON_ZERO.toString = $estr;
openfl_display_GraphicsPathWinding.NON_ZERO.__enum__ = openfl_display_GraphicsPathWinding;
var openfl_display_IGraphicsData = function() { };
$hxClasses["openfl.display.IGraphicsData"] = openfl_display_IGraphicsData;
openfl_display_IGraphicsData.__name__ = ["openfl","display","IGraphicsData"];
openfl_display_IGraphicsData.prototype = {
	__class__: openfl_display_IGraphicsData
};
var openfl_display_GraphicsDataType = $hxClasses["openfl.display.GraphicsDataType"] = { __ename__ : true, __constructs__ : ["STROKE","SOLID","GRADIENT","PATH","BITMAP","END"] };
openfl_display_GraphicsDataType.STROKE = ["STROKE",0];
openfl_display_GraphicsDataType.STROKE.toString = $estr;
openfl_display_GraphicsDataType.STROKE.__enum__ = openfl_display_GraphicsDataType;
openfl_display_GraphicsDataType.SOLID = ["SOLID",1];
openfl_display_GraphicsDataType.SOLID.toString = $estr;
openfl_display_GraphicsDataType.SOLID.__enum__ = openfl_display_GraphicsDataType;
openfl_display_GraphicsDataType.GRADIENT = ["GRADIENT",2];
openfl_display_GraphicsDataType.GRADIENT.toString = $estr;
openfl_display_GraphicsDataType.GRADIENT.__enum__ = openfl_display_GraphicsDataType;
openfl_display_GraphicsDataType.PATH = ["PATH",3];
openfl_display_GraphicsDataType.PATH.toString = $estr;
openfl_display_GraphicsDataType.PATH.__enum__ = openfl_display_GraphicsDataType;
openfl_display_GraphicsDataType.BITMAP = ["BITMAP",4];
openfl_display_GraphicsDataType.BITMAP.toString = $estr;
openfl_display_GraphicsDataType.BITMAP.__enum__ = openfl_display_GraphicsDataType;
openfl_display_GraphicsDataType.END = ["END",5];
openfl_display_GraphicsDataType.END.toString = $estr;
openfl_display_GraphicsDataType.END.__enum__ = openfl_display_GraphicsDataType;
var openfl_display_InterpolationMethod = $hxClasses["openfl.display.InterpolationMethod"] = { __ename__ : true, __constructs__ : ["RGB","LINEAR_RGB"] };
openfl_display_InterpolationMethod.RGB = ["RGB",0];
openfl_display_InterpolationMethod.RGB.toString = $estr;
openfl_display_InterpolationMethod.RGB.__enum__ = openfl_display_InterpolationMethod;
openfl_display_InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
openfl_display_InterpolationMethod.LINEAR_RGB.toString = $estr;
openfl_display_InterpolationMethod.LINEAR_RGB.__enum__ = openfl_display_InterpolationMethod;
var openfl_display_JointStyle = $hxClasses["openfl.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] };
openfl_display_JointStyle.MITER = ["MITER",0];
openfl_display_JointStyle.MITER.toString = $estr;
openfl_display_JointStyle.MITER.__enum__ = openfl_display_JointStyle;
openfl_display_JointStyle.ROUND = ["ROUND",1];
openfl_display_JointStyle.ROUND.toString = $estr;
openfl_display_JointStyle.ROUND.__enum__ = openfl_display_JointStyle;
openfl_display_JointStyle.BEVEL = ["BEVEL",2];
openfl_display_JointStyle.BEVEL.toString = $estr;
openfl_display_JointStyle.BEVEL.__enum__ = openfl_display_JointStyle;
var openfl_display_LineScaleMode = $hxClasses["openfl.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] };
openfl_display_LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
openfl_display_LineScaleMode.HORIZONTAL.toString = $estr;
openfl_display_LineScaleMode.HORIZONTAL.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.NONE = ["NONE",1];
openfl_display_LineScaleMode.NONE.toString = $estr;
openfl_display_LineScaleMode.NONE.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.NORMAL = ["NORMAL",2];
openfl_display_LineScaleMode.NORMAL.toString = $estr;
openfl_display_LineScaleMode.NORMAL.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.VERTICAL = ["VERTICAL",3];
openfl_display_LineScaleMode.VERTICAL.toString = $estr;
openfl_display_LineScaleMode.VERTICAL.__enum__ = openfl_display_LineScaleMode;
var openfl_display_Loader = function() {
	openfl_display_Sprite.call(this);
	this.contentLoaderInfo = openfl_display_LoaderInfo.create(this);
};
$hxClasses["openfl.display.Loader"] = openfl_display_Loader;
openfl_display_Loader.__name__ = ["openfl","display","Loader"];
openfl_display_Loader.__super__ = openfl_display_Sprite;
openfl_display_Loader.prototype = $extend(openfl_display_Sprite.prototype,{
	close: function() {
		openfl_Lib.notImplemented("Loader.close");
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
		openfl_display_BitmapData.fromFile(request.url,$bind(this,this.BitmapData_onLoad),$bind(this,this.BitmapData_onError));
	}
	,loadBytes: function(buffer) {
		openfl_display_BitmapData.fromBytes(buffer,null,$bind(this,this.BitmapData_onLoad));
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
			var event = new openfl_events_Event(openfl_events_Event.UNLOAD);
			event.currentTarget = this;
			this.dispatchEvent(event);
		}
	}
	,unloadAndStop: function(gc) {
		if(gc == null) gc = true;
		openfl_Lib.notImplemented("Loader.unloadAndStop");
	}
	,BitmapData_onLoad: function(bitmapData) {
		this.contentLoaderInfo.content = new openfl_display_Bitmap(bitmapData);
		this.content = this.contentLoaderInfo.content;
		this.addChild(this.contentLoaderInfo.content);
		var event = new openfl_events_Event(openfl_events_Event.COMPLETE);
		event.target = this.contentLoaderInfo;
		event.currentTarget = this.contentLoaderInfo;
		this.contentLoaderInfo.dispatchEvent(event);
	}
	,BitmapData_onError: function() {
		var event = new openfl_events_IOErrorEvent(openfl_events_IOErrorEvent.IO_ERROR);
		event.target = this.contentLoaderInfo;
		event.currentTarget = this.contentLoaderInfo;
		this.contentLoaderInfo.dispatchEvent(event);
	}
	,__class__: openfl_display_Loader
});
var openfl_display_PixelSnapping = $hxClasses["openfl.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] };
openfl_display_PixelSnapping.NEVER = ["NEVER",0];
openfl_display_PixelSnapping.NEVER.toString = $estr;
openfl_display_PixelSnapping.NEVER.__enum__ = openfl_display_PixelSnapping;
openfl_display_PixelSnapping.AUTO = ["AUTO",1];
openfl_display_PixelSnapping.AUTO.toString = $estr;
openfl_display_PixelSnapping.AUTO.__enum__ = openfl_display_PixelSnapping;
openfl_display_PixelSnapping.ALWAYS = ["ALWAYS",2];
openfl_display_PixelSnapping.ALWAYS.toString = $estr;
openfl_display_PixelSnapping.ALWAYS.__enum__ = openfl_display_PixelSnapping;
var openfl_display_Preloader = function(display) {
	lime_app_Preloader.call(this);
	if(display != null) {
		this.display = display;
		openfl_Lib.current.addChild(display);
		if(js_Boot.__instanceof(display,NMEPreloader)) (js_Boot.__cast(display , NMEPreloader)).onInit();
	}
};
$hxClasses["openfl.display.Preloader"] = openfl_display_Preloader;
openfl_display_Preloader.__name__ = ["openfl","display","Preloader"];
openfl_display_Preloader.__super__ = lime_app_Preloader;
openfl_display_Preloader.prototype = $extend(lime_app_Preloader.prototype,{
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
				var sound = haxe_io_Path.withoutExtension(url);
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
			var sound1 = new openfl_media_Sound();
			sound1.addEventListener(openfl_events_Event.COMPLETE,$bind(this,this.sound_onComplete));
			sound1.addEventListener(openfl_events_IOErrorEvent.IO_ERROR,$bind(this,this.sound_onIOError));
			sound1.load(new openfl_net_URLRequest(soundName + ".ogg"));
		}
		lime_app_Preloader.prototype.load.call(this,urls,types);
	}
	,start: function() {
		if(this.display != null && js_Boot.__instanceof(this.display,NMEPreloader)) {
			this.display.addEventListener(openfl_events_Event.COMPLETE,$bind(this,this.display_onComplete));
			(js_Boot.__cast(this.display , NMEPreloader)).onLoaded();
		} else lime_app_Preloader.prototype.start.call(this);
	}
	,update: function(loaded,total) {
		if(this.display != null && js_Boot.__instanceof(this.display,NMEPreloader)) (js_Boot.__cast(this.display , NMEPreloader)).onUpdate(loaded,total);
	}
	,display_onComplete: function(event) {
		this.display.removeEventListener(openfl_events_Event.COMPLETE,$bind(this,this.display_onComplete));
		openfl_Lib.current.removeChild(this.display);
		openfl_Lib.current.stage.set_focus(null);
		this.display = null;
		lime_app_Preloader.prototype.start.call(this);
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
	,__class__: openfl_display_Preloader
});
var openfl_display_Shape = function() {
	openfl_display_DisplayObject.call(this);
};
$hxClasses["openfl.display.Shape"] = openfl_display_Shape;
openfl_display_Shape.__name__ = ["openfl","display","Shape"];
openfl_display_Shape.__super__ = openfl_display_DisplayObject;
openfl_display_Shape.prototype = $extend(openfl_display_DisplayObject.prototype,{
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
		openfl__$internal_renderer_canvas_CanvasShape.render(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		openfl__$internal_renderer_dom_DOMShape.render(this,renderSession);
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__graphics != null) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.render(this,renderSession);
	}
	,get_graphics: function() {
		if(this.__graphics == null) this.__graphics = new openfl_display_Graphics();
		return this.__graphics;
	}
	,__class__: openfl_display_Shape
	,__properties__: $extend(openfl_display_DisplayObject.prototype.__properties__,{get_graphics:"get_graphics"})
});
var openfl_display_SpreadMethod = $hxClasses["openfl.display.SpreadMethod"] = { __ename__ : true, __constructs__ : ["REPEAT","REFLECT","PAD"] };
openfl_display_SpreadMethod.REPEAT = ["REPEAT",0];
openfl_display_SpreadMethod.REPEAT.toString = $estr;
openfl_display_SpreadMethod.REPEAT.__enum__ = openfl_display_SpreadMethod;
openfl_display_SpreadMethod.REFLECT = ["REFLECT",1];
openfl_display_SpreadMethod.REFLECT.toString = $estr;
openfl_display_SpreadMethod.REFLECT.__enum__ = openfl_display_SpreadMethod;
openfl_display_SpreadMethod.PAD = ["PAD",2];
openfl_display_SpreadMethod.PAD.toString = $estr;
openfl_display_SpreadMethod.PAD.__enum__ = openfl_display_SpreadMethod;
var openfl_display_Stage = function(width,height,color) {
	this.__mouseY = 0;
	this.__mouseX = 0;
	openfl_display_Sprite.call(this);
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
	this.align = openfl_display_StageAlign.TOP_LEFT;
	this.allowsFullScreen = false;
	this.set_displayState(openfl_display_StageDisplayState.NORMAL);
	this.frameRate = 60;
	this.quality = openfl_display_StageQuality.HIGH;
	this.scaleMode = openfl_display_StageScaleMode.NO_SCALE;
	this.stageFocusRect = true;
	this.__clearBeforeRender = true;
	this.__stack = [];
};
$hxClasses["openfl.display.Stage"] = openfl_display_Stage;
openfl_display_Stage.__name__ = ["openfl","display","Stage"];
openfl_display_Stage.__super__ = openfl_display_Sprite;
openfl_display_Stage.prototype = $extend(openfl_display_Sprite.prototype,{
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
			event.eventPhase = openfl_events_EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
		} else {
			event.eventPhase = openfl_events_EventPhase.CAPTURING_PHASE;
			event.target = stack[stack.length - 1];
			var _g1 = 0;
			var _g = length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				stack[i].__broadcast(event,false);
				if(event.__isCancelled) return;
			}
			event.eventPhase = openfl_events_EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
			if(event.__isCancelled) return;
			if(event.bubbles) {
				event.eventPhase = openfl_events_EventPhase.BUBBLING_PHASE;
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
		this.__broadcast(new openfl_events_Event(openfl_events_Event.ENTER_FRAME),true);
		if(this.__invalidated) {
			this.__invalidated = false;
			this.__broadcast(new openfl_events_Event(openfl_events_Event.RENDER),true);
		}
		this.__renderable = true;
		this.__update(false,true);
		switch(context[1]) {
		case 0:
			var gl = context[2];
			if(this.__renderer == null) this.__renderer = new openfl__$internal_renderer_opengl_GLRenderer(this.stageWidth,this.stageHeight,gl);
			this.__renderer.render(this);
			break;
		case 1:
			var context1 = context[2];
			if(this.__renderer == null) this.__renderer = new openfl__$internal_renderer_canvas_CanvasRenderer(this.stageWidth,this.stageHeight,context1);
			this.__renderer.render(this);
			break;
		case 2:
			var element = context[2];
			if(this.__renderer == null) this.__renderer = new openfl__$internal_renderer_dom_DOMRenderer(this.stageWidth,this.stageHeight,element);
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
				var mouse = new openfl_geom_Point(this.get_mouseX(),this.get_mouseY());
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
			if(openfl_display_DisplayObject.__worldTransformDirty > 0) {
				openfl_display_Sprite.prototype.__update.call(this,true,updateChildren);
				if(updateChildren) {
					openfl_display_DisplayObject.__worldTransformDirty = 0;
					this.__dirty = true;
				}
			}
		} else if(openfl_display_DisplayObject.__worldTransformDirty > 0 || this.__dirty || openfl_display_DisplayObject.__worldRenderDirty > 0) {
			openfl_display_Sprite.prototype.__update.call(this,false,updateChildren);
			if(updateChildren) {
				openfl_display_DisplayObject.__worldTransformDirty = 0;
				openfl_display_DisplayObject.__worldRenderDirty = 0;
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
				var event = new openfl_events_FocusEvent(openfl_events_FocusEvent.FOCUS_OUT,true,false,value,false,0);
				this.__stack = [];
				this.__focus.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event,this.__stack);
			}
			if(value != null) {
				var event1 = new openfl_events_FocusEvent(openfl_events_FocusEvent.FOCUS_IN,true,false,this.__focus,false,0);
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
	,__class__: openfl_display_Stage
	,__properties__: $extend(openfl_display_Sprite.prototype.__properties__,{set_focus:"set_focus",get_focus:"get_focus",set_displayState:"set_displayState",set_color:"set_color",get_color:"get_color"})
});
var openfl_display_StageAlign = $hxClasses["openfl.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] };
openfl_display_StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
openfl_display_StageAlign.TOP_RIGHT.toString = $estr;
openfl_display_StageAlign.TOP_RIGHT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.TOP_LEFT = ["TOP_LEFT",1];
openfl_display_StageAlign.TOP_LEFT.toString = $estr;
openfl_display_StageAlign.TOP_LEFT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.TOP = ["TOP",2];
openfl_display_StageAlign.TOP.toString = $estr;
openfl_display_StageAlign.TOP.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.RIGHT = ["RIGHT",3];
openfl_display_StageAlign.RIGHT.toString = $estr;
openfl_display_StageAlign.RIGHT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.LEFT = ["LEFT",4];
openfl_display_StageAlign.LEFT.toString = $estr;
openfl_display_StageAlign.LEFT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
openfl_display_StageAlign.BOTTOM_RIGHT.toString = $estr;
openfl_display_StageAlign.BOTTOM_RIGHT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
openfl_display_StageAlign.BOTTOM_LEFT.toString = $estr;
openfl_display_StageAlign.BOTTOM_LEFT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.BOTTOM = ["BOTTOM",7];
openfl_display_StageAlign.BOTTOM.toString = $estr;
openfl_display_StageAlign.BOTTOM.__enum__ = openfl_display_StageAlign;
var openfl_display_StageDisplayState = $hxClasses["openfl.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] };
openfl_display_StageDisplayState.NORMAL = ["NORMAL",0];
openfl_display_StageDisplayState.NORMAL.toString = $estr;
openfl_display_StageDisplayState.NORMAL.__enum__ = openfl_display_StageDisplayState;
openfl_display_StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
openfl_display_StageDisplayState.FULL_SCREEN.toString = $estr;
openfl_display_StageDisplayState.FULL_SCREEN.__enum__ = openfl_display_StageDisplayState;
openfl_display_StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
openfl_display_StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
openfl_display_StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = openfl_display_StageDisplayState;
var openfl_display_StageQuality = $hxClasses["openfl.display.StageQuality"] = { __ename__ : true, __constructs__ : ["BEST","HIGH","MEDIUM","LOW"] };
openfl_display_StageQuality.BEST = ["BEST",0];
openfl_display_StageQuality.BEST.toString = $estr;
openfl_display_StageQuality.BEST.__enum__ = openfl_display_StageQuality;
openfl_display_StageQuality.HIGH = ["HIGH",1];
openfl_display_StageQuality.HIGH.toString = $estr;
openfl_display_StageQuality.HIGH.__enum__ = openfl_display_StageQuality;
openfl_display_StageQuality.MEDIUM = ["MEDIUM",2];
openfl_display_StageQuality.MEDIUM.toString = $estr;
openfl_display_StageQuality.MEDIUM.__enum__ = openfl_display_StageQuality;
openfl_display_StageQuality.LOW = ["LOW",3];
openfl_display_StageQuality.LOW.toString = $estr;
openfl_display_StageQuality.LOW.__enum__ = openfl_display_StageQuality;
var openfl_display_StageScaleMode = $hxClasses["openfl.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] };
openfl_display_StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
openfl_display_StageScaleMode.SHOW_ALL.toString = $estr;
openfl_display_StageScaleMode.SHOW_ALL.__enum__ = openfl_display_StageScaleMode;
openfl_display_StageScaleMode.NO_SCALE = ["NO_SCALE",1];
openfl_display_StageScaleMode.NO_SCALE.toString = $estr;
openfl_display_StageScaleMode.NO_SCALE.__enum__ = openfl_display_StageScaleMode;
openfl_display_StageScaleMode.NO_BORDER = ["NO_BORDER",2];
openfl_display_StageScaleMode.NO_BORDER.toString = $estr;
openfl_display_StageScaleMode.NO_BORDER.__enum__ = openfl_display_StageScaleMode;
openfl_display_StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
openfl_display_StageScaleMode.EXACT_FIT.toString = $estr;
openfl_display_StageScaleMode.EXACT_FIT.__enum__ = openfl_display_StageScaleMode;
var openfl_display_Tilesheet = function(image) {
	this.__bitmap = image;
	this.__centerPoints = new Array();
	this.__tileRects = new Array();
	this.__tileUVs = new Array();
	this.__rectTile = new openfl_geom_Rectangle();
	this.__rectUV = new openfl_geom_Rectangle();
	this.__point = new openfl_geom_Point();
};
$hxClasses["openfl.display.Tilesheet"] = openfl_display_Tilesheet;
openfl_display_Tilesheet.__name__ = ["openfl","display","Tilesheet"];
openfl_display_Tilesheet.prototype = {
	addTileRect: function(rectangle,centerPoint) {
		this.__tileRects.push(rectangle);
		if(centerPoint == null) centerPoint = openfl_display_Tilesheet.__defaultPoint;
		this.__centerPoints.push(centerPoint);
		this.__tileUVs.push(new openfl_geom_Rectangle(rectangle.get_left() / this.__bitmap.width,rectangle.get_top() / this.__bitmap.height,rectangle.get_right() / this.__bitmap.width,rectangle.get_bottom() / this.__bitmap.height));
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
	,__class__: openfl_display_Tilesheet
};
var openfl_display_TriangleCulling = $hxClasses["openfl.display.TriangleCulling"] = { __ename__ : true, __constructs__ : ["NEGATIVE","NONE","POSITIVE"] };
openfl_display_TriangleCulling.NEGATIVE = ["NEGATIVE",0];
openfl_display_TriangleCulling.NEGATIVE.toString = $estr;
openfl_display_TriangleCulling.NEGATIVE.__enum__ = openfl_display_TriangleCulling;
openfl_display_TriangleCulling.NONE = ["NONE",1];
openfl_display_TriangleCulling.NONE.toString = $estr;
openfl_display_TriangleCulling.NONE.__enum__ = openfl_display_TriangleCulling;
openfl_display_TriangleCulling.POSITIVE = ["POSITIVE",2];
openfl_display_TriangleCulling.POSITIVE.toString = $estr;
openfl_display_TriangleCulling.POSITIVE.__enum__ = openfl_display_TriangleCulling;
var openfl_errors_Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
	this.name = "Error";
};
$hxClasses["openfl.errors.Error"] = openfl_errors_Error;
openfl_errors_Error.__name__ = ["openfl","errors","Error"];
openfl_errors_Error.prototype = {
	getStackTrace: function() {
		return haxe_CallStack.toString(haxe_CallStack.exceptionStack());
	}
	,toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,__class__: openfl_errors_Error
};
var openfl_errors_ArgumentError = function(inMessage) {
	if(inMessage == null) inMessage = "";
	openfl_errors_Error.call(this,inMessage);
};
$hxClasses["openfl.errors.ArgumentError"] = openfl_errors_ArgumentError;
openfl_errors_ArgumentError.__name__ = ["openfl","errors","ArgumentError"];
openfl_errors_ArgumentError.__super__ = openfl_errors_Error;
openfl_errors_ArgumentError.prototype = $extend(openfl_errors_Error.prototype,{
	__class__: openfl_errors_ArgumentError
});
var openfl_errors_IOError = function(message) {
	if(message == null) message = "";
	openfl_errors_Error.call(this,message);
};
$hxClasses["openfl.errors.IOError"] = openfl_errors_IOError;
openfl_errors_IOError.__name__ = ["openfl","errors","IOError"];
openfl_errors_IOError.__super__ = openfl_errors_Error;
openfl_errors_IOError.prototype = $extend(openfl_errors_Error.prototype,{
	__class__: openfl_errors_IOError
});
var openfl_errors_RangeError = function(inMessage) {
	if(inMessage == null) inMessage = "";
	openfl_errors_Error.call(this,inMessage,0);
};
$hxClasses["openfl.errors.RangeError"] = openfl_errors_RangeError;
openfl_errors_RangeError.__name__ = ["openfl","errors","RangeError"];
openfl_errors_RangeError.__super__ = openfl_errors_Error;
openfl_errors_RangeError.prototype = $extend(openfl_errors_Error.prototype,{
	__class__: openfl_errors_RangeError
});
var openfl_errors_TypeError = function(inMessage) {
	if(inMessage == null) inMessage = "";
	openfl_errors_Error.call(this,inMessage,0);
};
$hxClasses["openfl.errors.TypeError"] = openfl_errors_TypeError;
openfl_errors_TypeError.__name__ = ["openfl","errors","TypeError"];
openfl_errors_TypeError.__super__ = openfl_errors_Error;
openfl_errors_TypeError.prototype = $extend(openfl_errors_Error.prototype,{
	__class__: openfl_errors_TypeError
});
var openfl_events_Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
	this.eventPhase = openfl_events_EventPhase.AT_TARGET;
};
$hxClasses["openfl.events.Event"] = openfl_events_Event;
openfl_events_Event.__name__ = ["openfl","events","Event"];
openfl_events_Event.prototype = {
	clone: function() {
		var event = new openfl_events_Event(this.type,this.bubbles,this.cancelable);
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
	,__class__: openfl_events_Event
};
var openfl_events_TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.TextEvent"] = openfl_events_TextEvent;
openfl_events_TextEvent.__name__ = ["openfl","events","TextEvent"];
openfl_events_TextEvent.__super__ = openfl_events_Event;
openfl_events_TextEvent.prototype = $extend(openfl_events_Event.prototype,{
	clone: function() {
		return new openfl_events_TextEvent(this.type,this.bubbles,this.cancelable,this.text);
	}
	,toString: function() {
		return "[TextEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + "]";
	}
	,__class__: openfl_events_TextEvent
});
var openfl_events_ErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_TextEvent.call(this,type,bubbles,cancelable,text);
	this.errorID = id;
};
$hxClasses["openfl.events.ErrorEvent"] = openfl_events_ErrorEvent;
openfl_events_ErrorEvent.__name__ = ["openfl","events","ErrorEvent"];
openfl_events_ErrorEvent.__super__ = openfl_events_TextEvent;
openfl_events_ErrorEvent.prototype = $extend(openfl_events_TextEvent.prototype,{
	clone: function() {
		return new openfl_events_ErrorEvent(this.type,this.bubbles,this.cancelable,this.text,this.errorID);
	}
	,toString: function() {
		return "[ErrorEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: openfl_events_ErrorEvent
});
var openfl_events__$EventDispatcher_Listener = function(callback,useCapture,priority) {
	this.callback = callback;
	this.useCapture = useCapture;
	this.priority = priority;
};
$hxClasses["openfl.events._EventDispatcher.Listener"] = openfl_events__$EventDispatcher_Listener;
openfl_events__$EventDispatcher_Listener.__name__ = ["openfl","events","_EventDispatcher","Listener"];
openfl_events__$EventDispatcher_Listener.prototype = {
	match: function(callback,useCapture) {
		return Reflect.compareMethods(this.callback,callback) && this.useCapture == useCapture;
	}
	,__class__: openfl_events__$EventDispatcher_Listener
};
var openfl_events_EventPhase = $hxClasses["openfl.events.EventPhase"] = { __ename__ : true, __constructs__ : ["CAPTURING_PHASE","AT_TARGET","BUBBLING_PHASE"] };
openfl_events_EventPhase.CAPTURING_PHASE = ["CAPTURING_PHASE",0];
openfl_events_EventPhase.CAPTURING_PHASE.toString = $estr;
openfl_events_EventPhase.CAPTURING_PHASE.__enum__ = openfl_events_EventPhase;
openfl_events_EventPhase.AT_TARGET = ["AT_TARGET",1];
openfl_events_EventPhase.AT_TARGET.toString = $estr;
openfl_events_EventPhase.AT_TARGET.__enum__ = openfl_events_EventPhase;
openfl_events_EventPhase.BUBBLING_PHASE = ["BUBBLING_PHASE",2];
openfl_events_EventPhase.BUBBLING_PHASE.toString = $estr;
openfl_events_EventPhase.BUBBLING_PHASE.__enum__ = openfl_events_EventPhase;
var openfl_events_FocusEvent = function(type,bubbles,cancelable,relatedObject,shiftKey,keyCode) {
	if(keyCode == null) keyCode = 0;
	if(shiftKey == null) shiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.keyCode = keyCode;
	this.shiftKey = shiftKey;
	this.relatedObject = relatedObject;
};
$hxClasses["openfl.events.FocusEvent"] = openfl_events_FocusEvent;
openfl_events_FocusEvent.__name__ = ["openfl","events","FocusEvent"];
openfl_events_FocusEvent.__super__ = openfl_events_Event;
openfl_events_FocusEvent.prototype = $extend(openfl_events_Event.prototype,{
	clone: function() {
		var event = new openfl_events_FocusEvent(this.type,this.bubbles,this.cancelable,this.relatedObject,this.shiftKey,this.keyCode);
		event.target = this.target;
		event.currentTarget = this.currentTarget;
		return event;
	}
	,toString: function() {
		return "[FocusEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " relatedObject=" + Std.string(this.relatedObject) + " shiftKey=" + Std.string(this.shiftKey) + " keyCode=" + this.keyCode + "]";
	}
	,__class__: openfl_events_FocusEvent
});
var openfl_events_IOErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_ErrorEvent.call(this,type,bubbles,cancelable,text,id);
};
$hxClasses["openfl.events.IOErrorEvent"] = openfl_events_IOErrorEvent;
openfl_events_IOErrorEvent.__name__ = ["openfl","events","IOErrorEvent"];
openfl_events_IOErrorEvent.__super__ = openfl_events_ErrorEvent;
openfl_events_IOErrorEvent.prototype = $extend(openfl_events_ErrorEvent.prototype,{
	clone: function() {
		return new openfl_events_IOErrorEvent(this.type,this.bubbles,this.cancelable,this.text,this.errorID);
	}
	,toString: function() {
		return "[IOErrorEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: openfl_events_IOErrorEvent
});
var openfl_events_KeyboardEvent = function(type,bubbles,cancelable,charCodeValue,keyCodeValue,keyLocationValue,ctrlKeyValue,altKeyValue,shiftKeyValue,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(shiftKeyValue == null) shiftKeyValue = false;
	if(altKeyValue == null) altKeyValue = false;
	if(ctrlKeyValue == null) ctrlKeyValue = false;
	if(keyCodeValue == null) keyCodeValue = 0;
	if(charCodeValue == null) charCodeValue = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.charCode = charCodeValue;
	this.keyCode = keyCodeValue;
	if(keyLocationValue != null) this.keyLocation = keyLocationValue; else this.keyLocation = 0;
	this.ctrlKey = ctrlKeyValue;
	this.altKey = altKeyValue;
	this.shiftKey = shiftKeyValue;
	this.controlKey = controlKeyValue;
	this.commandKey = commandKeyValue;
};
$hxClasses["openfl.events.KeyboardEvent"] = openfl_events_KeyboardEvent;
openfl_events_KeyboardEvent.__name__ = ["openfl","events","KeyboardEvent"];
openfl_events_KeyboardEvent.__super__ = openfl_events_Event;
openfl_events_KeyboardEvent.prototype = $extend(openfl_events_Event.prototype,{
	clone: function() {
		return new openfl_events_KeyboardEvent(this.type,this.bubbles,this.cancelable,this.charCode,this.keyCode,this.keyLocation,this.ctrlKey,this.altKey,this.shiftKey,this.controlKey,this.commandKey);
	}
	,toString: function() {
		return "[KeyboardEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " charCode=" + this.charCode + " keyCode=" + this.keyCode + " keyLocation=" + Std.string(this.keyLocation) + " ctrlKey=" + Std.string(this.ctrlKey) + " altKey=" + Std.string(this.altKey) + " shiftKey=" + Std.string(this.shiftKey) + "]";
	}
	,__class__: openfl_events_KeyboardEvent
});
var openfl_events_MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
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
	openfl_events_Event.call(this,type,bubbles,cancelable);
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
$hxClasses["openfl.events.MouseEvent"] = openfl_events_MouseEvent;
openfl_events_MouseEvent.__name__ = ["openfl","events","MouseEvent"];
openfl_events_MouseEvent.__create = function(type,button,local,target) {
	var delta = 2;
	switch(type) {
	case openfl_events_MouseEvent.MOUSE_DOWN:case openfl_events_MouseEvent.MIDDLE_MOUSE_DOWN:case openfl_events_MouseEvent.RIGHT_MOUSE_DOWN:
		openfl_events_MouseEvent.__buttonDown[button] = true;
		break;
	case openfl_events_MouseEvent.MOUSE_UP:case openfl_events_MouseEvent.MIDDLE_MOUSE_UP:case openfl_events_MouseEvent.RIGHT_MOUSE_UP:
		openfl_events_MouseEvent.__buttonDown[button] = false;
		break;
	}
	var pseudoEvent = new openfl_events_MouseEvent(type,true,false,local.x,local.y,null,false,false,false,openfl_events_MouseEvent.__buttonDown[button],delta);
	pseudoEvent.stageX = openfl_Lib.current.stage.get_mouseX();
	pseudoEvent.stageY = openfl_Lib.current.stage.get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
};
openfl_events_MouseEvent.__super__ = openfl_events_Event;
openfl_events_MouseEvent.prototype = $extend(openfl_events_Event.prototype,{
	clone: function() {
		return new openfl_events_MouseEvent(this.type,this.bubbles,this.cancelable,this.localX,this.localY,this.relatedObject,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
	}
	,toString: function() {
		return "[MouseEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " localX=" + this.localX + " localY=" + this.localY + " relatedObject=" + Std.string(this.relatedObject) + " ctrlKey=" + Std.string(this.ctrlKey) + " altKey=" + Std.string(this.altKey) + " shiftKey=" + Std.string(this.shiftKey) + " buttonDown=" + Std.string(this.buttonDown) + " delta=" + this.delta + "]";
	}
	,updateAfterEvent: function() {
	}
	,__class__: openfl_events_MouseEvent
});
var openfl_events_TouchEvent = function(type,bubbles,cancelable,localX,localY,sizeX,sizeY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
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
	openfl_events_Event.call(this,type,bubbles,cancelable);
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
$hxClasses["openfl.events.TouchEvent"] = openfl_events_TouchEvent;
openfl_events_TouchEvent.__name__ = ["openfl","events","TouchEvent"];
openfl_events_TouchEvent.__create = function(type,touch,local,target) {
	var evt = new openfl_events_TouchEvent(type,true,false,local.x,local.y,null,null,null,false,false,false,false,0,null,0);
	evt.stageX = openfl_Lib.current.stage.get_mouseX();
	evt.stageY = openfl_Lib.current.stage.get_mouseY();
	evt.target = target;
	return evt;
};
openfl_events_TouchEvent.__super__ = openfl_events_Event;
openfl_events_TouchEvent.prototype = $extend(openfl_events_Event.prototype,{
	updateAfterEvent: function() {
	}
	,__class__: openfl_events_TouchEvent
});
var openfl_filters_BitmapFilter = function() {
};
$hxClasses["openfl.filters.BitmapFilter"] = openfl_filters_BitmapFilter;
openfl_filters_BitmapFilter.__name__ = ["openfl","filters","BitmapFilter"];
openfl_filters_BitmapFilter.prototype = {
	clone: function() {
		return new openfl_filters_BitmapFilter();
	}
	,__applyFilter: function(sourceData,targetData,sourceRect,destPoint) {
	}
	,__class__: openfl_filters_BitmapFilter
};
var openfl_geom_ColorTransform = function(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier,redOffset,greenOffset,blueOffset,alphaOffset) {
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
$hxClasses["openfl.geom.ColorTransform"] = openfl_geom_ColorTransform;
openfl_geom_ColorTransform.__name__ = ["openfl","geom","ColorTransform"];
openfl_geom_ColorTransform.prototype = {
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
	,__class__: openfl_geom_ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
};
var openfl_geom_Transform = function(displayObject) {
	this.colorTransform = new openfl_geom_ColorTransform();
	this.concatenatedColorTransform = new openfl_geom_ColorTransform();
	this.concatenatedMatrix = new openfl_geom_Matrix();
	this.pixelBounds = new openfl_geom_Rectangle();
	this.__displayObject = displayObject;
	this.__matrix = new openfl_geom_Matrix();
};
$hxClasses["openfl.geom.Transform"] = openfl_geom_Transform;
openfl_geom_Transform.__name__ = ["openfl","geom","Transform"];
openfl_geom_Transform.prototype = {
	get_matrix: function() {
		if(this.__matrix != null) {
			this.__matrix.identity();
			this.__matrix.scale(this.__displayObject.get_scaleX(),this.__displayObject.get_scaleY());
			this.__matrix.rotate(this.__displayObject.get_rotation() * (Math.PI / 180));
			this.__matrix.translate(this.__displayObject.get_x(),this.__displayObject.get_y());
			return this.__matrix.clone();
		}
		return null;
	}
	,set_matrix: function(value) {
		if(value == null) return this.__matrix = null;
		if(this.__displayObject != null) {
			this.__displayObject.set_x(value.tx);
			this.__displayObject.set_y(value.ty);
			this.__displayObject.set_scaleX(Math.sqrt(value.a * value.a + value.b * value.b));
			this.__displayObject.set_scaleY(Math.sqrt(value.c * value.c + value.d * value.d));
			this.__displayObject.set_rotation(Math.atan2(value.b,value.a) * (180 / Math.PI));
		}
		return value;
	}
	,__class__: openfl_geom_Transform
	,__properties__: {set_matrix:"set_matrix",get_matrix:"get_matrix"}
};
var openfl_geom_Vector3D = function(x,y,z,w) {
	if(w == null) w = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["openfl.geom.Vector3D"] = openfl_geom_Vector3D;
openfl_geom_Vector3D.__name__ = ["openfl","geom","Vector3D"];
openfl_geom_Vector3D.__properties__ = {get_Z_AXIS:"get_Z_AXIS",get_Y_AXIS:"get_Y_AXIS",get_X_AXIS:"get_X_AXIS"}
openfl_geom_Vector3D.X_AXIS = null;
openfl_geom_Vector3D.Y_AXIS = null;
openfl_geom_Vector3D.Z_AXIS = null;
openfl_geom_Vector3D.angleBetween = function(a,b) {
	var a0 = new openfl_geom_Vector3D(a.x,a.y,a.z,a.w);
	a0.normalize();
	var b0 = new openfl_geom_Vector3D(b.x,b.y,b.z,b.w);
	b0.normalize();
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
};
openfl_geom_Vector3D.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
};
openfl_geom_Vector3D.get_X_AXIS = function() {
	return new openfl_geom_Vector3D(1,0,0);
};
openfl_geom_Vector3D.get_Y_AXIS = function() {
	return new openfl_geom_Vector3D(0,1,0);
};
openfl_geom_Vector3D.get_Z_AXIS = function() {
	return new openfl_geom_Vector3D(0,0,1);
};
openfl_geom_Vector3D.prototype = {
	add: function(a) {
		return new openfl_geom_Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new openfl_geom_Vector3D(this.x,this.y,this.z,this.w);
	}
	,copyFrom: function(sourceVector3D) {
		this.x = sourceVector3D.x;
		this.y = sourceVector3D.y;
		this.z = sourceVector3D.z;
	}
	,crossProduct: function(a) {
		return new openfl_geom_Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
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
		return new openfl_geom_Vector3D(this.x - a.x,this.y - a.y,this.z - a.z);
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
	,__class__: openfl_geom_Vector3D
	,__properties__: {get_lengthSquared:"get_lengthSquared",get_length:"get_length"}
};
var openfl_media_ID3Info = function() {
};
$hxClasses["openfl.media.ID3Info"] = openfl_media_ID3Info;
openfl_media_ID3Info.__name__ = ["openfl","media","ID3Info"];
openfl_media_ID3Info.prototype = {
	__class__: openfl_media_ID3Info
};
var openfl_media_Sound = function(stream,context) {
	openfl_events_EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	if(stream != null) this.load(stream,context);
};
$hxClasses["openfl.media.Sound"] = openfl_media_Sound;
openfl_media_Sound.__name__ = ["openfl","media","Sound"];
openfl_media_Sound.fromAudioBuffer = function(buffer) {
	var sound = new openfl_media_Sound();
	sound.__buffer = buffer;
	return sound;
};
openfl_media_Sound.__super__ = openfl_events_EventDispatcher;
openfl_media_Sound.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	close: function() {
		if(openfl_media_Sound.__registeredSounds.exists(this.__soundID)) createjs.Sound.removeSound(this.__soundID);
	}
	,load: function(stream,context) {
		this.url = stream.url;
		this.__soundID = haxe_io_Path.withoutExtension(stream.url);
		if(!openfl_media_Sound.__registeredSounds.exists(this.__soundID)) {
			openfl_media_Sound.__registeredSounds.set(this.__soundID,true);
			createjs.Sound.addEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.registerSound(this.url,this.__soundID);
		} else this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
	}
	,loadCompressedDataFromByteArray: function(bytes,bytesLength,forcePlayAsMusic) {
		if(forcePlayAsMusic == null) forcePlayAsMusic = false;
		openfl_Lib.notImplemented("Sound.loadCompressedDataFromByteArray");
	}
	,loadPCMFromByteArray: function(bytes,samples,format,stereo,sampleRate) {
		if(sampleRate == null) sampleRate = 44100;
		if(stereo == null) stereo = true;
		openfl_Lib.notImplemented("Sound.loadPCMFromByteArray");
	}
	,play: function(startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0.0;
		if(sndTransform == null) sndTransform = new openfl_media_SoundTransform(1,0);
		var instance = createjs.Sound.play(this.__soundID,"any",0,startTime | 0,loops,sndTransform.volume,sndTransform.pan);
		return new openfl_media_SoundChannel(instance);
	}
	,get_id3: function() {
		return new openfl_media_ID3Info();
	}
	,AudioBuffer_onURLLoad: function(buffer) {
		this.__buffer = buffer;
		this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
	}
	,SoundJS_onFileLoad: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
		}
	}
	,__class__: openfl_media_Sound
	,__properties__: {get_id3:"get_id3"}
});
var openfl_media_SoundChannel = function(soundInstance) {
	openfl_events_EventDispatcher.call(this,this);
	this.__soundInstance = soundInstance;
	this.__soundInstance.addEventListener("complete",$bind(this,this.source_onComplete));
};
$hxClasses["openfl.media.SoundChannel"] = openfl_media_SoundChannel;
openfl_media_SoundChannel.__name__ = ["openfl","media","SoundChannel"];
openfl_media_SoundChannel.__super__ = openfl_events_EventDispatcher;
openfl_media_SoundChannel.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	stop: function() {
		this.__soundInstance.stop();
	}
	,__dispose: function() {
		this.__soundInstance.stop();
		this.__soundInstance = null;
	}
	,get_position: function() {
		return this.__soundInstance.getPosition();
	}
	,set_position: function(value) {
		this.__soundInstance.setPosition(value | 0);
		return this.__soundInstance.getPosition();
	}
	,get_soundTransform: function() {
		return new openfl_media_SoundTransform(this.__soundInstance.getVolume(),this.__soundInstance.getPan());
	}
	,set_soundTransform: function(value) {
		this.__soundInstance.setVolume(value.volume);
		this.__soundInstance.setPan(value.pan);
		return value;
	}
	,soundInstance_onComplete: function(_) {
		this.dispatchEvent(new openfl_events_Event(openfl_events_Event.SOUND_COMPLETE));
	}
	,source_onComplete: function() {
		this.dispatchEvent(new openfl_events_Event(openfl_events_Event.SOUND_COMPLETE));
	}
	,__class__: openfl_media_SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform",get_soundTransform:"get_soundTransform",set_position:"set_position",get_position:"get_position"}
});
var openfl_media_SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["openfl.media.SoundLoaderContext"] = openfl_media_SoundLoaderContext;
openfl_media_SoundLoaderContext.__name__ = ["openfl","media","SoundLoaderContext"];
openfl_media_SoundLoaderContext.prototype = {
	__class__: openfl_media_SoundLoaderContext
};
var openfl_media_SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
	this.leftToLeft = 0;
	this.leftToRight = 0;
	this.rightToLeft = 0;
	this.rightToRight = 0;
};
$hxClasses["openfl.media.SoundTransform"] = openfl_media_SoundTransform;
openfl_media_SoundTransform.__name__ = ["openfl","media","SoundTransform"];
openfl_media_SoundTransform.prototype = {
	clone: function() {
		return new openfl_media_SoundTransform(this.volume,this.pan);
	}
	,__class__: openfl_media_SoundTransform
};
var openfl_net_URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = openfl_net_URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["openfl.net.URLRequest"] = openfl_net_URLRequest;
openfl_net_URLRequest.__name__ = ["openfl","net","URLRequest"];
openfl_net_URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == openfl_net_URLRequestMethod.GET || this.data == null) return res;
		if(typeof(this.data) == "string" || js_Boot.__instanceof(this.data,lime_utils_ByteArray)) {
			res = res.slice();
			res.push(new openfl_net_URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: openfl_net_URLRequest
};
var openfl_net_URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["openfl.net.URLRequestHeader"] = openfl_net_URLRequestHeader;
openfl_net_URLRequestHeader.__name__ = ["openfl","net","URLRequestHeader"];
openfl_net_URLRequestHeader.prototype = {
	__class__: openfl_net_URLRequestHeader
};
var openfl_net_URLRequestMethod = function() { };
$hxClasses["openfl.net.URLRequestMethod"] = openfl_net_URLRequestMethod;
openfl_net_URLRequestMethod.__name__ = ["openfl","net","URLRequestMethod"];
var openfl_system_LoaderContext = function(checkPolicyFile,applicationDomain,securityDomain) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	this.checkPolicyFile = checkPolicyFile;
	this.securityDomain = securityDomain;
	this.applicationDomain = applicationDomain;
	this.allowCodeImport = true;
	this.allowLoadBytesCodeExecution = true;
};
$hxClasses["openfl.system.LoaderContext"] = openfl_system_LoaderContext;
openfl_system_LoaderContext.__name__ = ["openfl","system","LoaderContext"];
openfl_system_LoaderContext.prototype = {
	__class__: openfl_system_LoaderContext
};
var openfl_system_SecurityDomain = function() {
};
$hxClasses["openfl.system.SecurityDomain"] = openfl_system_SecurityDomain;
openfl_system_SecurityDomain.__name__ = ["openfl","system","SecurityDomain"];
openfl_system_SecurityDomain.prototype = {
	__class__: openfl_system_SecurityDomain
};
var openfl_text_Font = function(name) {
	lime_graphics_Font.call(this,name);
};
$hxClasses["openfl.text.Font"] = openfl_text_Font;
openfl_text_Font.__name__ = ["openfl","text","Font"];
openfl_text_Font.enumerateFonts = function(enumerateDeviceFonts) {
	if(enumerateDeviceFonts == null) enumerateDeviceFonts = false;
	return [];
};
openfl_text_Font.fromBytes = function(bytes) {
	var font = new openfl_text_Font();
	return font;
};
openfl_text_Font.fromFile = function(path) {
	var font = new openfl_text_Font();
	font.__fromFile(path);
	return font;
};
openfl_text_Font.registerFont = function(font) {
	var instance;
	instance = js_Boot.__cast(Type.createInstance(font,[]) , openfl_text_Font);
	if(instance != null) openfl_text_Font.__registeredFonts.push(instance);
};
openfl_text_Font.__super__ = lime_graphics_Font;
openfl_text_Font.prototype = $extend(lime_graphics_Font.prototype,{
	__class__: openfl_text_Font
});
var openfl_text_FontStyle = $hxClasses["openfl.text.FontStyle"] = { __ename__ : true, __constructs__ : ["REGULAR","ITALIC","BOLD_ITALIC","BOLD"] };
openfl_text_FontStyle.REGULAR = ["REGULAR",0];
openfl_text_FontStyle.REGULAR.toString = $estr;
openfl_text_FontStyle.REGULAR.__enum__ = openfl_text_FontStyle;
openfl_text_FontStyle.ITALIC = ["ITALIC",1];
openfl_text_FontStyle.ITALIC.toString = $estr;
openfl_text_FontStyle.ITALIC.__enum__ = openfl_text_FontStyle;
openfl_text_FontStyle.BOLD_ITALIC = ["BOLD_ITALIC",2];
openfl_text_FontStyle.BOLD_ITALIC.toString = $estr;
openfl_text_FontStyle.BOLD_ITALIC.__enum__ = openfl_text_FontStyle;
openfl_text_FontStyle.BOLD = ["BOLD",3];
openfl_text_FontStyle.BOLD.toString = $estr;
openfl_text_FontStyle.BOLD.__enum__ = openfl_text_FontStyle;
var openfl_text_FontType = $hxClasses["openfl.text.FontType"] = { __ename__ : true, __constructs__ : ["DEVICE","EMBEDDED","EMBEDDED_CFF"] };
openfl_text_FontType.DEVICE = ["DEVICE",0];
openfl_text_FontType.DEVICE.toString = $estr;
openfl_text_FontType.DEVICE.__enum__ = openfl_text_FontType;
openfl_text_FontType.EMBEDDED = ["EMBEDDED",1];
openfl_text_FontType.EMBEDDED.toString = $estr;
openfl_text_FontType.EMBEDDED.__enum__ = openfl_text_FontType;
openfl_text_FontType.EMBEDDED_CFF = ["EMBEDDED_CFF",2];
openfl_text_FontType.EMBEDDED_CFF.toString = $estr;
openfl_text_FontType.EMBEDDED_CFF.__enum__ = openfl_text_FontType;
var openfl_ui__$KeyLocation_KeyLocation_$Impl_$ = function() { };
$hxClasses["openfl.ui._KeyLocation.KeyLocation_Impl_"] = openfl_ui__$KeyLocation_KeyLocation_$Impl_$;
openfl_ui__$KeyLocation_KeyLocation_$Impl_$.__name__ = ["openfl","ui","_KeyLocation","KeyLocation_Impl_"];
var openfl_ui_Keyboard = function() { };
$hxClasses["openfl.ui.Keyboard"] = openfl_ui_Keyboard;
openfl_ui_Keyboard.__name__ = ["openfl","ui","Keyboard"];
openfl_ui_Keyboard.capsLock = null;
openfl_ui_Keyboard.numLock = null;
openfl_ui_Keyboard.isAccessible = function() {
	return false;
};
openfl_ui_Keyboard.__convertMozillaCode = function(code) {
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
openfl_ui_Keyboard.__convertWebkitCode = function(code) {
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
lime_graphics_utils_ImageDataUtil.__alpha16 = this1;
var _g = 0;
while(_g < 256) {
	var i = _g++;
	lime_graphics_utils_ImageDataUtil.__alpha16[i] = i * 65536 / 255 | 0;
}
var this2;
this2 = new Array(510);
lime_graphics_utils_ImageDataUtil.__clamp = this2;
var _g1 = 0;
while(_g1 < 255) {
	var i1 = _g1++;
	lime_graphics_utils_ImageDataUtil.__clamp[i1] = i1;
}
var _g11 = 255;
var _g2 = 511;
while(_g11 < _g2) {
	var i2 = _g11++;
	lime_graphics_utils_ImageDataUtil.__clamp[i2] = 255;
}
if(window.createjs != null) createjs.Sound.alternateExtensions = ["ogg","mp3","wav"];
openfl_display_DisplayObject.__instanceCount = 0;
openfl_display_DisplayObject.__worldRenderDirty = 0;
openfl_display_DisplayObject.__worldTransformDirty = 0;
js_Boot.__toStr = {}.toString;
lets_Go._tweens = new Array();
lime_Assets.cache = new lime_AssetCache();
lime_Assets.libraries = new haxe_ds_StringMap();
lime_Assets.initialized = false;
lime__$Assets_AssetType_$Impl_$.BINARY = "BINARY";
lime__$Assets_AssetType_$Impl_$.FONT = "FONT";
lime__$Assets_AssetType_$Impl_$.IMAGE = "IMAGE";
lime__$Assets_AssetType_$Impl_$.MUSIC = "MUSIC";
lime__$Assets_AssetType_$Impl_$.SOUND = "SOUND";
lime__$Assets_AssetType_$Impl_$.TEMPLATE = "TEMPLATE";
lime__$Assets_AssetType_$Impl_$.TEXT = "TEXT";
lime_app_Application.onUpdate = new lime_app_Event();
lime_app_Application.__eventInfo = new lime_app__$Application_UpdateEventInfo();
lime_app__$Application_UpdateEventType_$Impl_$.UPDATE = 0;
lime_app_Preloader.images = new haxe_ds_StringMap();
lime_app_Preloader.loaders = new haxe_ds_StringMap();
lime_audio_openal_AL.NONE = 0;
lime_audio_openal_AL.FALSE = 0;
lime_audio_openal_AL.TRUE = 1;
lime_audio_openal_AL.SOURCE_RELATIVE = 514;
lime_audio_openal_AL.CONE_INNER_ANGLE = 4097;
lime_audio_openal_AL.CONE_OUTER_ANGLE = 4098;
lime_audio_openal_AL.PITCH = 4099;
lime_audio_openal_AL.POSITION = 4100;
lime_audio_openal_AL.DIRECTION = 4101;
lime_audio_openal_AL.VELOCITY = 4102;
lime_audio_openal_AL.LOOPING = 4103;
lime_audio_openal_AL.BUFFER = 4105;
lime_audio_openal_AL.GAIN = 4106;
lime_audio_openal_AL.MIN_GAIN = 4109;
lime_audio_openal_AL.MAX_GAIN = 4110;
lime_audio_openal_AL.ORIENTATION = 4111;
lime_audio_openal_AL.SOURCE_STATE = 4112;
lime_audio_openal_AL.INITIAL = 4113;
lime_audio_openal_AL.PLAYING = 4114;
lime_audio_openal_AL.PAUSED = 4115;
lime_audio_openal_AL.STOPPED = 4116;
lime_audio_openal_AL.BUFFERS_QUEUED = 4117;
lime_audio_openal_AL.BUFFERS_PROCESSED = 4118;
lime_audio_openal_AL.REFERENCE_DISTANCE = 4128;
lime_audio_openal_AL.ROLLOFF_FACTOR = 4129;
lime_audio_openal_AL.CONE_OUTER_GAIN = 4130;
lime_audio_openal_AL.MAX_DISTANCE = 4131;
lime_audio_openal_AL.SEC_OFFSET = 4132;
lime_audio_openal_AL.SAMPLE_OFFSET = 4133;
lime_audio_openal_AL.BYTE_OFFSET = 4134;
lime_audio_openal_AL.SOURCE_TYPE = 4135;
lime_audio_openal_AL.STATIC = 4136;
lime_audio_openal_AL.STREAMING = 4137;
lime_audio_openal_AL.UNDETERMINED = 4144;
lime_audio_openal_AL.FORMAT_MONO8 = 4352;
lime_audio_openal_AL.FORMAT_MONO16 = 4353;
lime_audio_openal_AL.FORMAT_STEREO8 = 4354;
lime_audio_openal_AL.FORMAT_STEREO16 = 4355;
lime_audio_openal_AL.FREQUENCY = 8193;
lime_audio_openal_AL.BITS = 8194;
lime_audio_openal_AL.CHANNELS = 8195;
lime_audio_openal_AL.SIZE = 8196;
lime_audio_openal_AL.NO_ERROR = 0;
lime_audio_openal_AL.INVALID_NAME = 40961;
lime_audio_openal_AL.INVALID_ENUM = 40962;
lime_audio_openal_AL.INVALID_VALUE = 40963;
lime_audio_openal_AL.INVALID_OPERATION = 40964;
lime_audio_openal_AL.OUT_OF_MEMORY = 40965;
lime_audio_openal_AL.VENDOR = 45057;
lime_audio_openal_AL.VERSION = 45058;
lime_audio_openal_AL.RENDERER = 45059;
lime_audio_openal_AL.EXTENSIONS = 45060;
lime_audio_openal_AL.DOPPLER_FACTOR = 49152;
lime_audio_openal_AL.SPEED_OF_SOUND = 49155;
lime_audio_openal_AL.DOPPLER_VELOCITY = 49153;
lime_audio_openal_AL.DISTANCE_MODEL = 53248;
lime_audio_openal_AL.INVERSE_DISTANCE = 53249;
lime_audio_openal_AL.INVERSE_DISTANCE_CLAMPED = 53250;
lime_audio_openal_AL.LINEAR_DISTANCE = 53251;
lime_audio_openal_AL.LINEAR_DISTANCE_CLAMPED = 53252;
lime_audio_openal_AL.EXPONENT_DISTANCE = 53253;
lime_audio_openal_AL.EXPONENT_DISTANCE_CLAMPED = 53254;
lime_audio_openal_ALC.FALSE = 0;
lime_audio_openal_ALC.TRUE = 1;
lime_audio_openal_ALC.FREQUENCY = 4103;
lime_audio_openal_ALC.REFRESH = 4104;
lime_audio_openal_ALC.SYNC = 4105;
lime_audio_openal_ALC.MONO_SOURCES = 4112;
lime_audio_openal_ALC.STEREO_SOURCES = 4113;
lime_audio_openal_ALC.NO_ERROR = 0;
lime_audio_openal_ALC.INVALID_DEVICE = 40961;
lime_audio_openal_ALC.INVALID_CONTEXT = 40962;
lime_audio_openal_ALC.INVALID_ENUM = 40963;
lime_audio_openal_ALC.INVALID_VALUE = 40964;
lime_audio_openal_ALC.OUT_OF_MEMORY = 40965;
lime_audio_openal_ALC.ATTRIBUTES_SIZE = 4098;
lime_audio_openal_ALC.ALL_ATTRIBUTES = 4099;
lime_audio_openal_ALC.DEFAULT_DEVICE_SPECIFIER = 4100;
lime_audio_openal_ALC.DEVICE_SPECIFIER = 4101;
lime_audio_openal_ALC.EXTENSIONS = 4102;
lime_audio_openal_ALC.ENUMERATE_ALL_EXT = 1;
lime_audio_openal_ALC.DEFAULT_ALL_DEVICES_SPECIFIER = 4114;
lime_audio_openal_ALC.ALL_DEVICES_SPECIFIER = 4115;
lime_graphics_Image.__base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
lime_graphics_Renderer.onRenderContextLost = new lime_app_Event();
lime_graphics_Renderer.onRenderContextRestored = new lime_app_Event();
lime_graphics_Renderer.onRender = new lime_app_Event();
lime_graphics_Renderer.eventInfo = new lime_graphics__$Renderer_RenderEventInfo(0);
lime_graphics__$Renderer_RenderEventType_$Impl_$.RENDER = 0;
lime_graphics__$Renderer_RenderEventType_$Impl_$.RENDER_CONTEXT_LOST = 1;
lime_graphics__$Renderer_RenderEventType_$Impl_$.RENDER_CONTEXT_RESTORED = 2;
lime_graphics_opengl_GL.DEPTH_BUFFER_BIT = 256;
lime_graphics_opengl_GL.STENCIL_BUFFER_BIT = 1024;
lime_graphics_opengl_GL.COLOR_BUFFER_BIT = 16384;
lime_graphics_opengl_GL.POINTS = 0;
lime_graphics_opengl_GL.LINES = 1;
lime_graphics_opengl_GL.LINE_LOOP = 2;
lime_graphics_opengl_GL.LINE_STRIP = 3;
lime_graphics_opengl_GL.TRIANGLES = 4;
lime_graphics_opengl_GL.TRIANGLE_STRIP = 5;
lime_graphics_opengl_GL.TRIANGLE_FAN = 6;
lime_graphics_opengl_GL.ZERO = 0;
lime_graphics_opengl_GL.ONE = 1;
lime_graphics_opengl_GL.SRC_COLOR = 768;
lime_graphics_opengl_GL.ONE_MINUS_SRC_COLOR = 769;
lime_graphics_opengl_GL.SRC_ALPHA = 770;
lime_graphics_opengl_GL.ONE_MINUS_SRC_ALPHA = 771;
lime_graphics_opengl_GL.DST_ALPHA = 772;
lime_graphics_opengl_GL.ONE_MINUS_DST_ALPHA = 773;
lime_graphics_opengl_GL.DST_COLOR = 774;
lime_graphics_opengl_GL.ONE_MINUS_DST_COLOR = 775;
lime_graphics_opengl_GL.SRC_ALPHA_SATURATE = 776;
lime_graphics_opengl_GL.FUNC_ADD = 32774;
lime_graphics_opengl_GL.BLEND_EQUATION = 32777;
lime_graphics_opengl_GL.BLEND_EQUATION_RGB = 32777;
lime_graphics_opengl_GL.BLEND_EQUATION_ALPHA = 34877;
lime_graphics_opengl_GL.FUNC_SUBTRACT = 32778;
lime_graphics_opengl_GL.FUNC_REVERSE_SUBTRACT = 32779;
lime_graphics_opengl_GL.BLEND_DST_RGB = 32968;
lime_graphics_opengl_GL.BLEND_SRC_RGB = 32969;
lime_graphics_opengl_GL.BLEND_DST_ALPHA = 32970;
lime_graphics_opengl_GL.BLEND_SRC_ALPHA = 32971;
lime_graphics_opengl_GL.CONSTANT_COLOR = 32769;
lime_graphics_opengl_GL.ONE_MINUS_CONSTANT_COLOR = 32770;
lime_graphics_opengl_GL.CONSTANT_ALPHA = 32771;
lime_graphics_opengl_GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
lime_graphics_opengl_GL.BLEND_COLOR = 32773;
lime_graphics_opengl_GL.ARRAY_BUFFER = 34962;
lime_graphics_opengl_GL.ELEMENT_ARRAY_BUFFER = 34963;
lime_graphics_opengl_GL.ARRAY_BUFFER_BINDING = 34964;
lime_graphics_opengl_GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
lime_graphics_opengl_GL.STREAM_DRAW = 35040;
lime_graphics_opengl_GL.STATIC_DRAW = 35044;
lime_graphics_opengl_GL.DYNAMIC_DRAW = 35048;
lime_graphics_opengl_GL.BUFFER_SIZE = 34660;
lime_graphics_opengl_GL.BUFFER_USAGE = 34661;
lime_graphics_opengl_GL.CURRENT_VERTEX_ATTRIB = 34342;
lime_graphics_opengl_GL.FRONT = 1028;
lime_graphics_opengl_GL.BACK = 1029;
lime_graphics_opengl_GL.FRONT_AND_BACK = 1032;
lime_graphics_opengl_GL.CULL_FACE = 2884;
lime_graphics_opengl_GL.BLEND = 3042;
lime_graphics_opengl_GL.DITHER = 3024;
lime_graphics_opengl_GL.STENCIL_TEST = 2960;
lime_graphics_opengl_GL.DEPTH_TEST = 2929;
lime_graphics_opengl_GL.SCISSOR_TEST = 3089;
lime_graphics_opengl_GL.POLYGON_OFFSET_FILL = 32823;
lime_graphics_opengl_GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
lime_graphics_opengl_GL.SAMPLE_COVERAGE = 32928;
lime_graphics_opengl_GL.NO_ERROR = 0;
lime_graphics_opengl_GL.INVALID_ENUM = 1280;
lime_graphics_opengl_GL.INVALID_VALUE = 1281;
lime_graphics_opengl_GL.INVALID_OPERATION = 1282;
lime_graphics_opengl_GL.OUT_OF_MEMORY = 1285;
lime_graphics_opengl_GL.CW = 2304;
lime_graphics_opengl_GL.CCW = 2305;
lime_graphics_opengl_GL.LINE_WIDTH = 2849;
lime_graphics_opengl_GL.ALIASED_POINT_SIZE_RANGE = 33901;
lime_graphics_opengl_GL.ALIASED_LINE_WIDTH_RANGE = 33902;
lime_graphics_opengl_GL.CULL_FACE_MODE = 2885;
lime_graphics_opengl_GL.FRONT_FACE = 2886;
lime_graphics_opengl_GL.DEPTH_RANGE = 2928;
lime_graphics_opengl_GL.DEPTH_WRITEMASK = 2930;
lime_graphics_opengl_GL.DEPTH_CLEAR_VALUE = 2931;
lime_graphics_opengl_GL.DEPTH_FUNC = 2932;
lime_graphics_opengl_GL.STENCIL_CLEAR_VALUE = 2961;
lime_graphics_opengl_GL.STENCIL_FUNC = 2962;
lime_graphics_opengl_GL.STENCIL_FAIL = 2964;
lime_graphics_opengl_GL.STENCIL_PASS_DEPTH_FAIL = 2965;
lime_graphics_opengl_GL.STENCIL_PASS_DEPTH_PASS = 2966;
lime_graphics_opengl_GL.STENCIL_REF = 2967;
lime_graphics_opengl_GL.STENCIL_VALUE_MASK = 2963;
lime_graphics_opengl_GL.STENCIL_WRITEMASK = 2968;
lime_graphics_opengl_GL.STENCIL_BACK_FUNC = 34816;
lime_graphics_opengl_GL.STENCIL_BACK_FAIL = 34817;
lime_graphics_opengl_GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
lime_graphics_opengl_GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
lime_graphics_opengl_GL.STENCIL_BACK_REF = 36003;
lime_graphics_opengl_GL.STENCIL_BACK_VALUE_MASK = 36004;
lime_graphics_opengl_GL.STENCIL_BACK_WRITEMASK = 36005;
lime_graphics_opengl_GL.VIEWPORT = 2978;
lime_graphics_opengl_GL.SCISSOR_BOX = 3088;
lime_graphics_opengl_GL.COLOR_CLEAR_VALUE = 3106;
lime_graphics_opengl_GL.COLOR_WRITEMASK = 3107;
lime_graphics_opengl_GL.UNPACK_ALIGNMENT = 3317;
lime_graphics_opengl_GL.PACK_ALIGNMENT = 3333;
lime_graphics_opengl_GL.MAX_TEXTURE_SIZE = 3379;
lime_graphics_opengl_GL.MAX_VIEWPORT_DIMS = 3386;
lime_graphics_opengl_GL.SUBPIXEL_BITS = 3408;
lime_graphics_opengl_GL.RED_BITS = 3410;
lime_graphics_opengl_GL.GREEN_BITS = 3411;
lime_graphics_opengl_GL.BLUE_BITS = 3412;
lime_graphics_opengl_GL.ALPHA_BITS = 3413;
lime_graphics_opengl_GL.DEPTH_BITS = 3414;
lime_graphics_opengl_GL.STENCIL_BITS = 3415;
lime_graphics_opengl_GL.POLYGON_OFFSET_UNITS = 10752;
lime_graphics_opengl_GL.POLYGON_OFFSET_FACTOR = 32824;
lime_graphics_opengl_GL.TEXTURE_BINDING_2D = 32873;
lime_graphics_opengl_GL.SAMPLE_BUFFERS = 32936;
lime_graphics_opengl_GL.SAMPLES = 32937;
lime_graphics_opengl_GL.SAMPLE_COVERAGE_VALUE = 32938;
lime_graphics_opengl_GL.SAMPLE_COVERAGE_INVERT = 32939;
lime_graphics_opengl_GL.COMPRESSED_TEXTURE_FORMATS = 34467;
lime_graphics_opengl_GL.DONT_CARE = 4352;
lime_graphics_opengl_GL.FASTEST = 4353;
lime_graphics_opengl_GL.NICEST = 4354;
lime_graphics_opengl_GL.GENERATE_MIPMAP_HINT = 33170;
lime_graphics_opengl_GL.BYTE = 5120;
lime_graphics_opengl_GL.UNSIGNED_BYTE = 5121;
lime_graphics_opengl_GL.SHORT = 5122;
lime_graphics_opengl_GL.UNSIGNED_SHORT = 5123;
lime_graphics_opengl_GL.INT = 5124;
lime_graphics_opengl_GL.UNSIGNED_INT = 5125;
lime_graphics_opengl_GL.FLOAT = 5126;
lime_graphics_opengl_GL.DEPTH_COMPONENT = 6402;
lime_graphics_opengl_GL.ALPHA = 6406;
lime_graphics_opengl_GL.RGB = 6407;
lime_graphics_opengl_GL.RGBA = 6408;
lime_graphics_opengl_GL.LUMINANCE = 6409;
lime_graphics_opengl_GL.LUMINANCE_ALPHA = 6410;
lime_graphics_opengl_GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
lime_graphics_opengl_GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
lime_graphics_opengl_GL.UNSIGNED_SHORT_5_6_5 = 33635;
lime_graphics_opengl_GL.FRAGMENT_SHADER = 35632;
lime_graphics_opengl_GL.VERTEX_SHADER = 35633;
lime_graphics_opengl_GL.MAX_VERTEX_ATTRIBS = 34921;
lime_graphics_opengl_GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
lime_graphics_opengl_GL.MAX_VARYING_VECTORS = 36348;
lime_graphics_opengl_GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
lime_graphics_opengl_GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
lime_graphics_opengl_GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
lime_graphics_opengl_GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
lime_graphics_opengl_GL.SHADER_TYPE = 35663;
lime_graphics_opengl_GL.DELETE_STATUS = 35712;
lime_graphics_opengl_GL.LINK_STATUS = 35714;
lime_graphics_opengl_GL.VALIDATE_STATUS = 35715;
lime_graphics_opengl_GL.ATTACHED_SHADERS = 35717;
lime_graphics_opengl_GL.ACTIVE_UNIFORMS = 35718;
lime_graphics_opengl_GL.ACTIVE_ATTRIBUTES = 35721;
lime_graphics_opengl_GL.SHADING_LANGUAGE_VERSION = 35724;
lime_graphics_opengl_GL.CURRENT_PROGRAM = 35725;
lime_graphics_opengl_GL.NEVER = 512;
lime_graphics_opengl_GL.LESS = 513;
lime_graphics_opengl_GL.EQUAL = 514;
lime_graphics_opengl_GL.LEQUAL = 515;
lime_graphics_opengl_GL.GREATER = 516;
lime_graphics_opengl_GL.NOTEQUAL = 517;
lime_graphics_opengl_GL.GEQUAL = 518;
lime_graphics_opengl_GL.ALWAYS = 519;
lime_graphics_opengl_GL.KEEP = 7680;
lime_graphics_opengl_GL.REPLACE = 7681;
lime_graphics_opengl_GL.INCR = 7682;
lime_graphics_opengl_GL.DECR = 7683;
lime_graphics_opengl_GL.INVERT = 5386;
lime_graphics_opengl_GL.INCR_WRAP = 34055;
lime_graphics_opengl_GL.DECR_WRAP = 34056;
lime_graphics_opengl_GL.VENDOR = 7936;
lime_graphics_opengl_GL.RENDERER = 7937;
lime_graphics_opengl_GL.VERSION = 7938;
lime_graphics_opengl_GL.NEAREST = 9728;
lime_graphics_opengl_GL.LINEAR = 9729;
lime_graphics_opengl_GL.NEAREST_MIPMAP_NEAREST = 9984;
lime_graphics_opengl_GL.LINEAR_MIPMAP_NEAREST = 9985;
lime_graphics_opengl_GL.NEAREST_MIPMAP_LINEAR = 9986;
lime_graphics_opengl_GL.LINEAR_MIPMAP_LINEAR = 9987;
lime_graphics_opengl_GL.TEXTURE_MAG_FILTER = 10240;
lime_graphics_opengl_GL.TEXTURE_MIN_FILTER = 10241;
lime_graphics_opengl_GL.TEXTURE_WRAP_S = 10242;
lime_graphics_opengl_GL.TEXTURE_WRAP_T = 10243;
lime_graphics_opengl_GL.TEXTURE_2D = 3553;
lime_graphics_opengl_GL.TEXTURE = 5890;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP = 34067;
lime_graphics_opengl_GL.TEXTURE_BINDING_CUBE_MAP = 34068;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
lime_graphics_opengl_GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
lime_graphics_opengl_GL.TEXTURE0 = 33984;
lime_graphics_opengl_GL.TEXTURE1 = 33985;
lime_graphics_opengl_GL.TEXTURE2 = 33986;
lime_graphics_opengl_GL.TEXTURE3 = 33987;
lime_graphics_opengl_GL.TEXTURE4 = 33988;
lime_graphics_opengl_GL.TEXTURE5 = 33989;
lime_graphics_opengl_GL.TEXTURE6 = 33990;
lime_graphics_opengl_GL.TEXTURE7 = 33991;
lime_graphics_opengl_GL.TEXTURE8 = 33992;
lime_graphics_opengl_GL.TEXTURE9 = 33993;
lime_graphics_opengl_GL.TEXTURE10 = 33994;
lime_graphics_opengl_GL.TEXTURE11 = 33995;
lime_graphics_opengl_GL.TEXTURE12 = 33996;
lime_graphics_opengl_GL.TEXTURE13 = 33997;
lime_graphics_opengl_GL.TEXTURE14 = 33998;
lime_graphics_opengl_GL.TEXTURE15 = 33999;
lime_graphics_opengl_GL.TEXTURE16 = 34000;
lime_graphics_opengl_GL.TEXTURE17 = 34001;
lime_graphics_opengl_GL.TEXTURE18 = 34002;
lime_graphics_opengl_GL.TEXTURE19 = 34003;
lime_graphics_opengl_GL.TEXTURE20 = 34004;
lime_graphics_opengl_GL.TEXTURE21 = 34005;
lime_graphics_opengl_GL.TEXTURE22 = 34006;
lime_graphics_opengl_GL.TEXTURE23 = 34007;
lime_graphics_opengl_GL.TEXTURE24 = 34008;
lime_graphics_opengl_GL.TEXTURE25 = 34009;
lime_graphics_opengl_GL.TEXTURE26 = 34010;
lime_graphics_opengl_GL.TEXTURE27 = 34011;
lime_graphics_opengl_GL.TEXTURE28 = 34012;
lime_graphics_opengl_GL.TEXTURE29 = 34013;
lime_graphics_opengl_GL.TEXTURE30 = 34014;
lime_graphics_opengl_GL.TEXTURE31 = 34015;
lime_graphics_opengl_GL.ACTIVE_TEXTURE = 34016;
lime_graphics_opengl_GL.REPEAT = 10497;
lime_graphics_opengl_GL.CLAMP_TO_EDGE = 33071;
lime_graphics_opengl_GL.MIRRORED_REPEAT = 33648;
lime_graphics_opengl_GL.FLOAT_VEC2 = 35664;
lime_graphics_opengl_GL.FLOAT_VEC3 = 35665;
lime_graphics_opengl_GL.FLOAT_VEC4 = 35666;
lime_graphics_opengl_GL.INT_VEC2 = 35667;
lime_graphics_opengl_GL.INT_VEC3 = 35668;
lime_graphics_opengl_GL.INT_VEC4 = 35669;
lime_graphics_opengl_GL.BOOL = 35670;
lime_graphics_opengl_GL.BOOL_VEC2 = 35671;
lime_graphics_opengl_GL.BOOL_VEC3 = 35672;
lime_graphics_opengl_GL.BOOL_VEC4 = 35673;
lime_graphics_opengl_GL.FLOAT_MAT2 = 35674;
lime_graphics_opengl_GL.FLOAT_MAT3 = 35675;
lime_graphics_opengl_GL.FLOAT_MAT4 = 35676;
lime_graphics_opengl_GL.SAMPLER_2D = 35678;
lime_graphics_opengl_GL.SAMPLER_CUBE = 35680;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
lime_graphics_opengl_GL.VERTEX_PROGRAM_POINT_SIZE = 34370;
lime_graphics_opengl_GL.POINT_SPRITE = 34913;
lime_graphics_opengl_GL.COMPILE_STATUS = 35713;
lime_graphics_opengl_GL.LOW_FLOAT = 36336;
lime_graphics_opengl_GL.MEDIUM_FLOAT = 36337;
lime_graphics_opengl_GL.HIGH_FLOAT = 36338;
lime_graphics_opengl_GL.LOW_INT = 36339;
lime_graphics_opengl_GL.MEDIUM_INT = 36340;
lime_graphics_opengl_GL.HIGH_INT = 36341;
lime_graphics_opengl_GL.FRAMEBUFFER = 36160;
lime_graphics_opengl_GL.RENDERBUFFER = 36161;
lime_graphics_opengl_GL.RGBA4 = 32854;
lime_graphics_opengl_GL.RGB5_A1 = 32855;
lime_graphics_opengl_GL.RGB565 = 36194;
lime_graphics_opengl_GL.DEPTH_COMPONENT16 = 33189;
lime_graphics_opengl_GL.STENCIL_INDEX = 6401;
lime_graphics_opengl_GL.STENCIL_INDEX8 = 36168;
lime_graphics_opengl_GL.DEPTH_STENCIL = 34041;
lime_graphics_opengl_GL.RENDERBUFFER_WIDTH = 36162;
lime_graphics_opengl_GL.RENDERBUFFER_HEIGHT = 36163;
lime_graphics_opengl_GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
lime_graphics_opengl_GL.RENDERBUFFER_RED_SIZE = 36176;
lime_graphics_opengl_GL.RENDERBUFFER_GREEN_SIZE = 36177;
lime_graphics_opengl_GL.RENDERBUFFER_BLUE_SIZE = 36178;
lime_graphics_opengl_GL.RENDERBUFFER_ALPHA_SIZE = 36179;
lime_graphics_opengl_GL.RENDERBUFFER_DEPTH_SIZE = 36180;
lime_graphics_opengl_GL.RENDERBUFFER_STENCIL_SIZE = 36181;
lime_graphics_opengl_GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
lime_graphics_opengl_GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
lime_graphics_opengl_GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
lime_graphics_opengl_GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
lime_graphics_opengl_GL.COLOR_ATTACHMENT0 = 36064;
lime_graphics_opengl_GL.DEPTH_ATTACHMENT = 36096;
lime_graphics_opengl_GL.STENCIL_ATTACHMENT = 36128;
lime_graphics_opengl_GL.DEPTH_STENCIL_ATTACHMENT = 33306;
lime_graphics_opengl_GL.NONE = 0;
lime_graphics_opengl_GL.FRAMEBUFFER_COMPLETE = 36053;
lime_graphics_opengl_GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
lime_graphics_opengl_GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
lime_graphics_opengl_GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
lime_graphics_opengl_GL.FRAMEBUFFER_UNSUPPORTED = 36061;
lime_graphics_opengl_GL.FRAMEBUFFER_BINDING = 36006;
lime_graphics_opengl_GL.RENDERBUFFER_BINDING = 36007;
lime_graphics_opengl_GL.MAX_RENDERBUFFER_SIZE = 34024;
lime_graphics_opengl_GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
lime_graphics_opengl_GL.UNPACK_FLIP_Y_WEBGL = 37440;
lime_graphics_opengl_GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
lime_graphics_opengl_GL.CONTEXT_LOST_WEBGL = 37442;
lime_graphics_opengl_GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
lime_graphics_opengl_GL.BROWSER_DEFAULT_WEBGL = 37444;
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__identity = [1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0];
lime_math_Matrix3.__identity = new lime_math_Matrix3();
lime_math__$Matrix4_Matrix4_$Impl_$.__identity = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
lime_net__$URLRequestMethod_URLRequestMethod_$Impl_$.DELETE = "DELETE";
lime_net__$URLRequestMethod_URLRequestMethod_$Impl_$.GET = "GET";
lime_net__$URLRequestMethod_URLRequestMethod_$Impl_$.HEAD = "HEAD";
lime_net__$URLRequestMethod_URLRequestMethod_$Impl_$.OPTIONS = "OPTIONS";
lime_net__$URLRequestMethod_URLRequestMethod_$Impl_$.POST = "POST";
lime_net__$URLRequestMethod_URLRequestMethod_$Impl_$.PUT = "PUT";
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_SSL = 1;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_WIN32 = 2;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_ALL = 3;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_NOTHING = 0;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_DEFAULT = 3;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_ACK_EINTR = 4;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.OK = 0;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.UNSUPPORTED_PROTOCOL = 1;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FAILED_INIT = 2;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.URL_MALFORMAT = 3;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.NOT_BUILT_IN = 4;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.COULDNT_RESOLVE_PROXY = 5;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.COULDNT_RESOLVE_HOST = 6;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.COULDNT_CONNECT = 7;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_WEIRD_SERVER_REPLY = 8;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.REMOTE_ACCESS_DENIED = 9;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_ACCEPT_FAILED = 10;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_WEIRD_PASS_REPLY = 11;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_ACCEPT_TIMEOUT = 12;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_WEIRD_PASV_REPLY = 13;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_WEIRD_227_FORMAT = 14;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_CANT_GET_HOST = 15;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_COULDNT_SET_TYPE = 17;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.PARTIAL_FILE = 18;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_COULDNT_RETR_FILE = 19;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.QUOTE_ERROR = 21;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.HTTP_RETURNED_ERROR = 22;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.WRITE_ERROR = 23;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.UPLOAD_FAILED = 25;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.READ_ERROR = 26;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.OUT_OF_MEMORY = 27;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.OPERATION_TIMEDOUT = 28;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_PORT_FAILED = 30;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_COULDNT_USE_REST = 31;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.RANGE_ERROR = 33;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.HTTP_POST_ERROR = 34;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_CONNECT_ERROR = 35;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.BAD_DOWNLOAD_RESUME = 36;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FILE_COULDNT_READ_FILE = 37;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.LDAP_CANNOT_BIND = 38;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.LDAP_SEARCH_FAILED = 39;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FUNCTION_NOT_FOUND = 41;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.ABORTED_BY_CALLBACK = 42;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.BAD_FUNCTION_ARGUMENT = 43;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.INTERFACE_FAILED = 45;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.TOO_MANY_REDIRECTS = 47;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.UNKNOWN_OPTION = 48;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.TELNET_OPTION_SYNTAX = 49;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.PEER_FAILED_VERIFICATION = 51;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.GOT_NOTHING = 52;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_ENGINE_NOTFOUND = 53;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_ENGINE_SETFAILED = 54;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SEND_ERROR = 55;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.RECV_ERROR = 56;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_CERTPROBLEM = 58;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_CIPHER = 59;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_CACERT = 60;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.BAD_CONTENT_ENCODING = 61;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.LDAP_INVALID_URL = 62;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FILESIZE_EXCEEDED = 63;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.USE_SSL_FAILED = 64;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SEND_FAIL_REWIND = 65;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_ENGINE_INITFAILED = 66;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.LOGIN_DENIED = 67;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.TFTP_NOTFOUND = 68;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.TFTP_PERM = 69;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.REMOTE_DISK_FULL = 70;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.TFTP_ILLEGAL = 71;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.TFTP_UNKNOWNID = 72;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.REMOTE_FILE_EXISTS = 73;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.TFTP_NOSUCHUSER = 74;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.CONV_FAILED = 75;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.CONV_REQD = 76;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_CACERT_BADFILE = 77;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.REMOTE_FILE_NOT_FOUND = 78;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSH = 79;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_SHUTDOWN_FAILED = 80;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.AGAIN = 81;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_CRL_BADFILE = 82;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.SSL_ISSUER_ERROR = 83;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_PRET_FAILED = 84;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.RTSP_CSEQ_ERROR = 85;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.RTSP_SESSION_ERROR = 86;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.FTP_BAD_FILE_LIST = 87;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.CHUNK_FAILED = 88;
lime_net_curl__$CURLCode_CURLCode_$Impl_$.NO_CONNECTION_AVAILABLE = 89;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.NONE = 0;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.EFFECTIVE_URL = 1048577;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.RESPONSE_CODE = 2097154;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.TOTAL_TIME = 3145731;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.NAMELOOKUP_TIME = 3145732;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.CONNECT_TIME = 3145733;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.PRETRANSFER_TIME = 3145734;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.SIZE_UPLOAD = 3145735;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.SIZE_DOWNLOAD = 3145736;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.SPEED_DOWNLOAD = 3145737;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.SPEED_UPLOAD = 3145738;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.HEADER_SIZE = 2097163;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.REQUEST_SIZE = 2097164;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.SSL_VERIFYRESULT = 2097165;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.FILETIME = 2097166;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.CONTENT_LENGTH_DOWNLOAD = 3145743;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.CONTENT_LENGTH_UPLOAD = 3145744;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.STARTTRANSFER_TIME = 3145745;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.CONTENT_TYPE = 1048594;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.REDIRECT_TIME = 3145747;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.REDIRECT_COUNT = 2097172;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.PRIVATE = 1048597;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.HTTP_CONNECTCODE = 2097174;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.HTTPAUTH_AVAIL = 2097175;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.PROXYAUTH_AVAIL = 2097176;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.OS_ERRNO = 2097177;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.NUM_CONNECTS = 2097178;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.SSL_ENGINES = 4194331;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.COOKIELIST = 4194332;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.LASTSOCKET = 2097181;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.FTP_ENTRY_PATH = 1048606;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.REDIRECT_URL = 1048607;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.PRIMARY_IP = 1048608;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.APPCONNECT_TIME = 3145761;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.CERTINFO = 4194338;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.CONDITION_UNMET = 2097187;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.RTSP_SESSION_ID = 1048612;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.RTSP_CLIENT_CSEQ = 2097189;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.RTSP_SERVER_CSEQ = 2097190;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.RTSP_CSEQ_RECV = 2097191;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.PRIMARY_PORT = 2097192;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.LOCAL_IP = 1048617;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.LOCAL_PORT = 2097194;
lime_net_curl__$CURLInfo_CURLInfo_$Impl_$.TLS_SESSION = 4194347;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.URL = 10002;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PORT = 3;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROXY = 10004;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.USERPWD = 10005;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROXYUSERPWD = 10006;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RANGE = 10007;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.ERRORBUFFER = 10010;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.WRITEFUNCTION = 20011;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.READFUNCTION = 20012;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TIMEOUT = 13;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.INFILESIZE = 14;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.POSTFIELDS = 10015;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.REFERER = 10016;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTPPORT = 10017;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.USERAGENT = 10018;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.LOW_SPEED_LIMIT = 19;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.LOW_SPEED_TIME = 20;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RESUME_FROM = 21;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.COOKIE = 22;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HTTPHEADER = 10023;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RTSPHEADER = 10023;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HTTPPOST = 10024;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSLCERT = 10025;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.KEYPASSWD = 10026;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CRLF = 27;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.QUOTE = 10028;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.WRITEHEADER = 10029;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HEADERDATA = 10029;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.COOKIEFILE = 10031;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSLVERSION = 32;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TIMECONDITION = 33;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TIMEVALUE = 34;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CUSTOMREQUEST = 10036;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.STDERR = 10037;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.POSTQUOTE = 10039;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.WRITEINFO = 10040;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.VERBOSE = 41;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HEADER = 42;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.NOPROGRESS = 43;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.NOBODY = 44;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FAILONERROR = 45;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.UPLOAD = 46;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.POST = 47;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.DIRLISTONLY = 48;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.APPEND = 50;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.NETRC = 51;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FOLLOWLOCATION = 52;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TRANSFERTEXT = 53;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PUT = 54;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROGRESSFUNCTION = 20056;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROGRESSDATA = 10057;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.XFERINFODATA = 10057;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.AUTOREFERER = 58;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROXYPORT = 59;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.POSTFIELDSIZE = 60;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HTTPPROXYTUNNEL = 61;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.INTERFACE = 10062;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.KRBLEVEL = 10063;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSL_VERIFYPEER = 64;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CAINFO = 10065;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.MAXREDIRS = 68;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FILETIME = 69;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TELNETOPTIONS = 10070;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.MAXCONNECTS = 71;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CLOSEPOLICY = 72;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FRESH_CONNECT = 74;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FORBID_REUSE = 75;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RANDOM_FILE = 10076;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.EGDSOCKET = 10077;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CONNECTTIMEOUT = 78;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HEADERFUNCTION = 20079;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HTTPGET = 80;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSL_VERIFYHOST = 81;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.COOKIEJAR = 10082;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSL_CIPHER_LIST = 10083;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HTTP_VERSION = 84;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_USE_EPSV = 85;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSLCERTTYPE = 10086;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSLKEY = 10087;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSLKEYTYPE = 10088;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSLENGINE = 10089;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSLENGINE_DEFAULT = 90;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.DNS_USE_GLOBAL_CACHE = 91;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.DNS_CACHE_TIMEOUT = 92;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PREQUOTE = 10093;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.DEBUGFUNCTION = 20094;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.DEBUGDATA = 10095;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.COOKIESESSION = 96;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CAPATH = 10097;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.BUFFERSIZE = 98;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.NOSIGNAL = 99;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SHARE = 10100;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROXYTYPE = 101;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.ACCEPT_ENCODING = 10102;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PRIVATE = 10103;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HTTP200ALIASES = 10104;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.UNRESTRICTED_AUTH = 105;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_USE_EPRT = 106;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HTTPAUTH = 107;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSL_CTX_FUNCTION = 20108;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSL_CTX_DATA = 10109;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_CREATE_MISSING_DIRS = 110;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROXYAUTH = 111;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_RESPONSE_TIMEOUT = 112;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SERVER_RESPONSE_TIMEOUT = 112;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.IPRESOLVE = 113;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.MAXFILESIZE = 114;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.INFILESIZE_LARGE = 30115;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RESUME_FROM_LARGE = 30116;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.MAXFILESIZE_LARGE = 30117;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.NETRC_FILE = 10118;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.USE_SSL = 119;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.POSTFIELDSIZE_LARGE = 30120;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TCP_NODELAY = 121;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTPSSLAUTH = 129;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.IOCTLFUNCTION = 20130;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.IOCTLDATA = 10131;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_ACCOUNT = 10134;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.COOKIELIST = 10135;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.IGNORE_CONTENT_LENGTH = 10136;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_SKIP_PASV_IP = 137;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_FILEMETHOD = 138;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.LOCALPORT = 139;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.LOCALPORTRANGE = 140;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CONNECT_ONLY = 141;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CONV_FROM_NETWORK_FUNCTION = 20142;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CONV_TO_NETWORK_FUNCTION = 20143;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CONV_FROM_UTF8_FUNCTION = 20144;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.MAX_SEND_SPEED_LARGE = 30145;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.MAX_RECV_SPEED_LARGE = 30146;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_ALTERNATIVE_TO_USER = 10147;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SOCKOPTFUNCTION = 20148;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SOCKOPTDATA = 10149;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSL_SESSIONID_CACHE = 150;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSH_AUTH_TYPES = 151;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSH_PUBLIC_KEYFILE = 10152;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSH_PRIVATE_KEYFILE = 10153;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_SSL_CCC = 154;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TIMEOUT_MS = 155;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CONNECTTIMEOUT_MS = 156;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HTTP_TRANSFER_DECODING = 157;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.HTTP_CONTENT_DECODING = 158;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.NEW_FILE_PERMS = 159;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.NEW_DIRECTORY_PERMS = 160;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.POSTREDIR = 161;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSH_HOST_PUBLIC_KEY_MD5 = 10162;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.OPENSOCKETFUNCTION = 20163;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.OPENSOCKETDATA = 10164;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.COPYPOSTFIELDS = 10165;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROXY_TRANSFER_MODE = 166;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SEEKFUNCTION = 20167;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SEEKDATA = 10168;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CRLFILE = 10169;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.ISSUERCERT = 10170;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.ADDRESS_SCOPE = 171;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CERTINFO = 172;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.USERNAME = 10173;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PASSWORD = 10174;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROXYUSERNAME = 10175;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROXYPASSWORD = 10176;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.NOPROXY = 10177;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TFTP_BLKSIZE = 178;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SOCKS5_GSSAPI_SERVICE = 10179;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SOCKS5_GSSAPI_NEC = 180;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.PROTOCOLS = 181;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.REDIR_PROTOCOLS = 182;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSH_KNOWNHOSTS = 10183;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSH_KEYFUNCTION = 20184;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSH_KEYDATA = 10185;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.MAIL_FROM = 10186;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.MAIL_RCPT = 10187;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FTP_USE_PRET = 188;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RTSP_REQUEST = 189;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RTSP_SESSION_ID = 10190;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RTSP_STREAM_URI = 10191;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RTSP_TRANSPORT = 10192;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RTSP_CLIENT_CSEQ = 193;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RTSP_SERVER_CSEQ = 194;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.INTERLEAVEDATA = 10195;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.INTERLEAVEFUNCTION = 20196;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.WILDCARDMATCH = 197;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CHUNK_BGN_FUNCTION = 20198;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CHUNK_END_FUNCTION = 20199;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FNMATCH_FUNCTION = 20200;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CHUNK_DATA = 10201;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.FNMATCH_DATA = 10202;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.RESOLVE = 10203;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TLSAUTH_USERNAME = 10204;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TLSAUTH_PASSWORD = 10205;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TLSAUTH_TYPE = 10206;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TRANSFER_ENCODING = 207;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CLOSESOCKETFUNCTION = 20208;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.CLOSESOCKETDATA = 10209;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.GSSAPI_DELEGATION = 210;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.DNS_SERVERS = 10211;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.ACCEPTTIMEOUT_MS = 212;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TCP_KEEPALIVE = 213;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TCP_KEEPIDLE = 214;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.TCP_KEEPINTVL = 215;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SSL_OPTIONS = 216;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.MAIL_AUTH = 10217;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.SASL_IR = 218;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.XFERINFOFUNCTION = 20219;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.XOAUTH2_BEARER = 10220;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.DNS_INTERFACE = 10221;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.DNS_LOCAL_IP4 = 10222;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.DNS_LOCAL_IP6 = 10223;
lime_net_curl__$CURLOption_CURLOption_$Impl_$.LOGIN_OPTIONS = 10224;
lime_net_curl__$CURLVersion_CURLVersion_$Impl_$.FIRST = 0;
lime_net_curl__$CURLVersion_CURLVersion_$Impl_$.SECOND = 1;
lime_net_curl__$CURLVersion_CURLVersion_$Impl_$.THIRD = 2;
lime_net_curl__$CURLVersion_CURLVersion_$Impl_$.FOURTH = 3;
lime_system_System.__moduleNames = null;
lime_ui__$KeyCode_KeyCode_$Impl_$.UNKNOWN = 0;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKSPACE = 8;
lime_ui__$KeyCode_KeyCode_$Impl_$.TAB = 9;
lime_ui__$KeyCode_KeyCode_$Impl_$.RETURN = 13;
lime_ui__$KeyCode_KeyCode_$Impl_$.ESCAPE = 27;
lime_ui__$KeyCode_KeyCode_$Impl_$.SPACE = 32;
lime_ui__$KeyCode_KeyCode_$Impl_$.EXCLAMATION = 33;
lime_ui__$KeyCode_KeyCode_$Impl_$.QUOTE = 34;
lime_ui__$KeyCode_KeyCode_$Impl_$.HASH = 35;
lime_ui__$KeyCode_KeyCode_$Impl_$.DOLLAR = 36;
lime_ui__$KeyCode_KeyCode_$Impl_$.PERCENT = 37;
lime_ui__$KeyCode_KeyCode_$Impl_$.AMPERSAND = 38;
lime_ui__$KeyCode_KeyCode_$Impl_$.SINGLE_QUOTE = 39;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_PARENTHESIS = 40;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_PARENTHESIS = 41;
lime_ui__$KeyCode_KeyCode_$Impl_$.ASTERISK = 42;
lime_ui__$KeyCode_KeyCode_$Impl_$.PLUS = 43;
lime_ui__$KeyCode_KeyCode_$Impl_$.COMMA = 44;
lime_ui__$KeyCode_KeyCode_$Impl_$.MINUS = 45;
lime_ui__$KeyCode_KeyCode_$Impl_$.PERIOD = 46;
lime_ui__$KeyCode_KeyCode_$Impl_$.SLASH = 47;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_0 = 48;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_1 = 49;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_2 = 50;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_3 = 51;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_4 = 52;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_5 = 53;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_6 = 54;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_7 = 55;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_8 = 56;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_9 = 57;
lime_ui__$KeyCode_KeyCode_$Impl_$.COLON = 58;
lime_ui__$KeyCode_KeyCode_$Impl_$.SEMICOLON = 59;
lime_ui__$KeyCode_KeyCode_$Impl_$.LESS_THAN = 60;
lime_ui__$KeyCode_KeyCode_$Impl_$.EQUALS = 61;
lime_ui__$KeyCode_KeyCode_$Impl_$.GREATER_THAN = 62;
lime_ui__$KeyCode_KeyCode_$Impl_$.QUESTION = 63;
lime_ui__$KeyCode_KeyCode_$Impl_$.AT = 64;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_BRACKET = 91;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKSLASH = 92;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_BRACKET = 93;
lime_ui__$KeyCode_KeyCode_$Impl_$.CARET = 94;
lime_ui__$KeyCode_KeyCode_$Impl_$.UNDERSCORE = 95;
lime_ui__$KeyCode_KeyCode_$Impl_$.GRAVE = 96;
lime_ui__$KeyCode_KeyCode_$Impl_$.A = 97;
lime_ui__$KeyCode_KeyCode_$Impl_$.B = 98;
lime_ui__$KeyCode_KeyCode_$Impl_$.C = 99;
lime_ui__$KeyCode_KeyCode_$Impl_$.D = 100;
lime_ui__$KeyCode_KeyCode_$Impl_$.E = 101;
lime_ui__$KeyCode_KeyCode_$Impl_$.F = 102;
lime_ui__$KeyCode_KeyCode_$Impl_$.G = 103;
lime_ui__$KeyCode_KeyCode_$Impl_$.H = 104;
lime_ui__$KeyCode_KeyCode_$Impl_$.I = 105;
lime_ui__$KeyCode_KeyCode_$Impl_$.J = 106;
lime_ui__$KeyCode_KeyCode_$Impl_$.K = 107;
lime_ui__$KeyCode_KeyCode_$Impl_$.L = 108;
lime_ui__$KeyCode_KeyCode_$Impl_$.M = 109;
lime_ui__$KeyCode_KeyCode_$Impl_$.N = 110;
lime_ui__$KeyCode_KeyCode_$Impl_$.O = 111;
lime_ui__$KeyCode_KeyCode_$Impl_$.P = 112;
lime_ui__$KeyCode_KeyCode_$Impl_$.Q = 113;
lime_ui__$KeyCode_KeyCode_$Impl_$.R = 114;
lime_ui__$KeyCode_KeyCode_$Impl_$.S = 115;
lime_ui__$KeyCode_KeyCode_$Impl_$.T = 116;
lime_ui__$KeyCode_KeyCode_$Impl_$.U = 117;
lime_ui__$KeyCode_KeyCode_$Impl_$.V = 118;
lime_ui__$KeyCode_KeyCode_$Impl_$.W = 119;
lime_ui__$KeyCode_KeyCode_$Impl_$.X = 120;
lime_ui__$KeyCode_KeyCode_$Impl_$.Y = 121;
lime_ui__$KeyCode_KeyCode_$Impl_$.Z = 122;
lime_ui__$KeyCode_KeyCode_$Impl_$.DELETE = 127;
lime_ui__$KeyCode_KeyCode_$Impl_$.CAPS_LOCK = 1073741881;
lime_ui__$KeyCode_KeyCode_$Impl_$.F1 = 1073741882;
lime_ui__$KeyCode_KeyCode_$Impl_$.F2 = 1073741883;
lime_ui__$KeyCode_KeyCode_$Impl_$.F3 = 1073741884;
lime_ui__$KeyCode_KeyCode_$Impl_$.F4 = 1073741885;
lime_ui__$KeyCode_KeyCode_$Impl_$.F5 = 1073741886;
lime_ui__$KeyCode_KeyCode_$Impl_$.F6 = 1073741887;
lime_ui__$KeyCode_KeyCode_$Impl_$.F7 = 1073741888;
lime_ui__$KeyCode_KeyCode_$Impl_$.F8 = 1073741889;
lime_ui__$KeyCode_KeyCode_$Impl_$.F9 = 1073741890;
lime_ui__$KeyCode_KeyCode_$Impl_$.F10 = 1073741891;
lime_ui__$KeyCode_KeyCode_$Impl_$.F11 = 1073741892;
lime_ui__$KeyCode_KeyCode_$Impl_$.F12 = 1073741893;
lime_ui__$KeyCode_KeyCode_$Impl_$.PRINT_SCREEN = 1073741894;
lime_ui__$KeyCode_KeyCode_$Impl_$.SCROLL_LOCK = 1073741895;
lime_ui__$KeyCode_KeyCode_$Impl_$.PAUSE = 1073741896;
lime_ui__$KeyCode_KeyCode_$Impl_$.INSERT = 1073741897;
lime_ui__$KeyCode_KeyCode_$Impl_$.HOME = 1073741898;
lime_ui__$KeyCode_KeyCode_$Impl_$.PAGE_UP = 1073741899;
lime_ui__$KeyCode_KeyCode_$Impl_$.END = 1073741901;
lime_ui__$KeyCode_KeyCode_$Impl_$.PAGE_DOWN = 1073741902;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT = 1073741903;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT = 1073741904;
lime_ui__$KeyCode_KeyCode_$Impl_$.DOWN = 1073741905;
lime_ui__$KeyCode_KeyCode_$Impl_$.UP = 1073741906;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUM_LOCK = 1073741907;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_DIVIDE = 1073741908;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MULTIPLY = 1073741909;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MINUS = 1073741910;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_PLUS = 1073741911;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_ENTER = 1073741912;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_1 = 1073741913;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_2 = 1073741914;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_3 = 1073741915;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_4 = 1073741916;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_5 = 1073741917;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_6 = 1073741918;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_7 = 1073741919;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_8 = 1073741920;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_9 = 1073741921;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_0 = 1073741922;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_PERIOD = 1073741923;
lime_ui__$KeyCode_KeyCode_$Impl_$.APPLICATION = 1073741925;
lime_ui__$KeyCode_KeyCode_$Impl_$.POWER = 1073741926;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_EQUALS = 1073741927;
lime_ui__$KeyCode_KeyCode_$Impl_$.F13 = 1073741928;
lime_ui__$KeyCode_KeyCode_$Impl_$.F14 = 1073741929;
lime_ui__$KeyCode_KeyCode_$Impl_$.F15 = 1073741930;
lime_ui__$KeyCode_KeyCode_$Impl_$.F16 = 1073741931;
lime_ui__$KeyCode_KeyCode_$Impl_$.F17 = 1073741932;
lime_ui__$KeyCode_KeyCode_$Impl_$.F18 = 1073741933;
lime_ui__$KeyCode_KeyCode_$Impl_$.F19 = 1073741934;
lime_ui__$KeyCode_KeyCode_$Impl_$.F20 = 1073741935;
lime_ui__$KeyCode_KeyCode_$Impl_$.F21 = 1073741936;
lime_ui__$KeyCode_KeyCode_$Impl_$.F22 = 1073741937;
lime_ui__$KeyCode_KeyCode_$Impl_$.F23 = 1073741938;
lime_ui__$KeyCode_KeyCode_$Impl_$.F24 = 1073741939;
lime_ui__$KeyCode_KeyCode_$Impl_$.EXECUTE = 1073741940;
lime_ui__$KeyCode_KeyCode_$Impl_$.HELP = 1073741941;
lime_ui__$KeyCode_KeyCode_$Impl_$.MENU = 1073741942;
lime_ui__$KeyCode_KeyCode_$Impl_$.SELECT = 1073741943;
lime_ui__$KeyCode_KeyCode_$Impl_$.STOP = 1073741944;
lime_ui__$KeyCode_KeyCode_$Impl_$.AGAIN = 1073741945;
lime_ui__$KeyCode_KeyCode_$Impl_$.UNDO = 1073741946;
lime_ui__$KeyCode_KeyCode_$Impl_$.CUT = 1073741947;
lime_ui__$KeyCode_KeyCode_$Impl_$.COPY = 1073741948;
lime_ui__$KeyCode_KeyCode_$Impl_$.PASTE = 1073741949;
lime_ui__$KeyCode_KeyCode_$Impl_$.FIND = 1073741950;
lime_ui__$KeyCode_KeyCode_$Impl_$.MUTE = 1073741951;
lime_ui__$KeyCode_KeyCode_$Impl_$.VOLUME_UP = 1073741952;
lime_ui__$KeyCode_KeyCode_$Impl_$.VOLUME_DOWN = 1073741953;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_COMMA = 1073741957;
lime_ui__$KeyCode_KeyCode_$Impl_$.ALT_ERASE = 1073741977;
lime_ui__$KeyCode_KeyCode_$Impl_$.SYSTEM_REQUEST = 1073741978;
lime_ui__$KeyCode_KeyCode_$Impl_$.CANCEL = 1073741979;
lime_ui__$KeyCode_KeyCode_$Impl_$.CLEAR = 1073741980;
lime_ui__$KeyCode_KeyCode_$Impl_$.PRIOR = 1073741981;
lime_ui__$KeyCode_KeyCode_$Impl_$.RETURN2 = 1073741982;
lime_ui__$KeyCode_KeyCode_$Impl_$.SEPARATOR = 1073741983;
lime_ui__$KeyCode_KeyCode_$Impl_$.OUT = 1073741984;
lime_ui__$KeyCode_KeyCode_$Impl_$.OPER = 1073741985;
lime_ui__$KeyCode_KeyCode_$Impl_$.CLEAR_AGAIN = 1073741986;
lime_ui__$KeyCode_KeyCode_$Impl_$.CRSEL = 1073741987;
lime_ui__$KeyCode_KeyCode_$Impl_$.EXSEL = 1073741988;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_00 = 1073742000;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_000 = 1073742001;
lime_ui__$KeyCode_KeyCode_$Impl_$.THOUSAND_SEPARATOR = 1073742002;
lime_ui__$KeyCode_KeyCode_$Impl_$.DECIMAL_SEPARATOR = 1073742003;
lime_ui__$KeyCode_KeyCode_$Impl_$.CURRENCY_UNIT = 1073742004;
lime_ui__$KeyCode_KeyCode_$Impl_$.CURRENCY_SUBUNIT = 1073742005;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_LEFT_PARENTHESIS = 1073742006;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_RIGHT_PARENTHESIS = 1073742007;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_LEFT_BRACE = 1073742008;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_RIGHT_BRACE = 1073742009;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_TAB = 1073742010;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_BACKSPACE = 1073742011;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_A = 1073742012;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_B = 1073742013;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_C = 1073742014;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_D = 1073742015;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_E = 1073742016;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_F = 1073742017;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_XOR = 1073742018;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_POWER = 1073742019;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_PERCENT = 1073742020;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_LESS_THAN = 1073742021;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_GREATER_THAN = 1073742022;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_AMPERSAND = 1073742023;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_DOUBLE_AMPERSAND = 1073742024;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_VERTICAL_BAR = 1073742025;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_DOUBLE_VERTICAL_BAR = 1073742026;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_COLON = 1073742027;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_HASH = 1073742028;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_SPACE = 1073742029;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_AT = 1073742030;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_EXCLAMATION = 1073742031;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_STORE = 1073742032;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_RECALL = 1073742033;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_CLEAR = 1073742034;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_ADD = 1073742035;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_SUBTRACT = 1073742036;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_MULTIPLY = 1073742037;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_DIVIDE = 1073742038;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_PLUS_MINUS = 1073742039;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_CLEAR = 1073742040;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_CLEAR_ENTRY = 1073742041;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_BINARY = 1073742042;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_OCTAL = 1073742043;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_DECIMAL = 1073742044;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_HEXADECIMAL = 1073742045;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_CTRL = 1073742048;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_SHIFT = 1073742049;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_ALT = 1073742050;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_META = 1073742051;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_CTRL = 1073742052;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_SHIFT = 1073742053;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_ALT = 1073742054;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_META = 1073742055;
lime_ui__$KeyCode_KeyCode_$Impl_$.MODE = 1073742081;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_NEXT = 1073742082;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_PREVIOUS = 1073742083;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_STOP = 1073742084;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_PLAY = 1073742085;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_MUTE = 1073742086;
lime_ui__$KeyCode_KeyCode_$Impl_$.MEDIA_SELECT = 1073742087;
lime_ui__$KeyCode_KeyCode_$Impl_$.WWW = 1073742088;
lime_ui__$KeyCode_KeyCode_$Impl_$.MAIL = 1073742089;
lime_ui__$KeyCode_KeyCode_$Impl_$.CALCULATOR = 1073742090;
lime_ui__$KeyCode_KeyCode_$Impl_$.COMPUTER = 1073742091;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_SEARCH = 1073742092;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_HOME = 1073742093;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_BACK = 1073742094;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_FORWARD = 1073742095;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_STOP = 1073742096;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_REFRESH = 1073742097;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_BOOKMARKS = 1073742098;
lime_ui__$KeyCode_KeyCode_$Impl_$.BRIGHTNESS_DOWN = 1073742099;
lime_ui__$KeyCode_KeyCode_$Impl_$.BRIGHTNESS_UP = 1073742100;
lime_ui__$KeyCode_KeyCode_$Impl_$.DISPLAY_SWITCH = 1073742101;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKLIGHT_TOGGLE = 1073742102;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKLIGHT_DOWN = 1073742103;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKLIGHT_UP = 1073742104;
lime_ui__$KeyCode_KeyCode_$Impl_$.EJECT = 1073742105;
lime_ui__$KeyCode_KeyCode_$Impl_$.SLEEP = 1073742106;
lime_ui_KeyEventManager.onKeyDown = new lime_app_Event();
lime_ui_KeyEventManager.onKeyUp = new lime_app_Event();
lime_ui__$KeyEventManager_KeyEventType_$Impl_$.KEY_DOWN = 0;
lime_ui__$KeyEventManager_KeyEventType_$Impl_$.KEY_UP = 1;
lime_ui__$Mouse_MouseCursorType_$Impl_$.ARROW = 0;
lime_ui__$Mouse_MouseCursorType_$Impl_$.CROSSHAIR = 1;
lime_ui__$Mouse_MouseCursorType_$Impl_$.DEFAULT = 2;
lime_ui__$Mouse_MouseCursorType_$Impl_$.MOVE = 3;
lime_ui__$Mouse_MouseCursorType_$Impl_$.POINTER = 4;
lime_ui__$Mouse_MouseCursorType_$Impl_$.RESIZE_NESW = 5;
lime_ui__$Mouse_MouseCursorType_$Impl_$.RESIZE_NS = 6;
lime_ui__$Mouse_MouseCursorType_$Impl_$.RESIZE_NWSE = 7;
lime_ui__$Mouse_MouseCursorType_$Impl_$.RESIZE_WE = 8;
lime_ui__$Mouse_MouseCursorType_$Impl_$.TEXT = 9;
lime_ui__$Mouse_MouseCursorType_$Impl_$.WAIT = 10;
lime_ui__$Mouse_MouseCursorType_$Impl_$.WAIT_ARROW = 11;
lime_ui_MouseEventManager.onMouseDown = new lime_app_Event();
lime_ui_MouseEventManager.onMouseMove = new lime_app_Event();
lime_ui_MouseEventManager.onMouseUp = new lime_app_Event();
lime_ui_MouseEventManager.onMouseWheel = new lime_app_Event();
lime_ui__$MouseEventManager_MouseEventType_$Impl_$.MOUSE_DOWN = 0;
lime_ui__$MouseEventManager_MouseEventType_$Impl_$.MOUSE_UP = 1;
lime_ui__$MouseEventManager_MouseEventType_$Impl_$.MOUSE_MOVE = 2;
lime_ui__$MouseEventManager_MouseEventType_$Impl_$.MOUSE_WHEEL = 3;
lime_ui_TouchEventManager.onTouchEnd = new lime_app_Event();
lime_ui_TouchEventManager.onTouchMove = new lime_app_Event();
lime_ui_TouchEventManager.onTouchStart = new lime_app_Event();
lime_ui__$TouchEventManager_TouchEventType_$Impl_$.TOUCH_START = 0;
lime_ui__$TouchEventManager_TouchEventType_$Impl_$.TOUCH_END = 1;
lime_ui__$TouchEventManager_TouchEventType_$Impl_$.TOUCH_MOVE = 2;
lime_ui_Window.onWindowActivate = new lime_app_Event();
lime_ui_Window.onWindowClose = new lime_app_Event();
lime_ui_Window.onWindowDeactivate = new lime_app_Event();
lime_ui_Window.onWindowFocusIn = new lime_app_Event();
lime_ui_Window.onWindowFocusOut = new lime_app_Event();
lime_ui_Window.onWindowMove = new lime_app_Event();
lime_ui_Window.onWindowResize = new lime_app_Event();
lime_ui_Window.eventInfo = new lime_ui__$Window_WindowEventInfo();
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_FULLSCREEN = 1;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_BORDERLESS = 2;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_RESIZABLE = 4;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_HARDWARE = 8;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_VSYNC = 16;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_HW_AA = 32;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_HW_AA_HIRES = 96;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_ALLOW_SHADERS = 128;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_REQUIRE_SHADERS = 256;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_DEPTH_BUFFER = 512;
lime_ui__$Window_WindowFlags_$Impl_$.WINDOW_FLAG_STENCIL_BUFFER = 1024;
lime_ui__$Window_WindowEventType_$Impl_$.WINDOW_ACTIVATE = 0;
lime_ui__$Window_WindowEventType_$Impl_$.WINDOW_CLOSE = 1;
lime_ui__$Window_WindowEventType_$Impl_$.WINDOW_DEACTIVATE = 2;
lime_ui__$Window_WindowEventType_$Impl_$.WINDOW_FOCUS_IN = 3;
lime_ui__$Window_WindowEventType_$Impl_$.WINDOW_FOCUS_OUT = 4;
lime_ui__$Window_WindowEventType_$Impl_$.WINDOW_MOVE = 5;
lime_ui__$Window_WindowEventType_$Impl_$.WINDOW_RESIZE = 6;
lime_utils_ByteArray.lime_byte_array_overwrite_file = lime_system_System.load("lime","lime_byte_array_overwrite_file",2);
lime_utils_ByteArray.lime_byte_array_read_file = lime_system_System.load("lime","lime_byte_array_read_file",1);
lime_utils_ByteArray.lime_lzma_decode = lime_system_System.load("lime","lime_lzma_decode",1);
lime_utils_ByteArray.lime_lzma_encode = lime_system_System.load("lime","lime_lzma_encode",1);
openfl_system_ApplicationDomain.currentDomain = new openfl_system_ApplicationDomain(null);
openfl_geom_Matrix.__identity = new openfl_geom_Matrix();
openfl_Lib.current = new openfl_display_MovieClip();
openfl_Lib.__sentWarnings = new haxe_ds_StringMap();
openfl_Lib.__startTime = haxe_Timer.stamp();
openfl__$internal_renderer_canvas_CanvasGraphics.SIN45 = 0.70710678118654752440084436210485;
openfl__$internal_renderer_canvas_CanvasGraphics.TAN22 = 0.4142135623730950488016887242097;
openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL = null;
openfl__$internal_renderer_opengl_GLRenderer.glContextId = 0;
openfl__$internal_renderer_opengl_GLRenderer.glContexts = [];
openfl__$internal_renderer_opengl_shaders_AbstractShader.__UID = 0;
openfl__$internal_renderer_opengl_shaders_DefaultShader.defaultVertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec2 aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying vec4 vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;","   vColor = vec4(color * aColor.x, aColor.x);","}"];
openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex = 0;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.graphicsDataPool = [];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bucketPool = [];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectPosition = new openfl_geom_Point();
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds = new openfl_geom_Rectangle();
openfl__$internal_renderer_opengl_utils__$GraphicsRenderer_RenderMode_$Impl_$.DEFAULT = 0;
openfl__$internal_renderer_opengl_utils__$GraphicsRenderer_RenderMode_$Impl_$.STENCIL = 1;
openfl_display_Graphics.TILE_SCALE = 1;
openfl_display_Graphics.TILE_ROTATION = 2;
openfl_display_Graphics.TILE_RGB = 4;
openfl_display_Graphics.TILE_ALPHA = 8;
openfl_display_Graphics.TILE_TRANS_2x2 = 16;
openfl_display_Graphics.TILE_RECT = 32;
openfl_display_Graphics.TILE_ORIGIN = 64;
openfl_display_Graphics.TILE_BLEND_NORMAL = 0;
openfl_display_Graphics.TILE_BLEND_ADD = 65536;
openfl_display_Tilesheet.TILE_SCALE = 1;
openfl_display_Tilesheet.TILE_ROTATION = 2;
openfl_display_Tilesheet.TILE_RGB = 4;
openfl_display_Tilesheet.TILE_ALPHA = 8;
openfl_display_Tilesheet.TILE_TRANS_2x2 = 16;
openfl_display_Tilesheet.TILE_RECT = 32;
openfl_display_Tilesheet.TILE_ORIGIN = 64;
openfl_display_Tilesheet.TILE_BLEND_NORMAL = 0;
openfl_display_Tilesheet.TILE_BLEND_ADD = 65536;
openfl_display_Tilesheet.TILE_BLEND_MULTIPLY = 131072;
openfl_display_Tilesheet.TILE_BLEND_SCREEN = 262144;
openfl_display_Tilesheet.__defaultPoint = new openfl_geom_Point(0,0);
openfl_errors_Error.DEFAULT_TO_STRING = "Error";
openfl_events_Event.ACTIVATE = "activate";
openfl_events_Event.ADDED = "added";
openfl_events_Event.ADDED_TO_STAGE = "addedToStage";
openfl_events_Event.CANCEL = "cancel";
openfl_events_Event.CHANGE = "change";
openfl_events_Event.CLOSE = "close";
openfl_events_Event.COMPLETE = "complete";
openfl_events_Event.CONNECT = "connect";
openfl_events_Event.CONTEXT3D_CREATE = "context3DCreate";
openfl_events_Event.DEACTIVATE = "deactivate";
openfl_events_Event.ENTER_FRAME = "enterFrame";
openfl_events_Event.ID3 = "id3";
openfl_events_Event.INIT = "init";
openfl_events_Event.MOUSE_LEAVE = "mouseLeave";
openfl_events_Event.OPEN = "open";
openfl_events_Event.REMOVED = "removed";
openfl_events_Event.REMOVED_FROM_STAGE = "removedFromStage";
openfl_events_Event.RENDER = "render";
openfl_events_Event.RESIZE = "resize";
openfl_events_Event.SCROLL = "scroll";
openfl_events_Event.SELECT = "select";
openfl_events_Event.SOUND_COMPLETE = "soundComplete";
openfl_events_Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
openfl_events_Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
openfl_events_Event.TAB_INDEX_CHANGE = "tabIndexChange";
openfl_events_Event.UNLOAD = "unload";
openfl_events_TextEvent.LINK = "link";
openfl_events_TextEvent.TEXT_INPUT = "textInput";
openfl_events_ErrorEvent.ERROR = "error";
openfl_events_FocusEvent.FOCUS_IN = "focusIn";
openfl_events_FocusEvent.FOCUS_OUT = "focusOut";
openfl_events_FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
openfl_events_FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
openfl_events_IOErrorEvent.IO_ERROR = "ioError";
openfl_events_KeyboardEvent.KEY_DOWN = "keyDown";
openfl_events_KeyboardEvent.KEY_UP = "keyUp";
openfl_events_MouseEvent.CLICK = "click";
openfl_events_MouseEvent.DOUBLE_CLICK = "doubleClick";
openfl_events_MouseEvent.MIDDLE_CLICK = "middleClick";
openfl_events_MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
openfl_events_MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
openfl_events_MouseEvent.MOUSE_DOWN = "mouseDown";
openfl_events_MouseEvent.MOUSE_MOVE = "mouseMove";
openfl_events_MouseEvent.MOUSE_OUT = "mouseOut";
openfl_events_MouseEvent.MOUSE_OVER = "mouseOver";
openfl_events_MouseEvent.MOUSE_UP = "mouseUp";
openfl_events_MouseEvent.MOUSE_WHEEL = "mouseWheel";
openfl_events_MouseEvent.RIGHT_CLICK = "rightClick";
openfl_events_MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
openfl_events_MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
openfl_events_MouseEvent.ROLL_OUT = "rollOut";
openfl_events_MouseEvent.ROLL_OVER = "rollOver";
openfl_events_MouseEvent.__buttonDown = [false,false,false];
openfl_events_TouchEvent.TOUCH_BEGIN = "touchBegin";
openfl_events_TouchEvent.TOUCH_END = "touchEnd";
openfl_events_TouchEvent.TOUCH_MOVE = "touchMove";
openfl_events_TouchEvent.TOUCH_OUT = "touchOut";
openfl_events_TouchEvent.TOUCH_OVER = "touchOver";
openfl_events_TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
openfl_events_TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
openfl_events_TouchEvent.TOUCH_TAP = "touchTap";
openfl_media_Sound.__registeredSounds = new haxe_ds_StringMap();
openfl_net_URLRequestMethod.DELETE = "DELETE";
openfl_net_URLRequestMethod.GET = "GET";
openfl_net_URLRequestMethod.HEAD = "HEAD";
openfl_net_URLRequestMethod.OPTIONS = "OPTIONS";
openfl_net_URLRequestMethod.POST = "POST";
openfl_net_URLRequestMethod.PUT = "PUT";
openfl_system_SecurityDomain.currentDomain = new openfl_system_SecurityDomain();
openfl_text_Font.__registeredFonts = new Array();
openfl_ui__$KeyLocation_KeyLocation_$Impl_$.STANDARD = 0;
openfl_ui__$KeyLocation_KeyLocation_$Impl_$.LEFT = 1;
openfl_ui__$KeyLocation_KeyLocation_$Impl_$.RIGHT = 2;
openfl_ui__$KeyLocation_KeyLocation_$Impl_$.NUM_PAD = 3;
openfl_ui_Keyboard.NUMBER_0 = 48;
openfl_ui_Keyboard.NUMBER_1 = 49;
openfl_ui_Keyboard.NUMBER_2 = 50;
openfl_ui_Keyboard.NUMBER_3 = 51;
openfl_ui_Keyboard.NUMBER_4 = 52;
openfl_ui_Keyboard.NUMBER_5 = 53;
openfl_ui_Keyboard.NUMBER_6 = 54;
openfl_ui_Keyboard.NUMBER_7 = 55;
openfl_ui_Keyboard.NUMBER_8 = 56;
openfl_ui_Keyboard.NUMBER_9 = 57;
openfl_ui_Keyboard.A = 65;
openfl_ui_Keyboard.B = 66;
openfl_ui_Keyboard.C = 67;
openfl_ui_Keyboard.D = 68;
openfl_ui_Keyboard.E = 69;
openfl_ui_Keyboard.F = 70;
openfl_ui_Keyboard.G = 71;
openfl_ui_Keyboard.H = 72;
openfl_ui_Keyboard.I = 73;
openfl_ui_Keyboard.J = 74;
openfl_ui_Keyboard.K = 75;
openfl_ui_Keyboard.L = 76;
openfl_ui_Keyboard.M = 77;
openfl_ui_Keyboard.N = 78;
openfl_ui_Keyboard.O = 79;
openfl_ui_Keyboard.P = 80;
openfl_ui_Keyboard.Q = 81;
openfl_ui_Keyboard.R = 82;
openfl_ui_Keyboard.S = 83;
openfl_ui_Keyboard.T = 84;
openfl_ui_Keyboard.U = 85;
openfl_ui_Keyboard.V = 86;
openfl_ui_Keyboard.W = 87;
openfl_ui_Keyboard.X = 88;
openfl_ui_Keyboard.Y = 89;
openfl_ui_Keyboard.Z = 90;
openfl_ui_Keyboard.NUMPAD_0 = 96;
openfl_ui_Keyboard.NUMPAD_1 = 97;
openfl_ui_Keyboard.NUMPAD_2 = 98;
openfl_ui_Keyboard.NUMPAD_3 = 99;
openfl_ui_Keyboard.NUMPAD_4 = 100;
openfl_ui_Keyboard.NUMPAD_5 = 101;
openfl_ui_Keyboard.NUMPAD_6 = 102;
openfl_ui_Keyboard.NUMPAD_7 = 103;
openfl_ui_Keyboard.NUMPAD_8 = 104;
openfl_ui_Keyboard.NUMPAD_9 = 105;
openfl_ui_Keyboard.NUMPAD_MULTIPLY = 106;
openfl_ui_Keyboard.NUMPAD_ADD = 107;
openfl_ui_Keyboard.NUMPAD_ENTER = 108;
openfl_ui_Keyboard.NUMPAD_SUBTRACT = 109;
openfl_ui_Keyboard.NUMPAD_DECIMAL = 110;
openfl_ui_Keyboard.NUMPAD_DIVIDE = 111;
openfl_ui_Keyboard.F1 = 112;
openfl_ui_Keyboard.F2 = 113;
openfl_ui_Keyboard.F3 = 114;
openfl_ui_Keyboard.F4 = 115;
openfl_ui_Keyboard.F5 = 116;
openfl_ui_Keyboard.F6 = 117;
openfl_ui_Keyboard.F7 = 118;
openfl_ui_Keyboard.F8 = 119;
openfl_ui_Keyboard.F9 = 120;
openfl_ui_Keyboard.F10 = 121;
openfl_ui_Keyboard.F11 = 122;
openfl_ui_Keyboard.F12 = 123;
openfl_ui_Keyboard.F13 = 124;
openfl_ui_Keyboard.F14 = 125;
openfl_ui_Keyboard.F15 = 126;
openfl_ui_Keyboard.BACKSPACE = 8;
openfl_ui_Keyboard.TAB = 9;
openfl_ui_Keyboard.ALTERNATE = 18;
openfl_ui_Keyboard.ENTER = 13;
openfl_ui_Keyboard.COMMAND = 15;
openfl_ui_Keyboard.SHIFT = 16;
openfl_ui_Keyboard.CONTROL = 17;
openfl_ui_Keyboard.CAPS_LOCK = 20;
openfl_ui_Keyboard.NUMPAD = 21;
openfl_ui_Keyboard.ESCAPE = 27;
openfl_ui_Keyboard.SPACE = 32;
openfl_ui_Keyboard.PAGE_UP = 33;
openfl_ui_Keyboard.PAGE_DOWN = 34;
openfl_ui_Keyboard.END = 35;
openfl_ui_Keyboard.HOME = 36;
openfl_ui_Keyboard.LEFT = 37;
openfl_ui_Keyboard.RIGHT = 39;
openfl_ui_Keyboard.UP = 38;
openfl_ui_Keyboard.DOWN = 40;
openfl_ui_Keyboard.INSERT = 45;
openfl_ui_Keyboard.DELETE = 46;
openfl_ui_Keyboard.NUMLOCK = 144;
openfl_ui_Keyboard.BREAK = 19;
openfl_ui_Keyboard.SEMICOLON = 186;
openfl_ui_Keyboard.EQUAL = 187;
openfl_ui_Keyboard.COMMA = 188;
openfl_ui_Keyboard.MINUS = 189;
openfl_ui_Keyboard.PERIOD = 190;
openfl_ui_Keyboard.SLASH = 191;
openfl_ui_Keyboard.BACKQUOTE = 192;
openfl_ui_Keyboard.LEFTBRACKET = 219;
openfl_ui_Keyboard.BACKSLASH = 220;
openfl_ui_Keyboard.RIGHTBRACKET = 221;
openfl_ui_Keyboard.QUOTE = 222;
openfl_ui_Keyboard.DOM_VK_CANCEL = 3;
openfl_ui_Keyboard.DOM_VK_HELP = 6;
openfl_ui_Keyboard.DOM_VK_BACK_SPACE = 8;
openfl_ui_Keyboard.DOM_VK_TAB = 9;
openfl_ui_Keyboard.DOM_VK_CLEAR = 12;
openfl_ui_Keyboard.DOM_VK_RETURN = 13;
openfl_ui_Keyboard.DOM_VK_ENTER = 14;
openfl_ui_Keyboard.DOM_VK_SHIFT = 16;
openfl_ui_Keyboard.DOM_VK_CONTROL = 17;
openfl_ui_Keyboard.DOM_VK_ALT = 18;
openfl_ui_Keyboard.DOM_VK_PAUSE = 19;
openfl_ui_Keyboard.DOM_VK_CAPS_LOCK = 20;
openfl_ui_Keyboard.DOM_VK_ESCAPE = 27;
openfl_ui_Keyboard.DOM_VK_SPACE = 32;
openfl_ui_Keyboard.DOM_VK_PAGE_UP = 33;
openfl_ui_Keyboard.DOM_VK_PAGE_DOWN = 34;
openfl_ui_Keyboard.DOM_VK_END = 35;
openfl_ui_Keyboard.DOM_VK_HOME = 36;
openfl_ui_Keyboard.DOM_VK_LEFT = 37;
openfl_ui_Keyboard.DOM_VK_UP = 38;
openfl_ui_Keyboard.DOM_VK_RIGHT = 39;
openfl_ui_Keyboard.DOM_VK_DOWN = 40;
openfl_ui_Keyboard.DOM_VK_PRINTSCREEN = 44;
openfl_ui_Keyboard.DOM_VK_INSERT = 45;
openfl_ui_Keyboard.DOM_VK_DELETE = 46;
openfl_ui_Keyboard.DOM_VK_0 = 48;
openfl_ui_Keyboard.DOM_VK_1 = 49;
openfl_ui_Keyboard.DOM_VK_2 = 50;
openfl_ui_Keyboard.DOM_VK_3 = 51;
openfl_ui_Keyboard.DOM_VK_4 = 52;
openfl_ui_Keyboard.DOM_VK_5 = 53;
openfl_ui_Keyboard.DOM_VK_6 = 54;
openfl_ui_Keyboard.DOM_VK_7 = 55;
openfl_ui_Keyboard.DOM_VK_8 = 56;
openfl_ui_Keyboard.DOM_VK_9 = 57;
openfl_ui_Keyboard.DOM_VK_SEMICOLON = 59;
openfl_ui_Keyboard.DOM_VK_EQUALS = 61;
openfl_ui_Keyboard.DOM_VK_A = 65;
openfl_ui_Keyboard.DOM_VK_B = 66;
openfl_ui_Keyboard.DOM_VK_C = 67;
openfl_ui_Keyboard.DOM_VK_D = 68;
openfl_ui_Keyboard.DOM_VK_E = 69;
openfl_ui_Keyboard.DOM_VK_F = 70;
openfl_ui_Keyboard.DOM_VK_G = 71;
openfl_ui_Keyboard.DOM_VK_H = 72;
openfl_ui_Keyboard.DOM_VK_I = 73;
openfl_ui_Keyboard.DOM_VK_J = 74;
openfl_ui_Keyboard.DOM_VK_K = 75;
openfl_ui_Keyboard.DOM_VK_L = 76;
openfl_ui_Keyboard.DOM_VK_M = 77;
openfl_ui_Keyboard.DOM_VK_N = 78;
openfl_ui_Keyboard.DOM_VK_O = 79;
openfl_ui_Keyboard.DOM_VK_P = 80;
openfl_ui_Keyboard.DOM_VK_Q = 81;
openfl_ui_Keyboard.DOM_VK_R = 82;
openfl_ui_Keyboard.DOM_VK_S = 83;
openfl_ui_Keyboard.DOM_VK_T = 84;
openfl_ui_Keyboard.DOM_VK_U = 85;
openfl_ui_Keyboard.DOM_VK_V = 86;
openfl_ui_Keyboard.DOM_VK_W = 87;
openfl_ui_Keyboard.DOM_VK_X = 88;
openfl_ui_Keyboard.DOM_VK_Y = 89;
openfl_ui_Keyboard.DOM_VK_Z = 90;
openfl_ui_Keyboard.DOM_VK_CONTEXT_MENU = 93;
openfl_ui_Keyboard.DOM_VK_NUMPAD0 = 96;
openfl_ui_Keyboard.DOM_VK_NUMPAD1 = 97;
openfl_ui_Keyboard.DOM_VK_NUMPAD2 = 98;
openfl_ui_Keyboard.DOM_VK_NUMPAD3 = 99;
openfl_ui_Keyboard.DOM_VK_NUMPAD4 = 100;
openfl_ui_Keyboard.DOM_VK_NUMPAD5 = 101;
openfl_ui_Keyboard.DOM_VK_NUMPAD6 = 102;
openfl_ui_Keyboard.DOM_VK_NUMPAD7 = 103;
openfl_ui_Keyboard.DOM_VK_NUMPAD8 = 104;
openfl_ui_Keyboard.DOM_VK_NUMPAD9 = 105;
openfl_ui_Keyboard.DOM_VK_MULTIPLY = 106;
openfl_ui_Keyboard.DOM_VK_ADD = 107;
openfl_ui_Keyboard.DOM_VK_SEPARATOR = 108;
openfl_ui_Keyboard.DOM_VK_SUBTRACT = 109;
openfl_ui_Keyboard.DOM_VK_DECIMAL = 110;
openfl_ui_Keyboard.DOM_VK_DIVIDE = 111;
openfl_ui_Keyboard.DOM_VK_F1 = 112;
openfl_ui_Keyboard.DOM_VK_F2 = 113;
openfl_ui_Keyboard.DOM_VK_F3 = 114;
openfl_ui_Keyboard.DOM_VK_F4 = 115;
openfl_ui_Keyboard.DOM_VK_F5 = 116;
openfl_ui_Keyboard.DOM_VK_F6 = 117;
openfl_ui_Keyboard.DOM_VK_F7 = 118;
openfl_ui_Keyboard.DOM_VK_F8 = 119;
openfl_ui_Keyboard.DOM_VK_F9 = 120;
openfl_ui_Keyboard.DOM_VK_F10 = 121;
openfl_ui_Keyboard.DOM_VK_F11 = 122;
openfl_ui_Keyboard.DOM_VK_F12 = 123;
openfl_ui_Keyboard.DOM_VK_F13 = 124;
openfl_ui_Keyboard.DOM_VK_F14 = 125;
openfl_ui_Keyboard.DOM_VK_F15 = 126;
openfl_ui_Keyboard.DOM_VK_F16 = 127;
openfl_ui_Keyboard.DOM_VK_F17 = 128;
openfl_ui_Keyboard.DOM_VK_F18 = 129;
openfl_ui_Keyboard.DOM_VK_F19 = 130;
openfl_ui_Keyboard.DOM_VK_F20 = 131;
openfl_ui_Keyboard.DOM_VK_F21 = 132;
openfl_ui_Keyboard.DOM_VK_F22 = 133;
openfl_ui_Keyboard.DOM_VK_F23 = 134;
openfl_ui_Keyboard.DOM_VK_F24 = 135;
openfl_ui_Keyboard.DOM_VK_NUM_LOCK = 144;
openfl_ui_Keyboard.DOM_VK_SCROLL_LOCK = 145;
openfl_ui_Keyboard.DOM_VK_COMMA = 188;
openfl_ui_Keyboard.DOM_VK_PERIOD = 190;
openfl_ui_Keyboard.DOM_VK_SLASH = 191;
openfl_ui_Keyboard.DOM_VK_BACK_QUOTE = 192;
openfl_ui_Keyboard.DOM_VK_OPEN_BRACKET = 219;
openfl_ui_Keyboard.DOM_VK_BACK_SLASH = 220;
openfl_ui_Keyboard.DOM_VK_CLOSE_BRACKET = 221;
openfl_ui_Keyboard.DOM_VK_QUOTE = 222;
openfl_ui_Keyboard.DOM_VK_META = 224;
openfl_ui_Keyboard.DOM_VK_KANA = 21;
openfl_ui_Keyboard.DOM_VK_HANGUL = 21;
openfl_ui_Keyboard.DOM_VK_JUNJA = 23;
openfl_ui_Keyboard.DOM_VK_FINAL = 24;
openfl_ui_Keyboard.DOM_VK_HANJA = 25;
openfl_ui_Keyboard.DOM_VK_KANJI = 25;
openfl_ui_Keyboard.DOM_VK_CONVERT = 28;
openfl_ui_Keyboard.DOM_VK_NONCONVERT = 29;
openfl_ui_Keyboard.DOM_VK_ACEPT = 30;
openfl_ui_Keyboard.DOM_VK_MODECHANGE = 31;
openfl_ui_Keyboard.DOM_VK_SELECT = 41;
openfl_ui_Keyboard.DOM_VK_PRINT = 42;
openfl_ui_Keyboard.DOM_VK_EXECUTE = 43;
openfl_ui_Keyboard.DOM_VK_SLEEP = 95;
ApplicationMain.main();
})(typeof window != "undefined" ? window : exports);
