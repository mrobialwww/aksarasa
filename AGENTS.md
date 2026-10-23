<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Next.js Component Best Practices
Always keep `page.tsx` and `layout.tsx` files as Server Components. If a page requires client-side interactivity (like `useState`, `onClick`, or `use client`), extract the interactive UI into a separate Client Component inside the `/components` directory and import it into the page.
