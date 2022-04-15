import React from 'react';
import { Share, View, Button } from 'react-native';


const ShareBtn = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                'Hey there! Checkout my progress using the AshTomatoSauce App, known as "the best manga reader ever". I am reading the manga called "" and I am at the chapter number #, episode #. It is awesome!'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }


    };
    return (
        <View style={{ marginTop: 25 }}>
        <Button    
        onPress={onShare} 
        title="Share your progress (Socials)"
        color="crimson"
        />
        </View>
        );
    };
    
    export default ShareBtn;