import Script from 'next/script';

const TAWK_EMBED = 'https://embed.tawk.to/6a035ca0ebaec41c377f585e/1joei3l3t';

/**
 * Tawk.to live chat widget. Loaded lazyOnload — does not affect LCP.
 * Property: cleanroom.uz. Brand color #00608A. Russian widget.
 */
export function TawkChat() {
  if (!TAWK_EMBED) return null;
  return (
    <Script
      id="tawk-to"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
Tawk_API.customStyle={
  visibility:{
    desktop:{position:'br',xOffset:20,yOffset:20},
    mobile:{position:'br',xOffset:10,yOffset:70}
  }
};
(function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='${TAWK_EMBED}';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
})();`,
      }}
    />
  );
}
