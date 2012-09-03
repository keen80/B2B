Ext.define('B2B.view.View_BottleSpinner', {
	extend: 'Ext.Panel',
	xtype: 'viewbottlespinner',
	config: {
		title: i18n.app.PANEL_BOTTLESPINNER,
		iconCls: 'drink_beerbottle',
		styleHtmlContent: true,
       // cls: 'slidableToolbar',

		html: [
			'<div id="game" style="display: block; ">',
                '<p id="old"></p>',
                '<div id="shadow"> </div>',
                '<div id="bottle" class="normal"> </div>',
                '<div id="spintext" class="spinin"></div>',
            '</div>',
		].join("")
	},
	initialize: function(){
        
        var me = this;

        this.callParent(arguments);

        var viewbottlespinnertoolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_BOTTLESPINNER,
            cls: "sub_titlebar, slidableToolbar",
            docked: 'top',
            id: 'BottleSpinnerTitlebar',
            defaults: {
                iconMask: true
            }
        };

        this.add([viewbottlespinnertoolbar]);

        /* SPIN BOTTLE */

        var bottle,
            shadow,
            spintext;
        var timer_rot = 0; // timeout for bottle rotation
        var rot = 0.0;   // current rotation angle, rad
        var step;        // delta for rotation
        var count;       // how many times repeat before change of step
        var tdelta = 20; // timer interval
        var oldangle1 = 0;
        var oldangle2 = 0;
        var oldangle3 = 0;
        var centerx = 160;
        var centery = 150;

        function main() {
            bottle = Ext.get("bottle");
            shadow = Ext.get("shadow");
            spintext = Ext.get("spintext");

            startspin(1000);
            setTimeout(startTouch, 3000);
            setInterval(updateLayout, 500);
        }

        function startTouch() {

            me.ontouchstart = function(e) {
                oldangle1 = 0; oldangle2 = 0; oldangle3 = 0;
                cancelspin();
            }

            me.ontouchmove = function(e) {

                e.preventDefault();

                if (timer_rot != 0)
                    return;

                var touch = e.touches[0]; // finger 1
                var dx = centerx - touch.pageX;
                var dy = centery - touch.pageY;
                var angle = Math.atan2(dy, dx);

                oldangle3 = angle;
                oldangle1 = oldangle2;
                oldangle2 = oldangle3;

                var val = "rotateZ(" + angle + "rad)";
                bottle.style.webkitTransform = val;
                shadow.style.webkitTransform = val;
                rot = angle;
            }
            me.ontouchend = function(e){
                if (timer_rot == 0) {
                    var val = ((oldangle2 - oldangle1) + (oldangle3 - oldangle2)) / 2;
                    val /= 3;
                    if (val == 0.0)
                        val = rand(0.3)+0.2;
                    else if (Math.abs(val) < 0.3)
                        val *= 3;
                    startanim(val);
                }
            }
        }

        function stopTouch() {
            me.ontouchstart = null;
            me.ontouchmove = null;
            me.ontouchend = null;
        }

        function elm(id) {
            return document.getElementById(id);
        }
        function hide(e) {
            elm(e).style.display = 'none';
        }
        function show(e) {
            elm(e).style.display = 'block';
        }

        function startanim(startstep) {
            count = 40;
            step = startstep;
            timer_rot = setTimeout(stepfunc, tdelta);

            bottle.className = "normal blurred";
        }
        function stepfunc() {
            rot += step;
            var val = "rotateZ(" + rot + "rad)";
            bottle.style.webkitTransform = val;
            shadow.style.webkitTransform = val;
            count--;
            if (count < 0) {
                count = 10;
                step = step - step/4;
            }
            if (Math.abs(step) < 0.003)
                stopanim();
            else
                setTimeout(stepfunc, tdelta);
        }

        function stopanim() {
            bottle.className = "normal";
            timer_rot = 0;
        }
        function rand(maxnum) {
            return Math.random()*maxnum;
        }

        var spintimer = 1;
        function startspin(t) {
            spintext.style.display = 'none';
            spintimer = setTimeout(function() {
                show("spintext");
                spintext.className = "spinin";
                spintimer = 0;
            }, t);
        }
        function cancelspin() {
            spintext.style.display = 'none';
            if (spintimer != 0)
                clearTimeout(spintimer);
        }
        function spinout() {
            spintext.className = "spinout";
        }

        // detect orientation change, called periodically
        var currentWidth = 0;
        function updateLayout() {
          if (window.innerWidth != currentWidth) {
            currentWidth = window.innerWidth;
            window.scrollTo(0, 1);
            centerbottle();
          }
        };

        function centerbottle() {
            centerx = window.innerWidth/2;
            centery = window.innerHeight/2;
            var x = (centerx - 150);
            var y = (centery - 50);
            bottle.style.left = x + "px";
            bottle.style.top = y + "px";
            shadow.style.left = (x+8) + "px";
            shadow.style.top = (y+15) + "px";
        }
    }
});