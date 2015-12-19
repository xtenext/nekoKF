Configuring Neko
================
Let's take a look at an example configuration script.

```javascript
voice = neko.filter.add('76 6f 69 63 65 5c', false, 'Voice Block');
neko.replace.add('守備兵', 'Soldier');
neko.config.lineWidth = 60;
neko.bind.saveButtonId = 'save';
neko.init();
```

This script is similar the the one in the included `index.html`. We'll look at each line.

Filtering
---------

```javascript
voice = neko.filter.add('76 6f 69 63 65 5c', false, 'Voice Block');
```

When The neko library parses a script, it tries to find strings of text. However, in Kyonyuu Fantasy, some of the included strings are just paths to an audio file to play along with a line of dialogue. We can filter these by calling `neko.filter.add` The function takes three arguments:

- `hex` - A string of hex numbers. These numbers are compared to the beginning of each string to determine if the filter matches. In our example, `76 6f 69 63 65 5c` is hex for "voice\\".
- `is` - A somewhat confusing argument that needs a better name. `false` means that any matching strings will not be included. `true` means that any strings that don't match will be discluded.
- `name` - A name for the filter. I don't think this is used anywhere for anything.

Replaceing
----------
```javascript
neko.replace.add('守備兵', 'Soldier');
```

The neko library is cabable of replacing lines when they match completely with a replacement. This is used mainly for names, so that you don't have to manually translate them. In our example above, any time the neko parses a line of text that is just '守備兵', it will replace it with 'Soldier'.

Word Wrap
---------

```javascript
neko.config.lineWidth = 60;
```

When you save your translation, neko automatically inserts line-break characters. By setting `neko.config.lineWidth`, you can change how many characters of text fit on a line. This may vary depending on your game. The default value is 55.

HTML Bindings
-------------
```javascript
neko.bind.saveButtonId = 'save';
```

`neko.bind` contains properties that reference the ID's of HTML elements on the page that it should bind to. See `index.html` and 'neko.config.js' for the other properties that can be set.


Initializing Neko
-----------------

```javascript
neko.init();
```

It's important to remember to run this function last! This will cause neko to add the appropriate event listeners to the HTML bindings. The app wont run unless this function is called.