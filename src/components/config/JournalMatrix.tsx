import { useState, useEffect } from 'react';
import { Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useAnalysis, Filters } from '@/contexts/AnalysisContext';

const journalOptions = [
  { id: 'pubmed', name: 'PubMed' },
  { id: 'jama', name: 'JAMA Network' },
  { id: 'thelancet', name: 'The Lancet' },
];

export default function JournalMatrix() {
  const { filters, setFilters } = useAnalysis();
  const [selectedJournals, setSelectedJournals] = useState<string[]>(filters.journals);

  useEffect(() => {
    setSelectedJournals(filters.journals);
  }, [filters.journals]);

  const handleJournalToggle = (journalId: string) => {
    const newSelection = selectedJournals.includes(journalId)
      ? selectedJournals.filter(id => id !== journalId)
      : [...selectedJournals, journalId];
    
    // Now setFilters can accept a functional update
    setFilters((prev: Filters) => ({
      ...prev,
      journals: newSelection,
    }));
  };

  return (
    <Grid container spacing={2}>
      {journalOptions.map((journal) => (
        <Grid item xs={4} key={journal.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedJournals.includes(journal.id)}
                onChange={() => handleJournalToggle(journal.id)}
              />
            }
            label={journal.name}
          />
        </Grid>
      ))}
    </Grid>
  );
}
