
import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import RootProvider from '../components/RootProvider';
import Navigation from '../components/layout/Navigation';
import { querySelectorRequire } from './lib/querySelectorRequire';

jest.mock('next/router', () => require('next-router-mock'))

describe(`Navigation`, () => {
  let toggle: HTMLButtonElement;
  let collapse: HTMLDivElement;
  beforeEach(() => {
    render(
      <RootProvider>
        <Navigation />
      </RootProvider>
    );
    toggle = querySelectorRequire('button.navbar-toggler');
    collapse = querySelectorRequire('div.navbar-collapse');
  });

  test(`openning and closing`, async () => {
    expect(collapse).not.toHaveClass('show');
    userEvent.click(toggle);
    expect(collapse).toHaveClass('show');

  });
});