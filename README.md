# React Image

[![npm version](https://badge.fury.io/js/react-html-image.svg)](https://badge.fury.io/js/react-html-image)
[![renovate-app](https://img.shields.io/badge/renovate-app-blue.svg)](https://renovateapp.com/)
[![Known Vulnerabilities](https://snyk.io/test/github/fabulator/react-html-image/badge.svg)](https://snyk.io/test/github/fabulator/react-html-image)
[![codecov](https://codecov.io/gh/fabulator/react-html-image/branch/master/graph/badge.svg)](https://codecov.io/gh/fabulator/react-html-image)
[![travis](https://travis-ci.org/fabulator/react-html-image.svg?branch=master)](https://travis-ci.org/fabulator/react-html-image)

React component that makes easier to work with image element. It handles loaded, error, loading states.

## How to use

Install package:

```nodedaemon
npm install react-html-image
```

### Set media

The most basic usage of component is just to set a src of image.

```javascript
import * as React from 'react';
import Img from 'react-html-image';

class App extends React.Component {
    render() {
        return (
            <Img
                src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='}
            />
        );
    }
}
```

You have also option to set list of responsive images:

```javascript
class App extends React.Component {
    render() {
        return (
            <Img
                srcSet={[
                    { src: 'link-to-default-image' },
                    { src: 'link-to-bigger-image', sizes: '1024w' },
                ]}
                sizes={'100vw'}
            />
        );
    }
}
```

### Handle states

Wrap element around img gets classes based on state:

```javascript
class App extends React.Component {
    render() {
        return (
            <Img
                src={'link-to-image'}
                theme={{
                    image: 'imageClass',
                    wrap: 'wrapClass',
                    states: {
                        loading: 'loadingStateClass',
                        ready: 'readyStateClass',
                        error: 'errorStateClass',
                    },
                }}
            />
        );
    }
}
```

You can also get info about load or error event via callback functions:

```javascript
class App extends React.Component {
    render() {
        return (
            <Img
                src={'link-to-image'}
                onError={(error) => {
                    console.log(error);
                }}
                onLoad={(event) => {
                    console.log(event);
                }}
            />
        );
    }
}
```

Add custom error or loading messages:

```javascript
class App extends React.Component {
    render() {
        return (
            <Img
                src={'link-to-image'}
                loader={('... image is loading ...')}
                error={('... image was not load ...')}
            />
        );
    }
}
```

## List of properties

- src: ?string - Link to media
- alt: string - Alt attribute
- onLoad: (event: Event) => void - Load event
- onError: (exception: Event) => void - Error event
- width: ?number - Width of image
- height: ?number - Height of image
- srcSet: Array<{ src: string, size?: string }> - List of responsive media
- sizes: Array<string> - Definition for responsive media
- theme: {
    image?: string,
    wrap?: string,
    states?: {
        loading?: string,
        ready?: string,
        error?: string,
    },
  } - Theme for image
- loader: React.Node - Loader state
- error: React.Node - Error state
