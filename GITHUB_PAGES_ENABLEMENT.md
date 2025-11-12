# How to Enable GitHub Pages for Your Repository

## Step-by-Step Instructions

Follow these exact steps to enable GitHub Pages for your repository:

### 1. Navigate to Repository Settings
1. Go to your repository: https://github.com/happies2012-cpu/guideitsol.com
2. Click on the **Settings** tab (gear icon) in the top navigation

### 2. Find the Pages Section
1. In the left sidebar, scroll down until you see **Pages** (under the "Code and automation" section)
2. Click on **Pages**

### 3. Configure GitHub Pages
1. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
   - This tells GitHub to use your workflow file for deployment

2. Click **Save** at the bottom of the Pages settings

### 4. Verify Configuration
After saving, you should see:
- A green confirmation message
- The source set to "GitHub Actions"
- A URL for your site (will be active after the next successful deployment)

## Important Notes

- Your repository must be **public** for GitHub Pages to work (which it already is)
- The workflow file at [.github/workflows/pages.yml](file:///Users/mac/Desktop/guideitsol.com/.github/workflows/pages.yml) is correctly configured
- No additional tokens or authentication are needed - the built-in GITHUB_TOKEN is sufficient
- The SSH authentication errors have been resolved

## After Enabling GitHub Pages

Once you've enabled GitHub Pages:

1. Trigger a new deployment:
   - Go to the **Actions** tab
   - Select **Deploy to GitHub Pages** workflow
   - Click **Run workflow** → **Run workflow**

2. Wait for the workflow to complete successfully

3. Visit your site at: https://happies2012-cpu.github.io/guideitsol.com/

## Troubleshooting

If you still encounter issues after enabling GitHub Pages:

1. **Double-check the source setting**: Ensure it's set to "GitHub Actions"
2. **Verify repository visibility**: Confirm the repository is public
3. **Check workflow permissions**: Ensure your workflow has the correct permissions
4. **Review workflow logs**: Look for specific error messages in the Actions tab

## Common Mistake

The most common cause of the "Failed to create deployment (status: 404)" error is simply that GitHub Pages hasn't been enabled in the repository settings. This is a separate step from configuring the workflow.

## Git Synchronization Issues

If you encounter issues pushing changes due to divergent branches:

1. Configure git to merge (instead of rebase):
   ```bash
   git config pull.rebase false
   ```

2. Pull remote changes:
   ```bash
   git pull origin main
   ```

3. If prompted for a merge commit message, save and exit the editor

4. Push your changes:
   ```bash
   git push origin main
   ```