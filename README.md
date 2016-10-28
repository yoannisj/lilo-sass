# Lilo-sass

Lilo is a small Sass framework to help sharing styles between classes and components. It pushes  Sam Richard's [DRY mixin technique](http://alistapart.com/article/dry-ing-out-your-sass-mixins) further by also allowing to share dynamic styles.

Lilo is the diminituve of the german name Liselotte, and means *'the generous one'*. This name was chosen, as the whole idea behind Lilo is to facilitate the sharing of common css rulesets.

## Sharing styles carefully

Use this very carefully since it relies on the `@extend` directive which, despite its benefits, also comes with downsides]. More info:

+ [Why you should avoid Sass extend](http://www.sitepoint.com/avoid-sass-extend/) — if you decide to use Lilo, you obvisouly won't approve. But one should be aware of these points.
+ [What Nobody Told You About Sass’s @extend](http://www.sitepoint.com/sass-extend-nobody-told-you/)
+ [When to use @extend; when to use a mixin](http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)

## Dependencies

Lilo uses some functions provided by the sass helpers bundle [Aleksi](https://github.com/yoannisj/aleksi).

## Usage

### Basic usage example of the `lilo` mixin to share styles

SCSS stylesheet
    
    @import "lilo";

    @mixin color-scheme( $text, $background ) {
        color: $text;
        background-color: $background;
    }

    .foo {
        @include lilo('color-scheme', white, black) {
            @include color-scheme(white, black);
        }
        font-style: italic;
    }

    .bar {
        @include lilo('color-scheme', white, black) {
            @include color-scheme(white, black);
        }
    }

    .baz {
        @include lilo('color-scheme', red, black) {
            @include color-scheme(red, black);
        }
    }

CSS output

    .foo, .bar {
        color: white;
        background: black;
    }

    .foo {
        font-style: italic;
    }

    .baz {
        color: red;
        background: black;
    }

Note that you have to include the shared styles manually every-time you want to share them. This is quite annoying and very error-prone. Therefore it is recommended that you manually include a single mixin in `lilo()`'s content block and pass the name of that mixin as first argument. This will also make the transition to future releases of Lilo easier.

This way, when sass will allow to [dynamically include mixins](https://github.com/sass/sass/issues/626), future releases of Lilo will be able to include shared styles automatically for you.

In the waiting for this feature, the best and recommended approach is to wrap your mixins inside a *sharing wrapper mixin* as illustrated in the next example.

### Using a wrapper mixins to output shared styles

SCSS stylesheet

    @import "lilo";

    @mixin color-scheme( $text, $background ) {
        color: $text;
        background-color: $background;
    }

    @mixin -color-scheme( $text, $background ) {
        @include lilo('color-scheme', $text, $background) {
            @include color-scheme($text, $background);
        }
    }

    .foo {
        @include -color-scheme(white, black);
        font-style: italic;
    }

    .bar {
        @include -color-scheme(white, black);
    }

    .baz {
        @include -color-scheme(red, black);
    }

CSS output

    .foo, .bar {
        color: white
        background: black;
    }

    .foo {
        font-style: italic;
    }

    .baz {
        color: red;
        background: black;
    }

Note that this technique also makes it easy for you to fix issues where you end up repeating the same selector multiple times, when included styles eventually don't get shared with any other selector.

SCSS stylesheet

    .baz {
        @include -color-scheme(red, black);
        font-weight: bold;
    }

CSS output

    .baz {
        color: red;
        background: black;
    }

    .baz {
        font-weight: bold;
    }

SCSS stylesheet

To fix this, simply remove the `-` in front of your included mixin's name.

    .baz {
        @include color-scheme(red, black);
        font-weight: bold;
    }

CSS output

    .baz {
        color: red;
        background: black;
        font-weight: bold;
    }

## Known Issues

+ Sometimes you don't know whether your styles are going to be shared by other components in your project or not. Therefore you might decide to share all styles that are subject to sharing, and end up with unnecessarily duplicated selectors.

    This can be fixed using css minification tools that [merge adjacent rulesets](http://cssnano.co/optimisations/mergeRules) by selectors, such as [cssnano](http://cssnano.co) does.

+ The first time styles are shared, they will be output **after** the other styles in the same ruleset, no matter if these other styles are written *before* or *after* the `lilo` mixin. This means that you can not override a shared css-rule by writing it in the same ruleset.

    To fix this, write the selector twice: once with the shared styles only, and a second time with all other styles. After sass compiled, you could [re-merge](http://cssnano.co/optimisations/mergeRules) these adjacent rulesets with css minification.

+ Using Lilo allows cross-media extends. These are very useful and will probably ship soon with future sass releases. But they are also spooky because they can break the cascade. Indeed, you are never really sure where the styles will be output.  
    
    As long as it is OK for you to have all media-queries at the end of your file, this can be fixed with tools like [sass-media-query-combiner](https://github.com/aaronjensen/sass-media_query_combiner) or [re-work](https://github.com/reworkcss/rework) and [rework-move-media](https://github.com/reworkcss/rework-move-media).
