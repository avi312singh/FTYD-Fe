import React from 'react';
import renderer from 'react-test-renderer';
import Svg from './svg';

describe('SupportServices component', () => {
    it('renders properly', () => {
        const icon = {
            source: '/assets/svg/emotional-support.svg',
            symbol: 'circle',
        };
        const tree = renderer.create(<Svg {...icon} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
