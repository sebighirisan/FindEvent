 import { SafeAreaView, ScrollView, Text } from 'react-native';
import styles from './styles/UITheme';

export default function Settings() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#101820' }}>
      <ScrollView contentContainerStyle={styles.container2}>
      <Text style={styles.heading}>FindEvent – Terms and Policies</Text>
      <Text style={styles.subheading}>Last updated: June 1, 2025</Text>

      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.paragraph}>
        By accessing or using the FindEvent app, you agree to be bound by these Terms.
        If you do not agree, please do not use the application.
      </Text>

      <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
      <Text style={styles.paragraph}>
        You agree to:
        {'\n'}• Provide accurate personal information during registration.
        {'\n'}• Use the app only for lawful purposes.
        {'\n'}• Respect other users and refrain from abusive, misleading, or inappropriate behavior.
      </Text>

      <Text style={styles.sectionTitle}>3. Event Listings</Text>
      <Text style={styles.paragraph}>
        FindEvent curates and displays events based on publicly available information or organizer
        submissions. We do not guarantee the accuracy or availability of listed events and are not
        responsible for cancellations, changes, or pricing.
      </Text>

      <Text style={styles.sectionTitle}>4. Account & Privacy</Text>
      <Text style={styles.paragraph}>
        • Your data is protected in accordance with our Privacy Policy.
        {'\n'}• We do not sell your personal information.
        {'\n'}• You can delete your account at any time from your profile settings.
      </Text>

      <Text style={styles.sectionTitle}>5. Prohibited Activities</Text>
      <Text style={styles.paragraph}>
        Do not:
        {'\n'}• Post fake or misleading event information.
        {'\n'}• Use the app to spam, harass, or distribute malicious content.
        {'\n'}• Attempt to reverse-engineer or disrupt the service.
      </Text>

      <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
      <Text style={styles.paragraph}>
        All content, branding, and design elements of FindEvent are owned by us or used under license.
        Do not copy, reproduce, or use without permission.
      </Text>

      <Text style={styles.sectionTitle}>7. Third-Party Services</Text>
      <Text style={styles.paragraph}>
        Some features may link to external services (e.g., ticket vendors, maps). We are not responsible
        for the content, policies, or actions of these third parties.
      </Text>

      <Text style={styles.sectionTitle}>8. Termination</Text>
      <Text style={styles.paragraph}>
        We reserve the right to suspend or terminate your access if you violate these terms or engage
        in harmful behavior toward the platform or its users.
      </Text>

      <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
      <Text style={styles.paragraph}>
        We may update these Terms periodically. Continued use of the app after updates means you accept
        the new terms.
      </Text>

      <Text style={styles.sectionTitle}>10. Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions or concerns, contact us at:
        {'\n'}support@findevent.app
      </Text>
    </ScrollView>
       </SafeAreaView>
  );
}