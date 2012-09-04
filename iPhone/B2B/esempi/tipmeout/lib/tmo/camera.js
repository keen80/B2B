var Tmo = Tmo || {};

Tmo.Camera = {

    debug: function(r) {
        /*
        var message = "Tmo.Camera:";
        message += "Code=" + r.responseCode;
        message += ";Sent=" + r.bytesSent;
        message += ";Response=" + r.response;
        Ext.Msg.alert('Tmo.Camera.debug', message);
        */
    },

    updateBackgroundImage: function(picture_id, thumb_url) {
        var css = "background-image: url(" + thumb_url + ");";
        var picture = Ext.get(picture_id);
        if ( picture ) {
            picture.dom.style.cssText = css;
            var span = picture.down("span");
            if (span) {
                span.remove();
            }
        }
    },

    uploadFailed: function(error)
    {
        Ext.Msg.alert('ERROR ' + error.code, 'Upload failed');
    },

    uploadPicture: function(source, uploadUrl, uploadCompleted)
    {
        if (navigator.camera)
        {
            function onSuccess(imageURI)
            {
                Tmo.Camera.transferPicture(imageURI, uploadUrl, uploadCompleted)
            }

            function onFail(message)
            {
                Ext.Msg.alert('ERROR', message);
            }

            Tmo.Camera.getPicture(source, onSuccess, onFail);
        }
        else
        {
            var testfiles = [ "party.jpg", "food.jpg", "bar.jpg"]

            Server.request('POST', uploadUrl, {
                loadMask: true,
                params: {
                    testfile: testfiles[Math.floor(Math.random()*testfiles.length)]
                },
                success: function(result) {
                    uploadCompleted({ response: JSON.stringify(result) });
                },
                failure: function(result) {
                    console.log({ response: JSON.stringify(result) })
                }
            });
        }
    },
  
    getPicture: function(source, onSuccess)
    {
        if (navigator.camera) {
            
            function onFail(message)
            {
                Ext.Msg.alert('ERROR', message);
            }

            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 85,
                targetWidth: 800,
                targetHeight: 800,
                correctOrientation: true,
                encodingType: navigator.camera.EncodingType.JPEG,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: eval("navigator.camera.PictureSourceType." + source)
            });
            
        }
    },

    transferPicture: function(imageURI, uploadUrl, uploadCompleted)
    {
        if (navigator.camera) {
            Ext.defer(function(){
                Tmo.LoadMask.show("Uploading...");
            }, 500);

            var uploadCompletedWithLoadMaskHide = function(r) {
                Ext.defer(function(){
                    Tmo.LoadMask.hide();
                }, 500);
                uploadCompleted(r);
            }

            var options = new FileUploadOptions();
            options.fileName = Number(new Date()) + ".jpg"; //imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType = "image/jpeg";

            var params = new Object();
            params.auth_token = window.localStorage.auth_token;
            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI,Server.apiUrl(uploadUrl), uploadCompletedWithLoadMaskHide, Tmo.Camera.uploadFailed, options);
        }
    },

    uploadActionSheetFor: function(card, upload)
    {
        var items = [
            {
                text: I18n.t('components.image_upload.take_a_picture'),
                scope: card,
                handler : function(){
                    card.actions.hide();
                    upload('CAMERA');
                }
            },
            {
                text : I18n.t('components.image_upload.picture_from_library'),
                scope: card,
                hidden: Ext.is.Android || Ext.is.Blackberry,
                handler : function(){
                    card.actions.hide();
                    upload('PHOTOLIBRARY');
                }
            },
            {
                text : I18n.t('components.image_upload.picture_from_album'),
                scope: card,
                hidden: Ext.is.Blackberry,
                handler : function(){
                    card.actions.hide();
                    upload('SAVEDPHOTOALBUM');
                }
            },
                {
                text : I18n.t('action.cancel_link'),
                scope: card,
                handler : function(){
                    card.actions.hide();
                }
            }
        ];

        return new Ext.ActionSheet({
            items: items
        });
    }
  
};
