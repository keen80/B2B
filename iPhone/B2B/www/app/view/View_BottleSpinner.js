Ext.define('B2B.view.View_BottleSpinner', {
	extend: 'Ext.Panel',
	xtype: 'viewbottlespinner',
	config: {
		title: i18n.app.PANEL_BOTTLESPINNER,
		iconCls: 'drink_beerbottle',
		styleHtmlContent: true,
       // cls: 'slidableToolbar',
       layout: {type:'fit', align:'stretch'},
       items: [
            {
                xtype: 'container',
                id: 'bottlegame',
              //  flex:1,
                html: [
                    '<div id="rules">',
                        i18n.app.TEXT_BOTTLEGAME,
                    '</div>',
                ].join("")
            }
       ]

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

        var startgamebutton = {
            xtype: 'button',
            ui: 'action',
            id: "startgamebutton",
            text: i18n.app.BTN_PLAY,
            height: 50,
            margin: 30,
            width: '80%',
            handler: this.startGame
        }

        this.add([viewbottlespinnertoolbar, startgamebutton]);
    },
    startGame: function(){
        var playground = Ext.getCmp('bottlegame');
        var startgamebutton = Ext.getCmp('startgamebutton');
        startgamebutton.destroy();

        playground.setHtml([
                    '<div id="playground" style="display: block; ">',
                        '<div id="shadow"> </div>',
                        '<div id="bottle" class="normal"> </div>',
                    '</div>',
                ].join(""));

        var bottle = document.getElementById("bottle"),
            shadow = document.getElementById("shadow");
            what = document.getElementById("bottlegame");
        var timer_rot = 0;
        var rot = 0.0;
        var step;
        var count;
        var tdelta = 20;
        var oldangle1 = 0;
        var oldangle2 = 0;
        var oldangle3 = 0;
        var centerx = 160;
        var centery = 150;
        var spintimer = 1;
        var currentWidth = 0;
        

        what.ontouchstart = function(e) {
            oldangle1 = 0; oldangle2 = 0; oldangle3 = 0;
        }

        what.ontouchmove = function(e) {
            e.preventDefault();
            if (timer_rot != 0) return;

            var touch = e.touches[0];
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
        what.ontouchend = function(e){
            if (timer_rot == 0) {
                var val = ((oldangle2 - oldangle1) + (oldangle3 - oldangle2)) / 2;
                val /= 3;
                if (val == 0.0){
                    val = Math.random()*0.3+0.2;
                }
                else if (Math.abs(val) < 0.3){
                    val *= 3;
                }
                count = 40;
                step = val;
                timer_rot = setTimeout(stepfunc, tdelta);
                bottle.className = "normal blurred";
            }
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
            if (Math.abs(step) < 0.003){
                bottle.className = "normal";
                timer_rot = 0;
            }
            else{
                setTimeout(stepfunc, tdelta);
            }
        }

        
        function updateLayout() {
          if (window.innerWidth != currentWidth) {
            currentWidth = window.innerWidth;
            window.scrollTo(0, 1);
            centerx = window.innerWidth/2;
            centery = window.innerHeight/2;
            var x = (centerx - 110);
            var y = (centery - 50);
            bottle.style.left = x + "px";
            bottle.style.top = y + "px";
            shadow.style.left = (x+8) + "px";
            shadow.style.top = (y+15) + "px";
          }
        };

        updateLayout()
        //setInterval(updateLayout, 500);
    }
});