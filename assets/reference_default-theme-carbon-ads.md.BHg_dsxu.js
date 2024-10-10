import{_ as s,c as a,o as e,aT as i}from"./chunks/framework.Bzw2HXFU.js";const b=JSON.parse('{"title":"Carbon Ads","description":"","frontmatter":{},"headers":[],"relativePath":"reference/default-theme-carbon-ads.md","filePath":"en/reference/default-theme-carbon-ads.md","lastUpdated":1728558315000}'),n={name:"reference/default-theme-carbon-ads.md"},t=i(`<h1 id="carbon-ads" tabindex="-1">Carbon Ads <a class="header-anchor" href="#carbon-ads" aria-label="Permalink to &quot;Carbon Ads&quot;">​</a></h1><p>VitePress has built in native support for <a href="https://www.carbonads.net/" target="_blank" rel="noreferrer">Carbon Ads</a>. By defining the Carbon Ads credentials in config, VitePress will display ads on the page.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    carbonAds: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      code: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;your-carbon-code&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      placement: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;your-carbon-placement&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>These values are used to call carbon CDN script as shown below.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`//cdn.carbonads.com/carbon.js?serve=\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">code</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}&amp;placement=\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">placement</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span></span></code></pre></div><p>To learn more about Carbon Ads configuration, please visit <a href="https://www.carbonads.net/" target="_blank" rel="noreferrer">Carbon Ads website</a>.</p>`,6),l=[t];function p(r,h,d,o,c,k){return e(),a("div",null,l)}const g=s(n,[["render",p]]);export{b as __pageData,g as default};
