<script>
  import { comparingMunicipalities } from '../../store/municipality'
  import Notification from '../atoms/Notification.svelte'

  let mainMunicipalityMessage = ''
  let otherMunicipalityMessages = []

  $: {
    if ($comparingMunicipalities.length) {
      const {
        municipality,
        location,
        solarEnergyGeneration,
        windEnergyGeneration,
        totalEnergyGeneration,
        households,
        livingArea,
        totalArea,
      } = $comparingMunicipalities[0]

      switch (location) {
        case 'Rural':
          if ((windEnergyGeneration * 1000) / (households * 90) >= 0.05)
            mainMunicipalityMessage = `You are already well on your way to make ${municipality} greener with wind energy. Keep up the good work!`
          else if (
            (windEnergyGeneration * 1000) / (households * 90) < 0.05 &&
            (windEnergyGeneration * 1000) / (households * 90) > 0
          )
            mainMunicipalityMessage = `You have already looked at generating wind energy, although there may still be some room for improvement left. You can do this ${municipality}!`
          else if ((totalEnergyGeneration * 1000) / (households * 90) > 0.05)
            mainMunicipalityMessage = `You are already well on your way to make ${municipality} greener with the projects you're working on. Keep up the good work!`
          else
            mainMunicipalityMessage = `You have already looked at generating green energy, but there seems to be a lot of potential out in the open. You can do this ${municipality}!`
          break
        case 'Urban':
          if (
            livingArea / totalArea > 0.6 &&
            (solarEnergyGeneration * 1000) / (households * 90) > 0.05
          )
            mainMunicipalityMessage = `You are already making good use of the dense housing to generate solar energy, keep it coming!`
          else if (
            livingArea / totalArea > 0.6 &&
            (solarEnergyGeneration * 1000) / (households * 90) <= 0.05 &&
            (solarEnergyGeneration * 1000) / (households * 90) > 0
          )
            mainMunicipalityMessage = `You have already looked at generating solar energy, although there may still be some room for improvement left. Maybe look at other options, like biogas or wind energy. You can do this ${municipality}!`
          else if ((totalEnergyGeneration * 1000) / (households * 90) > 0.05)
            mainMunicipalityMessage = `You are already well on your way to make ${municipality} greener with the projects you're working on. Keep up the good work!`
          else
            mainMunicipalityMessage = `You have already looked at generating green energy, but there seems to be a lot of potential left out in the open. You can do this ${municipality}!`
          break
        case 'Lake':
          if (
            livingArea / totalArea > 0.6 &&
            (windEnergyGeneration * 1000) / (households * 90) > 0.05
          )
            mainMunicipalityMessage = `It seems like you're making great use of your position near a lake to generate green energy. Keep it up ${municipality}`
          else if (
            livingArea / totalArea > 0.6 &&
            (windEnergyGeneration * 1000) / (households * 90) <= 0.05 &&
            (windEnergyGeneration * 1000) / (households * 90) > 0
          )
            mainMunicipalityMessage = `You guys have already looked at generating wind energy, but there is still be some room for improvement left. You can do this ${municipality}!`
          else if ((totalEnergyGeneration * 1000) / (households * 90) > 0.05)
            mainMunicipalityMessage = `You are already well on your way to make ${municipality} greener with the projects you're working on. Keep up the good work!`
          else
            mainMunicipalityMessage = `There is a lot of potential out in the open. You can do this ${municipality}!`
          break
        case 'Coast':
          if (
            livingArea / totalArea > 0.6 &&
            (windEnergyGeneration * 1000) / (households * 90) > 0.05
          )
            mainMunicipalityMessage = `It seems like you're making great use of your position at the coast to generate green energy. Keep it up ${municipality}`
          else if (
            livingArea / totalArea > 0.6 &&
            (windEnergyGeneration * 1000) / (households * 90) <= 0.05 &&
            (windEnergyGeneration * 1000) / (households * 90) > 0
          )
            mainMunicipalityMessage = `Our seas are a favorable location for wind turbines because of the relatively shallow water depth, the favorable wind climate. Maybe it's a lucrative effort to ask the governement to allow for more wind mills at your coast. You can do this ${municipality}!`
          else if ((totalEnergyGeneration * 1000) / (households * 90) > 0.05)
            mainMunicipalityMessage = `You are already well on your way to make ${municipality} greener with the projects you're working on. Keep up the good work!`
          else
            mainMunicipalityMessage = `There is a lot of potential out in the open. You can do this ${municipality}!`
          break
      }

      otherMunicipalityMessages = $comparingMunicipalities.slice(1).map(m => {
        const {
          municipality,
          location,
          solarEnergyGeneration,
          windEnergyGeneration,
          totalEnergyGeneration,
          households,
          livingArea,
          totalArea,
        } = m

        switch (location) {
          case 'Rural':
            if ((windEnergyGeneration * 1000) / (households * 90) >= 0.05)
              return `${municipality} is already well on their way to make the municipality greener with wind energy.`
            else if (
              (windEnergyGeneration * 1000) / (households * 90) < 0.05 &&
              (windEnergyGeneration * 1000) / (households * 90) > 0
            )
              return `${municipality} has already looked at generating wind energy, although there may still be some room for improvement left.`
            else if ((totalEnergyGeneration * 1000) / (households * 90) > 0.05)
              return `${municipality} are already well on their way to make the municipality greener with the projects they're working on.`
            else
              return `${municipality} has already looked at generating green energy, but there seems to be a lot of potential out in the open.`
          case 'Urban':
            if (
              livingArea / totalArea > 0.6 &&
              (solarEnergyGeneration * 1000) / (households * 90) > 0.05
            )
              return `${municipality} is already making good use of the dense housing to generate solar energy.`
            else if (
              livingArea / totalArea > 0.6 &&
              (solarEnergyGeneration * 1000) / (households * 90) <= 0.05 &&
              (solarEnergyGeneration * 1000) / (households * 90) > 0
            )
              return `${municipality} has already looked at generating solar energy, although there may still be some room for improvement left. They probably need to look at other options, like biogas or wind energy.`
            else if ((totalEnergyGeneration * 1000) / (households * 90) > 0.2)
              return `${municipality} is already well on their way to make the municipality greener with the projects they're working on.`
            else
              return `${municipality} has already looked at generating green energy, but there seems to be a lot of potential out in the open.`
          case 'Lake':
            if (
              livingArea / totalArea > 0.6 &&
              (windEnergyGeneration * 1000) / (households * 90) > 0.05
            )
              return `It seems ${municipality} making great use of their position near a lake to generate green energy.`
            else if (
              livingArea / totalArea > 0.6 &&
              (windEnergyGeneration * 1000) / (households * 90) <= 0.05 &&
              (windEnergyGeneration * 1000) / (households * 90) > 0
            )
              return `${municipality} has already looked at generating wind energy, but there is still be some room for improvement left.`
            else if ((totalEnergyGeneration * 1000) / (households * 90) > 0.15)
              return `${municipality} is already well on their way to make the municipality greener with the projects they're working on.`
            else
              return `${municipality} has already looked at generating green energy, but there seems to be a lot of potential out in the open.`
          case 'Coast':
            if (
              livingArea / totalArea > 0.6 &&
              (windEnergyGeneration * 1000) / (households * 90) > 0.05
            )
              return `It seems like ${municipality} is making great use of their position at the coast to generate green energy.`
            else if (
              livingArea / totalArea > 0.6 &&
              (windEnergyGeneration * 1000) / (households * 90) <= 0.05 &&
              (windEnergyGeneration * 1000) / (households * 90) > 0
            )
              return `It seems like ${municipality} could use their position at the coast more lucratively.`
            else if ((totalEnergyGeneration * 1000) / (households * 90) > 0.1)
              return `${municipality} is already well on their way to make the municipality greener with the projects they're working on.`
            else
              return `${municipality} has already looked at generating green energy, but there seems to be a lot of potential out in the open.`
        }
      })
    }
  }
</script>

<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: calc(1.5 * var(--step-0));
  }
</style>

<ul>
  <Notification>{mainMunicipalityMessage}</Notification>
  {#each otherMunicipalityMessages as message (message)}
    <Notification>{message}</Notification>
  {/each}
</ul>
