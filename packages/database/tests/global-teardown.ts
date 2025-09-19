export default async function globalTeardown() {
  console.log('🧹 Cleaning up global database test environment...');

  // Allow time for any remaining connections to close
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1000);
  });

  console.log('✅ Global database teardown completed');
}
