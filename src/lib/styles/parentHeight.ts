export const parentHeight = () => `
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`