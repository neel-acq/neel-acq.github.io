"use client";

export function PrivacyPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 19, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, use our financial calculators, or contact us for support.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including our financial tools and educational content.
            </p>
          </section>

          <section>
            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@finflip.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}