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
