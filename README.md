# my cat is using my laptop doing sh*t
Unfinished useless project

To be done:
- [ ] Beautiful Fonts
- [ ] Icon with badge

bug:
- [x] react navigation screen shaking.

[Solution](https://www.reddit.com/r/reactnative/comments/euwno3/createbottomtabnavigator_header_flickering_issue/)
```javascript
navigationOptions: { safeAreaInsets: { top: 0 } }
```
- [x] Not working properly in landscape

[Solution](https://stackoverflow.com/questions/34078354/how-to-disable-landscape-mode-in-react-native-android-dev-mode)
```
<activity
    android:name=".Activity"
    android:label="Activity"
    android:screenOrientation="portrait"
    android:configChanges="keyboardHidden|orientation|screenSize">
</activity>
```
- [x] Splash screen image is shown when keyboard opens.
- [ ] Tab bar moved when keyboard opens
- [ ] Toast notification not working properly
