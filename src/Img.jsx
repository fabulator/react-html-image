// @flow
import * as React from 'react';

type Props = {
    src: ?string,
    alt: string,
    onLoad: (event: Event) => void,
    onError: (exception: Event) => void,
    width: ?number,
    height: ?number,
    srcSet: Array<{ src: string, size?: string }>,
    sizes: Array<string>,
    theme: {
        image?: string,
        wrap?: string,
        states?: {
            loading?: string,
            ready?: string,
            error?: string,
        },
    },
    loader: React.Node,
    error: React.Node,
}

type State = {
    loaded: ?boolean,
}

export default class Img extends React.PureComponent<Props, State> {
    static defaultProps = {
        alt: '',
        className: '',
        onLoad: () => {},
        onError: () => {},
        srcSet: [],
        sizes: [],
        theme: {},
        error: undefined,
        loader: undefined,
        width: undefined,
        height: undefined,
        src: undefined,
    };

    state = {
        loaded: null,
    };

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.src !== this.props.src || JSON.stringify(nextProps.srcSet) !== JSON.stringify(this.props.srcSet)) {
            this.setState({
                loaded: null,
            });
        }
    }

    /**
     * On image load.
     *
     * @param loadEvent - HTML event
     */
    onLoad: (loadEvent: Event) => void = (loadEvent: Event) => {
        this.setState({
            loaded: true,
        });
        this.props.onLoad(loadEvent);
    };

    /**
     * On image load error.
     *
     * @param exception - HTML event
     */
    onError: (exception: Event) => void = (exception: Event) => {
        this.setState({
            loaded: false,
        });
        this.props.onError(exception);
    };

    /**
     * Get css class of current state of image.
     *
     * @returns css class
     */
    getStateTheme(): ?string {
        const { loaded } = this.state;
        const { states } = this.props.theme;

        if (!states) {
            return undefined;
        }

        const { error, ready, loading } = states;

        if (loaded === null) {
            return loading;
        }

        if (loaded === true) {
            return ready;
        }

        return error;
    }

    /**
     * Get src of image from props or get it from srcSet
     *
     * @returns url of image
     */
    getSrc(): ?string {
        const { src, srcSet } = this.props;

        if (src) {
            return src;
        }

        if (srcSet.length === 0) {
            return null;
        }

        return srcSet[0].src;
    }

    /**
     * Get img element.
     *
     * @returns img element
     */
    getImage(): React.Node {
        const src = this.getSrc();

        if (!src) {
            return undefined;
        }

        const {
            alt,
            width,
            height,
            srcSet,
            sizes,
            theme,
        } = this.props;

        return (<img
            src={src}
            alt={alt}
            width={width}
            height={height}
            srcSet={srcSet.map(set => `${set.src}${set.size ? ` ${set.size}` : ''}`).join(',')}
            sizes={sizes.join(',')}
            onLoad={this.onLoad}
            onError={this.onError}
            className={theme.image}
        />);
    }

    render() {
        const { loaded } = this.state;
        const {
            theme,
            loader,
            error,
        } = this.props;

        return (
            <div
                className={[theme.wrap, this.getStateTheme() || ''].join(' ').trim()}
            >
                {this.getImage()}
                {loaded === null ? loader : undefined}
                {loaded === false ? error : undefined}
            </div>
        );
    }
}
