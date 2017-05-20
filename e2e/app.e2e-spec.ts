import { VoyageAppAngularPage } from './app.po';

describe('voyage-app-angular App', () => {
  let page: VoyageAppAngularPage;

  beforeEach(() => {
    page = new VoyageAppAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
