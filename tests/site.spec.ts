import { expect, test } from '@playwright/test';

test.describe('Contractor Site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(
      'Pedro Henrique Rocha Moy - Data Scientist and Machine Learning Developer'
    );
  });

  test('navigation bar is visible', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(nav.getByText('Home')).toBeVisible();
    await expect(nav.getByText('Resume')).toBeVisible();
    await expect(nav.getByText('Interests')).toBeVisible();
    await expect(nav.getByText('Contact')).toBeVisible();
  });

  test('hero section displays profile info', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(
      hero.getByRole('heading', { name: 'Pedro Henrique Rocha Moy' })
    ).toBeVisible();
    await expect(
      hero.getByText('Data Scientist and Machine Learning Developer')
    ).toBeVisible();
    await expect(page.getByAltText('Pedro Henrique Rocha Moy')).toBeVisible();
  });

  test('hero section has social links', async ({ page }) => {
    const github = page.getByRole('link', { name: /github/i });
    await expect(github).toBeVisible();
    await expect(github).toHaveAttribute('href', 'https://github.com/phrmoy');

    const linkedin = page.getByRole('link', { name: /linkedin/i });
    await expect(linkedin).toBeVisible();
    await expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/phrmoy/'
    );
  });

  test('resume section has experience entries', async ({ page }) => {
    const resume = page.locator('#resume');
    await expect(resume).toBeVisible();
    await expect(resume.getByText('Chief Architect')).toBeVisible();
    await expect(resume.getByText('AI Consultant')).toBeVisible();
    await expect(resume.getByText('AI Software Developer')).toBeVisible();
  });

  test('resume section has education entries', async ({ page }) => {
    const resume = page.locator('#resume');
    await expect(
      resume.getByText('Executive MBA in Business Administration')
    ).toBeVisible();
    await expect(
      resume.getByText('Georgia Institute of Technology')
    ).toBeVisible();
  });

  test('resume section has portfolio entry', async ({ page }) => {
    const resume = page.locator('#resume');
    const portfolioLink = resume.getByRole('link', {
      name: 'Pastoral Conscience AI',
    });
    await expect(portfolioLink).toBeVisible();
    await expect(portfolioLink).toHaveAttribute('target', '_blank');
  });

  test('interests section displays tags', async ({ page }) => {
    const interests = page.locator('#interests');
    await expect(interests).toBeVisible();
    await expect(interests.getByText('Machine Learning & AI')).toBeVisible();
    await expect(interests.getByText('Data Engineering')).toBeVisible();
    await expect(interests.getByText('Quantitative Finance')).toBeVisible();
  });

  test('contact section has form fields', async ({ page }) => {
    const contact = page.locator('#contact');
    await expect(contact).toBeVisible();
    await expect(contact.getByLabel(/name/i)).toBeVisible();
    await expect(contact.getByLabel(/email/i)).toBeVisible();
    await expect(contact.getByLabel(/message/i)).toBeVisible();
    await expect(
      contact.getByRole('button', { name: /send message/i })
    ).toBeVisible();
  });

  test('footer has PDF download link', async ({ page }) => {
    const downloadLink = page.getByRole('link', {
      name: /download resume/i,
    });
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute('href', '/resume.pdf');
    await expect(downloadLink).toHaveAttribute('download', '');
  });

  test('nav links scroll to sections', async ({ page }) => {
    await page.getByRole('link', { name: 'Resume', exact: true }).click();
    await expect(page.locator('#resume')).toBeInViewport();
  });
});
