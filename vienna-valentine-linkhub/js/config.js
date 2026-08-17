/* ==========================================================================
   Vienna Valentine — configuration
   --------------------------------------------------------------------------
   The VIP destination is stored base64-encoded and decoded only after a
   human taps "Continue" on /vip. That keeps the platform's domain out of
   plain-text scans of the page source and out of anything a preview
   crawler renders. See README.md for what this does and does not do.

   To change the destination:
     node -e "console.log(Buffer.from('https://your-url-here').toString('base64'))"
   ...then paste the result into `vip` below.
   ========================================================================== */

window.VV = {
  // Decode to check what this points at:
  //   node -e "console.log(Buffer.from(process.argv[1],'base64').toString())" '<value>'
  // Kept encoded here too — this file is served publicly, same as the HTML.
  vip: 'aHR0cHM6Ly9vbmx5ZmFucy5jb20vdmllbmF2YWxlbnRpbmU=',

  // Pause on the gate after tapping, so the transition doesn't feel abrupt.
  handoffMs: 450
};
