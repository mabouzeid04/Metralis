DONE

# Settings E2E Testing Goals

## Overview
Test user settings functionality including profile updates, password changes, preferences (language), and WhatsApp notification opt-in.

---

## Test Scenarios

### 1. Settings Page Access
**File:** `settings-access.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-SET-001 | Navigate to settings | 1. Login<br>2. Navigate to /settings | Settings page loads |
| TC-SET-002 | Settings link in navigation | 1. Check user menu/sidebar | Settings link visible |
| TC-SET-003 | All sections visible | 1. View settings | Profile, Password, Preferences, Help sections shown |
| TC-SET-004 | Expandable sections | 1. Click section headers | Sections expand/collapse |
| TC-SET-005 | Unauthenticated redirect | 1. Not logged in<br>2. Go to /settings | Redirect to login |

---

### 2. Profile Section
**File:** `settings-profile.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-SET-010 | Profile section visible | 1. View settings | Profile section displayed |
| TC-SET-011 | Current name displayed | 1. View profile | User's name shown in field |
| TC-SET-012 | Current email displayed | 1. View profile | User's email shown |
| TC-SET-013 | Current phone displayed | 1. View profile | Phone number shown (if set) |
| TC-SET-014 | Current role displayed | 1. View profile | Role badge shown (non-editable) |
| TC-SET-015 | Update name | 1. Change name<br>2. Save | Name updated |
| TC-SET-016 | Update email | 1. Change email<br>2. Save | Email updated |
| TC-SET-017 | Update phone number | 1. Enter phone number<br>2. Save | Phone updated |
| TC-SET-018 | Phone number format validation | 1. Enter invalid phone<br>2. Save | Validation error |
| TC-SET-019 | Clear phone number | 1. Remove phone<br>2. Save | Phone cleared |
| TC-SET-020 | Save button enabled on change | 1. Modify a field | Save button becomes active |
| TC-SET-021 | Validation - empty name | 1. Clear name<br>2. Save | Validation error |
| TC-SET-022 | Validation - invalid email | 1. Enter invalid email<br>2. Save | Validation error |
| TC-SET-023 | Validation - existing email | 1. Enter another user's email<br>2. Save | Error: email taken |
| TC-SET-024 | Success notification | 1. Save valid changes | Success message shown |
| TC-SET-025 | Changes persist on refresh | 1. Save changes<br>2. Refresh | Changes maintained |

---

### 3. Password Section
**File:** `settings-password.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-SET-030 | Password section visible | 1. View settings | Password section shown |
| TC-SET-031 | Expand password section | 1. Click password header | Password fields revealed |
| TC-SET-032 | Current password field | 1. View section | Current password input shown |
| TC-SET-033 | New password field | 1. View section | New password input shown |
| TC-SET-034 | Confirm password field | 1. View section | Confirm password input shown |
| TC-SET-035 | Change password successfully | 1. Enter current password<br>2. Enter new password<br>3. Confirm<br>4. Submit | Password changed |
| TC-SET-036 | Wrong current password | 1. Enter wrong current password<br>2. Submit | Error: incorrect password |
| TC-SET-037 | New password too short | 1. New password < 8 chars<br>2. Submit | Validation error |
| TC-SET-038 | Passwords don't match | 1. Different confirm password<br>2. Submit | Error: passwords don't match |
| TC-SET-039 | Password fields cleared on success | 1. Change password successfully | Fields cleared |
| TC-SET-040 | Can login with new password | 1. Change password<br>2. Logout<br>3. Login with new password | Login successful |
| TC-SET-041 | Cannot login with old password | 1. Change password<br>2. Logout<br>3. Login with old password | Login fails |
| TC-SET-042 | Success notification | 1. Change password | Success message shown |
| TC-SET-043 | Password visibility toggle | 1. Click show/hide password | Password visible/hidden |

---

### 4. WhatsApp Notification Settings
**File:** `settings-whatsapp.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-SET-050 | WhatsApp toggle visible | 1. View profile section | WhatsApp opt-in toggle shown |
| TC-SET-051 | Toggle disabled without phone | 1. No phone number set | Toggle disabled with explanation |
| TC-SET-052 | Toggle enabled with phone | 1. Phone number set | Toggle enabled |
| TC-SET-053 | Enable WhatsApp notifications | 1. Have phone number<br>2. Toggle on<br>3. Save | Opt-in saved |
| TC-SET-054 | Disable WhatsApp notifications | 1. Toggle off<br>2. Save | Opt-out saved |
| TC-SET-055 | WhatsApp status persists | 1. Toggle<br>2. Refresh | Setting maintained |
| TC-SET-056 | Notification on WO assignment | 1. Opted-in<br>2. Assigned to WO | WhatsApp notification sent |
| TC-SET-057 | No notification when opted-out | 1. Opted-out<br>2. Assigned to WO | No WhatsApp sent |
| TC-SET-058 | Toggle after adding phone | 1. Add phone<br>2. Toggle becomes enabled | Can now opt-in |

---

### 5. Preferences Section (Language)
**File:** `settings-preferences.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-SET-060 | Preferences section visible | 1. View settings | Preferences section shown |
| TC-SET-061 | Language selector visible | 1. View preferences | Language dropdown shown |
| TC-SET-062 | Current language selected | 1. View preferences | Current language highlighted |
| TC-SET-063 | Switch to Arabic | 1. Select Arabic<br>2. Save | UI switches to Arabic/RTL |
| TC-SET-064 | Switch to English | 1. Select English<br>2. Save | UI switches to English/LTR |
| TC-SET-065 | RTL layout for Arabic | 1. Set to Arabic | Layout direction is RTL |
| TC-SET-066 | LTR layout for English | 1. Set to English | Layout direction is LTR |
| TC-SET-067 | Language persists on refresh | 1. Change language<br>2. Refresh | Language maintained |
| TC-SET-068 | Language persists on re-login | 1. Change language<br>2. Logout<br>3. Login | Language preference restored |
| TC-SET-069 | Language affects all pages | 1. Change language<br>2. Navigate around | All pages use new language |
| TC-SET-070 | Translated labels | 1. Switch language | Form labels translated |
| TC-SET-071 | Translated navigation | 1. Switch language | Navigation items translated |
| TC-SET-072 | Date format for locale | 1. Switch language | Dates formatted per locale |

---

### 6. Help Section
**File:** `settings-help.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-SET-080 | Help section visible | 1. View settings | Help section shown |
| TC-SET-081 | Getting started guide | 1. Expand help | Getting started content shown |
| TC-SET-082 | Feature guides | 1. Expand help | Feature guides listed |
| TC-SET-083 | FAQ section | 1. Expand help | FAQ items displayed |
| TC-SET-084 | Expandable FAQ items | 1. Click FAQ question | Answer expands |
| TC-SET-085 | About information | 1. View help | Version/about info shown |
| TC-SET-086 | External links work | 1. Click external help link | Opens in new tab |

---

### 7. Settings Form Behavior
**File:** `settings-forms.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-SET-090 | Unsaved changes indicator | 1. Modify field<br>2. Don't save | Indicator shows unsaved changes |
| TC-SET-091 | Warn on navigation with unsaved | 1. Modify field<br>2. Try to navigate | Warning dialog (if implemented) |
| TC-SET-092 | Cancel changes | 1. Modify field<br>2. Cancel/reset | Original values restored |
| TC-SET-093 | Multiple section changes | 1. Modify profile<br>2. Modify preferences<br>3. Save | All changes saved |
| TC-SET-094 | Form accessibility | 1. Navigate with keyboard | All fields accessible |
| TC-SET-095 | Error messages accessible | 1. Trigger validation error | Error announced to screen readers |

---

## Test Data Requirements

```typescript
// fixtures/settings.ts
export const settingsTestData = {
  profileUpdates: {
    newName: 'Updated Name',
    newEmail: 'updated@test.com',
    newPhone: '+1234567890'
  },
  passwordChange: {
    currentPassword: 'CurrentPass123!',
    newPassword: 'NewPass123!',
    wrongPassword: 'WrongPass123!'
  },
  languages: {
    english: 'en',
    arabic: 'ar'
  },
  phoneFormats: {
    valid: ['+1234567890', '1234567890', '+966501234567'],
    invalid: ['abc', '123', 'phone@email.com']
  }
};
```

---

## Page Objects

```typescript
// pages/SettingsPage.ts
class SettingsPage {
  // Sections
  readonly profileSection: Locator;
  readonly passwordSection: Locator;
  readonly preferencesSection: Locator;
  readonly helpSection: Locator;

  // Profile Fields
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly roleDisplay: Locator;
  readonly whatsappToggle: Locator;
  readonly profileSaveButton: Locator;

  // Password Fields
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly changePasswordButton: Locator;
  readonly passwordVisibilityToggle: Locator;

  // Preferences
  readonly languageSelect: Locator;
  readonly preferencesSaveButton: Locator;

  // Actions
  async expandSection(section: string): Promise<void>;
  async updateProfile(data: ProfileData): Promise<void>;
  async changePassword(current: string, newPass: string, confirm: string): Promise<void>;
  async setLanguage(language: string): Promise<void>;
  async toggleWhatsApp(enabled: boolean): Promise<void>;
}

// components/ProfileForm.ts
class ProfileForm {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly whatsappToggle: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  async fillProfile(data: ProfileData): Promise<void>;
  async save(): Promise<void>;
  async cancel(): Promise<void>;
  async isWhatsAppEnabled(): Promise<boolean>;
}

// components/PasswordChangeForm.ts
class PasswordChangeForm {
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly visibilityToggles: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  async changePassword(current: string, newPass: string): Promise<void>;
  async togglePasswordVisibility(field: string): Promise<void>;
}

// components/LanguageSelector.ts
class LanguageSelector {
  readonly dropdown: Locator;
  readonly englishOption: Locator;
  readonly arabicOption: Locator;

  async selectLanguage(lang: string): Promise<void>;
  async getCurrentLanguage(): Promise<string>;
}
```

---

## Localization Testing

### Arabic (AR) Specific Tests
- All UI text translated
- RTL layout correct
- Numbers displayed correctly (Arabic numerals if configured)
- Date format: DD/MM/YYYY or Arabic format
- Currency symbols positioned correctly

### English (EN) Specific Tests
- Default LTR layout
- Standard date format
- All text in English
