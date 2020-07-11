<!-- eslint-disable max-len -->
<template>
  <q-layout view="hHh lpr fff" class="q-pa-md">

    <header-component></header-component>


    <q-page-container>

      <div class="section-header">
        <h3 class="text-grey-7">Terms of Service</h3>
        <span class="sub-title-hr m-b-20"></span>
      </div>
      <h5>1. Terms</h5>
      <p>By accessing the website at&nbsp;<a href="https://www.WeInvites.com">https://www.weinvites.com</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
      </p>
      <h5>2. Use License</h5>
      <ol type="a">
        <li>
          Permission is granted to temporarily download one copy of the materials (information or software) on WeInvites, Inc's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

          <ol type="i">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on WeInvites, Inc's website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ol>
        </li>
        <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by WeInvites, Inc at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>
      </ol>

      <h5>3. Disclaimer</h5>

      <ol type="a">
        <li>The materials on WeInvites, Inc's website are provided on an 'as is' basis. WeInvites, Inc makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>
        <li>Further, WeInvites, Inc does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</li>
      </ol>

      <h5>4. Limitations</h5>

      <p>In no event shall WeInvites, Inc or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WeInvites, Inc's website, even if WeInvites, Inc or a WeInvites, Inc authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>

      <h5>5. Accuracy of materials</h5>

      <p>The materials appearing on WeInvites, Inc's website could include technical, typographical, or photographic errors. WeInvites, Inc does not warrant that any of the materials on its website are accurate, complete or current. WeInvites, Inc may make changes to the materials contained on its website at any time without notice. However WeInvites, Inc does not make any commitment to update the materials.</p>

      <h5>6. Links</h5>

      <p>WeInvites, Inc has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by WeInvites, Inc of the site. Use of any such linked website is at the user's own risk.</p>

      <h5>7. Modifications</h5>

      <p>WeInvites, Inc may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>

      <h5>8. Governing Law</h5>

      <p>These terms and conditions are governed by and construed in accordance with the laws of Plano, TX and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
      <br>
      <div class="section-header">
        <h3 class="text-grey-7">Privacy Policy</h3>
        <span class="sub-title-hr m-b-20"></span>
      </div>
      <p>Your privacy is important to us.</p>

      <p>It is WeInvites, Inc's policy to respect your privacy regarding any information we may collect while operating our website. Accordingly, we have developed this privacy policy in order for you to understand how we collect, use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy below.</p>

      <ul>
        <li>We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.</li>
        <li>Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.</li>
        <li>We will collect and use personal information solely for fulfilling those purposes specified by us and for other ancillary purposes, unless we obtain the consent of the individual concerned or as required by law.</li>
        <li>Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.</li>
        <li>We will protect personal information by using reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.</li>
        <li>We will make readily available to customers information about our policies and practices relating to the management of personal information.</li>
        <li>We will only retain personal information for as long as necessary for the fulfilment of those purposes.</li>
      </ul>
      <p>We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. WeInvites may change this privacy policy from time to time at WeInvites, Inc's sole discretion.</p>
      <br>
      <div class="section-header">
        <h3 class="text-grey-7">Disclosures</h3>
        <span class="sub-title-hr m-b-20"></span>
      </div>
      <h5 id="aa-disclosure" name="aa-disclosure">Amazon Associates Disclosure</h5>
      <p>
        WeInvites is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We may receive a commission from Amazon at no additional cost to you. We only recommend products we use and love or that we think will be helpful to you.
      </p>
      <router-view />
    </q-page-container>
    <footer-component></footer-component>
  </q-layout>
</template>

<script>
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'Terms',
  components: {
    headerComponent,
    footerComponent,
  },
};
</script>
