import { BkCcPage } from './app.po';

describe('bk-cc App', function() {
  let page: BkCcPage;

  beforeEach(() => {
    page = new BkCcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
