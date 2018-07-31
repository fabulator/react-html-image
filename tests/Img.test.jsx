// @flow
import * as React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Img from '../src';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const someImage = 'http://some.image';
const someImage2 = 'http://some.image/2';

const srcSet = [
    { src: someImage },
    { src: someImage2, size: '500w' },
];

describe('Test Img component', () => {
    it('create img element with src attribute', () => {
        expect(mount(<Img src={someImage} />).find('img').prop('src')).toEqual(someImage);
    });

    it('create img element with srcset attribute', () => {
        const img = mount(<Img srcSet={srcSet} />).find('img');

        expect(img.prop('src')).toEqual(someImage);
        expect(img.prop('srcSet')).toEqual(`${someImage}, ${someImage2} 500w`);
    });

    it('do not render img element if src is not set', () => {
        expect(mount(<Img />).find('img')).toHaveLength(0);
    });

    describe('Test image states', () => {
        const theme = {
            states: {
                loading: 'loadingState',
                ready: 'readyState',
                error: 'errorState',
            },
        };

        let image;

        beforeEach(() => {
            image = mount(<Img
                src={someImage}
                theme={theme}
            />);
        });

        it('go to load state on image load', () => {
            expect(image.state().loaded).toBeNull();
            image.find('div').hasClass('loadingState');

            image.find('img').simulate('load');
            expect(image.state().loaded).toBeTruthy();
            image.find('div').hasClass('readyState');
        });

        it('go to error state on image load error', () => {
            expect(image.state().loaded).toBeNull();
            image.find('img').simulate('error');
            expect(image.state().loaded).toBeFalsy();
            image.find('div').hasClass('errorState');
        });

        it('change state when src is updated', () => {
            image.find('img').simulate('load');
            expect(image.state().loaded).toBeTruthy();

            image.setProps({
                src: someImage2,
            });
            expect(image.state().loaded).toBeNull();

            image.find('img').simulate('load');
            expect(image.state().loaded).toBeTruthy();

            image.setProps({
                srcSet,
            });
            expect(image.state().loaded).toBeNull();
        });

        it('do not change state when src is not updated', () => {
            image.find('img').simulate('load');
            expect(image.state().loaded).toBeTruthy();

            image.setProps({
                alt: 'desc',
            });
            expect(image.state().loaded).toBeTruthy();
        });
    });
});
