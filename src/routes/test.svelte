
  <script >
    import ThemeWrapper from '@layout/ThemeWrapper.svelte'
    import Container from '@layout/Container.svelte'
    import Section from '@layout/Section.svelte'
    import HeroBanner from '@layout/HeroBanner.svelte'
    import Link from '@link/Link.svelte'

    const heroprops = {
      title: "SvelteTip!",
      buttonOne: {
        text: 'Home',
        applyTheme: 'secondary',
        rounded: true,     
        href: '/'
      },
      buttonTwo: {
        text: 'Components',
        applyTheme: 'black',
        rounded: true,  
        hollow: true,
        href: 'https://www.sveltetip.com/components',
        target: "_blank"    
      }    
    }   
  </script >

  <ThemeWrapper invert>
    <HeroBanner {...heroprops}  />
  </ThemeWrapper>


  <ThemeWrapper invert>
    <Container>
        <Section nomargin>
          <section>
            <h2>I can now use SvelteTip components in my application!</h2>
            <p>
              Check out <Link active target='_blank' href='https://www.sveltetip.com/components'>the SvelteTip component</Link> page for details on 
              what components are available and how to use them.            
            </p>
            
          </section>
        </Section>
    </Container>
  </ThemeWrapper>
          