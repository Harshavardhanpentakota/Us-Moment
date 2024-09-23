import Navbar from "@/components/Navbar"

const PrivacyPolicy = () => {
  return (
    <div className="bg-dark-new">
        <div className="border-b-2">
        <Navbar/>
        </div>
        <div className="h-full w-full p-5 rounded-lg">
            <h1 className="scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl pb-5">Privacy Policy</h1>
            <div className="p-5 rounded-md bg-dark-light">
            <ul className="list-decimal py-5 px-10 md:px-20 text-2xl font-semibold">
                <li>
                     Introduction
                    <ul className="list-disc px-5 text-lg font-normal">
                    <li>Welcome to takeUforward. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and protect your data.</li>
                    </ul>    
                    </li>
                <li>
                    Information We Collect:
                    <ul  className="list-disc px-5 text-lg font-normal">
                    <li>When you register for an account, subscribe to our services, or contact us, we may collect personal information such as your name, email address, phone number, and payment details.</li>
                    </ul>
                </li>
                <li>
                How We Use Your Information:
                    <ul className="list-disc px-5 text-lg font-normal">
                    <li>We use your personal information to create and manage your account, provide customer support, and process transactions.</li>
                    <li>Usage data helps us understand how our services are being used and allows us to make improvements.</li>
                    <li>We may use your information to send newsletters, promotional materials, and other information that may be of interest to you. You can opt out of these communications at any time by following the unsubscribe link in the emails or by contacting us at hello@takeuforward.org.</li>
                    </ul>
                </li>
                <li>
                Data Security
                   <ul className="list-disc px-5 text-lg font-normal">
                   <li>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</li>
                   </ul>
                </li>
                <li>
                Your Rights
                    <ul className="list-disc px-5 text-lg font-normal">
                        <li>You have the right to access and update your personal information. You can do this through your account settings or by contacting us at hello@takeuforward.org.</li>
                     <li>You have the right to request the deletion of your personal information. We will comply with your request, subject to certain exceptions prescribed by law.</li>
                    </ul>
                </li>
                <li>
                Changes to This Privacy Policy
                    <ul className="list-disc px-5 text-lg font-normal">
                    <li>
                     We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                    </li>
                    </ul>
                </li>
                <li>
                Contact Us
                <ul className="list-disc px-5 text-lg font-normal">
                <li>
                If you have any questions or concerns about this Privacy Policy, please contact us at hello@takeuforward.org.
                </li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
    </div>
  )
}

export default PrivacyPolicy