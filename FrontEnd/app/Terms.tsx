import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Terms() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text style={s.heading}>Terms & Policies</Text>
          <Text style={s.subheading}>Last updated: August 20, 2025</Text>
        </View>

        {/* Section blocks */}
        <View style={s.card}>
          <Text style={s.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={s.paragraph}>
            By accessing or using the FindEvent app, you agree to be bound by
            these Terms. If you do not agree, please do not use the application.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.sectionTitle}>2. User Responsibilities</Text>
          <Text style={s.paragraph}>
            • Provide accurate personal information during registration.{"\n"}
            • Use the app only for lawful purposes.{"\n"}
            • Respect other users and refrain from abusive, misleading, or
            inappropriate behavior.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.sectionTitle}>3. Event Listings</Text>
          <Text style={s.paragraph}>
            FindEvent curates and displays events based on publicly available
            information or organizer submissions. We do not guarantee the
            accuracy or availability of listed events and are not responsible
            for cancellations, changes, or pricing.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.sectionTitle}>4. Account & Privacy</Text>
          <Text style={s.paragraph}>
            • Your data is protected in accordance with our Privacy Policy.{"\n"}
            • We do not sell your personal information.{"\n"}
            • You can delete your account at any time from your profile
            settings.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.sectionTitle}>5. Prohibited Activities</Text>
          <Text style={s.paragraph}>
            Do not:{"\n"}• Post fake or misleading event information.{"\n"}• Use
            the app to spam, harass, or distribute malicious content.{"\n"}•
            Attempt to reverse-engineer or disrupt the service.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.sectionTitle}>6. Intellectual Property</Text>
          <Text style={s.paragraph}>
            All content, branding, and design elements of FindEvent are owned by
            us or used under license. Do not copy, reproduce, or use without
            permission.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.sectionTitle}>7. Third-Party Services</Text>
          <Text style={s.paragraph}>
            Some features may link to external services (e.g., ticket vendors,
            maps). We are not responsible for the content, policies, or actions
            of these third parties.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.sectionTitle}>8. Termination</Text>
          <Text style={s.paragraph}>
            We reserve the right to suspend or terminate your access if you
            violate these terms or engage in harmful behavior toward the
            platform or its users.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.sectionTitle}>9. Changes to Terms</Text>
          <Text style={s.paragraph}>
            We may update these Terms periodically. Continued use of the app
            after updates means you accept the new terms.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.sectionTitle}>10. Contact Us</Text>
          <Text style={s.paragraph}>
            If you have any questions or concerns, contact us at:{"\n"}
            support@findevent.app
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
  },
  subheading: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#182333",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#263241",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F3F4F6",
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#CBD5E1",
  },
});
