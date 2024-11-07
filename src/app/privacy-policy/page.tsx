import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy & Disclosures</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Registration & Broker Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            JIR Ventures Group Inc is registered as a SEC investment adviser
            under the Investment Advisers Act of 1940 and uses INTERACTIVE
            BROKERS LLC as broker/dealer for JIR Ventures Group Inc investment
            accounts. Interactive Brokers LLC is a registered Broker-Dealer,
            Futures Commission Merchant and Forex Dealer Member, regulated by
            the U.S. Securities and Exchange Commission (SEC), the Commodity
            Futures Trading Commission (CFTC) and the National Futures
            Association (NFA), and is a member of the Financial Industry
            Regulatory Authority (FINRA) and several other self-regulatory
            organizations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Interactive Brokers Disclaimer
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Interactive Brokers does not endorse or recommend any introducing
            brokers, third-party financial advisors or hedge funds, including
            JIR Ventures Group Inc. Interactive Brokers provides execution and
            clearing services to customers. None of the information contained
            herein constitutes a recommendation, offer, or solicitation of an
            offer by Interactive Brokers to buy, sell or hold any security,
            financial product or instrument or to engage in any specific
            investment strategy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">SIPC Protection</h2>
          <p className="text-gray-600 leading-relaxed">
            Customer securities accounts are protected by the Securities
            Investor Protection Corporation (SIPC) for a maximum coverage of
            $500,000 (with a cash sublimit of $250,000). For additional
            information regarding SIPC coverage, including a brochure, please
            contact SIPC at (202) 371‐8300 or visit{" "}
            <a
              href="http://www.sipc.org"
              className="text-blue-600 hover:underline"
            >
              www.sipc.org
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Risk Disclosure</h2>
          <p className="text-gray-600 leading-relaxed">
            Past performance is no guarantee of future results. Any historical
            returns, expected returns, or probability projections may not
            reflect actual future performance. All securities involve risk and
            may result in loss. Not a solicitation or offer, or recommendation,
            or advice to buy or sell securities or services.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4 font-semibold">
            Securities: Not FDIC Insured - No Bank Guarantee - May Lose Value
            <br />
            Cash: Not FDIC Insured - No Bank Guarantee
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Client Agreement</h2>
          <p className="text-gray-600 leading-relaxed">
            A person shall only become a client of JIR Ventures Group Inc when
            he or she has signed the advisory agreement and acknowledged
            receiving all disclosures from JIR Ventures Group Inc. By using this
            website, you understand the information being presented is provided
            for informational purposes only and agree to our Terms of Use and
            Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Information Accuracy</h2>
          <p className="text-gray-600 leading-relaxed">
            JIR Ventures Group Inc relies on information from various sources
            believed to be reliable, including clients and third parties, but
            cannot guarantee the accuracy and completeness of that information.
            Nothing in this communication should be construed as an offer,
            recommendation, or solicitation to buy or sell any security.
            Additionally, JIR Ventures Group Inc or its affiliates do not
            provide tax advice and investors are encouraged to consult with
            their personal tax advisors.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
