App.formForEvent = function() {
return {
     initComponent: function() {
        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var fields, createButton;
        var imageURI;

        var currentTime = new Date();
        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton(); 

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: this.title,
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        fields = [
            {
                xtype: 'fieldset',
                defaults: {
                    useClearIcon: true,
                    autoCapitalize : true,
                    labelWidth: '40%'
                },
                items: [
                    {
                        xtype: 'container',
                        tpl: new Ext.XTemplate(
                                '<div class="overview">',
                                '  <div class="overview_head">',
                                '    <tpl if="thumb_url">',
                                '      <div id="event_picture" class="avatar" style="background-image: url({thumb_url})"></div>',
                                '    </tpl>',
                                '    <tpl if="!thumb_url">',
                                '      <div id="event_picture" class="avatar"><span>'+I18n.t('action.add_photo_link')+'</span></div>',
                                '    </tpl>',
                                '  </div>',
                                '</div>'
                                ),
                        data: {
                            thumb_url: this.event.get("thumb_url")
                        },
                        listeners: {

                            tap: {
                                element: 'el',
                                fn: this.onUploadAction,
                                scope: this,
                                delegate: '.avatar'
                            }
                        }
                    },
                    {
                        name: 'name',
                        xtype: 'textfield',
                        required: true
                    },
                    {
                        xtype: 'App.views.ErrorField',
                        fieldname: 'name'
                    },
                    {
                        name: 'place_name',
                        xtype: 'textfield',
                        disabled: true
                    },
                    {
                        name: 'place_id',
                        xtype: 'hiddenfield'
                    },
                    {
                        xtype: 'tmo_selectfield',
                        name: 'notify_level',
                        id: 'notify_level',
                        options: this.event.availableNotifyLevels(),
                        hidden: this.event.getId() > 0
                    },
                    {
                        name : 'category_id',
                        id : 'category_id',                        
                        xtype: 'tmo_selectfield',
                        placeHolder: 'No answer...',
                        required: true,
                        options: _.sortBy(_.map(App.stores.event_categories.data.items, function(item) {
                            return {text: item.data.name,  value: item.data.id}}), function(data){return data.text})
                    },
                    {
                        xtype: 'App.views.ErrorField',
                        fieldname: 'category_id'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'description'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {
                    xtype: 'textfield',
                    useClearIcon: true,
                    autoCapitalize : false,
                    labelWidth: '40%'
                },
                items: [
                    App.formHint('open_invitations_desc'),
                    {
                        xtype: 'togglefield',
                        name: 'open_invitations',
                        id: 'open_invitations',
                        listeners: {
                            change: App.formHintChange('open_invitations_desc', 'event.actions.new.open_invitations_desc')
                        }
                    },
                    App.formHint('has_limit_desc'),
                    {
                        xtype: 'togglefield',
                        name: 'has_limit',
                        id: 'has_limit',
                        listeners: {
                            change: App.formHintChange('has_limit_desc', 'event.actions.new.availabilities_desc', 'attendance_limit') 
                        }
                    },
                    {
                        name: 'attendance_limit',
                        id: 'attendance_limit',
                        hidden: true,
                        xtype: 'numberpickerfield',
                        numberFrom: 1,
                        numberTo: 100,
                        value: 1
                    },
                    {
                        xtype: 'App.views.ErrorField',
                        fieldname: 'attendance_limit'
                    },
                    App.formHint('paid_event_desc'),
                    {
                        xtype: 'togglefield',
                        name: 'paid_event',
                        id: 'paid_event',
                        listeners: {
                            change: App.formHintChange('paid_event_desc', 'event.actions.new.paid_event_desc', 'cost')
                        }
                    },
                    {
                        name: 'cost',
                        id: 'cost',
                        hidden: true
                    }
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {
                    xtype: 'textfield',
                    useClearIcon: true,
                    autoCapitalize : false,
                    labelWidth: '40%'
                },
                items: [
                    {
                        name : 'start_date',
                        id : 'start_date',
                        xtype: 'datepickerfield',
                        required: true,
                        listeners: {
                            change: function(datepicker, date) {
                                Ext.getCmp("end_date").setValue(date)
                            }
                        },
                        picker: {yearFrom: currentTime.getFullYear(), yearTo  : currentTime.getFullYear() + 5}
                    },
                    {
                        xtype: 'App.views.ErrorField',
                        fieldname: 'start_date'
                    },
                    {
                        name : 'start_time',
                        id : 'start_time',
                        xtype: 'timepickerfield',
                        minuteScale: 5,
                        required: true,
                        listeners: {
                            change: function(timepicker, time) {
                                var obj = Ext.getCmp("end_time");
                                obj.setValue({hour: (timepicker.value.hour + 1) % 24, minute: timepicker.value.minute});
                            }
                        }
                    },
                    {
                        xtype: 'App.views.ErrorField',
                        fieldname: 'start_time'
                    },
                    {
                        xtype: 'togglefield',
                        name: 'has_end_date',
                        id: 'has_end_date',
                        listeners: {
                            change: function (slider, thumb, newValue, oldValue) {
                                var dateField = Ext.getCmp("end_date");
                                var timeField = Ext.getCmp("end_time");
                                var hasEndDate = Ext.getCmp("has_end_date");
                                if (newValue == 1) {
                                    dateField.show();
                                    timeField.show();
                                } else {
                                    dateField.hide();
                                    timeField.hide();
                                }
                            }
                        }
                    },
                    {
                        name : 'end_date',
                        id : 'end_date',
                        required: true,
                        xtype: 'datepickerfield',
                        picker: {yearFrom: currentTime.getFullYear(), yearTo  : currentTime.getFullYear() + 5}
                    },
                    {
                        xtype: 'App.views.ErrorField',
                        fieldname: 'end_date'
                    },
                    {
                        name : 'end_time',
                        id : 'end_time',
                        required: true,
                        xtype: 'timepickerfield',
                        minuteScale: 5
                    },
                    {
                        xtype: 'App.views.ErrorField',
                        fieldname: 'end_time'
                    }
                ]

            }
        ];

        if ((Ext.is.iOS || Ext.is.Desktop) && !this.event.getId()) {
            fields.push({
                xtype: 'fieldset',
                items: [
                    {
                        labelWidth: '80%',
                        name : 'synchronize_calendar',
                        id : 'synchronize_calendar',
                        value: 'true',
                        xtype: 'checkboxfield'
                    }
                ]
            });
        }

        Ext.each(fields, function(fieldset){ I18n.loadLabels(fieldset.items, 'Event'); });

        createButton = {
            xtype: 'button',
            text: this.confirm_button,
            ui: 'action',
            id: 'create_button',
            handler: this.onCreateAction,
            scope: this
        };

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: "event_form_card",
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [ fields, createButton ],
            listeners: {
                show: function() {
                    this.loadRecord(this.event);
                }
            }
        });

        if (this.action_name == "create")
            App.views.EventsNewForm.superclass.initComponent.call(this);
        else
            App.views.EventsEditForm.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onCreateAction: function() {
        Ext.dispatch({
            controller: 'Events',
            action: this.action_name,
            event: this.event,
            imageURI: this.imageURI,
            form: Ext.getCmp('event_form_card'),
            historyUrl: 'Events/index'
        });
    },

    onUploadAction: function() {
      var page = this;
      if (!this.actions) {
        var event = this.event;
        var upload = null;
        if (this.action_name == "create") {

            upload = function(source) {
              function onSuccess(imageURI) {
                page.imageURI = imageURI;
                Tmo.Camera.updateBackgroundImage("event_picture", imageURI);
              }
              Tmo.Camera.getPicture(source, onSuccess);
            };

        } else {

            upload = function(source) {
                Tmo.Camera.uploadPicture(source, "/events/" + event.getId() + "/picture", function(r) {
                    var response = JSON.parse(r.response);
                    event.data.thumb_url = response.url;
                    Tmo.Camera.updateBackgroundImage("event_picture", response.url);
                    Tmo.storeFilters.events.dirty = true;
                });
            }
            
        }
        this.actions = Tmo.Camera.uploadActionSheetFor(this, upload);
      }
      this.actions.show();
    }

}
};