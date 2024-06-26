import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";

const BottomDrawer = () => {

    const bottomSheetRef = useRef(null);

    return (
        <RBSheet
            ref={bottomSheetRef}
            height={300}
            openDuration={250}
            customStyles={{
                container: {
                    backgroundColor:'red'
                }
            }}
        >
            <YourOwnComponent />
        </RBSheet>
    )
}

export default BottomDrawer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})