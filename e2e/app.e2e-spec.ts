import { MoyaAppPage } from './app.po';

describe('moya-app App', () => {
  let page: MoyaAppPage;

  beforeEach(() => {
    page = new MoyaAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
