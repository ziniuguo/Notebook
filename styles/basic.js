import React from 'react';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            paddingTop: 70,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        title: {
            paddingVertical: 8,
            borderWidth: 2,
            borderColor: "#20232a",
            borderRadius: 6,
            backgroundColor: "#61dafb",
            color: "#20232a",
            textAlign: "center",
            fontSize: 25,
            fontWeight: "normal"
        },
        button: {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#d0d0d0",
            padding: 10
        },
    }
);
