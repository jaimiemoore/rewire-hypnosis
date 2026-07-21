# Phase 2 Manual Tasks & Next Steps

## ✅ Automated Tasks (Already Completed)

All major automated tasks have been completed and tested:
- ✅ Image compression (promise-photo, rachel-headshot)
- ✅ OG image creation
- ✅ All 6 new components created
- ✅ Breadcrumb navigation implemented
- ✅ Metadata and schema updates
- ✅ Internal linking added
- ✅ Build verification passed

---

## 📋 Manual Tasks (Outside Claude)

### 1. Google Business Profile Setup (Important for Local SEO)

**Location**: https://business.google.com

**Steps**:
1. Go to business.google.com
2. Click "Manage now" or "Create a business"
3. Search for "Rewire Hypnosis" or create new
4. Enter business information:
   - Name: Rewire Hypnosis
   - Address: 24 Ontario Street, Port Hope, ON L1A 1E1
   - Phone: [Add when available]
   - Website: https://rewirehypnosis.ca
   - Category: Hypnotherapy Service, Mental Health Service
5. Verify the location (follow Google's verification steps)
6. Complete all sections:
   - Business description (750 chars max)
   - Photos (upload 10-15 professional images)
   - Hours (By appointment)
   - Services (list all 10 services)
   - Service areas (Port Hope, Cobourg, surrounding areas)

**Why It Matters**: Appears in Google Maps, local pack (top 3 results), and "near me" searches

---

### 2. Google Search Console Setup (Essential)

**Location**: https://search.google.com/search-console

**Steps**:
1. Go to search.google.com/search-console
2. Add property: https://rewirehypnosis.ca
3. Verify ownership (choose DNS TXT record or HTML file method)
4. Connect Google Analytics (if available)
5. Submit sitemap: https://rewirehypnosis.ca/sitemap.xml
6. Request indexing for main pages:
   - /
   - /services
   - /about
   - /contact
7. Monitor:
   - Indexing coverage
   - Search performance (impressions, clicks, CTR)
   - Core Web Vitals
   - Mobile usability
   - Security & manual actions

**Why It Matters**:
- Critical for understanding search performance
- See which keywords you're ranking for
- Identify indexing issues
- Monitor Core Web Vitals

---

### 3. Schema Validation (Good Practice)

**Tool**: https://search.google.com/test/rich-results

**Steps**:
1. Go to the Rich Results Test
2. Enter: https://rewirehypnosis.ca
3. Verify all schema show as "Valid":
   - FAQPage ✓
   - BreadcrumbList ✓
   - Review/AggregateRating ✓
   - LocalBusiness ✓
   - Organization ✓
4. Check each page:
   - / (homepage)
   - /services
   - /about
   - /contact

---

### 4. Domain Redirect Configuration (If Needed)

**Scenario**: If rewirehypnosis.com exists

**Action**: Set up 301 redirect from rewirehypnosis.com → rewirehypnosis.ca

**How**:
- Contact your domain registrar or hosting provider
- Set up permanent (301) redirect
- Test: Visit rewirehypnosis.com → should redirect to .ca

**Why**: Consolidates SEO authority to main domain

---

### 5. Analytics Setup (Optional but Recommended)

**Google Analytics 4**: https://analytics.google.com

**Steps**:
1. Create GA4 property for https://rewirehypnosis.ca
2. Add tracking code to Next.js project
3. Monitor:
   - Organic search traffic
   - User behavior
   - Conversion (contact form submissions)
   - Device/browser performance

**Recommended Package**:
```
npm install @next/google-analytics
```

---

### 6. Review Generation Campaign (Boost Social Proof)

**Timing**: After you have satisfied clients

**Steps**:
1. Ask satisfied clients for Google reviews:
   - "Would you mind leaving a review on Google? It helps other people like you find us."
   - Share direct link to Google Business Profile review section
2. Target: 5+ reviews within first month
3. Respond to all reviews (positive and negative)

**Why**: Star ratings in search results, improved local rankings

---

### 7. Social Media Share Testing (Optional)

**Test Social Sharing**: Share your pages on social media to verify OG images display correctly

**Tools**:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn: Share a link and preview it
- Twitter: Share a link and verify image

**What to Check**:
- Correct image displays (og-image.jpg)
- Title and description are accurate
- Preview looks professional

---

### 8. Create Better OG Image (Design Task)

**Current**: Programmatically generated SVG-based image (functional but basic)

**Recommendation**:
- Create a professional graphic design tool like Canva
- Include: Rewire Hypnosis logo, Rachel's photo, tagline
- Dimensions: 1200x630px
- Save as JPEG (high quality)
- Replace `/public/images/og-image.jpg`

**Tools**:
- Canva (free, easy)
- Adobe Express (free)
- Figma (free tier)

---

### 9. Blog Setup (Future Content)

**When Ready**:
1. Create `/app/blog` directory
2. Set up MDX or database connection for blog posts
3. Create blog post template with:
   - Article schema
   - SEO metadata
   - Related posts links
4. Publish 2-4 posts per month on topics like:
   - "How Hypnosis Works: The Science Behind It"
   - "5 Myths About Hypnosis Debunked"
   - "Success Stories: Real Client Transformations"
   - "What to Expect in Your First Session"

---

### 10. Backlink Acquisition Strategy (Ongoing)

**Low-Hanging Fruit**:
1. Local directories:
   - Register on local business directories
   - Get backlinks from Port Hope/Cobourg guides
2. Industry directories:
   - IAHP (International Association of Hypnotists)
   - Canadian board of hypnotherapy associations
3. Guest posting:
   - Write guest posts for wellness blogs
   - Include backlink to rewirehypnosis.ca
4. Local partnerships:
   - Team up with complementary services
   - Exchange links or cross-promotion

---

## 📊 Monitoring & Maintenance

### Weekly
- Check Google Search Console for new issues
- Monitor Core Web Vitals (should stay green)
- Review indexing status

### Monthly
- Check keyword rankings (track 10-20 key terms)
- Analyze Google Analytics traffic
- Review Google Business Profile insights
- Respond to new reviews

### Quarterly
- Full SEO audit
- Update blog with new content
- Backlink analysis
- Competitor analysis

---

## 🎯 Performance Benchmarks to Track

### Current State (Before Phase 2)
- Lighthouse SEO: ~80-90/100
- Performance: ~60-70/100
- LCP: ~6s
- Organic traffic: TBD

### Target State (After Phase 2)
- Lighthouse SEO: 95-100/100
- Performance: 85-95/100
- LCP: <1.5s
- Core Web Vitals: All "Good"
- Keywords ranking in top 10: 30+
- Featured snippets: 5+
- Monthly organic visits: +150-300%

---

## 📞 When to Get Help

### Outsourcing Decisions

**Consider hiring for**:
- Professional OG image design ($50-200)
- Blog writing/content creation ($100-500/post)
- Backlink outreach/link building ($1000+/month)
- Local SEO service (Google Business optimization)
- Photography for service pages

**You can handle**:
- Google Search Console monitoring
- Analytics review
- Review responses
- Local directory registration
- Content ideas and direction

---

## ✨ Final Checklist

Before considering Phase 2 complete:

- [ ] Build successfully passes (`npm run build`)
- [ ] All new components render without errors
- [ ] Images compressed and optimized
- [ ] OG image created and visible
- [ ] Breadcrumbs appear on all pages
- [ ] FAQ section expands/collapses correctly
- [ ] All new sections display properly on homepage
- [ ] Internal links are clickable and functional
- [ ] Mobile responsive (test on phone)
- [ ] Schema validation passes (Rich Results Test)
- [ ] Google Search Console setup complete
- [ ] Sitemap submitted to Google
- [ ] Google Business Profile created

---

## 🚀 Timeline to 95+ SEO Score

**Immediate (This Week)**:
- ✅ Code changes completed
- Complete Google Business Profile setup
- Submit to Google Search Console
- Validate schema

**Short Term (Weeks 2-4)**:
- Monitor indexing in Google Search Console
- Verify keyword rankings beginning to move
- Create professional OG image if needed
- Get first reviews on Google Business Profile

**Medium Term (Month 2)**:
- See traffic increases in Analytics
- Track featured snippet opportunities
- Plan blog content calendar
- Identify high-volume keywords to target

**Long Term (Month 3+)**:
- Publish consistent blog content
- Build backlinks
- Achieve 90-95+ SEO score
- Continue monitoring and optimizing

---

## Questions?

For implementation questions or issues:
1. Check PHASE2_IMPLEMENTATION.md for technical details
2. Review component code and comments
3. Test with Google's tools (Rich Results Test, PageSpeed Insights)
4. Monitor Google Search Console for recommendations

Congratulations on completing Phase 2! 🎉
