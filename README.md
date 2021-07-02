# My cat is using my laptop and the whole repo is written by him.

Only supported on Android

Unfinished useless project

To be done:
- [x] Fonts
- [ ] Icon with badge
- [ ] Multiple delete

bug:
- [x] react navigation screen shaking.

[Solution](https://www.reddit.com/r/reactnative/comments/euwno3/createbottomtabnavigator_header_flickering_issue/)
```javascript
navigationOptions: { safeAreaInsets: { top: 0 } }
```
- [x] Not working properly in landscape
```
<activity
    android:screenOrientation="portrait"
</activity>
```
- [x] Splash screen image is shown when keyboard opens.

No solution till now. Change bgcolor is the only way.
- [x] Tab bar moved when keyboard opens
```
<activity
    android:windowSoftInputMode="adjustResize|stateAlwaysHidden|adjustPan"
</activity>
```
- [ ] Toast notification not working properly
