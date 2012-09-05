//
//  MainViewController.h
//  B2B
//
//  Created by Stefano Maggiore on 17/08/12.
//  Copyright Imolinfo 2012. All rights reserved.
//

#import <Cordova/CDVViewController.h>

#import "SocialManager.h"

@class WebViewBridge;

@interface MainViewController : CDVViewController <SocialManagerDelegate>
{
@private
	WebViewBridge *bridge;
}

@end
