import { Bold, Weight } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <div className="prose max-w-none">
        <p>Last updated: April 27, 2023</p>

        <h2 className="text-1xl font-bold">1. Introduction</h2>
        <p>
           Welcome to InvestIQ ("Company", "we", "our", "us")! As you have clicked "I agree" to these Terms of Service,
           you have entered into a binding contract with InvestIQ. These Terms of Service, together with our Privacy
           Policy, govern your access to and use of the InvestIQ platform.
        </p>

        <h2 className="text-1xl font-bold">2. Acceptance of Terms</h2>
        <p>
          By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the
          terms, then you may not access the service.
        </p>

        <h2 className="text-1xl font-bold">3. Description of Service</h2>
        <p>
          InvestIQ is an AI-powered stock market platform for the Nepal Stock Exchange (NEPSE) that provides portfolio
          management, market analysis, AI-driven insights, and educational resources. The service may include features
          such as auto-trading, real-time alerts, and other investment tools.
        </p>

        <h2 className="text-1xl font-bold">4. User Accounts</h2>
        <p>
          When you create an account with us, you must provide accurate, complete, and current information. Failure to
          do so constitutes a breach of the Terms, which may result in immediate termination of your account.
        </p>
        <p>
          You are responsible for safeguarding the password that you use to access the service and for any activities or
          actions under your password. You agree not to disclose your password to any third party. You must notify us
          immediately upon becoming aware of any breach of security or unauthorized use of your account.
        </p>

        <h2 className="text-1xl font-bold">5. Financial Disclaimer</h2>
        <p>
          The information provided by InvestIQ is for informational and educational purposes only. It should not be
          considered financial advice. We do not guarantee the accuracy, completeness, or usefulness of any information
          on the platform.
        </p>
        <p>
          All investments involve risk, including the possible loss of principal. Past performance does not guarantee
          future results. The material on our platform does not take into account your personal investment objectives,
          financial situation, or needs and is not intended as a recommendation to you or any specific person.
        </p>
        <br />
        <h2 className="text-1xl font-bold">6. Auto-Trading Features</h2>
        <p>If you choose to use our auto-trading features, you acknowledge that:</p>
        <ul>
          <li>Trading involves risk and may not be suitable for all investors</li>
          <li>
            Our AI recommendations are based on algorithms and historical data, which may not predict future market
            behavior
          </li>
          <li>You are ultimately responsible for all trading decisions made through your account</li>
          <li>Technical issues may affect the execution of trades</li>
        </ul>

        <h2 className="text-1xl font-bold">7. Intellectual Property</h2>
        <p>
          The service and its original content, features, and functionality are and will remain the exclusive property
          of InvestIQ and its licensors. The service is protected by copyright, trademark, and other laws of Nepal and
          foreign countries.
        </p>

        <h2 className="text-1xl font-bold">8. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason
          whatsoever, including without limitation if you breach the Terms.
        </p>

        <h2 className="text-1xl font-bold">9. Limitation of Liability</h2>
        <p>
          In no event shall InvestIQ, nor its directors, employees, partners, agents, suppliers, or affiliates, be
          liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
          loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or
          inability to access or use the service.
        </p>

        <h2 className="text-1xl font-bold">10. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
          material we will try to provide at least 30 days' notice prior to any new terms taking effect.
        </p>

        <h2 className="text-1xl font-bold">11. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at legal@investiq.com.np.</p>
      </div>
    </div>
  )
}
