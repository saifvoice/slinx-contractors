00:55:12.157 
   Creating an optimized production build ...
00:55:28.818 
<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (106kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
00:55:28.849 
<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (258kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
00:55:37.543 
 ✓ Compiled successfully in 22.7s
00:55:37.635 
   Linting and checking validity of types ...
00:55:43.931 
Failed to compile.
00:55:43.932 
00:55:43.932 
app/admin/blog/[id]/edit/page.tsx
00:55:43.932 
Type error: Type '{ params: { id: string; }; }' does not satisfy the constraint 'PageProps'.
00:55:43.932 
  Types of property 'params' are incompatible.
00:55:43.932 
    Type '{ id: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
00:55:43.932 
00:55:43.967 
Next.js build worker exited with code: 1 and signal: null
00:55:43.995 
Error: Command "next build" exited with 1
