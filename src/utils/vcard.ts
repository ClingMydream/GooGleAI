import { CardData } from '../types/card';

/**
 * Generate standard vCard 3.0 file content and trigger browser download
 */
export function exportVCardFile(card: CardData): boolean {
  try {
    const vCardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN;CHARSET=UTF-8:${card.name}`,
      `N;CHARSET=UTF-8:${card.name};;;;`,
      `ORG;CHARSET=UTF-8:${card.company.fullName};${card.department}`,
      `TITLE;CHARSET=UTF-8:${card.title}`,
    ];

    if (card.contacts.phone) {
      const cleanPhone = card.contacts.phone.replace(/\s+/g, '');
      vCardLines.push(`TEL;TYPE=CELL,VOICE:${cleanPhone}`);
    }

    if (card.contacts.email) {
      vCardLines.push(`EMAIL;TYPE=PREF,INTERNET:${card.contacts.email}`);
    }

    if (card.contacts.address) {
      vCardLines.push(`ADR;TYPE=WORK;CHARSET=UTF-8:;;${card.contacts.address};;;;`);
    }

    if (card.company.tenItems.officialWebsite) {
      vCardLines.push(`URL:${card.company.tenItems.officialWebsite}`);
    }

    if (card.contacts.wechatId) {
      vCardLines.push(`X-WECHAT:${card.contacts.wechatId}`);
    }

    vCardLines.push('END:VCARD');
    const vCardContent = vCardLines.join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${card.name}_${card.company.shortName}_名片.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error('Failed to export vCard:', err);
    return false;
  }
}

/**
 * Copy text to clipboard with browser fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback below
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Copy fallback failed:', err);
    return false;
  }
}
