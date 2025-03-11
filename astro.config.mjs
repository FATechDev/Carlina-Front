// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from '@astrojs/cloudflare';
import tailwind from "@astrojs/tailwind";
import vue from '@astrojs/vue';

import alpinejs from "@astrojs/alpinejs";

import mdx from "@astrojs/mdx";

import playformInline from "@playform/inline";

// https://astro.build/config
export default defineConfig({
	site: "https://astropie.netlify.app",
	base: "/",
	// trailingSlash: 'always',
	integrations: [
		tailwind(),
		alpinejs(),
		mdx(),
		vue(),
		(await import("@playform/inline")).default({
			Critters: true,
		}),
	],
	devToolbar: {
		enabled: false,
	},
	experimental: {
		svg: true,
	},
	output: 'static',
	adapter: cloudflare({
		routes: {
		  extend: {
			include: [{ pattern: '/*' }]
		  }
		}
	  })
});
