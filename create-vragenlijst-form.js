/**
 * CAPTURE & CONNECT — Vragenlijst Website
 *
 * HOE TE GEBRUIKEN:
 * 1. Ga naar https://script.google.com
 * 2. Maak een nieuw project aan
 * 3. Plak deze volledige code
 * 4. Klik op "Run" (driehoekje bovenaan)
 * 5. Geef toestemming als Google daarom vraagt
 * 6. Check je logs (View > Logs) voor de link naar je form
 */

function createVragenlijstWebsite() {
  var form = FormApp.create('Vragenlijst Website — Capture & Connect');

  form.setDescription(
    'Alle informatie die wij nodig hebben om jouw website te bouwen.\n\n' +
    'Dit formulier duurt ongeveer 10 tot 15 minuten.\n' +
    'Hoe completer je dit invult, hoe beter en sneller wij jouw website kunnen bouwen.'
  );

  form.setConfirmationMessage(
    'Bedankt voor het invullen!\n\n' +
    'Wij gaan direct aan de slag met jouw website.\n\n' +
    'Capture & Connect\n' +
    'info@captureandconnect.nl\n' +
    'captureandconnect.nl'
  );

  form.setProgressBar(true);

  // =============================================
  // SECTIE 1: BEDRIJFSGEGEVENS
  // =============================================
  form.addPageBreakItem()
    .setTitle('Bedrijfsgegevens');

  form.addTextItem()
    .setTitle('Wat is de naam van jouw bedrijf?')
    .setRequired(true);

  form.addTextItem()
    .setTitle('In welke plaats is jouw bedrijf gevestigd?')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Wat is het adres van jouw bedrijf?')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Wat is het telefoonnummer van jouw bedrijf?')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Wat is het e-mailadres van jouw bedrijf?')
    .setRequired(true);

  // =============================================
  // SECTIE 2: OVER JOUW BEDRIJF
  // =============================================
  form.addPageBreakItem()
    .setTitle('Over jouw bedrijf');

  form.addParagraphTextItem()
    .setTitle('Wat doet jouw bedrijf?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Voor wie is jouw bedrijf bedoeld?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Wat maakt jouw bedrijf anders dan anderen?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Waarom moeten klanten voor jou kiezen?')
    .setRequired(true);

  // =============================================
  // SECTIE 3: DIENSTEN OF PRODUCTEN
  // =============================================
  form.addPageBreakItem()
    .setTitle('Diensten of producten');

  form.addParagraphTextItem()
    .setTitle('Welke diensten of producten bied je aan?')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Wat zijn je belangrijkste diensten of producten?')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Wil je prijzen tonen op de website?')
    .setChoiceValues(['Ja', 'Nee'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Zo ja, kun je je prijslijst toevoegen?')
    .setHelpText('Typ hier je prijzen of voeg later een bestand toe via e-mail.')
    .setRequired(false);

  // =============================================
  // SECTIE 4: DOEL VAN DE WEBSITE
  // =============================================
  form.addPageBreakItem()
    .setTitle('Doel van de website');

  form.addParagraphTextItem()
    .setTitle('Wat is het belangrijkste doel van jouw website?')
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Wil je meer aanvragen, meer klanten of meer zichtbaarheid?')
    .setChoiceValues(['Meer aanvragen', 'Meer klanten', 'Meer zichtbaarheid', 'Anders'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Is er nog een ander doel dat belangrijk is?')
    .setRequired(false);

  // =============================================
  // SECTIE 5: CONTACT EN AANVRAGEN
  // =============================================
  form.addPageBreakItem()
    .setTitle('Contact en aanvragen');

  form.addCheckboxItem()
    .setTitle('Hoe wil je dat klanten contact met je opnemen?')
    .setChoiceValues(['Bellen', 'WhatsApp', 'E-mailen', 'Contactformulier invullen'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Maak je gebruik van een boekingssysteem?')
    .setChoiceValues(['Ja', 'Nee'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Zo ja, wat is de link naar jouw boekingssysteem?')
    .setRequired(false);

  // =============================================
  // SECTIE 6: OPENINGSTIJDEN
  // =============================================
  form.addPageBreakItem()
    .setTitle('Openingstijden');

  form.addParagraphTextItem()
    .setTitle('Wat zijn je openingstijden?')
    .setHelpText('Bijvoorbeeld: Ma-Vr 09:00-17:00, Za 10:00-15:00')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Werk je op afspraak of met vrije inloop?')
    .setChoiceValues(['Op afspraak', 'Vrije inloop', 'Beide'])
    .setRequired(true);

  // =============================================
  // SECTIE 7: CONTENT
  // =============================================
  form.addPageBreakItem()
    .setTitle('Content');

  form.addMultipleChoiceItem()
    .setTitle("Heb je foto's van je bedrijf of werk die we kunnen gebruiken?")
    .setChoiceValues(['Ja, ik stuur ze apart op', 'Nee, ik heb geen fotos'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Heb je een logo dat je kunt aanleveren?')
    .setChoiceValues(['Ja, ik stuur het apart op', 'Nee, ik heb geen logo'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Welke kleuren gebruik je of wil je gebruiken op de website?')
    .setHelpText('Bijvoorbeeld: zwart, wit en goud. Of een hex code zoals #FF5500.')
    .setRequired(false);

  // =============================================
  // SECTIE 8: STIJL
  // =============================================
  form.addPageBreakItem()
    .setTitle('Stijl');

  form.addCheckboxItem()
    .setTitle('Welke stijl wil je voor de website?')
    .setChoiceValues(['Modern', 'Luxe', 'Simpel', 'Zakelijk', 'Stoer', 'Anders'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Heb je voorbeelden van websites die je mooi vindt?')
    .setChoiceValues(['Ja', 'Nee'])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Zo ja, kun je links toevoegen?')
    .setHelpText('Plak hier de links naar websites die je mooi vindt.')
    .setRequired(false);

  // =============================================
  // SECTIE 9: TEKSTEN
  // =============================================
  form.addPageBreakItem()
    .setTitle('Teksten');

  form.addParagraphTextItem()
    .setTitle('Kun je een korte beschrijving van je bedrijf geven?')
    .setHelpText('Dit gebruiken we als basis voor de teksten op je website.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Heb je een slogan?')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Wat moet er bovenaan de website staan?')
    .setHelpText('De eerste tekst die bezoekers zien. Bijvoorbeeld je slogan of een korte pitch.')
    .setRequired(false);

  // =============================================
  // SECTIE 10: SOCIAL MEDIA
  // =============================================
  form.addPageBreakItem()
    .setTitle('Social media');

  form.addTextItem()
    .setTitle('Wat is de link naar je Instagram?')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Wat is de link naar je TikTok?')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Wat is de link naar je Facebook?')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Gebruik je nog andere social media kanalen?')
    .setHelpText('Bijvoorbeeld LinkedIn, YouTube, X, etc.')
    .setRequired(false);

  // =============================================
  // SECTIE 11: EXTRA
  // =============================================
  form.addPageBreakItem()
    .setTitle('Extra');

  form.addMultipleChoiceItem()
    .setTitle('Wil je reviews tonen op de website?')
    .setChoiceValues(['Ja', 'Nee'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Zo ja, kun je deze toevoegen?')
    .setHelpText('Plak hier je reviews of stuur ze apart op.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Heb je acties of aanbiedingen die op de website moeten komen?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Zijn er nog andere dingen die je op de website wil hebben?')
    .setRequired(false);

  // =============================================
  // SECTIE 12: CALL TO ACTION
  // =============================================
  form.addPageBreakItem()
    .setTitle('Call to action');

  form.addParagraphTextItem()
    .setTitle('Wat moet een bezoeker doen op jouw website?')
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Wil je dat bezoekers een aanvraag doen, contact opnemen, bellen of een WhatsApp sturen?')
    .setChoiceValues(['Aanvraag doen', 'Contact opnemen', 'Bellen', 'WhatsApp sturen', 'Anders'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Is er nog een andere actie die belangrijk is?')
    .setRequired(false);

  // =============================================
  // AFSLUITING
  // =============================================
  form.addPageBreakItem()
    .setTitle('Afsluiting')
    .setHelpText(
      'Je krijgt 1 feedbackronde na oplevering.\n' +
      'Zorg dat alles zo compleet mogelijk is ingevuld zodat we snel kunnen bouwen.\n\n' +
      'Bedankt voor het invullen!\n' +
      'Wij gaan direct aan de slag met jouw website.'
    );

  // Log de URL
  var formUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();

  Logger.log('========================================');
  Logger.log('CAPTURE & CONNECT — Vragenlijst Website');
  Logger.log('========================================');
  Logger.log('');
  Logger.log('LINK VOOR KLANTEN (delen):');
  Logger.log(formUrl);
  Logger.log('');
  Logger.log('LINK OM TE BEWERKEN:');
  Logger.log(editUrl);
  Logger.log('');
  Logger.log('Form succesvol aangemaakt!');
}
